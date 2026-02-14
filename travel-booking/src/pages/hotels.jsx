import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hotelsData from "../data/hotel";

function Hotels() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = hotelsData.filter(
      (hotel) =>
        hotel.city.toLowerCase() === location.toLowerCase()
    );
    setResults(filtered);
  };

  const bookHotel = (hotel) => {
    const existingTrip = JSON.parse(localStorage.getItem("currentTrip")) || {};

    const updatedTrip = {
      ...existingTrip,
      hotel: hotel,
      travelers: existingTrip.travelers || 1,
      total: (existingTrip.flight?.price || 0) + hotel.price,
      discount: 0,
      finalTotal: (existingTrip.flight?.price || 0) + hotel.price
    };

    localStorage.setItem("currentTrip", JSON.stringify(updatedTrip));
    navigate("/payment");
  };

  return (
    <div className="container">
      <h2 className="page-title">🏨 Hotel Booking</h2>

      {/* Search Section */}
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search Hotels
        </button>
      </div>

      {/* 🔥 SHOW 4 IMAGES WHEN NO SEARCH */}
      {results.length === 0 && location === "" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "40px"
        }}>
          {hotelsData.slice(0, 4).map((hotel) => (
            <div key={hotel.id} style={{
              background: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
            }}>
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />
              <div style={{ padding: "15px" }}>
                <h4>{hotel.name}</h4>
                <p>{hotel.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="results-container">
          {results.map((hotel) => (
            <div key={hotel.id} className="flight-card">
              <div className="flight-image">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="flight-img"
                />
              </div>

              <div className="flight-details">
                <h3>{hotel.name}</h3>
                <p><b>City:</b> {hotel.city}</p>
                <p><b>Rating:</b> {hotel.rating} Star</p>
                <p><b>Price: ₹</b>{hotel.price}</p>

                <div className="flight-buttons">
                  <button
                    className="book-btn"
                    onClick={() => bookHotel(hotel)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && location !== "" && (
        <p className="no-results">No Hotels Found</p>
      )}
    </div>
  );
}

export default Hotels;
