import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={{ margin: 0 }}>TravelBook</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/offers" style={styles.link}>Offers</Link>
        <Link to="/support" style={styles.link}>Support</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#008585",
    color: "white"
  },
  link: {
    color: "white",
    marginLeft: "25px",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default navbar;
