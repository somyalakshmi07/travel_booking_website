import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>TravelBook</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/mytrip">My Trip</Link>
        <Link to="/support">Support</Link>
      </div>
    </div>
  );
}

export default Navbar;
