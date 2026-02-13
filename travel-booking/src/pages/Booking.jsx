import React, { useState, useEffect } from "react";

function Booking() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("selectedTrips")) || [];
    setTrips(stored);
  }, []);

  const removeTrip = (index) => {
    const updated = trips.filter((_, i) => i !== index);
    setTrips(updated);
    localStorage.setItem("selectedTrips", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>My Trip</h1>

      {trips.length === 0 ? (
        <p>No Packages Selected</p>
      ) : (
        <div className="grid">
          {trips.map((trip, index) => (
            <div key={index} className="card">
              <h3>{trip.title}</h3>
              <p>{trip.duration}</p>
              <p>₹{trip.price}</p>
              <button onClick={() => removeTrip(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Booking;