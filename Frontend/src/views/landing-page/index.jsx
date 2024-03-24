import Navigation from "../../components/navigation/Navbar";
import React from "react";
import "./style.scss";
import logo from "../../assets/logo.jpg";

function Landing() {
  return (
    <>
      <section className="landing">
        <h1>Landing</h1>
        <img src={logo} alt="" />
        <button>Go To Shop</button>
      </section>
    </>
  );
}

export default Landing;
