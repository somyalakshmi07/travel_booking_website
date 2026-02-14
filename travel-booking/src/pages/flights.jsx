import React, { useState } from "react";
import flightsData from "../data/flights";
import { useNavigate } from "react-router-dom";

function Flights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // 🔍 Search
  const handleSearch = () => {
    const filtered = flightsData.filter(
      (f) =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );
    setResults(filtered);
  };

  // ✅ Select Flight (just alert)
  const selectFlight = (flight) => {
    alert(`${flight.airline} selected successfully!`);
  };

  // 💳 Book Flight
  const bookFlight = (flight) => {
    const existingTrips =
      JSON.parse(localStorage.getItem("selectedTrips")) || [];

    const newTrip = {
      bookingId: "FL" + Date.now(),
      bookingDate: new Date().toLocaleDateString(),
      status: "Pending",
      title: `Flight - ${flight.airline}`,
      duration: `${flight.from} → ${flight.to}`,
      total: flight.price,
      totalWithTax: Math.round(flight.price * 1.05),
    };

    localStorage.setItem(
      "selectedTrips",
      JSON.stringify([...existingTrips, newTrip])
    );

    navigate("/mytrip");
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

      {/* 📋 Results */}
      {results.length === 0 ? (
        <p className="no-results">No Flights Found</p>
      ) : (
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
    </div>
  );
}

export default Flights;
