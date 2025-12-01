import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({
  isOpen,
  onAddItem: register,
  closeModal,
  loginModal,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
    avatar: "",
    _id: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const result = await register(
        values.name,
        values.email,
        values.password,
        values.avatar
      );
      if (result && result.success) {
        setValues({ name: "", email: "", password: "", avatar: "", _id: "" });
        navigate("/profile");
        closeModal();
        window.location.reload();
      } else {
        console.error("Register failed:", result && result.message);
      }
    })();
  };

  const isValid =
    values.name && values.email && values.password && values.avatar;

  return (
    <>
      <ModalWithForm
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        modalTitle="Register"
        registerText="or Log in"
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

          <label className="add-modal__label">Password</label>
          <input
            name="password"
            type="password"
            className="add-modal__input add-modal__input_image"
            placeholder="Password"
            value={values.password}
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

export default RegisterModal;
