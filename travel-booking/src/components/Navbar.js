import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Travel Explorer</h2>
      <div>
        <Link to="/Destinations">Destinations</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/booking">My Trip</Link>
      </div>
    </div>
  );
}

export default Navbar;
