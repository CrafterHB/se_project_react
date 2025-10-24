import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../../utils/weatherApi.js";
import "./Main.css";

import { WeatherUnit } from "../App/App.jsx";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const { toggleValue } = useContext(WeatherUnit);
  return (
    <>
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is{" "}
        {toggleValue === 0
          ? `${weatherData.temp.F}°F`
          : `${weatherData.temp.C}°C`}{" "}
        / You may want to wear:
      </p>
      <div className="main__card-container">
        {clothingItems
          .filter((item) => item.weather === getWeatherCondition(weatherData))
          .map((item) => (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          ))}
      </div>
    </>
  );
}

export default Main;
