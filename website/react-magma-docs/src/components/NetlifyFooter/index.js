import React from 'react';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const StyledFooter = styled('footer')`
  padding: ${magma.spaceScale.spacing07} 0;
  text-align: center;
  background: ${magma.colors.neutral100};
`;

export const NetlifyFooter = () => (
  <StyledFooter>
    <a href="https://www.netlify.com">
      <img
        src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </StyledFooter>
);
