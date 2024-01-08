"use client";
import React, { useState, useEffect } from "react";
import { FormControlLabel, Radio, Button } from "@mui/material";
import {
  StyledSeleccionEnvio,
  ButtonContainer,
  StyledRadioGroup,
  StyledTextField,
} from "../stylesSeccionEnvio/styledSeccionEnvio";
import axios from "axios";
import io from "socket.io-client";

interface SeleccionEnvioProps {
  orden_id: string;
  onContinue: (datos: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  }) => void;
  onBack: () => void;
  datosEnvio?: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  };
}

const SeleccionEnvio: React.FC<SeleccionEnvioProps> = ({
  orden_id,
  onContinue,
  onBack,
  datosEnvio,
}) => {
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("stock-updated", () => {});
    return () => {
      socket.disconnect();
    };
  }, []);

  const [metodo_envio, setMetodoEnvio] = useState<string>(
    datosEnvio?.metodo_envio || ""
  );
  const [direccion, setDireccion] = useState<string>(
    datosEnvio?.direccion || ""
  );
  const [ciudad, setCiudad] = useState<string>(datosEnvio?.ciudad || "");
  const [estado, setEstado] = useState<string>(datosEnvio?.estado || "");
  const [codigo_postal, setCodigoPostal] = useState<string>(
    datosEnvio?.codigo_postal || ""
  );
  const [pais, setPais] = useState<string>(datosEnvio?.pais || "");

  const handleMetodoEnvioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMetodoEnvio((event.target as HTMLInputElement).value);
  };

  const [errors, setErrors] = useState({
    metodo_envio: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    pais: "",
  });
  const handleSubmit = async () => {
    const userToken = localStorage.getItem("jwt");

    try {
      const response = await axios.post(
        "http://localhost:3002/api/orders/create/shipping-info",
        {
          orden_id,
          metodo_envio,
          direccion,
          ciudad,
          estado,
          codigo_postal,
          pais,
        },
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );
      if (response.data.success) {
        onContinue({
          metodo_envio,
          direccion,
          ciudad,
          estado,
          codigo_postal,
          pais,
        });
      } else {
        console.error("Error del backend:", response.data.message);
      }
    } catch (error) {
      console.error("Error enviando datos de envío:", error);
    }

    setErrors({
      metodo_envio: "",
      direccion: "",
      ciudad: "",
      estado: "",
      codigo_postal: "",
      pais: "",
    });
    if (!metodo_envio) {
      setErrors((prev) => ({
        ...prev,
        metodo_envio: "Por favor, selecciona un método de envío.",
      }));
    }
    if (!direccion) {
      setErrors((prev) => ({
        ...prev,
        direccion: "Por favor, ingresa una dirección.",
      }));
    }
    if (!ciudad) {
      setErrors((prev) => ({
        ...prev,
        ciudad: "Por favor, ingresa una ciudad.",
      }));
    }
    if (!estado) {
      setErrors((prev) => ({
        ...prev,
        estado: "Por favor, ingresa un estado.",
      }));
    }
    if (!codigo_postal) {
      setErrors((prev) => ({
        ...prev,
        codigo_postal: "Por favor, ingresa un código postal.",
      }));
    }
    if (!pais) {
      setErrors((prev) => ({
        ...prev,
        pais: "Por favor, ingresa un país.",
      }));
    }
    if (Object.values(errors).some((error) => error)) {
      return;
    }
  };

  return (
    <StyledSeleccionEnvio>
      <h6>Selecciona tu método de envío</h6>

      <StyledRadioGroup
        aria-label="metodoEnvio"
        name="metodoEnvio"
        value={metodo_envio}
        onChange={handleMetodoEnvioChange}
      >
        <FormControlLabel
          value="express"
          control={<Radio />}
          label="Envío Express (1-2 días)"
        />
        <FormControlLabel
          value="recoger"
          control={<Radio />}
          label="Buscar en Tienda"
        />
      </StyledRadioGroup>
      {errors.metodo_envio && (
        <span style={{ color: "red" }}>{errors.metodo_envio}</span>
      )}
      {metodo_envio === "express" && (
        <>
          {/* Todos los campos de dirección, ciudad, estado, etc. */}
          <StyledTextField
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errors.direccion && (
            <span style={{ color: "red" }}>{errors.direccion}</span>
          )}

          <StyledTextField
            label="Ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errors.ciudad && (
            <span style={{ color: "red" }}>{errors.ciudad}</span>
          )}

          <StyledTextField
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errors.estado && (
            <span style={{ color: "red" }}>{errors.estado}</span>
          )}

          <StyledTextField
            label="Código Postal"
            value={codigo_postal}
            onChange={(e) => setCodigoPostal(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errors.codigo_postal && (
            <span style={{ color: "red" }}>{errors.codigo_postal}</span>
          )}

          <StyledTextField
            label="País"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errors.pais && <span style={{ color: "red" }}>{errors.pais}</span>}
        </>
      )}
      {metodo_envio === "recoger" && (
        <div>
          <h6>Dirección y Horarios de la Tienda:</h6>
          <p>Thorne 1145 | Horario De Luenes a Viernes 14hs a 20hs</p>
        </div>
      )}
      <ButtonContainer>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Continuar
        </Button>
      </ButtonContainer>
    </StyledSeleccionEnvio>
  );
};

export default SeleccionEnvio;
