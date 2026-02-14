import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mytrip.css";

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // ✅ Load trips
  useEffect(() => {
    const savedTrips =
      JSON.parse(localStorage.getItem("selectedTrips")) || [];
    setTrips(savedTrips);
    calculateTotal(savedTrips);
  }, []);

  // ✅ Calculate total (Exclude Cancelled)
  const calculateTotal = (tripData) => {
  const total = tripData
    .filter(
      (trip) =>
        trip.status !== "Cancelled" &&
        trip.status !== "Confirmed" // 🔥 EXCLUDE confirmed trips
    )
    .reduce(
      (sum, trip) => sum + (trip.totalWithTax || trip.total || 0),
      0
    );

  setTotalAmount(total);
};
  // ✅ Cancel Trip
  const cancelTrip = (index) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updatedTrips = trips.map((trip, i) =>
        i === index ? { ...trip, status: "Cancelled" } : trip
      );

      setTrips(updatedTrips);
      localStorage.setItem("selectedTrips", JSON.stringify(updatedTrips));

      calculateTotal(updatedTrips);
    }
  };

  const clearAllTrips = () => {
  if (window.confirm("Do you want to clear all trips?")) {

    // 🔥 Remove from localStorage
    localStorage.removeItem("selectedTrips");
    localStorage.removeItem("completedTrips");
    localStorage.removeItem("paymentTrips");
    localStorage.removeItem("paymentTotal");

    // 🔥 Reset state
    setTrips([]);
    setTotalAmount(0);

    alert("All trips cleared successfully!");
  }
};

  // ✅ Download Invoice
  const downloadInvoice = (trip) => {
    const invoiceContent = `
INVOICE
---------------------------------------
Booking ID: ${trip.bookingId}
Booking Date: ${trip.bookingDate}
Status: ${trip.status}
Package: ${trip.title}
Duration: ${trip.duration}
Amount: ₹${trip.totalWithTax || trip.total}
---------------------------------------
Thank you for booking with Travel Explorer!
`;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${trip.bookingId}.txt`;
    a.click();
  };

  // ✅ Proceed To Payment (FIXED)
  const proceedToPayment = () => {
    if (totalAmount === 0) {
      alert("No active trips to pay for.");
      return;
    }

    // 🔥 Send total to payment page
    localStorage.setItem("paymentTotal", totalAmount);

    // Optional: send active trips also
    const activeTrips = trips.filter(
      (trip) => trip.status !== "Cancelled"
    );
    localStorage.setItem(
      "paymentTrips",
      JSON.stringify(activeTrips)
    );

    navigate("/payment");
  };

  return (
    <div className="mytrip-wrapper" style={{ padding: "20px" }}>
      <h1 style={{ color: "#008585" }}>My Trips</h1>

      {trips.length === 0 ? (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#74a892" }}>No Trips Added</h2>
          <button
            onClick={() => navigate("/packages")}
            style={{
              padding: "10px 20px",
              background: "#008585",
              color: "#fbf2c4",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Browse Packages
          </button>
        </div>
      ) : (
        <>
          <div
            className="trips-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {trips.map((trip, index) => (
              <div
                key={index}
                style={{
                  background: "#fbf2c4",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  opacity: trip.status === "Cancelled" ? 0.6 : 1,
                }}
              >
                <h3 style={{ color: "#008585" }}>{trip.title}</h3>
                <p>Duration: {trip.duration}</p>
                <p>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        trip.status === "Cancelled"
                          ? "#d32f2f"
                          : "#008585",
                      fontWeight: "bold",
                    }}
                  >
                    {trip.status || "Confirmed"}
                  </span>
                </p>
                <p>
                  Amount: ₹{trip.totalWithTax || trip.total}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => setSelectedTrip(trip)}
                    style={{
                      marginRight: "8px",
                      padding: "6px 10px",
                      border: "1px solid #008585",
                      color: "#008585",
                      background: "transparent",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => downloadInvoice(trip)}
                    style={{
                      marginRight: "8px",
                      padding: "6px 10px",
                      border: "1px solid #008585",
                      color: "#008585",
                      background: "transparent",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Invoice
                  </button>
                  

                  {trip.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelTrip(index)}
                      style={{
                        padding: "6px 10px",
                        background: "#ffebee",
                        color: "#d32f2f",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total Section */}
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ color: "#008585" }}>
              Total Amount: ₹{totalAmount.toLocaleString()}
            </h2>

            <button
              onClick={proceedToPayment}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                background: totalAmount === 0 ? "#74a892" : "#008585",
                color: "#fbf2c4",
                border: "none",
                borderRadius: "6px",
                cursor:
                  totalAmount === 0 ? "not-allowed" : "pointer",
              }}
              disabled={totalAmount === 0}
            >
              Proceed to Payment
            </button>
            <button
  onClick={clearAllTrips}
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Clear All Trips
</button>
          </div>
        </>
      )}

      {/* ✅ Modal */}
      {selectedTrip && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedTrip(null)}
        >
          <div
            style={{
              background: "#fbf2c4",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#008585" }}>Trip Details</h2>
            <p>Booking ID: {selectedTrip.bookingId}</p>
            <p>Date: {selectedTrip.bookingDate}</p>
            <p>Status: {selectedTrip.status}</p>
            <p>Package: {selectedTrip.title}</p>
            <p>Duration: {selectedTrip.duration}</p>
            <p>
              Amount: ₹
              {selectedTrip.totalWithTax ||
                selectedTrip.total}
            </p>

            <button
              onClick={() => setSelectedTrip(null)}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                background: "#008585",
                color: "#fbf2c4",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
