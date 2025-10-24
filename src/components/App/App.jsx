import { useState, useEffect, createContext } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import { getWeatherData } from "../../utils/weatherApi.js";

import { defaultClothingItems } from "../../utils/clothingItems.js";

import Main from "../Main/Main.jsx";

export const WeatherUnit = createContext({
  toggleValue: 0,
  setToggle: () => {}, // <--- This function is how Header will update state
});
function App() {
  //const [count, setCount] = useState(0);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });

  const [toggleValue, setToggle] = useState(0);

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function closeModal() {
    setActiveModal("");
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <WeatherUnit.Provider value={{ toggleValue, setToggle }}>
        <Header
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          weatherData={weatherData}
        />
        <Main
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          weatherData={weatherData}
        />
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          closeModal={closeModal}
        />
        <ModalWithForm
          isOpen={activeModal === "add-garment-modal"}
          closeModal={closeModal}
        />
      </WeatherUnit.Provider>
    </>
  );
}

export default App;
