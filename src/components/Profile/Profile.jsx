import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import "./Profile.css";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  weatherData,
  onLikeItem,
  openEditModal,
}) {
  return (
    <>
      <div className="profile-container">
        <Sidebar openEditModal={openEditModal}></Sidebar>
        <ClothesSection
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          weatherData={weatherData}
          onLikeItem={onLikeItem}
        ></ClothesSection>
      </div>
    </>
  );
}

export default Profile;
