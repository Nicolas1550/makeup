import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const COLORS = {
  NEUTRAL_LIGHT: "#FAF3E0",
  DARKER_GRAY: "#808080",
  PINK_DARK: "#FF69B4",
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#E6E6FA",
  FOOTER_DARK: "#423F3E",
};

const FooterContainer = styled.footer`
  padding: 2rem 0;
  background: linear-gradient(145deg, #fadadd, #faf3e0);
  color: #555555;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2); // Sombra para un efecto elevado
`;
const SocialMediaLinks = styled.div`
  display: flex;
  gap: 1rem;
  a {
    color: ${COLORS.PINK_DARK};
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const MapIframe = styled.iframe`
  border: none;
  width: 100%;
  max-width: 400px;
  height: 200px;
  margin-bottom: 1rem;
  border-radius: 10px; // Bordes redondeados
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra suave
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }
`;

const Copyright = styled.div`
  font-size: 0.8rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.DARKER_GRAY}; // Línea separadora más oscura
`;
const Footer = () => {
  return (
    <FooterContainer>
      <SocialMediaLinks>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
      </SocialMediaLinks>

      <MapIframe
        title="Company Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.1032477205963!2d-67.71409132262193!3d-53.78764990322936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4b166648e7f521%3A0x8a37beb927785238!2sJ.%20B.%20Thorne%201145%2C%20V9420%20R%C3%ADo%20Grande%2C%20Tierra%20del%20Fuego!5e0!3m2!1ses-419!2sar!4v1702507074209!5m2!1ses-419!2sar"
      />
      <ContactInfo>
        <p>
          <FaMapMarkerAlt />
          Thorne 1145, Rio Grande
        </p>
      </ContactInfo>

      <ContactInfo>
        <p>
          <FaPhone />
          (123) 456-7890
        </p>
      </ContactInfo>

      <Copyright>
        &copy; {new Date().getFullYear()} Created by{" "}
        <a
          href="https://www.linkedin.com/in/sofia-luciuk/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0a66c2", textDecoration: "none" }} // Estilos en línea para el enlace
        >
          Sofia Luciuk
        </a>
        . All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
