import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#6366F1] flex align-center justify-between gap-[1vw] p-[1vw]">
      <div className="flex gap-[2vw]">
        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/all")}
        >
          All courses
        </button>
        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/my")}
        >
          My courses
        </button> 
        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/add")}
        >
          Add Course
        </button>
        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/published")}
        >
          My Published Courses
        </button>
      </div>

      <div className="flex gap-[2vw]">
        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>

        <button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
