import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/offers.css";

function Offers() {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const offers = [
    { code: "SUMMER20", text: "Flat 20% OFF on Summer Trips" },
    { code: "MMT10", text: "10% OFF on Domestic Flights" },
    { code: "HOTEL15", text: "Save 15% on Hotel Bookings" }
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
        JSON.stringify({
          code: code,
          discount: coupons[code]
        })
      );
      setMessage(`Coupon ${code} applied successfully 🎉`);
    } else {
      setMessage("Invalid Coupon Code ❌");
    }
  };

  return (
    <div className="offers-page">
      <div className="offers-container">

        <div className="discount-banner">
          🎉 Limited Time Travel Discounts Available!
        </div>

        <h2 className="offers-title">Exclusive Travel Deals</h2>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <Card key={index}>
              <h3 className="offer-code">{offer.code}</h3>
              <p className="offer-text">{offer.text}</p>
            </Card>
          ))}
        </div>

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="coupon-input"
          />
          <Button text="Apply Coupon" onClick={applyCoupon} />
          {message && <p className="coupon-message">{message}</p>}
        </div>

      </div>
    </div>
  );
}

export default Offers;