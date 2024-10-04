import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Published() {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [path, setPath] = useState("");

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/creation", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses", error);
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
      {courses.length > 0 &&
        courses.map((c) => (
          <div key={c._id} onClick={() => console.log(c._id)}>
            <Card
              key={c._id}
              title={c.title}
              price={c.price}
              imageUrl={c.imageUrl}
              courseId={c._id}
              description={c.description}
              path={path}
            />
          </div>
        ))}
    </div>
  );
}

export default Published;
