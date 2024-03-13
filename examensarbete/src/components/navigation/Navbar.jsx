import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <p>MY SHop</p>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link> {/* Link to menu page */}
      <Link to="/login">Login</Link> {/* Link to login page */}
      <Link to="/cart">
        <ShoppingCart size={32} />
      </Link>{" "}
      {/* Link to cart/order page */}
    </nav>
  );
}

export default Navbar;
