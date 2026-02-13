import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TripPlanner from "./pages/tripplanner";
import Payment from "./pages/payment";
import MyTrips from "./pages/mytrip";
import navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tripplanner" element={<TripPlanner />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mytrip" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;
