import "./WeatherCard.css";
import weatherImage from "../../assets/Weather=Cloudy, Time=Day.svg";

function WeatherCard() {
  return (
    <>
      <div className="weather__container">
        <img
          src={weatherImage}
          alt="Weather Status Image"
          className="weather__image"
        />
        <p className="weather__text-degrees">75°F</p>
      </div>
    </>
  );
}

export default WeatherCard;
