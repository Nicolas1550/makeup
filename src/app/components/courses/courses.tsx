import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { useAppSelector } from "../../../../src/app/redux/store/appHooks";
import { RootState } from "../../../../src/app/redux/store/rootReducer";
import { Curso } from "./componentCurso/cursoInfo/cursoInfo";

const selectCursoById = (
  state: RootState,
  courseId: number
): Curso | undefined => {
  const curso = state.cursos.cursos.find((curso) => curso.id === courseId);
  console.log("Curso seleccionado desde Redux:", curso); // Log para ver el curso obtenido de Redux
  return curso;
};
interface StyledCardProps {
  $imageUrl: string;
  bgUrl: string;
  cutUrl: string;
  title: string;
  description: string;
  borderStyle?: "lb" | "rb" | "bb";
  courseId: number; // Cambiado a number
}

const StyledCard: React.FC<StyledCardProps> = ({
  $imageUrl,
  bgUrl,
  cutUrl,
  title,
  description,
  borderStyle,
  courseId,
}) => {
  const curso = useAppSelector((state) => selectCursoById(state, courseId));
  const [precio, setPrecio] = useState("Cargando...");
  console.log("courseId en StyledCard:", courseId); // Log para confirmar el ID del curso
  useEffect(() => {
    if (curso) {
      setPrecio(curso.precio?.toString() || "No disponible");
    }
  }, [curso]);
  const cardRef = useRef<HTMLDivElement>(null);
  const angle = 15;

  useEffect(() => {
    const currentCardRef = cardRef.current;
    const isMobile = window.innerWidth <= 768;

    if (!currentCardRef || isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentCardRef.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = window.scrollY + (rect.top + rect.bottom) / 2;
      const offsetX = (event.pageX - centerX) / (rect.width / 2);
      const offsetY = (event.pageY - centerY) / (rect.height * 1);
      const rotateX = -angle * offsetY;
      const rotateY = angle * offsetX;

      currentCardRef.style.setProperty("--rotateX", `${rotateX}deg`);
      currentCardRef.style.setProperty("--rotateY", `${rotateY}deg`);
    };

    const handleMouseOut = () => {
      currentCardRef.style.setProperty("--rotateX", "0deg");
      currentCardRef.style.setProperty("--rotateY", "0deg");
    };

    currentCardRef.addEventListener("mousemove", handleMouseMove);
    currentCardRef.addEventListener("mouseout", handleMouseOut);

    return () => {
      currentCardRef.removeEventListener("mousemove", handleMouseMove);
      currentCardRef.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className={`block ${borderStyle}`} ref={cardRef}>
      <div
        className="shadowed"
        style={{ backgroundImage: `url(${$imageUrl})` }}
      ></div>
      <div
        className="img bg"
        style={{ backgroundImage: `url(${bgUrl})` }}
      ></div>
      <div
        className="img cut"
        style={{ backgroundImage: `url(${cutUrl})` }}
      ></div>
      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <strong className="price">${precio}</strong>
        <Link href={`/cursoDetalle/${courseId}`}>
          <button className="enroll-button">Inscribirse ahora</button>
        </Link>
      </div>
    </div>
  );
};

export default StyledCard;
