// ServiceCarousel.tsx
import React, { useCallback, useEffect, useState, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../../redux/store/appHooks";

import "swiper/css";
import "swiper/css/pagination";
import {
  deleteServiceImage,
  fetchServiceImages,
  uploadServiceImages,
} from "../../../../redux/serviceSlice/servicesSlice";
import {
  DeleteIconButton,
  ImageContainer,
  ImageEditingSection,
  StyledImageUploadInput,
  StyledButton,
  StyledCarouselContainer,
} from "./styledModalService";
import { useAppDispatch } from "../../../../redux/store/appHooks";

// Instala el módulo Autoplay en Swiper
SwiperCore.use([Autoplay]);

interface ServiceCarouselProps {
  serviceId: number;
  images: string[];
  isUserAssigned: boolean;
  isEditing: boolean;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = memo(
  ({ serviceId, images, isUserAssigned, isEditing }) => {
    const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
    const dispatch = useAppDispatch();
    const updatedImages = useAppSelector(
      (state) => state.services.serviceImages[serviceId] || []
    );
    const handleDeleteImage = useCallback(
      (imagePath: string) => {
        dispatch(deleteServiceImage({ serviceId, imagePath }));
        // No necesitas setTimeout o llamar a fetchServiceImages aquí
      },
      [dispatch, serviceId]
    );

    const handleSaveChanges = useCallback(() => {
      if (selectedImageFiles.length) {
        const formData = new FormData();
        selectedImageFiles.forEach((file) => {
          formData.append("images", file);
        });
        dispatch(uploadServiceImages({ serviceId, images: formData }));
        setSelectedImageFiles([]);
      }
    }, [dispatch, serviceId, selectedImageFiles]);

    useEffect(() => {
      dispatch(fetchServiceImages(serviceId))
        .then(unwrapResult)
        .then(() => {})
        .catch(() => {});
    }, [dispatch, serviceId]);

    const displayImages = [
      ...images,
      ...images,
      ...images,
      ...images,
      ...updatedImages,
    ];
    return (
      <StyledCarouselContainer>
        {displayImages.length > 0 && (
          <Swiper
            key={images.length}
            spaceBetween={30} // Espacio entre slides
            slidesPerView={3} // Número de slides a mostrar en pantallas grandes
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // En dispositivos móviles
              320: {
                slidesPerView: 1.1, // Muestra un poco más de una imagen
                spaceBetween: 10, // Espacio reducido entre slides
                centeredSlides: true, // Asegura que el slide central esté enfocado
              },
              // En pantallas medianas
              768: {
                slidesPerView: 2, // Muestra dos imágenes
                spaceBetween: 20,
              },
              // En pantallas grandes
              1024: {
                slidesPerView: 3, // Muestra tres imágenes
                spaceBetween: 30,
              },
            }}
          >
            {displayImages
              .filter((image) => image) // Filtrar imágenes no válidas o indefinidas
              .map((image, index) => (
                <SwiperSlide key={index}>
                  <ImageContainer>
                    <img
                      src={`http://localhost:3002/uploads/${image}?${Date.now()}`}
                      alt={`Carousel ${index}`}
                      loading="lazy" // Añadir atributo de carga perezosa
                    />

                    {isUserAssigned && isEditing && (
                      <DeleteIconButton
                        onClick={() => handleDeleteImage(image)}
                      >
                        🗑️
                      </DeleteIconButton>
                    )}
                  </ImageContainer>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        {isUserAssigned && isEditing && (
          <ImageEditingSection>
            <h4>Edición de Imágenes</h4>
            <div>
              <StyledImageUploadInput
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedImageFiles(Array.from(e.target.files));
                  }
                }}
              />
            </div>
            <StyledButton onClick={handleSaveChanges}>
              Guardar Cambios
            </StyledButton>
          </ImageEditingSection>
        )}
      </StyledCarouselContainer>
    );
  }
);
ServiceCarousel.displayName = "ServiceCarousel"; // Asigna un nombre de visualización

export default ServiceCarousel;
