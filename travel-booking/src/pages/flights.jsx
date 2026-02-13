import React, { useState } from "react";
import flightsData from "../data/flights";
import { useNavigate } from "react-router-dom";

function Flights({ onSelectFlight }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();   // ✅ IMPORTANT LINE

  // 🔎 Search Flights
  const handleSearch = () => {
    const filtered = flightsData.filter(
      (f) =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );

    setResults(filtered);
  };

  // ✅ Select Flight (Optional – if using Trip Planner)
  const selectFlight = (flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight);
    }
    alert("Flight Selected Successfully!");
  };

  // 💳 Book Flight → Redirect to Payment
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

    navigate("/payment");   // ✅ Redirect works now
  };

  return (
    <div className="container">
      <h2 className="page-title">Flight Booking</h2>

      {/* 🔎 Search Section */}
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

      {/* 📋 Results Section */}
      {results.length === 0 ? (
        <p className="no-results">No Flights Found</p>
      ) : (
        <div className="results-container">
          {results.map((flight) => (
            <div key={flight.id} className="flight-card">

              {/* LEFT SIDE IMAGE */}
              <div className="flight-image">
                <img
                  src={flight.image}
                  alt={flight.airline}
                  className="flight-img"
                />
              </div>

              {/* RIGHT SIDE DETAILS */}
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
    </div>
  );
}

export default Flights;
