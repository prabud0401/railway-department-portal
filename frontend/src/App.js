import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/signup" element={<Signup />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
