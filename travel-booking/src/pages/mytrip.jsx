import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mytrip.css";

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [stats, setStats] = useState({
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("completedTrips")) || [];
    setTrips(savedTrips);
    calculateStats(savedTrips);
  }, []);

  const calculateStats = (tripData) => {
    const upcoming = tripData.filter(t => t.status === "Confirmed" || t.status === "Upcoming").length;
    const completed = tripData.filter(t => t.status === "Completed").length;
    const cancelled = tripData.filter(t => t.status === "Cancelled").length;
    const totalSpent = tripData
      .filter(t => t.status !== "Cancelled")
      .reduce((sum, t) => sum + (t.totalWithTax || t.total || 0), 0);
    
    setStats({ upcoming, completed, cancelled, totalSpent });
  };

  const cancelTrip = (index) => {
    if (window.confirm("Are you sure you want to cancel this booking? Cancellation charges may apply.")) {
      const updated = trips.map((trip, i) => 
        i === index ? { ...trip, status: "Cancelled" } : trip
      );
      localStorage.setItem("completedTrips", JSON.stringify(updated));
      setTrips(updated);
      calculateStats(updated);
    }
  };

  const downloadInvoice = (trip) => {
    // Simulate invoice download
    const invoiceContent = `
      INVOICE
      Booking ID: ${trip.bookingId}
      Date: ${trip.bookingDate}
      Total Amount: ₹${trip.totalWithTax || trip.total}
      Status: ${trip.status}
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${trip.bookingId}.txt`;
    a.click();
  };

  const getFilteredTrips = () => {
    if (filterStatus === "all") return trips;
    return trips.filter(trip => {
      if (filterStatus === "upcoming") return trip.status === "Confirmed" || trip.status === "Upcoming";
      return trip.status?.toLowerCase() === filterStatus.toLowerCase();
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Confirmed': { bg: '#e3f2fd', color: '#008585' },
      'Upcoming': { bg: '#fbf2c4', color: '#008585' },
      'Completed': { bg: '#74a892', color: '#fbf2c4' },
      'Cancelled': { bg: '#ffebee', color: '#d32f2f' }
    };
    return styles[status] || { bg: '#e0e0e0', color: '#666' };
  };

  return (
    <div className="mytrip-wrapper">
      <div className="mytrip-header" style={{ background: 'linear-gradient(135deg, #008585 0%, #74a892 100%)' }}>
        <h1 style={{ color: '#fbf2c4' }}>My Trips</h1>
        <p style={{ color: '#fbf2c4', opacity: '0.9' }}>Manage your bookings and travel history</p>
      </div>

      <div className="trip-stats">
        <div className="stat-card" style={{ background: '#fbf2c4' }}>
          <span className="stat-icon" style={{ background: '#008585', color: '#fbf2c4' }}>✈️</span>
          <div className="stat-info">
            <h3 style={{ color: '#008585' }}>{stats.upcoming}</h3>
            <p style={{ color: '#74a892' }}>Upcoming Trips</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#fbf2c4' }}>
          <span className="stat-icon" style={{ background: '#008585', color: '#fbf2c4' }}>📍</span>
          <div className="stat-info">
            <h3 style={{ color: '#008585' }}>{stats.completed}</h3>
            <p style={{ color: '#74a892' }}>Completed Trips</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#fbf2c4' }}>
          <span className="stat-icon" style={{ background: '#008585', color: '#fbf2c4' }}>💰</span>
          <div className="stat-info">
            <h3 style={{ color: '#008585' }}>₹{stats.totalSpent.toLocaleString()}</h3>
            <p style={{ color: '#74a892' }}>Total Spent</p>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
            style={filterStatus === "all" ? { background: '#008585', color: '#fbf2c4' } : {}}
          >
            All Trips ({trips.length})
          </button>
          <button 
            className={`filter-btn ${filterStatus === "upcoming" ? "active" : ""}`}
            onClick={() => setFilterStatus("upcoming")}
            style={filterStatus === "upcoming" ? { background: '#008585', color: '#fbf2c4' } : {}}
          >
            Upcoming ({stats.upcoming})
          </button>
          <button 
            className={`filter-btn ${filterStatus === "completed" ? "active" : ""}`}
            onClick={() => setFilterStatus("completed")}
            style={filterStatus === "completed" ? { background: '#008585', color: '#fbf2c4' } : {}}
          >
            Completed ({stats.completed})
          </button>
          <button 
            className={`filter-btn ${filterStatus === "cancelled" ? "active" : ""}`}
            onClick={() => setFilterStatus("cancelled")}
            style={filterStatus === "cancelled" ? { background: '#008585', color: '#fbf2c4' } : {}}
          >
            Cancelled ({stats.cancelled})
          </button>
        </div>
      </div>

      {getFilteredTrips().length === 0 ? (
        <div className="empty-state" style={{ background: '#fbf2c4' }}>
          <div className="empty-icon" style={{ color: '#008585' }}>🧳</div>
          <h2 style={{ color: '#008585' }}>No trips found</h2>
          <p style={{ color: '#74a892' }}>Ready for your next adventure?</p>
          <button onClick={() => navigate("/")} className="plan-trip-btn" style={{ background: '#008585', color: '#fbf2c4' }}>
            Plan a Trip Now
          </button>
        </div>
      ) : (
        <div className="trips-grid">
          {getFilteredTrips().map((trip, index) => {
            const statusStyle = getStatusBadge(trip.status);
            return (
              <div key={index} className="trip-card-enhanced" style={{ borderLeft: `4px solid ${trip.status === 'Cancelled' ? '#d32f2f' : '#008585'}` }}>
                <div className="trip-card-header">
                  <div className="booking-info">
                    <span className="booking-id" style={{ color: '#74a892' }}>Booking ID: {trip.bookingId}</span>
                    <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                      {trip.status || "Confirmed"}
                    </span>
                  </div>
                  <span className="booking-date" style={{ color: '#74a892' }}>{trip.bookingDate}</span>
                </div>

                <div className="trip-content">
                  <div className="trip-main-info">
                    <div className="service-item">
                      <div className="service-icon" style={{ background: '#fbf2c4', color: '#008585' }}>✈️</div>
                      <div className="service-details">
                        <h4 style={{ color: '#008585' }}>{trip.flight?.airline || 'Flight'}</h4>
                        <p style={{ color: '#74a892' }}>{trip.travelers || 1} Traveler(s) • Economy</p>
                      </div>
                    </div>

                    <div className="service-item">
                      <div className="service-icon" style={{ background: '#fbf2c4', color: '#008585' }}>🏨</div>
                      <div className="service-details">
                        <h4 style={{ color: '#008585' }}>{trip.hotel?.name || 'Hotel'}</h4>
                        <p style={{ color: '#74a892' }}>Check-in: 2:00 PM • Check-out: 11:00 AM</p>
                      </div>
                    </div>

                    {trip.activities?.length > 0 && (
                      <div className="service-item">
                        <div className="service-icon" style={{ background: '#fbf2c4', color: '#008585' }}>🎯</div>
                        <div className="service-details">
                          <h4 style={{ color: '#008585' }}>Activities</h4>
                          <p style={{ color: '#74a892' }}>{trip.activities.map(a => a.name).join(", ")}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="trip-price-info" style={{ borderLeft: `2px solid #74a892` }}>
                    <span className="price-label" style={{ color: '#74a892' }}>Total Amount</span>
                    <span className="price-value" style={{ color: '#008585' }}>₹{trip.totalWithTax || trip.total}</span>
                    <span className="payment-method" style={{ color: '#74a892' }}>Paid via {trip.paymentMethod || "Card"}</span>
                    {trip.taxAmount && (
                      <span className="tax-info" style={{ color: '#74a892', fontSize: '12px' }}>
                        Includes ₹{trip.taxAmount} taxes
                      </span>
                    )}
                  </div>
                </div>

                <div className="trip-card-footer">
                  <div className="action-buttons">
                    <button 
                      className="view-details-btn" 
                      onClick={() => setSelectedTrip(trip)}
                      style={{ border: '1px solid #008585', color: '#008585' }}
                    >
                      View Details
                    </button>
                    <button 
                      className="invoice-btn" 
                      onClick={() => downloadInvoice(trip)}
                      style={{ border: '1px solid #008585', color: '#008585' }}
                    >
                      Download Invoice
                    </button>
                    {trip.status !== "Cancelled" && trip.status !== "Completed" && (
                      <button 
                        className="cancel-btn" 
                        onClick={() => cancelTrip(index)}
                        style={{ background: '#ffebee', color: '#d32f2f', border: 'none' }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTrip && (
        <div className="trip-modal" onClick={() => setSelectedTrip(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: '#fbf2c4' }}>
            <button className="close-modal" onClick={() => setSelectedTrip(null)} style={{ color: '#008585' }}>×</button>
            <h2 style={{ color: '#008585' }}>Trip Details</h2>
            
            <div className="modal-details">
              <div className="detail-section">
                <h3 style={{ color: '#008585' }}>Booking Information</h3>
                <p><span style={{ color: '#74a892' }}>Booking ID:</span> {selectedTrip.bookingId}</p>
                <p><span style={{ color: '#74a892' }}>Booking Date:</span> {selectedTrip.bookingDate}</p>
                <p><span style={{ color: '#74a892' }}>Status:</span> {selectedTrip.status}</p>
              </div>
              
              <div className="detail-section">
                <h3 style={{ color: '#008585' }}>Flight Details</h3>
                <p><span style={{ color: '#74a892' }}>Airline:</span> {selectedTrip.flight?.airline}</p>
                <p><span style={{ color: '#74a892' }}>Route:</span> {selectedTrip.flight?.from} → {selectedTrip.flight?.to}</p>
                <p><span style={{ color: '#74a892' }}>Departure:</span> {selectedTrip.flight?.departure}</p>
                <p><span style={{ color: '#74a892' }}>Arrival:</span> {selectedTrip.flight?.arrival}</p>
              </div>
              
              <div className="detail-section">
                <h3 style={{ color: '#008585' }}>Hotel Details</h3>
                <p><span style={{ color: '#74a892' }}>Hotel:</span> {selectedTrip.hotel?.name}</p>
                <p><span style={{ color: '#74a892' }}>Location:</span> {selectedTrip.hotel?.location}</p>
              </div>
              
              <div className="detail-section">
                <h3 style={{ color: '#008585' }}>Payment Information</h3>
                <p><span style={{ color: '#74a892' }}>Amount:</span> ₹{selectedTrip.totalWithTax || selectedTrip.total}</p>
                <p><span style={{ color: '#74a892' }}>Payment ID:</span> {selectedTrip.paymentId}</p>
                <p><span style={{ color: '#74a892' }}>Payment Method:</span> {selectedTrip.paymentMethod}</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button onClick={() => downloadInvoice(selectedTrip)} style={{ background: '#008585', color: '#fbf2c4' }}>
                Download Invoice
              </button>
              <button onClick={() => setSelectedTrip(null)} style={{ border: '1px solid #008585', color: '#008585', background: 'transparent' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;