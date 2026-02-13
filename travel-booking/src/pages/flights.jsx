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

  // 💾 Save to LocalStorage
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
                <p><b>TIME:</b> {flight.time}</p>
                <p><b>PRICE:₹</b>{flight.price}</p>

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
