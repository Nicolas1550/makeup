import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";
import {
  StyledFormContainer,
  StyledButtonContainer,
  StyledTextField,
} from "../styleDatosUsuario/styleDatosUsuario";

export interface Datos {
  nombre: string;
  email: string;
  telefono: string;
  orderId: string;
}

interface DatosProps {
  datosExistentes?: Datos; // Usar 'Datos' aquí
  onContinue: (datos: Datos) => void;
  onBack: () => void;
}

const DatosUsuario: React.FC<DatosProps> = ({
  datosExistentes,
  onContinue,
  onBack,
}) => {
  const [nombreError, setNombreError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [telefonoError, setTelefonoError] = useState<string>("");

  const [nombre, setNombre] = useState<string>(datosExistentes?.nombre || "");
  const [email, setEmail] = useState<string>(datosExistentes?.email || "");
  const [telefono, setTelefono] = useState<string>(
    datosExistentes?.telefono || ""
  );

  const cart = useSelector((state: RootState) => state.cart);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userToken = localStorage.getItem("jwt");
  const validate = () => {
    let isValid = true;

    if (!nombre.trim()) {
      setNombreError("El nombre es requerido.");
      isValid = false;
    } else {
      setNombreError("");
    }

    if (!email.trim()) {
      setEmailError("El email es requerido.");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("El formato del email no es válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!telefono.trim()) {
      setTelefonoError("El teléfono es requerido.");
      isValid = false;
    } else if (!/^\d+$/.test(telefono)) {
      setTelefonoError("El teléfono debe contener solo números.");
      isValid = false;
    } else {
      setTelefonoError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/create`,
        {
          total: 100,
          userId,
          nombre,
          email,
          telefono,
          productos: cart,
        },
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );

      if (response.status === 201 && response.data && response.data.orderId) {
        onContinue({
          nombre,
          email,
          telefono,
          orderId: response.data.orderId,
        });
      } else {
        console.error(
          "Error al crear la orden o no se recibió un orderId válido"
        );
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Data:", axiosError.response.data);
        console.error("Status:", axiosError.response.status);
        console.error("Headers:", axiosError.response.headers);
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      } else {
        console.error("Error setting up the request:", axiosError.message);
      }
      console.error("Config:", axiosError.config);
    }
  };

  return (
    <StyledFormContainer>
      <Typography variant="h6">Tus Datos</Typography>
      <StyledTextField
        error={nombreError !== ""}
        helperText={nombreError}
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <StyledTextField
        error={emailError !== ""}
        helperText={emailError}
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        error={telefonoError !== ""}
        helperText={telefonoError}
        label="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <StyledButtonContainer>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Continuar
        </Button>
      </StyledButtonContainer>
    </StyledFormContainer>
  );
};

export default DatosUsuario;
