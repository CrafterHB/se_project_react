import { useContext } from "react";
import "./WeatherCard.css";
import weatherImage from "../../assets/Weather=Cloudy, Time=Day.svg";
import { WeatherUnit } from "../App.jsx";

function WeatherCard({ weatherData }) {
  const { toggleValue } = useContext(WeatherUnit);
  return (
    <>
      <div className="weather__container">
        <img
          src={weatherImage}
          alt="Weather Status Image"
          className="weather__image"
        />
        <p className="weather__text-degrees">
          {toggleValue === 0
            ? `${weatherData.temp.F}°F`
            : `${weatherData.temp.C}°C`}
        </p>
      </div>
    </>
  );
}

export default WeatherCard;
