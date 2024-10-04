import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer"; // Import logout action

function Navbar() {
  const { role } = useSelector((state) => state.role);
  const { isLoggedIn } = useSelector((state) => state.auth); // Select the logged in state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/signin"); // Redirect to signin page
  };

  return (
    <div className="w-full bg-[#6366F1] flex align-center justify-between gap-[1vw] p-[1vw]">
      <div className="flex gap-[2vw]">
        {isLoggedIn&&<button
          className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
          onClick={() => navigate("/all")}
        >
          All courses
        </button>}
        {isLoggedIn && role === "user" && (
          <button
            className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
            onClick={() => navigate("/my")}
          >
            My courses
          </button>
        )}
        {isLoggedIn &&role === "admin" && (
          <>
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
          </>
        )}
      </div>

      <div className="flex gap-[2vw]">
        {isLoggedIn ? ( // Conditional rendering based on login state
          <button
            className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
            <button
              className="text-white bg-zinc-950 hover:bg-zinc-800 rounded-full px-[2.5vw] py-[0.7vw] text-sm"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
