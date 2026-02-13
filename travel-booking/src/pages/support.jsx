import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import "../styles/support.css";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: ""
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I book flights or hotels?",
      answer:
        "You can search and book flights or hotels by entering your travel details on the respective pages. Once selected, proceed to confirm your booking."
    },
    {
      question: "How can I apply offers or promo codes?",
      answer:
        "Available promo codes can be applied on the Offers page or during payment. The discount will be reflected in the final payable amount."
    },
    {
      question: "Where can I view my bookings?",
      answer:
        "All your confirmed bookings can be viewed in the My Trips section for easy access and tracking."
    },
    {
      question: "Can I plan my trip in advance?",
      answer:
        "Yes, you can customize and plan your journey in advance using the Trip Planner feature."
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can submit a support request using the form above. Our team will review your query and contact you via email."
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateTicketId = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(100 + Math.random() * 900);
    return `SUP-${formattedDate}-${random}`;
  };

  const raiseTicket = () => {
    if (!formData.name || !formData.email || !formData.issue) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const id = generateTicketId();
      setTicketId(id);

      const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
      tickets.push({
        ticketId: id,
        name: formData.name,
        email: formData.email,
        issue: formData.issue,
        date: new Date().toLocaleString()
      });

      localStorage.setItem("tickets", JSON.stringify(tickets));

      setFormData({ name: "", email: "", issue: "" });
      setLoading(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <div className="support-page">
      {loading && <Loader />}
      {showModal && (
        <Modal
          message={`Thank you for contacting us.

Your request has been received successfully.

Ticket ID: ${ticketId}

Our support team will reach out to you within 24 hours.`}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="support-container">
        <h2 className="support-title">Need Help? We’re Here for You</h2>

        {/* Contact Form */}
        <Card>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="issue"
              placeholder="Describe your issue"
              value={formData.issue}
              onChange={handleChange}
            />
            <Button text="Submit Request" onClick={raiseTicket} />
          </div>
        </Card>

        {/* FAQ Section */}
        <h3 className="faq-title">Frequently Asked Questions</h3>

        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() =>
                setActiveFAQ(activeFAQ === index ? null : index)
              }
            >
              {faq.question}
            </div>

            {activeFAQ === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Support;
