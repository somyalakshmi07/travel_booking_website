import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hotelsData from "../data/hotel"; // make sure this path is correct

function Hotels() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // 🔍 Search Hotels
  const handleSearch = () => {
    const filtered = hotelsData.filter(
      (hotel) =>
        hotel.city.toLowerCase() === location.toLowerCase()
    );

    setResults(filtered);
  };

  // 🏨 Book Hotel and Redirect to Payment
  const bookHotel = (hotel) => {

    // Get existing trip (if flight already selected)
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

    // Redirect to payment
    navigate("/payment");
  };

  return (
    <div className="container">
      <h2 className="page-title">🏨 Hotel Booking</h2>

      {/* 🔍 Search Section */}
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

      {/* 📋 Results Section */}
      {results.length === 0 ? (
        <p className="no-results">No Hotels Found</p>
      ) : (
        <div className="results-container">
          {results.map((hotel) => (
            <div key={hotel.id} className="flight-card">

              {/* LEFT SIDE IMAGE */}
              <div className="flight-image">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="flight-img"
                />
              </div>

              {/* RIGHT SIDE DETAILS */}
              <div className="flight-details">
                <h3>{hotel.name}</h3>
                <p><b>Location:</b> {hotel.location}</p>
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
    </div>
  );
}

export default Hotels;
