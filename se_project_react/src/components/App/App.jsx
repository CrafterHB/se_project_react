import { useState } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import { defaultClothingItems } from "../../utils/clothingItems.js";

import Main from "../Main/Main.jsx";

function App() {
  //const [count, setCount] = useState(0);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <Header />
      <Main clothingItems={clothingItems} />
      <Footer />
    </>
  );
}

export default App;
