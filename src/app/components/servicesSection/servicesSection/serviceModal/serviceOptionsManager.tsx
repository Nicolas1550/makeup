import React, { useState, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks"; // Actualiza la ruta al archivo appHooks
import {
  addServiceOption,
  editServiceOption,
  deleteServiceOption,
  fetchServiceOptions,
} from "../../../../redux/serviceSlice/servicesSlice"; // Actualiza la ruta al archivo de tu slice de servicios
import styled from "styled-components";

const ServiceOptionsContainer = styled.div`
  background-color: #f8f0f7; // Un color de fondo ligero y relacionado con maquillaje
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #6d6d6d; // Color de texto oscuro para contraste
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: 2px solid #e5ded0;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #6d6d6d; // Color de texto oscuro para contraste
  &:focus {
    border-color: #ff97b5;
    box-shadow: 0 0 0 2px rgba(255, 151, 181, 0.2); // Resalta el input al enfocar
  }
`;

const StyledButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #ff97b5;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #e8719e;
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap; // Permite que los elementos se ajusten en múltiples filas
  gap: 1rem; // Espacio entre los elementos
  justify-content: space-around; // Distribuye el espacio alrededor de los elementos
`;

const ServiceItem = styled.li`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #6d6d6d;
  flex-basis: calc(
    50% - 1rem
  ); // Ajusta el ancho de cada ítem para que dos ítems llenen el espacio
  margin-top: 1rem;

  &:hover {
    background-color: #f7f2f7;
  }

  // Estilo para el grupo de botones dentro de cada ServiceItem
  .button-group {
    display: flex;
    gap: 0.5rem;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;
interface ServiceOptionsProps {
  serviceId: number; // ID del servicio para el que se administrarán las opciones
}

const ServiceOptionsManager: React.FC<ServiceOptionsProps> = ({
  serviceId,
}) => {
  const dispatch = useAppDispatch();
  const serviceOptions = useAppSelector(
    (state) => state.services.serviceOptions[serviceId] || []
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [editingOptionId, setEditingOptionId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchServiceOptions(serviceId));
  }, [dispatch, serviceId]);

  const handleSubmit = () => {
    if (editingOptionId) {
      dispatch(
        editServiceOption({
          optionId: editingOptionId,
          name,
          price: Number(price),
        })
      );
    } else {
      dispatch(addServiceOption({ serviceId, name, price: Number(price) }));
    }
    setName("");
    setPrice("");
    setEditingOptionId(null);
  };

  const handleEdit = (
    optionId: number,
    currentName: string,
    currentPrice: number
  ) => {
    setName(currentName);
    setPrice(currentPrice);
    setEditingOptionId(optionId);
  };

  const handleDelete = (optionId: number) => {
    dispatch(deleteServiceOption(optionId));
  };

  return (
    <ServiceOptionsContainer>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <StyledInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Option name"
          required
        />
        <StyledInput
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          required
        />

        <StyledButton type="submit">
          {editingOptionId ? "Actualizar" : "Agregar"} Option
        </StyledButton>
        {editingOptionId && (
          <StyledButton onClick={() => setEditingOptionId(null)}>
            Cancel Edit
          </StyledButton>
        )}
      </StyledForm>

      <ServiceList>
        {serviceOptions.map((option) => (
          <ServiceItem key={option.id}>
            {option.nombre} - ${option.precio}
            <ButtonGroup>
              <StyledButton
                onClick={() =>
                  handleEdit(option.id, option.nombre, option.precio || 0)
                }
              >
                Edit
              </StyledButton>
              <StyledButton onClick={() => handleDelete(option.id)}>
                Delete
              </StyledButton>
            </ButtonGroup>
          </ServiceItem>
        ))}
      </ServiceList>
    </ServiceOptionsContainer>
  );
};

export default ServiceOptionsManager;
