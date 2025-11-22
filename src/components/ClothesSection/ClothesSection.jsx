import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard.jsx";

import { getWeatherCondition } from "../../utils/weatherApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  onLikeItem,
}) {
  const { user } = useAuth();

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
          {clothingItems
            .filter((item) => {
              const ownerId = item.owner?._id || item.owner;
              return ownerId === user?._id;
            })
            .map((item) => (
              <ItemCard
                key={item._id}
                data={item}
                onCardClick={handleOpenItemModal}
                onLikeItem={onLikeItem}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default ClothesSection;
