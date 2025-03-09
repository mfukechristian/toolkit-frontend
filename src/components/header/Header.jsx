import "./Header.css";
import logo from "../../assets/logo.webp";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-img">
        <img src={logo} alt="logo" />
      </div>
      <div className="cta">
        <a href="https://christianmfuke.netlify.app/" target="_blank">
          👋
          <p>Say Hi to the Author!</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
