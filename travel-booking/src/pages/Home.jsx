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
    { id: 1, name: "Goa", image: "goa.jpg", price: "₹15,999", rating: 4.8, days: "5 Days", description: "Sun, Sand & Sea" },
    { id: 2, name: "Kerala", image: "/images/kerala.jpg", price: "₹18,999", rating: 4.7, days: "6 Days", description: "God's Own Country" },
    { id: 3, name: "Manali", image: "/images/manali.jpg", price: "₹12,999", rating: 4.9, days: "4 Days", description: "Snow Paradise" },
    { id: 4, name: "Jaipur", image: "/images/jaipur.jpg", price: "₹14,999", rating: 4.6, days: "4 Days", description: "Pink City" },
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
        <div className="hero-content">

          <h1 className="hero-title">
            Discover Your <span>Next Adventure</span>
          </h1>

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

          <div className="quick-booking">
            <button onClick={() => quickBook("hotel")}>Hotel</button>
            <button onClick={() => quickBook("flight")}>Flight</button>
            <button onClick={() => quickBook("package")}>Package</button>
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

      

    </div>
  );
}

export default Home;