import * as React from 'react';
const styled = require('styled-components').default;

const StyledSpan = styled.span`
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 10px;
  min-width: 200px;
`;

export const IconContainer = props => <StyledSpan>{props.children}</StyledSpan>;
