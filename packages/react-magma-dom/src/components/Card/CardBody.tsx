import * as React from 'react';
import styled from '@emotion/styled';
import { CardProps } from '.';

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

function renderCardBody(props) {
  const { children } = props;

  return <StyledCardBody>{children}</StyledCardBody>;
}

export const CardBody: React.FunctionComponent<CardProps> = (
  props: CardProps
) => renderCardBody(props);
