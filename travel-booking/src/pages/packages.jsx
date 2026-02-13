import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { packages } from "../data/packages";

function Packages() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selectedTrips")) || []
  );

  const filteredPackages = name
    ? packages.filter(pkg => pkg.destination === name)
    : packages;

  const handleAddToTrip = (pkg) => {
    const exists = selected.find(item => item.id === pkg.id);
    if (exists) return; // prevent duplicate

    const updated = [...selected, pkg];
    setSelected(updated);
    localStorage.setItem("selectedTrips", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>{name ? `${name} Packages` : "All Packages"}</h1>

      <div className="grid">
        {filteredPackages.map(pkg => (
          <div key={pkg.id} className="card">
            <h3>{pkg.title}</h3>
            <p>{pkg.duration}</p>
            <p>{pkg.includes}</p>
            <p>₹{pkg.price}</p>

            <button onClick={() => handleAddToTrip(pkg)}>
              Add to Trip
            </button>
          </div>
        ))}
      </div>

      {/* Only navigation button */}
      {selected.length > 0 && (
        <button
          className="book-btn"
          style={{ marginTop: "30px" }}
          onClick={() => navigate("/mytrip")}
        >
          Go To My Trip
        </button>
      )}
    </div>
  );
}

export default Packages;
