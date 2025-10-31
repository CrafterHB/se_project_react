import avatar from "../../assets/profile_picture.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__profile-container">
          <img className="sidebar__avatar" src={avatar} alt="avatar" />
          <p className="sidebar__text">Terrance Tegegne</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
