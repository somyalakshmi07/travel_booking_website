import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [weather] = useState({ temp: 29, condition: "Sunny", location: "Goa" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const destinations = [
    { id: 1, name: "Goa", image: "/images/goa.jpg", price: "₹15,999", rating: 4.8, days: "5 Days", description: "Sun, Sand & Sea" },
    { id: 2, name: "Kerala", image: "/images/kerala.jpg", price: "₹18,999", rating: 4.7, days: "6 Days", description: "God's Own Country" },
    { id: 3, name: "Manali", image: "/images/manali.jpg", price: "₹12,999", rating: 4.9, days: "4 Days", description: "Snow Paradise" },
    { id: 4, name: "Jaipur", image: "/images/jaipur.jpg", price: "₹14,999", rating: 4.6, days: "4 Days", description: "Pink City" },
  ];

  const packages = [
    { id: 1, name: "Summer Special", image: "/images/package1.jpg", price: "₹24,999", discount: "20% OFF", duration: "7 Days/6 Nights", includes: ["Hotel", "Flights", "Meals"] },
    { id: 2, name: "Honeymoon Package", image: "/images/package2.jpg", price: "₹34,999", discount: "15% OFF", duration: "8 Days/7 Nights", includes: ["Luxury Hotel", "Flights", "Spa", "Dinner"] },
    { id: 3, name: "Adventure Trek", image: "/images/package3.jpg", price: "₹19,999", discount: "25% OFF", duration: "5 Days/4 Nights", includes: ["Camping", "Guide", "Equipment", "Meals"] },
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
        <div className="hero-overlay">
          <h1>Discover Your Next Adventure</h1>
          <p>Explore the world's most breathtaking destinations</p>

          <form onSubmit={handleSearch} className="hero-search">
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="quick-booking">
            <button onClick={() => quickBook("hotel")}>🏨 Hotel</button>
            <button onClick={() => quickBook("flight")}>✈️ Flight</button>
            <button onClick={() => quickBook("package")}>🎁 Package</button>
          </div>

          <div className="weather-widget">
            ☀ {weather.location} {weather.temp}°C - {weather.condition}
          </div>
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
                <p><strong>{destination.price}</strong></p>
                <Link to={`/destinations/${destination.id}`} className="explore-btn">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages-section">
        <div className="section-header">
          <h2>Featured Packages</h2>
          <Link to="/packages">View All →</Link>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <span className="discount-badge">{pkg.discount}</span>
              <img src={pkg.image} alt={pkg.name} />
              <div className="package-content">
                <h3>{pkg.name}</h3>
                <p>{pkg.duration}</p>
                <p><strong>{pkg.price}</strong></p>
                <Link to={`/packages/${pkg.id}`} className="book-now-btn">
                  Book Now
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