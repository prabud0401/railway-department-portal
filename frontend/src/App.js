import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Admin from "./admin/admin";
import Home from "./home/home";
import AddTrain from "./admin/addTrain";
import UpdateTrain from "./admin/UpdateTrain";
import Booking from "./booking/booking";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="/home" element={<Home />} ></Route>
          <Route path="/admin" element={<Admin />} ></Route>
          <Route path="/addTrain" element={<AddTrain />} ></Route>
          <Route path="/updateTrain" element={<UpdateTrain />} ></Route>
          <Route path="/booking" element={<Booking />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
