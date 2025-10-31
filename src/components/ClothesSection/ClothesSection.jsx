import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard.jsx";

import { getWeatherCondition } from "../../utils/weatherApi.js";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__header">
          <p className="clothes-section__header_text">Your items</p>
          <button
            className="clothes-section__header-btn"
            onClick={handleOpenAddGarmentModal}
          >
            + Add New
          </button>
        </div>
        <div className="clothes-section__items">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ClothesSection;
