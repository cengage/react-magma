import React from 'react';

import styled from '@emotion/styled';
import { magma, useIsInverse } from 'react-magma-dom';

const StyledFooter = styled.footer`
  padding: ${magma.spaceScale.spacing07} 0;
  text-align: center;
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral100};
  border-top: 1px solid
    ${props =>
      props.isInverse ? magma.colors.neutral800 : magma.colors.neutral200};
`;

export const NetlifyFooter = () => {
  const isInverse = useIsInverse();

  return (
    <StyledFooter isInverse={isInverse}>
      <a href="https://www.netlify.com">
        <img
          src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
          alt="Deploys by Netlify"
        />
      </a>
    </StyledFooter>
  );
};
