import logo from "../../assets/Logo.svg";
import avatar from "../../assets/profile_picture.svg";
import "./Header.css";

function header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1&display=swap"
        rel="stylesheet"
      ></link>
      <div className="header">
        <div className="header__left-container">
          <img className="header__logo" src={logo} alt="Logo" />
          <p className="header__text">{currentDate}, New York</p>
        </div>

        <div className="header__right-container">
          <button className="header__button">
            <span className="header__button-text">+ Add clothes</span>
          </button>
          <p className="header__text" id="header__avatar-name">
            Terrance Tegegne
          </p>
          <img className="header__avatar" src={avatar} alt="Avatar" />
        </div>
      </div>
    </>
  );
}

export default header;
