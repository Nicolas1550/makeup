import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Alert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-black">
              Bienvenido a mi página
            </h2>
            <p className="mb-4">
              Aquí puedes encontrar información importante sobre cómo utilizar
              mi plataforma.
            </p>
            <p className="mb-4">
              Visita mi perfil de LinkedIn para más actualizaciones:
              <a
                href="https://www.linkedin.com/in/sofia-luciuk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Sofía Luciuk
              </a>
            </p>
            <p className="mb-4">
              También puedes ver mi última publicación:
              <a
                href="https://www.linkedin.com/posts/sofia-luciuk_me-complace-compartir-con-ustedes-mi-%C3%BAltimo-activity-7153581009383415808-ixL3?utm_source=share&utm_medium=member_desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Última publicación
              </a>
            </p>
            <p className="mb-4">
              Si te registras en mi página, tendrás un minuto de acceso como
              administrador para explorar las diferentes opciones, como el panel
              de administración en la barra de navegación.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
