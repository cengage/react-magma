import React from 'react';
import { Link } from 'gatsby';
import { Logo } from '../Logo';
import styled from '@emotion/styled';
import { Header } from '@cengage-patterns/header';
import { magma, useMediaQuery, AppBarPosition, Spacer } from 'react-magma-dom';

const LogoLink = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral08};
  display: inline-flex;
  font-size: ${magma.typeScale.size05.fontSize};
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${magma.colors.neutral08};
  }

  &:focus {
    outline: 2px solid ${magma.colors.focusInverse};
  }
`;

const HeaderLogo = (
  <LogoLink to="/">
    <Logo />
    <Spacer size={magma.spaceScale.spacing05} />
    React Magma
  </LogoLink>
);

export const Masthead = props => {
  const isSmallerScreen = useMediaQuery(
    `(max-width:${magma.breakpoints.medium}px)`
  );

  return (
    <Header
      breakpoint={magma.breakpoints.medium}
      isCompact={isSmallerScreen}
      isInverse
      logo={HeaderLogo}
      position={AppBarPosition.sticky}
      style={{ gridArea: 'masthead' }}
    >
      {props.children}
    </Header>
  );
};
