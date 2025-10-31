import "./ToggleSwitch.css";
import { useState, useContext } from "react";
import toggle from "../../assets/toggle.svg";
import toggleSlider from "../../assets/Toggle Slider.svg";
//Test

function ToggleSwitch(WeatherUnit) {
  const { toggleValue, setToggle } = useContext(WeatherUnit);

  return (
    <>
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
    </>
  );
}

export default ToggleSwitch();
