import React from 'react';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const StyledContainer = styled.div`
  @media (min-width: ${magma.breakpoints.large}px) {
    display: grid;
    grid-template-columns: 280px auto;
    grid-template-rows: 80px auto;
    grid-template-areas:
      'masthead masthead'
      'nav content';
  }
`;

export const MainContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);
