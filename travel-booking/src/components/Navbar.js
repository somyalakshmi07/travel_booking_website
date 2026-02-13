import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Travel Explorer</h2>
      <div>
        <Link to="/">Destinations</Link>
      </div>
    </div>
  );
}

export default Navbar;
