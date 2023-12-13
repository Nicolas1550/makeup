import React, { useState, FC } from "react";
import axios from "axios";
interface ForgotPasswordModalProps {
  onRequestClose: () => void;
}
const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  onRequestClose,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/users/forgot-password",
        { email }
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error al enviar solicitud de restablecimiento:", error);
      setMessage("Error al enviar la solicitud. Intente de nuevo.");
    }
  };

  return (
    <div className="forgot-password-modal">
      <button onClick={onRequestClose}>Cerrar</button>
      <h2>Restablecer Contraseña</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese su correo electrónico"
      />
      <button onClick={handleForgotPassword}>Enviar solicitud</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordModal;
