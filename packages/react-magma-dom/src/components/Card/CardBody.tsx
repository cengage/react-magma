import * as React from 'react';
import styled from '@emotion/styled';
import { CardProps } from './';

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

export function renderCardBody(props) {
  const { children } = props;

  return <StyledCardBody>{children}</StyledCardBody>;
}
