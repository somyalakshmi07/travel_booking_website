import React, { useState } from "react";
import flightsData from "../data/flights";

function Flights({ onSelectFlight }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);

  // 🔎 Search Flights
  const handleSearch = () => {
    const filtered = flightsData.filter(
      (f) =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );

    setResults(filtered);
  };

  // ✅ Select Flight (Send to App.js)
  const selectFlight = (flight) => {
    if (onSelectFlight) {
      onSelectFlight(flight);
    }

    alert("Flight Selected Successfully!");
  };

  // 💾 Optional: Save directly to MyTrips
  const bookFlight = (flight) => {
    let trips = JSON.parse(localStorage.getItem("myTrips")) || [];
    trips.push({ type: "flight", ...flight });
    localStorage.setItem("myTrips", JSON.stringify(trips));

    alert("Flight Booked Successfully!");
  };

  return (
    <div className="container">
      <h2 className="page-title">✈ Flight Booking</h2>

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
        <div className="results-grid">
          {results.map((flight) => (
            <div key={flight.id} className="result-card">

              {/* 🖼 Flight Image */}
              <img
                src={flight.image}
                alt={flight.airline}
                className="flight-img"
              />

              <h3>{flight.airline}</h3>
              <p>
                {flight.from} → {flight.to}
              </p>
              <p>🕒 {flight.time}</p>
              <p>💰 ₹{flight.price}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  className="book-btn"
                  onClick={() => selectFlight(flight)}
                  style={{ marginRight: "10px" }}
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Flights;
