import "./LoginModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginModal = ({
  isOpen,
  onAddItem,
  closeModal,
  handleOpenRegisterModal,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    _id: "",
  });

  const navigate = useNavigate();
  const [passwordInvalid, setvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({
      email: "",
      password: "",
      _id: "",
      _id: 100,
    });

    (async () => {
      const result = await onAddItem(values);

      if (result) {
        setValues({ email: "", password: "", _id: "" });
        setvalid(false);
        navigate("/profile");
      } else {
        setvalid(true);
        console.error("Register failed:", result && result.message);
      }
    })();
    //onAddItem(values);
  };

  const isValid = values.email && values.password;

  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        modalTitle="Log in"
        registerText=" or Register"
        handleOpenRegisterModal={handleOpenRegisterModal}
        isValid={isValid}
      >
        <div className="add-modal">
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

          <label
            className={
              passwordInvalid === true
                ? "add-modal__invalid_label"
                : "add-modal__label"
            }
          >
            {passwordInvalid ? "Incorrect password" : "Password"}
          </label>
          <input
            name="password"
            type="password"
            className={
              passwordInvalid
                ? "add-modal__input_invalid add-modal__input_image"
                : "add-modal__input add-modal__input_image"
            }
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
      </ModalWithForm>
    </>
  );
};

export default LoginModal;
