import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Admin from "./admin/admin";
import Home from "./home/home";
import AddTrain from "./admin/addTrain";
import UpdateTrain from "./admin/UpdateTrain";
import Booking from "./booking/booking";
import './css/body.css';
import './css/login.css';

import trainLogo from "./assets/train-logo.png"; 
function App() {
  const handleClick = () => {
    window.location.href = "/home";
  };

  return (
    <Router>
      <header>
        <button onClick={handleClick} className="logo">
          <img src={trainLogo} alt="Train Logo" className="logo" />
        </button>
      </header>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addTrain" element={<AddTrain />} />
          <Route path="/updateTrain" element={<UpdateTrain />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
