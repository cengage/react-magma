import React from 'react';

import styled from '@emotion/styled';
import { Paragraph } from 'react-magma-dom';

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 0;
  }
`;

export const LeadParagraph = ({ children }) => (
  <StyledParagraph visualStyle="bodyLarge">{children}</StyledParagraph>
);
