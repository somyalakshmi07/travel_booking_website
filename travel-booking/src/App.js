import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Packages from "./pages/packages";
import Booking from "./pages/Booking";

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
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Core Pages */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/mytrip" element={<MyTrips />} />

        {/* Feature Pages */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/tripplanner" element={<TripPlanner />} />
        <Route path="/payment" element={<Payment />} />

        {/* Additional Pages */}
        <Route path="/offers" element={<Offers />} />
        <Route path="/support" element={<Support />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
