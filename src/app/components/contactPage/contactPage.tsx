import React, { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/appHooks"; // Ajusta la ruta según tu estructura
import { sendContactForm, reset } from "../../redux/contactSlice/contactSlice"; // Ajusta la ruta según tu estructura
import styled from "styled-components";
import BackgroundImageWithTitle from "./backgroundImageWithTitle";

const ContactContainer = styled.div`
  background: rgba(255, 255, 255, 0.2); // Fondo semi-transparente
  backdrop-filter: blur(10px); // Efecto de desenfoque para el fondo
  -webkit-backdrop-filter: blur(10px); // Efecto de desenfoque para Safari
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); // Sombra más suave
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  border: 1px solid rgba(255, 255, 255, 0.3); // Borde ligero para realzar el efecto
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    border: 1px solid #fff;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 150px;
  &:focus {
    outline: none;
    border: 1px solid #fff;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff69b4;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1493;
  }
`;
const Message = styled.p<MessageProps>`
  color: ${(props) => (props.type === "error" ? "#ff6b6b" : "#51cf66")};
  background-color: ${(props) =>
    props.type === "error" ? "#ffe3e3" : "#ebfbee"};
  border: ${(props) =>
    props.type === "error" ? "1px solid #ffa8a8" : "1px solid #c0ebc0"};
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem 0;
`;
interface MessageProps {
  type?: "error" | "success";
}
const ContactPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const contactStatus = useAppSelector((state) => state.contact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Por favor, complete todos los campos."); // O maneja este error de manera más sofisticada
      return;
    }

    dispatch(sendContactForm({ name, email, message }));
  };

  // Opcional: Resetear el estado cuando el componente se desmonta
  React.useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  React.useEffect(() => {
    console.log("Estado actualizado:", contactStatus);
  }, [contactStatus]);
  return (
    <>
      <BackgroundImageWithTitle />
      <ContactContainer>
        <h2>Formulario de contacto</h2>
        {contactStatus.loading && <Message>Enviando mensaje...</Message>}
        {contactStatus.error && !contactStatus.loading && (
          <Message type="error">Error: {contactStatus.error}</Message>
        )}
        {contactStatus.success && !contactStatus.loading && (
          <Message type="success">Mensaje enviado con éxito!</Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextArea
            placeholder="Tu mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit">Enviar Mensaje </SubmitButton>
        </Form>
      </ContactContainer>
    </>
  );
};

export default ContactPage;
