import * as React from 'react';
import styled from '../../theme/styled';
import { CardProps } from '../Card';

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

export const CardBody: React.FunctionComponent<CardProps> = ({
  children,
  testId,
  ...other
}: CardProps) => {
  return (
    <StyledCardBody {...other} data-testid={testId}>
      {children}
    </StyledCardBody>
  );
};
