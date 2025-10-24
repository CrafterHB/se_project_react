import "./ModalWithForm.css";

import closeIcon from "../../assets/GrayCloseBtn.svg";

function ModalWithForm({ isOpen, closeModal }) {
  return (
    <div className={`modal modal_type_form${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__content">
        <h1 className="modal__form__title">Form</h1>
        <button className="modal__close-btn" onClick={closeModal}>
          <img src={closeIcon} alt="close button"></img>
        </button>
        <form>
          <button className="modal__form__submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
