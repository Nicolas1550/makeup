import React, { useEffect, useState } from "react";
import {
  FaPaintBrush,
  FaBirthdayCake,
  FaHandSparkles,
  FaCut,
  FaUserAlt,
  FaUserMd as DermatologyIcon,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import { fetchServices } from "../../../redux/serviceSlice/servicesSlice";
import {
  CategoryContainer,
  CategoryDescription,
  CategoryTitle,
  SeeMoreButton,
  ServiceCard,
  ServiceDescription,
  ServiceIcon,
  ServiceTitle,
  ServicesGrid,
} from "./styleSection";
import { RootState } from "@/app/redux/store/rootReducer";
import AdminLogin from "../../admin/login/loginUserAdmin/loginUserAdmin";
import { openLoginModal } from "@/app/redux/loginModalSlice/loginModalSlice";
import ServiceModal from "./serviceModal/serviceModal"; // Importación del nuevo componente modal

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  assistantId?: number;
  color?: string;
  image_url?: string; // <-- Agrega esta línea
}

const ServicesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(
    (state: RootState) => state.services.services
  );
  const loading = useAppSelector((state: RootState) => state.services.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const isUserLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handlePurchaseClick = (service: Service) => {
    if (selectedService?.id !== service.id) {
      setSelectedService(service);
    }

    if (!isUserLoggedIn) {
      dispatch(openLoginModal());
    } else {
      setIsModalOpen(true);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FaPaintBrush":
        return <FaPaintBrush />;
      case "FaBirthdayCake":
        return <FaBirthdayCake />;
      case "FaUserAlt":
        return <FaUserAlt />;
      case "FaHandSparkles":
        return <FaHandSparkles />;
      case "FaCut":
        return <FaCut />;
      case "DermatologyIcon":
        return <DermatologyIcon />;
      default:
        return null;
    }
  };

  const makeupServices = services.filter(
    (service) => service.category === "Maquillaje"
  );
  const beautyServices = services.filter(
    (service) => service.category === "Belleza"
  );
  useEffect(() => {
    const updatedService = services.find((s) => s.id === selectedService?.id);
    if (updatedService) {
      setSelectedService(updatedService);
    }
  }, [services, selectedService?.id]);

  if (loading) return <div>Cargando servicios...</div>;

  return (
    <div>
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedService={selectedService}
        />
      )}
      {isLoginModalOpen && <AdminLogin />}

      <CategoryContainer>
        <CategoryTitle>Servicios de Maquillaje</CategoryTitle>
        <CategoryDescription>
          Descubre una amplia gama de servicios de maquillaje para todas tus
          necesidades.
        </CategoryDescription>
        <ServicesGrid>
          {makeupServices.map((service: Service) => (
            <ServiceCard key={service.id}>
              <ServiceIcon>{getIconComponent(service.icon)}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <SeeMoreButton onClick={() => handlePurchaseClick(service)}>
                Ver más
              </SeeMoreButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </CategoryContainer>

      <CategoryContainer>
        <CategoryTitle>Cuidado y Belleza</CategoryTitle>
        <CategoryDescription>
          Desde el cuidado de tus uñas hasta tratamientos dermatológicos
          avanzados.
        </CategoryDescription>
        <ServicesGrid>
          {beautyServices.map((service: Service) => (
            <ServiceCard key={service.id}>
              <ServiceIcon>{getIconComponent(service.icon)}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <SeeMoreButton onClick={() => handlePurchaseClick(service)}>
                Ver más
              </SeeMoreButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </CategoryContainer>
    </div>
  );
};

export default ServicesSection;
