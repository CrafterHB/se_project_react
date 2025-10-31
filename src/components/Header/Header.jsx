import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/profile_picture.svg";
import toggle from "../../assets/toggle.svg";
import toggleSlider from "../../assets/Toggle Slider.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
//Toggleswitch

export let temp = 0;
//export const WeatherUnit = createContext();

import { WeatherUnit } from "../App/App.jsx";

function Header({ handleOpenAddGarmentModal, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { toggleValue, setToggle } = useContext(WeatherUnit);

  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1&display=swap"
        rel="stylesheet"
      ></link>
      <div className="header">
        <div className="header__left-container">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Logo" />
          </Link>
          <p className="header__text">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <WeatherUnit.Provider value={{ toggleValue, setToggle }}>
          <div className="header__right-container">
            <div
              className="header__toggle-container"
              onClick={() => (toggleValue === 0 ? setToggle(1) : setToggle(0))}
            >
              <img src={toggle} alt="Toggle" className="header__toggle" />
              <p
                className={`header__toggle-text-f ${
                  toggleValue === 0 ? "header__toggle-on" : "header__toggle-off"
                }`}
              >
                F
              </p>
              <p
                className={`header__toggle-text-c ${
                  toggleValue === 1 ? "header__toggle-on" : "header__toggle-off"
                }`}
              >
                C
              </p>
              <img
                src={toggleSlider}
                alt="Toggle Slider"
                className={`header__toggle-slider ${
                  toggleValue === 0
                    ? "header__toggle-slider-on"
                    : "header__toggle-slider-off"
                }`}
              />
            </div>
          </div>
        </WeatherUnit.Provider>
        <button className="header__button" onClick={handleOpenAddGarmentModal}>
          <span className="header__button-text">+ Add clothes</span>
        </button>
        <Link to="/profile">
          <p className="header__text" id="header__avatar-name">
            Terrance Tegegne
          </p>
        </Link>
        <img className="header__avatar" src={avatar} alt="Avatar" />
      </div>
    </>
  );
}

export default Header;
