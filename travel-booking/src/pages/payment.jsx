import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payment.css";

function Payment() {
  const navigate = useNavigate();
  const trip = JSON.parse(localStorage.getItem("currentTrip"));
  const [method, setMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bank: "",
  });
  const [processing, setProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [saveCard, setSaveCard] = useState(false);

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const validatePayment = () => {
    if (method === "card") {
      const cardNumberClean = paymentDetails.cardNumber.replace(/\s/g, '');
      return cardNumberClean.length >= 16 &&
             paymentDetails.cardName.length >= 3 &&
             paymentDetails.expiry.length >= 5 &&
             paymentDetails.cvv.length >= 3;
    } else if (method === "upi") {
      return paymentDetails.upiId.includes("@");
    } else {
      return paymentDetails.bank !== "";
    }
  };

  const confirmPayment = () => {
    if (!validatePayment()) {
      alert("Please enter valid payment details");
      return;
    }

    setProcessing(true);
    setActiveStep(3);
    
    setTimeout(() => {
      const completedTrips = JSON.parse(localStorage.getItem("completedTrips")) || [];
      
      const taxAmount = Math.round(trip.finalTotal * 0.12);
      const totalWithTax = trip.finalTotal + taxAmount;
      
      completedTrips.push({
        ...trip,
        bookingId: "TB" + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase(),
        status: "Confirmed",
        paymentMethod: method.toUpperCase(),
        bookingDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        paymentId: "PAY" + Math.random().toString(36).substr(2, 12).toUpperCase(),
        totalWithTax,
        taxAmount,
        saveCardDetails: saveCard,
        offers: trip.appliedOffers
      });

      localStorage.setItem("completedTrips", JSON.stringify(completedTrips));
      localStorage.removeItem("currentTrip");
      
      setTimeout(() => {
        setProcessing(false);
        navigate("/mytrip");
      }, 1000);
    }, 2000);
  };

  const taxAmount = Math.round(trip?.finalTotal * 0.12) || 0;
  const totalWithTax = (trip?.finalTotal || 0) + taxAmount;

  return (
    <div className="payment-wrapper">
      <div className="payment-header" style={{ background: 'linear-gradient(135deg, #008585 0%, #74a892 100%)' }}>
        <h1 className="brand-title" style={{ fontSize: '2.5em' }}>TravelBook</h1>
        <p style={{ color: '#fbf2c4', opacity: '0.9' }}>Secure Checkout - Complete your booking</p>
      </div>

      <div className="checkout-steps">
        <div className={`step ${activeStep >= 1 ? "active" : ""}`}>
          <span className="step-number" style={activeStep >= 1 ? { background: '#008585', color: '#fbf2c4' } : {}}>1</span>
          <span className="step-label" style={{ color: activeStep >= 1 ? '#008585' : '#74a892' }}>Review Booking</span>
        </div>
        <div className={`step ${activeStep >= 2 ? "active" : ""}`}>
          <span className="step-number" style={activeStep >= 2 ? { background: '#008585', color: '#fbf2c4' } : {}}>2</span>
          <span className="step-label" style={{ color: activeStep >= 2 ? '#008585' : '#74a892' }}>Payment</span>
        </div>
        <div className={`step ${activeStep >= 3 ? "active" : ""}`}>
          <span className="step-number" style={activeStep >= 3 ? { background: '#008585', color: '#fbf2c4' } : {}}>3</span>
          <span className="step-label" style={{ color: activeStep >= 3 ? '#008585' : '#74a892' }}>Confirmation</span>
        </div>
      </div>

      <div className="checkout-container">
        <div className="booking-review" style={{ background: '#fbf2c4' }}>
          <h3 style={{ color: '#008585' }}>Booking Summary</h3>
          
          {/* Applied Offers Summary */}
          {trip?.appliedOffers?.length > 0 && (
            <div className="applied-offers-summary">
              <div className="offers-header">
                <span className="offers-icon">🏷️</span>
                <h4 style={{ color: '#008585' }}>Applied Offers</h4>
              </div>
              <div className="offers-list">
                {trip.appliedOffers.map((offer) => (
                  <div key={offer.id} className="offer-chip" style={{ background: '#008585', color: '#fbf2c4' }}>
                    {offer.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="booking-details">
            <div className="detail-item">
              <span className="icon" style={{ background: '#008585', color: '#fbf2c4' }}>✈️</span>
              <div className="detail-content">
                <h4 style={{ color: '#008585' }}>Flight</h4>
                <p style={{ color: '#74a892' }}>{trip?.flight?.airline} • {trip?.travelers} Traveler(s)</p>
                <span className="price" style={{ color: '#008585', fontWeight: 'bold' }}>₹{trip?.flight?.price * trip?.travelers}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="icon" style={{ background: '#008585', color: '#fbf2c4' }}>🏨</span>
              <div className="detail-content">
                <h4 style={{ color: '#008585' }}>Hotel</h4>
                <p style={{ color: '#74a892' }}>{trip?.hotel?.name} • {trip?.travelers} Traveler(s)</p>
                <span className="price" style={{ color: '#008585', fontWeight: 'bold' }}>₹{trip?.hotel?.price * trip?.travelers}</span>
              </div>
            </div>

            {trip?.activities?.length > 0 && (
              <div className="detail-item">
                <span className="icon" style={{ background: '#008585', color: '#fbf2c4' }}>🎯</span>
                <div className="detail-content">
                  <h4 style={{ color: '#008585' }}>Activities</h4>
                  {trip.activities.map(activity => (
                    <p key={activity.id} style={{ color: '#74a892' }}>{activity.name}</p>
                  ))}
                  <span className="price" style={{ color: '#008585', fontWeight: 'bold' }}>
                    ₹{trip.activities.reduce((sum, a) => sum + a.price * trip.travelers, 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="price-breakdown" style={{ borderTop: '2px solid #74a892' }}>
            <div className="breakdown-row">
              <span style={{ color: '#008585' }}>Subtotal</span>
              <span style={{ color: '#008585' }}>₹{trip?.total}</span>
            </div>
            
            {trip?.discount > 0 && (
              <div className="breakdown-row discount">
                <span style={{ color: '#008585' }}>Discount ({trip.appliedOffers?.length} offers)</span>
                <span style={{ color: '#008585', fontWeight: 'bold' }}>- ₹{trip?.discount}</span>
              </div>
            )}
            
            <div className="breakdown-row">
              <span style={{ color: '#74a892' }}>Taxes & Fees (12%)</span>
              <span style={{ color: '#74a892' }}>₹{taxAmount}</span>
            </div>
            
            <div className="breakdown-row total">
              <span style={{ color: '#008585', fontWeight: 'bold' }}>Final Total</span>
              <div style={{ textAlign: 'right' }}>
                {trip?.discount > 0 && (
                  <span style={{ color: '#74a892', fontSize: '14px', textDecoration: 'line-through', display: 'block' }}>
                    ₹{trip?.total + Math.round(trip?.total * 0.12)}
                  </span>
                )}
                <span style={{ color: '#008585', fontWeight: 'bold', fontSize: '22px' }}>₹{totalWithTax}</span>
              </div>
            </div>
            
            {trip?.discount > 0 && (
              <div className="save-message" style={{ background: '#008585', color: '#fbf2c4', padding: '12px', borderRadius: '12px', marginTop: '15px', textAlign: 'center' }}>
                ✨ You saved ₹{trip?.discount} with TravelBook offers!
              </div>
            )}
          </div>
        </div>

        <div className="payment-section" style={{ background: 'white' }}>
          <h3 style={{ color: '#008585' }}>Select Payment Method</h3>
          
          <div className="payment-methods">
            <button 
              className={`method-btn ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
              style={method === "card" ? { borderColor: '#008585', background: '#fbf2c4' } : {}}
            >
              <span className="method-icon">💳</span>
              <span style={{ color: '#008585' }}>Card</span>
            </button>
            
            <button 
              className={`method-btn ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
              style={method === "upi" ? { borderColor: '#008585', background: '#fbf2c4' } : {}}
            >
              <span className="method-icon">📱</span>
              <span style={{ color: '#008585' }}>UPI</span>
            </button>
            
            <button 
              className={`method-btn ${method === "netbanking" ? "active" : ""}`}
              onClick={() => setMethod("netbanking")}
              style={method === "netbanking" ? { borderColor: '#008585', background: '#fbf2c4' } : {}}
            >
              <span className="method-icon">🏦</span>
              <span style={{ color: '#008585' }}>Net Banking</span>
            </button>
          </div>

          <div className="payment-form">
            {method === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label style={{ color: '#008585' }}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'cardNumber',
                        value: formatCardNumber(e.target.value)
                      }
                    })}
                    style={{ borderColor: '#74a892' }}
                  />
                </div>
                
                <div className="form-group">
                  <label style={{ color: '#008585' }}>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={handleInputChange}
                    style={{ borderColor: '#74a892' }}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label style={{ color: '#008585' }}>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={paymentDetails.expiry}
                      onChange={handleInputChange}
                      style={{ borderColor: '#74a892' }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label style={{ color: '#008585' }}>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="123"
                      maxLength="3"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      style={{ borderColor: '#74a892' }}
                    />
                  </div>
                </div>

                <div className="save-card">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    style={{ accentColor: '#008585' }}
                  />
                  <label htmlFor="saveCard" style={{ color: '#74a892' }}>Save card for future payments</label>
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="upi-form">
                <div className="form-group">
                  <label style={{ color: '#008585' }}>UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="username@okhdfcbank"
                    value={paymentDetails.upiId}
                    onChange={handleInputChange}
                    style={{ borderColor: '#74a892' }}
                  />
                </div>
                <div className="upi-apps">
                  <span style={{ color: '#008585' }}>Popular UPI Apps:</span>
                  <div className="app-icons">
                    <span style={{ background: '#fbf2c4', color: '#008585' }}>📱 Google Pay</span>
                    <span style={{ background: '#fbf2c4', color: '#008585' }}>📱 PhonePe</span>
                    <span style={{ background: '#fbf2c4', color: '#008585' }}>📱 Paytm</span>
                  </div>
                </div>
              </div>
            )}

            {method === "netbanking" && (
              <div className="netbanking-form">
                <div className="form-group">
                  <label style={{ color: '#008585' }}>Select Bank</label>
                  <select 
                    name="bank"
                    value={paymentDetails.bank}
                    onChange={handleInputChange}
                    style={{ borderColor: '#74a892', color: '#008585' }}
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="yes">Yes Bank</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="secure-payment" style={{ background: '#fbf2c4' }}>
            <span className="secure-badge" style={{ background: '#008585', color: '#fbf2c4' }}>🔒 256-bit SSL Secure</span>
            <span style={{ color: '#008585' }}>Your payment information is encrypted</span>
          </div>

          <button 
            className={`confirm-payment-btn ${processing ? "processing" : ""}`}
            onClick={confirmPayment}
            disabled={processing}
            style={{ 
              background: processing ? '#74a892' : 'linear-gradient(135deg, #008585 0%, #74a892 100%)',
              color: '#fbf2c4'
            }}
          >
            {processing ? (
              <>
                <span className="spinner" style={{ borderColor: '#fbf2c4', borderTopColor: 'transparent' }}></span>
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{totalWithTax}
                <span className="btn-icon">→</span>
              </>
            )}
          </button>

          <p className="secure-note" style={{ color: '#74a892' }}>
            By confirming your payment, you agree to TravelBook's <a href="#" style={{ color: '#008585' }}>Terms of Service</a> and <a href="#" style={{ color: '#008585' }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;