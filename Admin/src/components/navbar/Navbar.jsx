import React from "react";
import "./style.css";
import logo from "../../assets/logo.jpg";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="navbar_logo" />
      <p>admin navbar</p>
    </div>
  );
}

export default Navbar;
