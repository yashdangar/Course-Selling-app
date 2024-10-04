import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Allcourses() {
  const {role} = useSelector((state)=>state.role)
  const [courses, setCourses] = useState([]); // Initialize as an empty array

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:3000/course/preview");
      setCourses(response.data.courses); // Update the state with courses
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);
  
  return (
    <div className="flex gap-2 p-2.5 flex-wrap">
      {courses.map((c) => (
        <div key={c._id} onClick={()=>(console.log(c._id))}>
            <Card
          key={c._id}
          title={c.title}
          price={c.price}
          imageUrl = {c.imageUrl} 
          description={c.description}
          courseId = {c._id}
          path = {role}
        />
        </div>

        
      ))}
      <Outlet/>
    </div>
  );
}

export default Allcourses;
