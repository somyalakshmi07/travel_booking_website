import React from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

function Destinations() {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/packages/${name}`);
  };

  return (
    <div className="page">
      <h1>Destinations</h1>

      <div className="grid">
        {destinations.map(d => (
          <div
            key={d.id}
            className="card"
            onClick={() => handleClick(d.name)}
            style={{ cursor: "pointer" }}
          >
            <img src={d.image} alt={d.name} />
            <h3>{d.name}</h3>
            <p>{d.country}</p>
            <p>₹{d.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
