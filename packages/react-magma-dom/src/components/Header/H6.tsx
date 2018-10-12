import * as React from 'react';
import styled, { css } from 'styled-components';
import { baseHeaderStyles } from './H1';

export interface H6Props {
  text: string;
}

const StyledH6 = styled.h6`
  ${baseHeaderStyles};
  font-size: 18px;
`;

export const H6: React.SFC<H6Props> = ({
  text
}: H6Props): JSX.Element => (
  <StyledH6>
    {text}
  </StyledH6>
);

export default H6;
