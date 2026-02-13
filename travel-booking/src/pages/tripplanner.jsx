import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tripplanner.css";

// Import components from friends
import FlightSelection from "./flight";
import HotelSelection from "./hotel";

const activitiesData = [
  { id: 1, name: "Scuba Diving", location: "Grande Island", price: 2000, duration: "3h", rating: 4.7, image: "🤿", type: "Adventure" },
  { id: 2, name: "Island Cruise", location: "Dudhsagar", price: 1500, duration: "2h", rating: 4.5, image: "🛥️", type: "Leisure" },
  { id: 3, name: "Parasailing", location: "Calangute", price: 1800, duration: "30min", rating: 4.6, image: "🪂", type: "Adventure" },
  { id: 4, name: "Dolphin Safari", location: "Palolem", price: 1200, duration: "2h", rating: 4.4, image: "🐬", type: "Wildlife" },
  { id: 5, name: "Sunset Kayaking", location: "Mandovi River", price: 900, duration: "1.5h", rating: 4.8, image: "🛶", type: "Leisure" },
];

const offersData = [
  {
    id: 1,
    title: "SUMMER20",
    description: "Flat 20% OFF on Summer Trips",
    badge: "Limited Time",
    color: "#008585"
  },
  {
    id: 2,
    title: "MMT10",
    description: "10% OFF on Domestic Flights",
    badge: "Flight Special",
    color: "#74a892"
  },
  {
    id: 3,
    title: "HOTEL15",
    description: "Save 15% on Hotel Bookings",
    badge: "Hotel Deal",
    color: "#008585"
  }
];

