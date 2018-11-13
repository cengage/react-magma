import * as React from 'react';
const styled = require('styled-components').default;

const StyledDiv = styled.div`
  margin: 0 0 120px;
`;

export const SelectContainer = props => (
  <StyledDiv>{props.children}</StyledDiv>
);
