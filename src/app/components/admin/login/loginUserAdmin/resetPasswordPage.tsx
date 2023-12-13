import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Asumiendo que estás usando react-router

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/api/users/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Contraseña actualizada con éxito.");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      setMessage("Error al restablecer la contraseña. Intente de nuevo.");
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Restablecer Contraseña</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nueva contraseña"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar nueva contraseña"
      />
      <button onClick={handleResetPassword}>Restablecer contraseña</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
