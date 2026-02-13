import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function navbar() {
  return (
    <nav className="navbar">
      <div className="logo">TravelEase ✈</div>

      <div className="nav-links">
        <NavLink to="/tripplanner" className="nav-item">
          Trip Planner
        </NavLink>

        <NavLink to="/payment" className="nav-item">
          Payment
        </NavLink>

        <NavLink to="/mytrip" className="nav-item">
          My Trips
        </NavLink>
      </div>
    </nav>
  );
}

export default navbar;
