//import { createBrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../../views/landing-page/index";
import Login from "../../views/login";
import Receipt from "../../views/reciept";
import Staff from "../../views/staff";
import Shop from "../../views/shop";
import Navbar from "../../components/navigation/Navbar";
import Cart from "../../views/cart";

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
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
