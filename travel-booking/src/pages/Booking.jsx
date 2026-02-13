import React, { useState, useEffect } from "react";

function Booking() {
  const [trips, setTrips] = useState([]);

  // ✅ Load trips (Always refresh from localStorage)
  const loadTrips = () => {
    const stored =
      JSON.parse(localStorage.getItem("selectedTrips")) || [];
    setTrips(stored);
  };

  useEffect(() => {
    loadTrips();

    // 🔥 Auto refresh when coming back from payment
    window.addEventListener("focus", loadTrips);

    return () => {
      window.removeEventListener("focus", loadTrips);
    };
  }, []);

  // ✅ Remove Trip (only if not confirmed)
  const removeTrip = (index) => {
    if (trips[index].status === "Confirmed") {
      alert("Confirmed trips cannot be removed.");
      return;
    }

    const updated = trips.filter((_, i) => i !== index);
    setTrips(updated);
    localStorage.setItem("selectedTrips", JSON.stringify(updated));
  };

  return (
    <div className="page" style={{ padding: "20px" }}>
      <h1 style={{ color: "#008585" }}>My Booking</h1>

      {trips.length === 0 ? (
        <p>No Packages Selected</p>
      ) : (
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {trips.map((trip, index) => (
            <div
              key={index}
              className="card"
              style={{
                background: "#fbf2c4",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: "#008585" }}>
                {trip.title}
              </h3>

              <p>Duration: {trip.duration}</p>

              <p>
                Status:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      trip.status === "Confirmed"
                        ? "#008585"
                        : trip.status === "Cancelled"
                        ? "#d32f2f"
                        : "#ff9800",
                  }}
                >
                  {trip.status || "Pending"}
                </span>
              </p>

              <p>
                ₹{trip.totalWithTax || trip.total || trip.price}
              </p>

              {trip.status !== "Confirmed" && (
                <button
                  onClick={() => removeTrip(index)}
                  style={{
                    marginTop: "8px",
                    padding: "6px 10px",
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Booking;
