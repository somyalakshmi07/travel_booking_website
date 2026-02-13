import React from "react";

function MyTrip() {
  const trips = JSON.parse(localStorage.getItem("myTrips")) || [];

  return (
    <div>
      <h2>My Trips</h2>

      {trips.length === 0 ? (
        <p>No Bookings Yet</p>
      ) : (
        trips.map((trip, index) => (
          <div key={index} style={cardStyle}>
            <h3>{trip.type.toUpperCase()}</h3>
            <p>{trip.name || trip.airline}</p>
            <p>₹{trip.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid gray",
  padding: "15px",
  margin: "10px",
  borderRadius: "8px"
};

export default MyTrip;
