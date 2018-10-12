import * as React from 'react';
import styled, { css } from 'styled-components';
import { baseHeaderStyles } from './H1';

export interface H5Props {
  text: string;
}

const StyledH5 = styled.h5`
  ${baseHeaderStyles};
  font-size: 20px;
`;

export const H5: React.SFC<H5Props> = ({
  text
}: H5Props): JSX.Element => (
  <StyledH5>
    {text}
  </StyledH5>
);

export default H5;
