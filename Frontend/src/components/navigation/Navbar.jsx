import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import logo from "../../assets/logo.jpg";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      {localStorage.getItem("token") ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.replace("/");
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
      <Link to="/cart">
        <ShoppingCart size={32} />
      </Link>{" "}
    </nav>
  );
}

export default Navbar;
