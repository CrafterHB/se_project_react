import "./ItemModal.css";

import closeIcon from "../../assets/CloseBtn.svg";
import { useAuth } from "../../context/AuthContext.jsx";

function ItemModal({ card, isOpen, closeModal, deleteItem }) {
  const { user, token, register, login, logout } = useAuth();
  const isOwn =
    card.owner === user?._id ||
    card.owner?._id === user?._id ||
    String(card.owner) === String(user?._id);
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <button
        type="button"
        className="item__modal__close-btn"
        onClick={closeModal}
      >
        <img src={closeIcon} alt="close button"></img>
      </button>

      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <div className="modal__footer-left">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">Weather: {card.weather}</p>
        </div>
        <button
          className={`modal__delete-btn ${
            !isOwn ? "modal__delete-btn-hidden" : "test"
          }`}
          onClick={deleteItem}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
