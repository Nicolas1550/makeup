// DropdownMenu.js
import React, { forwardRef, useState, useEffect, memo } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store/appHooks";
import { resetNewOrdersCount } from "../../../redux/orderSlice/orderSlice";
import {
  DropdownMenu as StyledDropdownMenu,
  colors,
} from "../navbarStyles/navbarStyles";
import Badge from "@mui/material/Badge";
import Modal from "../../servicesSection/servicesSection/modal";
import ReservationsForAssistant from "../../servicesSection/servicesSection/reservationForAssistant/reservationsForAssistant";
import UserReservations from "../../servicesSection/servicesSection/userReservations";
import {
  fetchReservationsForAssistant,
  fetchReservationsForUser,
  resetNewReservationsCount,
} from "@/app/redux/serviceSlice/servicesSlice";
import { openModal } from "@/app/redux/productSlice/features/reservationsModalSlice";
import styled from "styled-components";

// Estilos para el botón dentro del menú desplegable
const DropdownButton = styled.button`
  background-color: ${colors.pinkLight};
  color: ${colors.darkerGray};
  border: none;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%; /* Ocupar todo el ancho disponible del contenedor */
  text-align: center;
  border-radius: 6px; /* Asegurarse de que el border-radius sea el mismo en todos lados */
  font-weight: bold;

  &:hover {
    background-color: ${colors.purpleLight};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: auto; /* Permite que el botón se ajuste al contenido */
    margin: 0; /* Elimina los márgenes para centrar correctamente */
  }
`;

interface DropdownMenuProps {
  onLogout: () => void;
  onViewHistory: () => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const DropdownMenuComponent = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    { onLogout, onViewHistory, toggleDropdown },
    ref 
  ) => {
    const userRoles = useAppSelector((state) => state.auth.userRoles);
    const userId = useAppSelector((state) => state.auth.userId);
    const newReservationsCount = useAppSelector(
      (state) => state.services.newReservationsCount
    );
    const dispatch = useAppDispatch();
    const isReservationsModalOpen = useAppSelector(
      (state) => state.reservationsModal.isReservationsModalOpen
    );
    const newOrdersCount = useAppSelector(
      (state) => state.order.newOrdersCount
    );
    const [isModalOpen] = useState(false);

    const handleReservationsClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      dispatch(openModal());
      dispatch(resetNewReservationsCount()); 
    };

    const handleViewHistoryClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      dispatch(resetNewOrdersCount());
      onViewHistory();
    };

    useEffect(() => {
      if (isModalOpen) {
        if (userRoles.includes("ayudante")) {
          dispatch(
            fetchReservationsForAssistant({ ayudanteId: Number(userId) })
          );
        } else if (userId !== null) {
          dispatch(fetchReservationsForUser(userId));
        }
      }
    }, [isModalOpen, userRoles, userId, dispatch]);

    const handleLogoutClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      onLogout();
      toggleDropdown();
    };

    return (
      <StyledDropdownMenu ref={ref}>
        <DropdownButton onClick={handleReservationsClick}>
          Reservas
          {newReservationsCount > 0 && (
            <Badge badgeContent={newReservationsCount} color="error" />
          )}
        </DropdownButton>
        <DropdownButton onClick={handleViewHistoryClick}>
          Ver Órdenes{" "}
          {newOrdersCount > 0 && (
            <Badge badgeContent={newOrdersCount} color="error" />
          )}
        </DropdownButton>
        <DropdownButton onClick={handleLogoutClick}>
          Cerrar Sesión
        </DropdownButton>
        <Modal
          isOpen={isReservationsModalOpen}
          title={
            userRoles.includes("ayudante")
              ? "Reservas del Ayudante"
              : "Mis Reservas"
          }
        >
          {userRoles.includes("ayudante") ? (
            <ReservationsForAssistant key={userId} />
          ) : (
            <UserReservations />
          )}
        </Modal>
      </StyledDropdownMenu>
    );
  }
);
DropdownMenuComponent.displayName = "DropdownMenuComponent";

const DropdownMenu = memo(DropdownMenuComponent);

export default DropdownMenu;
