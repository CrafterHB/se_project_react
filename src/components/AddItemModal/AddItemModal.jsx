import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
const AddItemModal = ({ isOpen, onAddItem, closeModal }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
    weather: "",
    _id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({
      name: "",
      link: "",
      weather: "",
      _id: 100,
    });

    onAddItem(values);
  };

  const isValid = values.name && values.link && values.weather;

  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        modalTitle="New garment"
        isValid={isValid}
      >
        <div className="add-modal">
          <label className="add-modal__label">Name</label>
          <input
            name="name"
            type="text"
            className="add-modal__input add-modal__input_name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />

          <label className="add-modal__label">Image</label>
          <input
            name="link"
            type="url"
            className="add-modal__input add-modal__input_image"
            placeholder="Image URL"
            value={values.link}
            onChange={handleChange}
            required
          />

          <p className="add-modal__text">Select the weather type:</p>

          <div className="add-modal__radio">
            <div className="add-modal__radio-option">
              <input
                className="add-modal__input_radio"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
                checked={values.weather === "hot"}
                onChange={handleChange}
                required
              />
              <label htmlFor="hot">Hot</label>
            </div>

            <div className="add-modal__radio-option">
              <input
                className="add-modal__input_radio"
                type="radio"
                id="warm"
                name="weather"
                value="warm"
                checked={values.weather === "warm"}
                onChange={handleChange}
                required
              />
              <label htmlFor="warm">Warm</label>
            </div>

            <div className="add-modal__radio-option">
              <input
                className="add-modal__input_radio"
                type="radio"
                id="cold"
                name="weather"
                value="cold"
                checked={values.weather === "cold"}
                onChange={handleChange}
                required
              />
              <label htmlFor="cold">Cold</label>
            </div>
          </div>
        </div>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;
