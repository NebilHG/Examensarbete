//import { createBrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../../views/landing-page/index";
import Login from "../../views/login";

import Shop from "../../views/shop";
import Navbar from "../../components/navigation/Navbar";
import Cart from "../../views/cart";
import Footer from "../../components/footer/Footer";

function AppRouter() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default AppRouter;
