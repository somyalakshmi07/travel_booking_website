import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Payment from "./pages/payment";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Flights from "./pages/flights";
import Hotels from "./pages/hotels";
import MyTrips from "./pages/mytrip";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:name" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
      {/* Navbar will appear on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/mytrip" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
