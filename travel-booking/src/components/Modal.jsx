import "../styles/modal.css";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Modal;
