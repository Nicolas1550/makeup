import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  color: #333;

  h2 {
    color: #d17a7a; // Un tono de rosa
    margin-bottom: 20px;
  }

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
    max-width: 100%;
  }

  button {
    background-color: #d17a7a; // Un tono de rosa
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #bf6b6b; // Un tono más oscuro para el efecto hover
    }
  }

  p {
    color: #555;
    margin-top: 15px;
  }
`;
const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    // Validaciones básicas
    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      await axios.post("https://sofiacomar1.latincloud.app/api/users/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Contraseña actualizada con éxito.");
      // Redirigir al usuario después de un corto retraso
      setTimeout(() => {
        router.push("/"); // Cambia esto a la URL de inicio que prefieras
      }, 2000); // Redirige después de 2 segundos
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      setMessage("Error al restablecer la contraseña. Intente de nuevo.");
    }
  };

  return (
    <ResetPasswordContainer>
      <h2>Restablecer Contraseña</h2>
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
        />
        <button onClick={() => setShowPassword(!showPassword)}>👁️</button>
      </div>
      <div className="password-input">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar nueva contraseña"
        />
        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          👁️
        </button>
      </div>
      <button onClick={handleResetPassword}>Restablecer contraseña</button>
      {message && <p>{message}</p>}
    </ResetPasswordContainer>
  );
};

export default ResetPasswordPage;
