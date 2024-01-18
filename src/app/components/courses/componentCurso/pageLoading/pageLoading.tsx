// components/PageLoading.js
import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0; // Puedes personalizar el fondo como desees
`;

const PageLoading = () => (
  <LoadingContainer>
    <CircularProgress size={50} /> {/* Puedes personalizar esto también */}
  </LoadingContainer>
);

export default PageLoading;
