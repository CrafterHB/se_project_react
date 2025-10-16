import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

import "./Main.css";

function Main({ clothingItems }) {
  return (
    <>
      <WeatherCard />
      <p className="main__text">Today is 75° F / You may want to wear:</p>
      <div className="main__card-container">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} data={item} />;
        })}
      </div>
    </>
  );
}

export default Main;
