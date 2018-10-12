import * as React from 'react';
import styled, { css } from 'styled-components';
import { baseHeaderStyles } from './H1';

export interface H2Props {
  text: string;
}

const StyledH2 = styled.h2`
  ${baseHeaderStyles};
  font-size: 32px;
`;

export const H2: React.SFC<H2Props> = ({
  text
}: H2Props): JSX.Element => (
  <StyledH2>
    {text}
  </StyledH2>
);

export default H2;