function TripPlanner() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [trip, setTrip] = useState({
    flight: null,
    hotel: null,
    activities: [],
    total: 0,
    discount: 0,
    finalTotal: 0,
    travelers: 1,
    date: new Date().toISOString().split('T')[0],
  });

  // Listen for flight selection from flights component
  useEffect(() => {
    const handleFlightSelected = (event) => {
      setTrip(prev => ({ ...prev, flight: event.detail }));
      setActiveStep(2);
    };

    window.addEventListener('flightSelected', handleFlightSelected);
    return () => window.removeEventListener('flightSelected', handleFlightSelected);
  }, []);

  // Listen for hotel selection from hotel component
  useEffect(() => {
    const handleHotelSelected = (event) => {
      setTrip(prev => ({ ...prev, hotel: event.detail }));
      setActiveStep(3);
    };

    window.addEventListener('hotelSelected', handleHotelSelected);
    return () => window.removeEventListener('hotelSelected', handleHotelSelected);
  }, []);

  // Dynamic price calculation with discounts
  useEffect(() => {
    let subtotal = 0;
    if (trip.flight) subtotal += trip.flight.price * trip.travelers;
    if (trip.hotel) subtotal += trip.hotel.price * trip.travelers;
    trip.activities.forEach((a) => subtotal += a.price * trip.travelers);
    
    // Calculate discount based on applied offers
    let discount = 0;
    appliedOffers.forEach(offer => {
      if (offer.id === 1) discount += subtotal * 0.2; // SUMMER20 - 20% off
      if (offer.id === 2 && trip.flight) discount += (trip.flight.price * trip.travelers) * 0.1; // MMT10 - 10% on flights
      if (offer.id === 3 && trip.hotel) discount += (trip.hotel.price * trip.travelers) * 0.15; // HOTEL15 - 15% on hotels
    });
    
    const finalTotal = subtotal - discount;
    
    setTrip((prev) => ({ 
      ...prev, 
      total: subtotal,
      discount,
      finalTotal
    }));
  }, [trip.flight, trip.hotel, trip.activities, trip.travelers, appliedOffers]);

  const toggleActivity = (activity) => {
    const exists = trip.activities.find((a) => a.id === activity.id);
    if (exists) {
      setTrip({ ...trip, activities: trip.activities.filter((a) => a.id !== activity.id) });
    } else {
      setTrip({ ...trip, activities: [...trip.activities, activity] });
    }
  };

  const applyOffer = (offer) => {
    if (!appliedOffers.find(o => o.id === offer.id)) {
      setAppliedOffers([...appliedOffers, offer]);
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.style.background = 'linear-gradient(135deg, #008585 0%, #74a892 100%)';
      toast.innerHTML = `
        <span style="color: #fbf2c4;">✓ ${offer.title} Applied Successfully!</span>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const removeOffer = (offerId) => {
    setAppliedOffers(appliedOffers.filter(o => o.id !== offerId));
  };

  const proceedToPayment = () => {
    if (!trip.flight || !trip.hotel) {
      alert("Please select both flight and hotel to proceed");
      return;
    }
    
    const tripData = {
      ...trip,
      bookingId: "TEMP" + Date.now(),
      timestamp: new Date().toISOString(),
      appliedOffers
    };
    
    localStorage.setItem("currentTrip", JSON.stringify(tripData));
    navigate("/payment");
  };

  const handleTravelersChange = (newCount) => {
    setTrip({ ...trip, travelers: Math.max(1, Math.min(9, newCount)) });
  };

  const clearSelection = (type) => {
    if (type === 'flight') {
      setTrip({ ...trip, flight: null });
      setActiveStep(1);
    } else if (type === 'hotel') {
      setTrip({ ...trip, hotel: null });
      setActiveStep(2);
    }
  };

  return (
    <div className="planner-wrapper">
      {/* Hero Section with TravelBook Branding */}
      <div className="planner-hero" style={{ background: 'linear-gradient(135deg, #008585 0%, #74a892 100%)' }}>
        <div className="hero-content">
          <h1 className="brand-title">TravelBook</h1>
          <p style={{ color: '#fbf2c4' }}>Your Journey, Our Passion – Unforgettable Travel Experiences</p>
        </div>
        
        {/* Exclusive Travel Deals - Styled like image */}
        <div className="exclusive-deals">
          <div className="deals-header">
            <h2 style={{ color: '#fbf2c4' }}>✨ Exclusive Travel Deals</h2>
            <span className="deals-badge">Limited Time Offers</span>
          </div>
          <div className="deals-grid">
            {offersData.map((offer) => (
              <div 
                key={offer.id} 
                className={`offer-card ${appliedOffers.find(o => o.id === offer.id) ? 'applied' : ''}`}
                style={{ 
                  background: appliedOffers.find(o => o.id === offer.id) 
                    ? 'linear-gradient(135deg, #fbf2c4 0%, #fff 100%)' 
                    : 'rgba(255, 255, 255, 0.95)'
                }}
              >
                <div className="offer-header">
                  <span className="offer-badge" style={{ background: offer.color, color: '#fbf2c4' }}>
                    {offer.badge}
                  </span>
                  {appliedOffers.find(o => o.id === offer.id) && (
                    <span className="applied-badge">✓ Applied</span>
                  )}
                </div>
                <h3 style={{ color: '#008585' }}>{offer.title}</h3>
                <p style={{ color: '#74a892' }}>{offer.description}</p>
                {appliedOffers.find(o => o.id === offer.id) ? (
                  <button 
                    className="remove-offer-btn"
                    onClick={() => removeOffer(offer.id)}
                    style={{ background: '#ff4444', color: 'white' }}
                  >
                    Remove Offer
                  </button>
                ) : (
                  <button 
                    className="apply-offer-btn"
                    onClick={() => applyOffer(offer)}
                    style={{ background: '#008585', color: '#fbf2c4' }}
                  >
                    Apply Offer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Booking Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-icon">✈️</span>
            <div>
              <h4>500+</h4>
              <p>Flights Daily</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏨</span>
            <div>
              <h4>1000+</h4>
              <p>Hotels</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <div>
              <h4>50+</h4>
              <p>Activities</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏷️</span>
            <div>
              <h4>{appliedOffers.length}</h4>
              <p>Offers Applied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="booking-progress">
        <div className={`progress-step ${activeStep >= 1 ? 'active' : ''} ${trip.flight ? 'completed' : ''}`}>
          <div className="step-indicator">
            <span className="step-number">1</span>
            {trip.flight && <span className="step-check">✓</span>}
          </div>
          <div className="step-content">
            <h4>Select Flight</h4>
            {trip.flight ? (
              <div className="step-selection">
                <span>{trip.flight.airline || trip.flight.name}</span>
                <button onClick={() => clearSelection('flight')} className="change-btn">Change</button>
              </div>
            ) : (
              <p>Choose your flight</p>
            )}
          </div>
        </div>

        <div className={`progress-step ${activeStep >= 2 ? 'active' : ''} ${trip.hotel ? 'completed' : ''}`}>
          <div className="step-indicator">
            <span className="step-number">2</span>
            {trip.hotel && <span className="step-check">✓</span>}
          </div>
          <div className="step-content">
            <h4>Select Hotel</h4>
            {trip.hotel ? (
              <div className="step-selection">
                <span>{trip.hotel.name}</span>
                <button onClick={() => clearSelection('hotel')} className="change-btn">Change</button>
              </div>
            ) : (
              <p>Choose your stay</p>
            )}
          </div>
        </div>

        <div className={`progress-step ${activeStep >= 3 ? 'active' : ''} ${trip.activities.length > 0 ? 'completed' : ''}`}>
          <div className="step-indicator">
            <span className="step-number">3</span>
            {trip.activities.length > 0 && <span className="step-check">✓</span>}
          </div>
          <div className="step-content">
            <h4>Add Activities</h4>
            <p>{trip.activities.length} activities selected</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="planner-grid">
        {/* Left Column - Service Selection */}
        <div className="service-selection-column">
          {/* Flight Selection Section */}
          <div className="selection-section" id="flight-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">✈️</span>
                Select Your Flight
              </h2>
              {trip.flight && (
                <span className="section-badge" style={{ background: '#008585', color: '#fbf2c4' }}>
                  ✓ Flight Selected
                </span>
              )}
            </div>
            <div className="section-content">
              <FlightSelection />
            </div>
          </div>

          {/* Hotel Selection Section */}
          <div className="selection-section" id="hotel-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">🏨</span>
                Select Your Hotel
              </h2>
              {trip.hotel && (
                <span className="section-badge" style={{ background: '#008585', color: '#fbf2c4' }}>
                  ✓ Hotel Selected
                </span>
              )}
            </div>
            <div className="section-content">
              <HotelSelection />
            </div>
          </div>

          {/* Activities Section */}
          <div className="selection-section" id="activities-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">🎯</span>
                Add Experiences
              </h2>
              <span className="section-count">{trip.activities.length} Selected</span>
            </div>
            <div className="activities-grid">
              {activitiesData.map((activity) => (
                <div
                  key={activity.id}
                  className={`activity-card ${trip.activities.find(a => a.id === activity.id) ? 'selected' : ''}`}
                  onClick={() => toggleActivity(activity)}
                  style={trip.activities.find(a => a.id === activity.id) ? { borderColor: '#008585', background: '#fbf2c4' } : {}}
                >
                  <div className="activity-icon">{activity.image}</div>
                  <div className="activity-info">
                    <h4>{activity.name}</h4>
                    <p className="activity-location">📍 {activity.location}</p>
                    <div className="activity-meta">
                      <span className="activity-duration">⏱️ {activity.duration}</span>
                      <span className="activity-rating">⭐ {activity.rating}</span>
                    </div>
                    <div className="activity-price">
                      <span className="price-amount">₹{activity.price}</span>
                      <span className="price-per">/person</span>
                    </div>
                  </div>
                  {trip.activities.find(a => a.id === activity.id) && (
                    <span className="selected-check" style={{ background: '#008585', color: '#fbf2c4' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className={`booking-summary-column ${!isSummaryOpen ? 'collapsed' : ''}`}>
          <button 
            className="summary-toggle"
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            style={{ background: '#008585', color: '#fbf2c4' }}
          >
            {isSummaryOpen ? '→' : '←'}
          </button>

          {isSummaryOpen && (
            <div className="summary-card" style={{ background: 'linear-gradient(135deg, #008585 0%, #74a892 100%)' }}>
              <h3 style={{ color: '#fbf2c4' }}>Your Booking Summary</h3>
              
              {/* Travelers Selection */}
              <div className="travelers-select">
                <label style={{ color: '#fbf2c4' }}>Travelers</label>
                <div className="traveler-controls">
                  <button 
                    onClick={() => handleTravelersChange(trip.travelers - 1)}
                    className="counter-btn"
                    disabled={trip.travelers <= 1}
                    style={{ borderColor: '#fbf2c4', color: '#fbf2c4' }}
                  >−</button>
                  <span style={{ color: '#fbf2c4', fontSize: '20px', fontWeight: 'bold' }}>
                    {trip.travelers}
                  </span>
                  <button 
                    onClick={() => handleTravelersChange(trip.travelers + 1)}
                    className="counter-btn"
                    disabled={trip.travelers >= 9}
                    style={{ borderColor: '#fbf2c4', color: '#fbf2c4' }}
                  >+</button>
                </div>
              </div>

              {/* Selected Items */}
              <div className="summary-items">
                <div className={`summary-item ${!trip.flight ? 'empty' : ''}`}>
                  <div className="item-header">
                    <span className="item-icon">✈️</span>
                    <span className="item-label">Flight</span>
                  </div>
                  {trip.flight ? (
                    <div className="item-details">
                      <p className="item-name">{trip.flight.airline || trip.flight.name}</p>
                      {trip.flight.from && trip.flight.to && (
                        <p className="item-route">{trip.flight.from} → {trip.flight.to}</p>
                      )}
                      <span className="item-price">₹{trip.flight.price * trip.travelers}</span>
                    </div>
                  ) : (
                    <p className="empty-message" style={{ color: '#fbf2c4' }}>No flight selected</p>
                  )}
                </div>

                <div className={`summary-item ${!trip.hotel ? 'empty' : ''}`}>
                  <div className="item-header">
                    <span className="item-icon">🏨</span>
                    <span className="item-label">Hotel</span>
                  </div>
                  {trip.hotel ? (
                    <div className="item-details">
                      <p className="item-name">{trip.hotel.name}</p>
                      {trip.hotel.location && (
                        <p className="item-location">{trip.hotel.location}</p>
                      )}
                      <span className="item-price">₹{trip.hotel.price * trip.travelers}</span>
                    </div>
                  ) : (
                    <p className="empty-message" style={{ color: '#fbf2c4' }}>No hotel selected</p>
                  )}
                </div>

                <div className={`summary-item ${trip.activities.length === 0 ? 'empty' : ''}`}>
                  <div className="item-header">
                    <span className="item-icon">🎯</span>
                    <span className="item-label">Activities</span>
                    {trip.activities.length > 0 && (
                      <span className="item-count">{trip.activities.length}</span>
                    )}
                  </div>
                  {trip.activities.length > 0 ? (
                    <div className="item-details">
                      {trip.activities.slice(0, 2).map((activity) => (
                        <p key={activity.id} className="activity-name">
                          {activity.name} - ₹{activity.price * trip.travelers}
                        </p>
                      ))}
                      {trip.activities.length > 2 && (
                        <p className="more-activities">+{trip.activities.length - 2} more</p>
                      )}
                    </div>
                  ) : (
                    <p className="empty-message" style={{ color: '#fbf2c4' }}>No activities selected</p>
                  )}
                </div>

                {/* Applied Offers Summary */}
                {appliedOffers.length > 0 && (
                  <div className="summary-item offers-applied">
                    <div className="item-header">
                      <span className="item-icon">🏷️</span>
                      <span className="item-label">Offers Applied</span>
                      <span className="item-count">{appliedOffers.length}</span>
                    </div>
                    <div className="offers-list">
                      {appliedOffers.map(offer => (
                        <div key={offer.id} className="offer-tag">
                          <span>{offer.title}</span>
                          <button onClick={() => removeOffer(offer.id)}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown with Discounts */}
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span style={{ color: '#fbf2c4' }}>Subtotal</span>
                  <span style={{ color: '#fbf2c4' }}>₹{trip.total}</span>
                </div>
                
                {trip.discount > 0 && (
                  <div className="breakdown-row discount">
                    <span style={{ color: '#fbf2c4' }}>Total Discount</span>
                    <span style={{ color: '#fbf2c4', fontWeight: 'bold' }}>- ₹{trip.discount}</span>
                  </div>
                )}
                
                <div className="breakdown-row">
                  <span style={{ color: '#fbf2c4' }}>Taxes & Fees</span>
                  <span style={{ color: '#fbf2c4' }}>₹{Math.round(trip.finalTotal * 0.12)}</span>
                </div>
                
                <div className="breakdown-row total">
                  <span style={{ color: '#fbf2c4', fontWeight: 'bold' }}>Final Total</span>
                  <div className="total-amount">
                    {trip.discount > 0 && (
                      <span className="original-price">₹{trip.total + Math.round(trip.total * 0.12)}</span>
                    )}
                    <span style={{ color: '#fbf2c4', fontSize: '24px', fontWeight: 'bold' }}>
                      ₹{trip.finalTotal + Math.round(trip.finalTotal * 0.12)}
                    </span>
                  </div>
                </div>
              </div>

              {/* You Save Badge */}
              {trip.discount > 0 && (
                <div className="save-badge" style={{ background: '#fbf2c4', color: '#008585' }}>
                  ✨ You save ₹{trip.discount} with {appliedOffers.length} offer(s)!
                </div>
              )}

              {/* CTA Button */}
              <button 
                className="proceed-btn"
                onClick={proceedToPayment}
                disabled={!trip.flight || !trip.hotel}
                style={{ 
                  background: !trip.flight || !trip.hotel ? '#ccc' : '#fbf2c4',
                  color: !trip.flight || !trip.hotel ? '#666' : '#008585',
                  cursor: !trip.flight || !trip.hotel ? 'not-allowed' : 'pointer'
                }}
              >
                {!trip.flight || !trip.hotel ? (
                  'Select Flight & Hotel to Continue'
                ) : (
                  <>
                    Proceed to Payment
                    <span className="btn-icon">→</span>
                  </>
                )}
              </button>

              {/* Secure Badge */}
              <div className="secure-badge">
                <span style={{ color: '#fbf2c4' }}>🔒 256-bit SSL Secure</span>
                <span style={{ color: '#fbf2c4', opacity: '0.9' }}>Your info is safe with us</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="quick-navigation">
        <button 
          className="nav-btn"
          onClick={() => document.getElementById('flight-section').scrollIntoView({ behavior: 'smooth' })}
          style={{ borderColor: '#008585', color: '#008585' }}
        >
          ✈️ Flights
        </button>
        <button 
          className="nav-btn"
          onClick={() => document.getElementById('hotel-section').scrollIntoView({ behavior: 'smooth' })}
          style={{ borderColor: '#008585', color: '#008585' }}
        >
          🏨 Hotels
        </button>
        <button 
          className="nav-btn"
          onClick={() => document.getElementById('activities-section').scrollIntoView({ behavior: 'smooth' })}
          style={{ borderColor: '#008585', color: '#008585' }}
        >
          🎯 Activities
        </button>
      </div>

      {/* Toast Container for Notifications */}
      <div className="toast-container"></div>
    </div>
  );
}

export default TripPlanner;