import React from 'react';

import styled from '@emotion/styled';
import { magma, Paragraph, useIsInverse } from 'react-magma-dom';

const StyledParagraph = styled(Paragraph)`
  && {
    color: ${props =>
      props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
    margin-top: 0;
  }

  && > p {
    color: ${props =>
      props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
  }
`;

export const LeadParagraph = ({ children }) => {
  const isInverse = useIsInverse();

  return (
    <StyledParagraph isInverse={isInverse} visualStyle="bodyLarge">
      {children}
    </StyledParagraph>
  );
};
