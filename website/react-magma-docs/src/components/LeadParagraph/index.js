import { Paragraph } from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 0;
  }
`;

export const LeadParagraph = ({ children }) => (
  <StyledParagraph visualStyle="bodyLarge">{children}</StyledParagraph>
);
