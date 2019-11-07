import * as React from 'react';
import styled from '../../theme/styled';
import { CardProps } from '.';

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

export const CardBody: React.FunctionComponent<CardProps> = ({
  children
}: CardProps) => {
  return <StyledCardBody>{children}</StyledCardBody>;
};
