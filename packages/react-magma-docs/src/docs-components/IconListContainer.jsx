import * as React from 'react';
const styled = require('styled-components').default;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const IconListContainer = props => (
  <StyledDiv>{props.children}</StyledDiv>
);
