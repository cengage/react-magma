import React from 'react';
import { Paragraph } from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 0;
  }
`;

const LeadParagraph = ({ children }) => (
  <StyledParagraph visualStyle="bodyLarge">{children}</StyledParagraph>
);

export default LeadParagraph;
