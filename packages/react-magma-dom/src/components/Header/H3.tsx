import * as React from 'react';
import styled, { css } from 'styled-components';
import { baseHeaderStyles } from './H1';

export interface H3Props {
  text: string;
}

const StyledH3 = styled.h3`
  ${baseHeaderStyles};
  font-size: 26px;
`;

export const H3: React.SFC<H3Props> = ({
  text
}: H3Props): JSX.Element => (
  <StyledH3>
    {text}
  </StyledH3>
);

export default H3;
