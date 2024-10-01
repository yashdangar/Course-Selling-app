import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const addCourse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/course",
        {
          title,
          description,
          imageUrl: img,
          price,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if(response.data.message === "ONLYADMIN"){
        alert("Only admin can add courses");
        return;
      }
      navigate("/all");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="space-y-12 p-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Course Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add course details
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Course Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="course-title"
                  id="course-title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="course-description"
                  id="course-description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="image-url"
                  id="image-url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="city"
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 p-5">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={()=>navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => addCourse()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Addcourse;
