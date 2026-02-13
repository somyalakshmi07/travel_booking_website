import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hotelsData from "../data/hotel";

function Hotels({ onSelectHotel }) {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // ✅ ADD THIS

  // 🔎 Search Hotels
  const searchHotels = () => {
    const filtered = hotelsData.filter(
      (h) => h.city.toLowerCase() === city.toLowerCase()
    );
    setResults(filtered);
  };

  // ✅ Select Hotel (Send to App.js)
  const selectHotel = (hotel) => {
    if (onSelectHotel) {
      onSelectHotel(hotel);
    }
    alert("Hotel Selected Successfully!");
  };

  // 💾 Book Hotel → Redirect to Offers
  const bookHotel = (hotel) => {
  // overwrite previous booking
    localStorage.setItem(
      "myTrips",
      JSON.stringify([{ type: "hotel", ...hotel }])
    );

    // clear old coupon
    localStorage.removeItem("appliedCoupon");

    navigate("/offers");
  };


  return (
    <div className="container">
      <h2 className="page-title">🏨 Hotel Booking</h2>

      {/* 🔎 Search Section */}
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

      {/* 📋 Results Section */}
      {results.length === 0 ? (
        <p className="no-results">No Hotels Found</p>
      ) : (
        <div className="results-grid">
          {results.map((hotel) => (
            <div key={hotel.id} className="result-card">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="hotel-img"
              />

              <h3>{hotel.name}</h3>
              <p>📍 {hotel.city}</p>
              <p>⭐ {hotel.rating} Star</p>
              <p>💰 ₹{hotel.price}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  className="book-btn"
                  onClick={() => selectHotel(hotel)}
                  style={{ marginRight: "10px" }}
                >
                  Select Hotel
                </button>

                <button
                  className="book-btn"
                  onClick={() => bookHotel(hotel)}
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

export default Hotels;
