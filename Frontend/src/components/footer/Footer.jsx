import React from "react";
import "./style.scss";
import { InstagramLogo, TwitterLogo, FacebookLogo } from "phosphor-react";

const Footer = () => {
  return (
    <div className="footer">
      <p>FOOTER</p>
      <div className="footer-links">
        <p>adress</p>
        <p>email</p>
        <p>phone nr</p>
      </div>

      <div className="footer_socials">
        <InstagramLogo size={32} />

        <TwitterLogo size={32} />

        <FacebookLogo size={32} />
      </div>
      <div className="footer_copyright">
        <p>Copyright @ 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
