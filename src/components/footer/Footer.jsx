import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-text">
        <p>
          &copy;{" "}
          <a
            href="https://www.linkedin.com/in/christian-mfuke-kambulu/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Christian Mfuke
          </a>{" "}
          {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
