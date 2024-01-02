import React, { useState, FC } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 80%;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #d783a6;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalTitle = styled.h2`
  color: #d783a6;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #d783a6;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #d783a6;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #bb6b95;
  }
`;

const Message = styled.p`
  color: #555;
  text-align: center;
  margin-top: 15px;
`;
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
        "https://sofiacomar1.latincloud.app/api/users/forgot-password",
        { email }
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error al enviar solicitud de restablecimiento:", error);
      setMessage("Error al enviar la solicitud. Intente de nuevo.");
    }
  };

  return (
    <ModalBackground
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContainer
        initial={{ y: "-50vh" }}
        animate={{ y: 0 }}
        exit={{ y: "50vh" }}
      >
        <CloseButton onClick={onRequestClose}>✕</CloseButton>
        <ModalTitle>Restablecer Contraseña</ModalTitle>
        <ModalInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo electrónico"
        />
        <SubmitButton onClick={handleForgotPassword}>
          Enviar solicitud
        </SubmitButton>
        {message && <Message>{message}</Message>}
      </ModalContainer>
    </ModalBackground>
  );
};

export default ForgotPasswordModal;
