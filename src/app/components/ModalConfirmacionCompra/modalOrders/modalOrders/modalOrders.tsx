import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close"; // Asegúrate de importar CloseIcon
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
} from "../modalOrdersStyles/modalOrdersStyles";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  // Estilos para el contenedor del botón de cierre
  const closeButtonContainerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    textAlign: "right",
    paddingTop: "20px",
    paddingRight: "20px",
  };

  // Estilos para el botón de cierre
  const closeButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledDialog
          open={isOpen}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
          TransitionProps={{ timeout: 0 }}
        >
          <motion.div
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
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div style={closeButtonContainerStyle}>
              <button style={closeButtonStyle} onClick={onClose}>
                <CloseIcon />
              </button>
            </div>

            {title && (
              <StyledDialogTitle id="form-dialog-title">
                {title}
              </StyledDialogTitle>
            )}
            <StyledDialogContent>{children}</StyledDialogContent>
            <StyledDialogActions>
              <StyledButton onClick={onClose}>Cerrar</StyledButton>
            </StyledDialogActions>
          </motion.div>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
