import React, { useState } from "react";
import flightsData from "../data/flights";
import { useNavigate } from "react-router-dom";

function Flights({ onSelectFlight }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = flightsData.filter(
      (f) =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );

    setResults(filtered);
  };

  const selectFlight = (flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight);
    }
    alert("Flight Selected Successfully!");
  };

  const bookFlight = (flight) => {
    const tripData = {
      flight: flight,
      hotel: null,
      travelers: 1,
      total: flight.price,
      discount: 0,
      finalTotal: flight.price
    };

    localStorage.setItem("currentTrip", JSON.stringify(tripData));
    navigate("/payment");
  };

  return (
    <div className="container">
      <h2 className="page-title">Flight Booking</h2>

      {/* Search Section */}
      <div className="form-section">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearch}>
          Search Flights
        </button>
      </div>

      {/* 🔥 SHOW 4 FLIGHTS WHEN PAGE LOADS */}
      {results.length === 0 && from === "" && to === "" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "40px"
          }}
        >
          {flightsData.slice(0, 4).map((flight) => (
            <div
              key={flight.id}
              style={{
                background: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={flight.image}
                alt={flight.airline}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />
              <div style={{ padding: "15px" }}>
                <h4>{flight.airline}</h4>
                <p>
                  {flight.from} → {flight.to}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="results-container">
          {results.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-image">
                <img
                  src={flight.image}
                  alt={flight.airline}
                  className="flight-img"
                />
              </div>

              <div className="flight-details">
                <h3>{flight.airline}</h3>
                <p className="route">
                  {flight.from} → {flight.to}
                </p>
                <p><strong>Departure Time:</strong> {flight.time}</p>
                <p><strong>Price:</strong> ₹{flight.price}</p>

                <div className="flight-buttons">
                  <button
                    className="book-btn"
                    onClick={() => selectFlight(flight)}
                  >
                    Select Flight
                  </button>

                  <button
                    className="book-btn"
                    onClick={() => bookFlight(flight)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && (from !== "" || to !== "") && (
        <p className="no-results">No Flights Found</p>
      )}
    </div>
  );
}

export default Flights;
