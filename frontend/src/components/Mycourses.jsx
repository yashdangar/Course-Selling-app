import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Outlet } from "react-router-dom";

function Mycourses() {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // State for error handling
  const [path, setPath] = useState("");

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/purchases",{
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // console.log(response.data.courseData); // Log fetched courses for debugging
      setCourses(response.data.courseData || []); // Update the state with courses
    } catch (error) {
      console.error("Error fetching courses", error);
      setError("Failed to fetch courses. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    const pathName = window.location.pathname; // Get the path, e.g. "/published"
    const lastSegment = pathName.split("/").pop(); // Get the last segment "published"
    setPath(lastSegment);
    getCourse();
  }, []);

  return (
    <div className="flex gap-2 p-2.5 flex-wrap">
      {error && <div className="text-red-500">{error}</div>} {/* Show error message */}
      {courses.length > 0 ? (
        courses.map((c) => (
          <div key={c._id} onClick={() => console.log(c._id)}>
            <Card
              title={c.title}
              price={c.price}
              imageUrl={c.imageUrl}
              description={c.description}
              courseId={c._id}
              path = {path}
            />
          </div>
        ))
      ) : (
        <div className="text-gray-500">No courses found.</div> // Message when no courses are available
      )}
      {/* Uncomment if you want to render nested routes */}
      {/* <Outlet /> */}
    </div>
  );
}

export default Mycourses;
