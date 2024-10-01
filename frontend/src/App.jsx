import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Temp from "./components/Temp";
import Allcourses from "./components/Allcourses";
import Addcourse from "./components/Addcourse";
import Mycourses from "./components/Mycourses";
import Card from "./components/Card";
import Published from "./components/Published";
import Payment from "./components/Payment";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/temp" element={<Temp />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/all" element={<Allcourses/>}>
             <Route path = "/all/:id/payment" element = {<Payment/>}></Route>
        </Route>
        <Route path="/my" element={<Mycourses/>}></Route>
        <Route path="/add" element={<Addcourse/>}></Route>
        <Route path="/card" element={<Card/>}></Route>
        <Route path = "/published" element = {<Published/>}></Route>
        

      </Routes>
    </>
  );
}

export default App;
