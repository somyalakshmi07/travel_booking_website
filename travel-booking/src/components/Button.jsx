import "../styles/button.css";

function Button({ text, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
}


const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#74a892",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Button;
