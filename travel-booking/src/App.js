import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import TripPlanner from "./pages/tripplanner";
import Payment from "./pages/payment";
import MyTrips from "./pages/mytrip";
import Flights from "./pages/flights";
import Hotels from "./pages/hotels";

import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar should be OUTSIDE Routes */}
      <Navbar />

      <Routes>
        {/* Default Page */}
        <Route path="/" element={<Flights />} />

        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/tripplanner" element={<TripPlanner />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mytrip" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
