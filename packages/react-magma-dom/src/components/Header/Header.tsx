import * as React from 'react';
import styled, { css } from 'styled-components';
import { magma } from '../../theme/magma';

export interface HeaderProps {
  children: React.ReactChild;
  size: number;
  id?: string;
}

export const baseHeaderStyles = css`
  color: ${magma.primary02};
  font-family: ${magma.headingFont};
  font-weight: 500;
  line-height: 1.1;
  margin: 20px 0 10px;
`;

const StyledH1 = styled.h1`
  ${baseHeaderStyles};
  font-size: 40px;
`;

const StyledH2 = styled.h2`
  ${baseHeaderStyles};
  font-size: 32px;
`;

const StyledH3 = styled.h3`
  ${baseHeaderStyles};
  font-size: 26px;
`;

const StyledH4 = styled.h4`
  ${baseHeaderStyles};
  font-size: 23px;
`;

const StyledH5 = styled.h5`
  ${baseHeaderStyles};
  font-size: 20px;
`;

const StyledH6 = styled.h6`
  ${baseHeaderStyles};
  font-size: 18px;
`;

function renderHeader({ size, children, id }: HeaderProps) {
  const headerSizes = {
    1: StyledH1,
    2: StyledH2,
    3: StyledH3,
    4: StyledH4,
    5: StyledH5,
    6: StyledH6
  };

  const HeaderComponent = headerSizes[size];

  return <HeaderComponent id={id}>{children}</HeaderComponent>;
}

export const Header: React.SFC<HeaderProps> = (
  props: HeaderProps
): JSX.Element => renderHeader(props);

export default Header;
