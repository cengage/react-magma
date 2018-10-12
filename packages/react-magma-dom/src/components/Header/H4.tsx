import * as React from 'react';
import styled, { css } from 'styled-components';
import { baseHeaderStyles } from './H1';

export interface H4Props {
  text: string;
}

const StyledH4 = styled.h4`
  ${baseHeaderStyles};
  font-size: 23px;
`;

export const H4: React.SFC<H4Props> = ({
  text
}: H4Props): JSX.Element => (
  <StyledH4>
    {text}
  </StyledH4>
);

export default H4;
