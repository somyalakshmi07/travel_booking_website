import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Chandu Travel ✈
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/hotels">Hotels</Link>
      </div>
    </nav>
  );
}

export default navbar;
