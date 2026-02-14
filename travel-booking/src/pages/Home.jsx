import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const weather = { temp: 29, condition: "Sunny", location: "Goa" };

  // ✅ Images from public/images
  const destinations = [
    {
      id: 1,
      name: "Goa",
      image: "/images/goa.jpg",
      price: "₹15,999",
      rating: 4.8,
      description: "Sun, Sand & Sea"
    },
    {
      id: 2,
      name: "Kerala",
      image: "/images/kerala.jpg",
      price: "₹18,999",
      rating: 4.7,
      description: "God's Own Country"
    },
    {
      id: 3,
      name: "Manali",
      image: "/images/manali.jpg",
      price: "₹12,999",
      rating: 4.9,
      description: "Snow Paradise"
    },
    {
      id: 4,
      name: "Jaipur",
      image: "/images/jaipur.jpg",
      price: "₹14,999",
      rating: 4.6,
      description: "Pink City"
    }
  ];

  const packages = [
    {
      id: 1,
      name: "Summer Special",
      image: "/images/package1.jpg",
      price: "₹24,999",
      discount: "20% OFF",
      duration: "7 Days / 6 Nights"
    },
    {
      id: 2,
      name: "Honeymoon Package",
      image: "/images/package2.jpg",
      price: "₹34,999",
      discount: "15% OFF",
      duration: "8 Days / 7 Nights"
    },
    {
      id: 3,
      name: "Adventure Trek",
      image: "/images/package3.jpg",
      price: "₹19,999",
      discount: "25% OFF",
      duration: "5 Days / 4 Nights"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${searchQuery}`);
    }
  };

  const quickBook = (type) => {
    if (type === "hotel") navigate("/hotels");
    if (type === "flight") navigate("/flights");
    if (type === "package") navigate("/packages");
  };

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">Discover Your Next Adventure</h1>
        <p className="hero-description">
          Explore the world's most breathtaking destinations
        </p>

        <form onSubmit={handleSearch} className="hero-search">
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => quickBook("hotel")} className="explore-btn">🏨 Hotel</button>
          <button onClick={() => quickBook("flight")} className="explore-btn" style={{ marginLeft: "10px" }}>✈️ Flight</button>
          <button onClick={() => quickBook("package")} className="explore-btn" style={{ marginLeft: "10px" }}>🎁 Package</button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          ☀ {weather.location} {weather.temp}°C - {weather.condition}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations-section">
        <div className="section-header">
          <h2>Popular Destinations</h2>
          <Link to="/destinations">View All →</Link>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <p>⭐ {destination.rating}</p>
                <p className="destination-price">{destination.price}</p>
                <Link to={`/destinations/${destination.id}`} className="explore-btn">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

          </div>
  );
}

export default Home;
