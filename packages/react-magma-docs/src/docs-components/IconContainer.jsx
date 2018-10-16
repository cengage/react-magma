import * as React from 'react';
const styled = require('styled-components').default;

const StyledSpan = styled.span`
  padding: 20px;
`;

export const IconContainer = props => <StyledSpan>{props.children}</StyledSpan>;
