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
const getResponsiveStyles = (width: number, height: number) => {
  let titleTransform = "translateY(-30px)";
  let subtitleTransform = "translateY(-30px)";
  let buttonTransform = "translateY(-30px)";

  if (height <= 606) {
    titleTransform = "translateY(0)";
    subtitleTransform = "translateY(0)";
    buttonTransform = "translateY(0)";
  }

  return {
    title: {
      fontSize: width < 720 ? "3rem" : "4rem",
      transform: titleTransform,
    },
    subtitle: {
      fontSize: width < 720 ? "1.5rem" : "1.8rem",
      transform: subtitleTransform,
    },
    ctaButton: {
      padding: width < 720 ? "0.6rem 1.5rem" : "0.8rem 2rem",
      fontSize: width < 720 ? "1rem" : "1.2rem",
      transform: buttonTransform,
    },
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
    marginTop: "4rem", // Este es tu margen actual
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 2s forwards",
    minHeight: "100px", // Altura mínima para garantizar el espacio
    display: "flex",
    alignItems: "center", // Alinea el contenido en el centro verticalmente
    justifyContent: "center", // Alinea el contenido en el centro horizontalmente
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
  const [windowHeight, setWindowHeight] = useState(0);

  // Inicializa windowWidth con un valor predeterminado
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar a handleResize inicialmente para establecer los valores
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveStyles = getResponsiveStyles(windowWidth, windowHeight);
  return (
    <header style={styles.header}>
      <div style={{ ...styles.title, ...responsiveStyles.title }}>
        Bienvenidos a Sofia Luciuk
      </div>
      <div style={{ ...styles.subtitle, ...responsiveStyles.subtitle }}>
        Descubre la magia del maquillaje con nosotros.
      </div>
      <Link href="/products" passHref>
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
