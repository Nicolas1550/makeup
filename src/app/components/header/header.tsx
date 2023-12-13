import React, { useEffect, useState } from "react";
import "./shinyButton.css";
import Link from "next/link";

const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
};

interface Style {
  header: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  ctaButton: React.CSSProperties;
}
const getResponsiveStyles = (width: number) => {
  if (width < 720) {
    return {
      title: { fontSize: "3rem" }, // Menor tamaño de fuente para el título
      subtitle: { fontSize: "1.5rem" }, // Menor tamaño de fuente para el subtítulo
      ctaButton: { padding: "0.6rem 1.5rem", fontSize: "1rem" }, // Botón más pequeño
    };
  }
  return {
    title: styles.title,
    subtitle: styles.subtitle,
    ctaButton: styles.ctaButton,
  };
};
const styles: Style = {
  header: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'url("/img/122.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: colors.neutralLight,
    textAlign: "center",
    boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.6)",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    marginTop: "1rem",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 2s forwards",
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 2.5s forwards",
  },
  ctaButton: {
    padding: "0.8rem 2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: colors.neutralLight,
    backgroundColor: colors.pinkDark,
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 3s forwards",
  },
};

const HeaderPresentation: React.FC = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Inicializa windowWidth con un valor predeterminado
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Establece el ancho de la ventana una vez que el componente se monta en el cliente
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveStyles = getResponsiveStyles(windowWidth);
  return (
    <header style={styles.header}>
      <div style={{ ...styles.title, ...responsiveStyles.title }}>
        Bienvenidos a Fabiana Gimenez
      </div>
      <div style={{ ...styles.subtitle, ...responsiveStyles.subtitle }}>
        Descubre la magia del maquillaje con nosotros.
      </div>
      <Link href="/products">
        {" "}
        {/* Paso 2: Envuelve el botón con Link y proporciona la ruta */}
        <button
          className="btn-shiny"
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          style={{
            ...styles.ctaButton,
            ...responsiveStyles.ctaButton,
            transform: isButtonHovered
              ? "scale(1.05) translateY(-30px)"
              : "translateY(-30px)",
          }}
        >
          Explora nuestros productos
        </button>
      </Link>
    </header>
  );
};

export default HeaderPresentation;
