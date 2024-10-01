import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Payment() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/course/detail",
        {
            params: {
              courseId: id, 
            }
          }
      );
      setTitle(response.data.courses.title);
      setPrice(response.data.courses.price);
    } catch (e) {
      console.log(e);
    }
  };


  const makePayment = async ()=>{
    try{
        const response = await axios.post("http://localhost:3000/course/purchase",{
            courseId: id
          },{
            headers : {
              token : localStorage.getItem("token")
            }
          })
        console.log(response.data)
          if(response.data.message === "Purchase successful"){
                alert("Purchase successful");
                navigate(-1);
          }
    }catch(e){
        alert("Error: " + e.message);
    }
      
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className=" absolute w-[100%] h-[100%] bg-[rgba(0,0,0,.6)] z-[10] top-0 left-0">
      <div className="p-5 border-2 border-black absolute bg-white z-[10] top-[20%] left-[30%] w-[40%] h-[65%] flex items-center justify-center rounded-md">
        <div className="border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900">
            Payment Information
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 ">
                Course Title
              </label>
              <div className="">
                <input
                  type="text"
                  value={title}
                  readOnly
                  name="course-title"
                  id="course-title"
                  className="block w-full rounded-md border-0 py-1.5 bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="">
                <input
                  type="number"
                  value={price}
                  readOnly
                  name="city"
                  id="city"
                  className="block w-full rounded-md border-0 bg-gray-200 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
              onClick={() => makePayment()}
            >
              Make Payment
            </button>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 ml-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
