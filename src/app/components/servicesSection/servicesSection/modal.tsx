import React, {useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../ModalConfirmacionCompra/modalOrders/modalOrdersStyles/modalOrdersStyles";
import { closeModal } from "@/app/redux/productSlice/features/reservationsModalSlice";
import { useAppDispatch } from "@/app/redux/store/appHooks";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onCloseCallback?: () => void; // Nuevo callback para cuando el modal se cierra
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onCloseCallback,
}) => {
  const dispatch = useAppDispatch();
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Estilos para el botón de cierre con position absolute
  const closeButtonContainerStyle: React.CSSProperties = {
    position: "sticky", // Contenedor con position sticky
    top: 0, // Alineado a la parte superior
    zIndex: 1000, // Asegúrate de que esté sobre otros elementos
    textAlign: "right", // Alinea el botón a la derecha
    paddingTop: "20px", // Espaciado en la parte superior
    paddingRight: "20px", // Espaciado en el lado derecho
  };

  // Estilos para el botón de cierre
  const closeButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    // Asegúrate de que event.target es un Node antes de llamar a contains
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target as Node)
    ) {
      dispatch(closeModal());
      onCloseCallback?.();
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <StyledDialog
          open={isOpen}
          aria-labelledby="form-dialog-title"
          TransitionProps={{ timeout: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalContentRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              maxWidth: "100%", // Asegúrate de que pueda expandirse al máximo en el contenedor del diálogo
              width: "auto",
              maxHeight: "80vh", // Altura máxima como porcentaje de la ventana gráfica
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={closeButtonContainerStyle}>
              <button
                style={closeButtonStyle}
                onClick={() => dispatch(closeModal())}
              >
                <CloseIcon />
              </button>
            </div>

            {title && (
              <StyledDialogTitle id="form-dialog-title">
                {title}
              </StyledDialogTitle>
            )}
            <StyledDialogContent>{children}</StyledDialogContent>
          </motion.div>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
