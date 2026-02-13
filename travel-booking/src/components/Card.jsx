import "../styles/card.css";

function Card({ children }) {
  return <div className="custom-card">{children}</div>;
}


const styles = {
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #74a892",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.3s",
  }
};

export default Card;
