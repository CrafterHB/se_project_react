import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import "./Profile.css";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  weatherData,
}) {
  return (
    <>
      <div className="profile-container">
        <Sidebar></Sidebar>
        <ClothesSection
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          weatherData={weatherData}
        ></ClothesSection>
      </div>
    </>
  );
}

export default Profile;
