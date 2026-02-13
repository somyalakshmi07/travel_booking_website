import React, { useState } from "react";
import hotelsData from "../data/hotel";

function Hotels() {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);

  const searchHotels = () => {
    const filtered = hotelsData.filter(
      (h) => h.city.toLowerCase() === city.toLowerCase()
    );
    setResults(filtered);
  };

  const bookHotel = (hotel) => {
    let trips = JSON.parse(localStorage.getItem("myTrips")) || [];
    trips.push({ type: "hotel", ...hotel });
    localStorage.setItem("myTrips", JSON.stringify(trips));
    alert("Hotel Booked Successfully!");
  };

  return (
    <div className="container">
      <h2 className="page-title">🏨 Hotel Booking</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Destination"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="search-btn" onClick={searchHotels}>
          Search Hotels
        </button>
      </div>

      {results.length === 0 ? (
        <p className="no-results">No Hotels Found</p>
      ) : (
        <div className="results-grid">
          {results.map((hotel) => (
            <div key={hotel.id} className="result-card">

              {/* ✅ IMAGE ADDED HERE */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="hotel-img"
              />

              <h3>{hotel.name}</h3>
              <p>📍 {hotel.city}</p>
              <p>⭐ {hotel.rating} Star</p>
              <p>💰 ₹{hotel.price}</p>

              <button
                className="book-btn"
                onClick={() => bookHotel(hotel)}
              >
                Book Now
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
