import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Offers from "./pages/offers";
import Support from "./pages/support";
import Flights from "./pages/flights";
import Hotels from "./pages/hotels";
import TripPlanner from "./pages/tripplanner";
import Payment from "./pages/payment";
import MyTrips from "./pages/mytrip";

import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Main Features */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/tripplanner" element={<TripPlanner />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mytrip" element={<MyTrips />} />

        {/* Additional Pages */}
        <Route path="/offers" element={<Offers />} />
        <Route path="/support" element={<Support />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
