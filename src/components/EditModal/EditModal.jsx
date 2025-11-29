import "./EditModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const EditModal = ({ isOpen, onAddItem, closeModal, loginModal }) => {
  const { user } = useAuth();

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        _id: user._id || "",
      });
    }
  }, [user, setValues]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values.name, values.email, values.avatar);
    console.log(values.name);
  };

  const isValid = values.name && values.email && values.avatar;

  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        modalTitle="Edit User"
        handleOpenRegisterModal={loginModal}
        isValid={isValid}
      >
        <div className="add-modal">
          <label className="add-modal__label">Username</label>
          <input
            name="name"
            type="text"
            className="add-modal__input add-modal__input_name"
            placeholder="Username"
            value={values.name}
            onChange={handleChange}
            required
          />

          <label className="add-modal__label">Email</label>
          <input
            name="email"
            type="email"
            className="add-modal__input add-modal__input_name"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />

          <label className="add-modal__label">Avatar URL</label>
          <input
            name="avatar"
            type="url"
            className="add-modal__input add-modal__input_image"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
            required
          />
        </div>
      </ModalWithForm>
    </>
  );
};

export default EditModal;
