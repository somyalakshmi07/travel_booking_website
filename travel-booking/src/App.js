import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Offers from "./pages/offers";
import Support from "./pages/support";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
