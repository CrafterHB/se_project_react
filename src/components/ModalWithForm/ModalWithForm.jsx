import "./ModalWithForm.css";

import closeIcon from "../../assets/GrayCloseBtn.svg";

function ModalWithForm({
  isOpen,
  closeModal,
  children,
  modalTitle,
  registerText = "",
  handleOpenRegisterModal,
  onSubmit,
  isValid,
}) {
  return (
    <div className={`modal modal_type_form${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__content">
        <h1 className="modal__form__title">{modalTitle}</h1>
        <button className="modal__close-btn" onClick={closeModal}>
          <img src={closeIcon} alt="close button"></img>
        </button>
        <form onSubmit={onSubmit}>
          {children}
          <div className="submit-btn-wrapper">
            <button
              className={`modal__form__submit-btn ${
                !isValid
                  ? "modal__form__submit-btn_disabled"
                  : "modal__form__submit-bt_valid"
              }`}
              type="submit"
              disabled={!isValid}
            >
              {modalTitle}
            </button>
            <p
              onClick={handleOpenRegisterModal}
              className="modal__register-text"
            >
              {registerText}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
