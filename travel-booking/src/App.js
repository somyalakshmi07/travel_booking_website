import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Payment from "./pages/payment";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:name" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
