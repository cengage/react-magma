import * as React from 'react';
import styled, { css } from 'styled-components';
import { magma } from '../../theme/magma';

export interface H1Props {
  text: string;
}

export const baseHeaderStyles = css`
  color: ${magma.primary02};
  font-family: ${magma.headingFont};
  font-weight: 500;
  line-height: 1.1;
  margin: 20px 0 10px;
`

const StyledH1 = styled.h1`
  ${baseHeaderStyles};
  font-size: 40px;
`;

export const H1: React.SFC<H1Props> = ({
  text
}: H1Props): JSX.Element => (
  <StyledH1>
    {text}
  </StyledH1>
);

export default H1;
