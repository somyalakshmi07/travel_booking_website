import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { packages } from "../data/packages";

function Packages() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const filteredPackages = name
    ? packages.filter(
        (pkg) =>
          pkg.destination.toLowerCase() ===
          decodeURIComponent(name).toLowerCase()
      )
    : packages;

  const toggleSelect = (pkg) => {
    const exists = selected.find((item) => item.id === pkg.id);

    if (exists) {
      setSelected(selected.filter((item) => item.id !== pkg.id));
    } else {
      setSelected([...selected, pkg]);
    }
  };

  const handleAddToTrip = () => {
    const existingTrips =
      JSON.parse(localStorage.getItem("selectedTrips")) || [];

    const newTrips = selected.map((pkg) => ({
      bookingId: "TB" + Date.now() + pkg.id,
      bookingDate: new Date().toLocaleDateString(),
      status: "Pending",
      title: pkg.title,
      duration: pkg.duration,
      total: pkg.price,
      totalWithTax: Math.round(pkg.price * 1.05),
    }));

    const updated = [...existingTrips, ...newTrips];

    localStorage.setItem("selectedTrips", JSON.stringify(updated));

    navigate("/mytrip");
  };

  return (
    <div className="page">
      <h1>
        {name
          ? `${decodeURIComponent(name)} Packages`
          : "All Packages"}
      </h1>

      <div className="grid">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="card">
            <h3>{pkg.title}</h3>
            <p>{pkg.duration}</p>
            <p>{pkg.includes}</p>
            <p>₹{pkg.price}</p>

            <button
              onClick={() => toggleSelect(pkg)}
              style={{
                background: selected.find((i) => i.id === pkg.id)
                  ? "#74a892"
                  : "#008585",
                color: "#fbf2c4",
                padding: "6px 10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {selected.find((i) => i.id === pkg.id)
                ? "Selected"
                : "Select"}
            </button>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button
          onClick={handleAddToTrip}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#008585",
            color: "#fbf2c4",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Selected to Trip
        </button>
      )}
    </div>
  );
}

export default Packages;
