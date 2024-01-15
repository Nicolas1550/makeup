// CursoDetalle.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/appHooks";
import { fetchCursoCompletoById } from "@/app/redux/coursesSlice/coursesSlice";
import {
  CursoDetalleContainer,
  CursoTitulo,
} from "../../src/app/components/courses/componentCurso/styleCursoId/cursoDetalle.styles";
import ImageCarousel from "@/app/components/courses/componentCurso/imageCarousel/imageCarousel";
import ImagenPrincipal from "@/app/components/courses/componentCurso/imagenPrincipal/imagenPrincipal";
import ClasesList from "@/app/components/courses/componentCurso/clasesList/clasesList";
import CursoInfo from "@/app/components/courses/componentCurso/cursoInfo/cursoInfo";
import {
  ContenedorPrincipal,
  InfoYClasesContainer,
} from "@/app/components/courses/componentCurso/clasesList/clasesListStyled";

const CursoDetalle = () => {
  const dispatch = useAppDispatch();
  const { cursoActual, loading, error } = useAppSelector(
    (state) => state.cursos
  );
  const [mostrarTodasLasClases, setMostrarTodasLasClases] = useState(false);
  const router = useRouter();
  const cursoId = router.query.cursoId ? router.query.cursoId.toString() : "";

  useEffect(() => {
    if (router.isReady && cursoId) {
      dispatch(fetchCursoCompletoById(cursoId));
    }
  }, [dispatch, router.isReady, cursoId]);

  if (loading) {
    return (
      <CursoDetalleContainer>
        <CircularProgress />
      </CursoDetalleContainer>
    );
  }

  if (error) {
    return (
      <CursoDetalleContainer>
        <CursoTitulo>Error al cargar el curso: {error}</CursoTitulo>
      </CursoDetalleContainer>
    );
  }

  return (
    <>
      <ImagenPrincipal
        urlImagen={`https://asdasdasd3.onrender.com/image/${cursoActual?.imagen_principal}`}
      />
      <CursoDetalleContainer>
        <ContenedorPrincipal>
          <ImageCarousel
            images={cursoActual?.imagenes || []}
            baseUrl={"https://asdasdasd3.onrender.com/"}
            title={cursoActual?.nombre}
            description={cursoActual?.descripcion}
            cursoId={cursoId}
          />
          <InfoYClasesContainer>
            <CursoInfo curso={cursoActual} />
            <ClasesList
              clases={cursoActual?.clases || []}
              mostrarTodas={mostrarTodasLasClases}
              setMostrarTodas={setMostrarTodasLasClases}
              maxClasesInicial={5}
            />
          </InfoYClasesContainer>
        </ContenedorPrincipal>
      </CursoDetalleContainer>
    </>
  );
};

export default CursoDetalle;
