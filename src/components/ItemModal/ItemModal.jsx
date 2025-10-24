import "./ItemModal.css";

import closeIcon from "../../assets/CloseBtn.svg";

function ItemModal({ card, isOpen, closeModal }) {
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <button
        type="button"
        className="item__modal__close-btn"
        onClick={closeModal}
      >
        <img src={closeIcon} alt="close button"></img>
      </button>

      <img src={card.link} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__text">{card.name}</h2>
        <p className="modal__text">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
