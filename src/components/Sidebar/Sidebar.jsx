import avatar from "../../assets/profile_picture.svg";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext.jsx";

function Sidebar({ openEditModal }) {
  const { user, token, register, login, logout } = useAuth();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__profile-container">
          <img
            className="sidebar__avatar"
            src={user?.avatar || avatar}
            alt={user?.name[0] || avatar}
          />
          <p className="sidebar__text">{user?.name || "Username"}</p>
        </div>

        <button onClick={openEditModal} className="side__profile-edit-btn">
          Edit Profile
        </button>

        <button onClick={logout} className="side__profile-signout-btn">
          Sign Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
