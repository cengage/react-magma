import React from 'react';
import { Link } from 'gatsby';
import { Logo } from '../Logo';
import styled from '@emotion/styled';
import { Header } from '@cengage-patterns/header';
import {
  magma,
  useMediaQuery,
  AppBarPosition,
  Spacer,
  ThemeContext,
} from 'react-magma-dom';

const LogoLink = styled(Link)`
  align-items: center;
  color: ${props => props.theme.appBar.inverse.textColor};
  display: inline-flex;
  font-size: ${props => props.theme.typeScale.size05.fontSize};
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${props => props.theme.appBar.inverse.textColor};
  }

  &:focus {
    outline: 2px dotted ${props => props.theme.colors.focusInverse};
  }
`;

const HeaderLogo = theme => {
  return (
    <LogoLink theme={theme} to="/">
      <Logo theme={theme} />
      <Spacer size={theme.spaceScale.spacing05} />
      React Magma
    </LogoLink>
  );
};
export const Masthead = props => {
  const { theme } = React.useContext(ThemeContext);

  const isSmallerScreen = useMediaQuery(
    `(max-width:${theme.breakpoints.medium}px)`
  );

  return (
    <Header
      breakpoint={magma.breakpoints.medium}
      isCompact={isSmallerScreen}
      isInverse
      logo={HeaderLogo(theme)}
      position={AppBarPosition.sticky}
      style={{ gridArea: 'masthead' }}
      theme={theme}
    >
      {props.children}
    </Header>
  );
};
