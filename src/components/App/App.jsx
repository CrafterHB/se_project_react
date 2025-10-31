import { useState, useEffect, createContext } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { useForm } from "../../hooks/useForm.js";

import { Routes, Route } from "react-router-dom";

import { getWeatherData } from "../../utils/weatherApi.js";

import Api from "../../utils/api.js";
const api = new Api();

import Main from "../Main/Main.jsx";

export const WeatherUnit = createContext({
  toggleValue: 0,
  setToggle: () => {},
});

function App() {
  //const [count, setCount] = useState(0);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
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

    api
      .setClothingItems()
      .then((data) => {
        const reversedData = data.slice().reverse();
        setClothingItems(reversedData)();
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (item) => {
    const { _id, ...dataToSend } = item;

    api
      .addItem(dataToSend)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
    closeModal();
  };

  function deleteCard() {
    console.log(selectedCard);

    api
      .deleteItem(selectedCard)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );

        setClothingItems(updatedClothingItems);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                weatherData={weatherData}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                weatherData={weatherData}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          closeModal={closeModal}
          deleteItem={deleteCard}
        />
        <AddItemModal
          isOpen={activeModal === "add-garment-modal"}
          onAddItem={handleAddItemSubmit}
          closeModal={closeModal}
        ></AddItemModal>
      </WeatherUnit.Provider>
    </>
  );
}

export default App;
