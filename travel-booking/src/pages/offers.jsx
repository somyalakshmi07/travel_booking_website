import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/offers.css";

function Offers() {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate(); // ✅ ADD THIS

  const offers = [
    { code: "SUMMER20", text: "Save 20% on Summer Trips" },
    { code: "MMT10", text: "Flat 10% off on Domestic Flights" },
    { code: "HOTEL15", text: "Get 15% discount on Hotel Bookings" }
  ];

  const applyCoupon = () => {
    const coupons = {
      SUMMER20: 20,
      MMT10: 10,
      HOTEL15: 15
    };

    const code = coupon.toUpperCase();

    if (coupons[code]) {
      localStorage.setItem(
        "appliedCoupon",
        JSON.stringify({ code, discount: coupons[code] })
      );

      setApplied(true);
      setMessage(`Coupon ${code} applied successfully 🎉`);

      // 🔴 Redirect to Payment
      setTimeout(() => {
        navigate("/payment");
      }, 800);
    } else {
      setMessage("Invalid coupon code ❌");
    }
  };

  return (
    <div className="offers-page">
      <div className="offers-container">
        <div className="discount-banner">
          🎉 Limited Time Travel Deals
        </div>

        <h2 className="offers-title">Exclusive Travel Offers</h2>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <Card key={index}>
              <h3 className="offer-code">{offer.code}</h3>
              <p className="offer-text">{offer.text}</p>
              <span className="offer-badge">Limited Time</span>
            </Card>
          ))}
        </div>

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className="coupon-input"
          />

          <Button
            text={applied ? "Coupon Applied" : "Apply Coupon"}
            onClick={applyCoupon}
          />

          <Button
            text="Skip & Continue to Payment"
            onClick={() => navigate("/payment")}
          />

          {message && <p className="coupon-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Offers;
