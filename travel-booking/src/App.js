import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Flights from "./pages/flights";
import Hotels from "./pages/hotels";
import MyTrips from "./pages/mytrip";

function App() {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/mytrip" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
