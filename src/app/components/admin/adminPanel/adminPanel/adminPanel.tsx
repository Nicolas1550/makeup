import React, { useState } from "react";
import ProductForm from "../../productForm/productForm/productFrom";
import ProductTable from "../../productTable/productTable/productTable";
import {
  Button,
  StyledH1,
  ButtonContainer,
} from "../adminPanelStyled/adminPanelStyled";

import { GetServerSideProps } from "next";
import axios from "axios";
import { Product } from "../../../../redux/productManagementSlice/productManagementSlice";
import AssignAssistantToService from "@/app/components/servicesSection/assignAssistantToService/assignAssistantToService ";
import AssignRoleToUser from "@/app/components/servicesSection/assignRoleToUser/assignRoleToUser";
import ReservationsSummary from "../../adminOrdersAndReservations/adminReservationsSection";
import { AnimatePresence, motion } from "framer-motion";
import AdminOrdersSection from "../../adminOrdersAndReservations/adminOrdersSection";

interface Props {
  products: Product[];
}

const AdminPanel: React.FC<Props> = ({ products }) => {
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);
  const [assignModalButtonText, setAssignModalButtonText] = useState(
    "Asignar Ayudante a Servicio"
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [isAssignRoleModalOpen, setAssignRoleModalOpen] = useState(false);
  const [assignRoleModalButtonText, setAssignRoleModalButtonText] = useState(
    "Asignar Rol a Usuario"
  );
  const [showReservationsSummary, setShowReservationsSummary] = useState(false);
  const [showOrdersSummary, setShowOrdersSummary] = useState(false);

  const toggleAssignModal = () => {
    setAssignModalOpen(!isAssignModalOpen);
    setAssignModalButtonText(
      !isAssignModalOpen
        ? "Ocultar Asignacion de Ayudante a Servicio"
        : "Asignar Ayudante a Servicio"
    );
  };

  const toggleAssignRoleModal = () => {
    setAssignRoleModalOpen(!isAssignRoleModalOpen);
    setAssignRoleModalButtonText(
      !isAssignRoleModalOpen
        ? "Ocultar Asignacion de Rol a Usuario"
        : "Asignar Rol a Usuario"
    );
  };
  const handleCloseOrdersSummary = () => {
    setShowOrdersSummary(false);
  };
  const handleCloseReservationsSummary = () => {
    setShowReservationsSummary(false);
  };

  return (
    <div>
      <StyledH1>Panel de Administración</StyledH1>
      <ButtonContainer>
        <Button onClick={() => setShowTable(!showTable)}>
          {showTable ? "Ocultar Tabla" : "Mostrar Tabla"}
        </Button>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
        </Button>
        <Button onClick={toggleAssignModal}>{assignModalButtonText}</Button>
        <Button onClick={toggleAssignRoleModal}>
          {assignRoleModalButtonText}
        </Button>
        <Button
          onClick={() => setShowReservationsSummary(!showReservationsSummary)}
        >
          {showReservationsSummary
            ? "Ocultar Resumen de Reservas"
            : "Mostrar Resumen de Reservas"}
        </Button>
        <Button onClick={() => setShowOrdersSummary(!showOrdersSummary)}>
          {showOrdersSummary
            ? "Ocultar Resumen de Órdenes"
            : "Mostrar Resumen de Órdenes"}
        </Button>
      </ButtonContainer>

      <div style={{ margin: "20px 0" }}>
        {showForm && <ProductForm />}
        {showTable && <ProductTable products={products} />}
        {showReservationsSummary && (
          <ReservationsSummary onClose={handleCloseReservationsSummary} />
        )}
        {showOrdersSummary && (
          <AdminOrdersSection onClose={handleCloseOrdersSummary} />
        )}
        <AnimatePresence>
          {isAssignModalOpen && (
            <motion.div
              key="assignAssistantModal" // Clave única
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AssignAssistantToService
                serviceId={currentServiceId}
                onClose={toggleAssignModal}
              />
            </motion.div>
          )}
          {isAssignRoleModalOpen && (
            <motion.div
              key="assignRoleModal" // Clave única
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AssignRoleToUser onClose={toggleAssignRoleModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`https://sofiaportafolio.online/api/products`);
  const products = response.data;

  return {
    props: { products },
  };
};

export default AdminPanel;
