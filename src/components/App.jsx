import { useState, useEffect, createContext } from "react";
import "./App.css";

import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ItemModal from "../components/ItemModal/ItemModal.jsx";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm.jsx";
import AddItemModal from "../components/AddItemModal/AddItemModal.jsx";
import LoginModal from "../components/LoginModal/LoginModal.jsx";
import RegisterModal from "../components/RegisterModal/RegisterModal.jsx";
import Profile from "../components/Profile/Profile.jsx";
import { useForm } from "../hooks/useForm.js";

import ProtectedRoute from "../ProtectedRoute.jsx";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext.jsx";

import { Routes, Route, useNavigate } from "react-router-dom";

import { getWeatherData } from "../utils/weatherApi.js";

import Api from "../utils/api.js";
const api = new Api();

import Main from "./Main/Main.jsx";

export const WeatherUnit = createContext({
  toggleValue: 0,
  setToggle: () => {},
});

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const { user, token, register, login, logout } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [toggleValue, setToggle] = useState(0);

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handeOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
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
      .then((item) => {
        const reversedData = item.slice().reverse();
        setClothingItems(reversedData);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (item) => {
    const { _id, ...dataToSend } = item;

    console.log(dataToSend);

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

  const handleLoginSubmit = async (user) => {
    const { _id, ...dataToSend } = user;

    const identifier =
      dataToSend.email || dataToSend.username || dataToSend.name;
    const password = dataToSend.password || dataToSend.pass || dataToSend.link;

    const result = await login(identifier, password);

    if (result && result.success) {
      navigate("/profile");
      closeModal();
      return true;
    } else {
      setError((result && result.message) || "Login failed. Please try again.");
    }

    return false;
  };

  const handleLikeItem = async (item) => {
    if (!user) {
      console.log("Must be logged in to like items");
      return;
    }
    const isLiked = item?.likes?.includes(user?._id) || false;

    if (isLiked) {
      handleUnlikeItem(item);
    } else {
      try {
        const updatedItem = await api.likeItem(item, user);

        setClothingItems(
          clothingItems.map((clothingItem) =>
            clothingItem._id === updatedItem._id ? updatedItem : clothingItem
          )
        );
      } catch (error) {
        console.error("Error liking item:", error);
      }
    }
  };

  const handleUnlikeItem = async (item) => {
    if (!user) {
      console.log("Must be logged in to like items");
      return;
    }

    try {
      const updatedItem = await api.unlikeItem(item, user);

      setClothingItems(
        clothingItems.map((clothingItem) =>
          clothingItem._id === updatedItem._id ? updatedItem : clothingItem
        )
      );
    } catch (error) {
      console.error("Error unliking item:", error);
    }
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <WeatherUnit.Provider value={{ toggleValue, setToggle }}>
        <Header
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          handleOpenLoginModal={handeOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
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
                onLikeItem={handleLikeItem}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                  weatherData={weatherData}
                  onLikeItem={handleLikeItem}
                />
              </ProtectedRoute>
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
        <LoginModal
          isOpen={activeModal === "login-modal"}
          onAddItem={handleLoginSubmit}
          closeModal={closeModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
        ></LoginModal>
        <RegisterModal
          isOpen={activeModal === "register-modal"}
          closeModal={closeModal}
          onAddItem={register}
          loginModal={handeOpenLoginModal}
        ></RegisterModal>
      </WeatherUnit.Provider>
    </>
  );
}

export default App;
