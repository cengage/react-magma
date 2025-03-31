import React from 'react';

import { Header } from '@cengage-patterns/header';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import {
  magma,
  AppBarPosition,
  ButtonVariant,
  IconButton,
} from 'react-magma-dom';
import { GithubIcon } from 'react-magma-icons';

import { Logo } from '../Logo';

const LogoLink = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral700};
  display: inline-flex;
  font-size: ${magma.typeScale.size05.fontSize};
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${magma.colors.neutral700};
  }

  &:focus {
    outline: 2px solid ${magma.colors.focus};
  }
`;

const StyledHeader = styled(Header)`
  box-shadow: none;
  padding: 24px;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const SmallLogoWrap = styled.span`
  display: none;
  margin-right: 12px;
  position: relative;
  top: 2px;
  svg {
    height: 31px;
  }
  @media (max-width: 600px) {
    display: block;
  }
`;

const LogoWrap = styled.span`
  display: block;
  margin-right: 12px;
  position: relative;
  top: 2px;
  svg {
    height: 31px;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const RepoLink = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  left: 52px;
`;

const HeaderLogo = (
  <HeaderWrap>
    <LogoLink to="/">
      <SmallLogoWrap>
        <Logo />
      </SmallLogoWrap>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      React Magma
      {/* <Tag color={TagColor.primary} size={TagSize.small}>v3.0.0</Tag> */}
    </LogoLink>
    <RepoLink>
      <IconButton
        icon={<GithubIcon />}
        variant={ButtonVariant.link}
        onClick={() =>
          window.open('https://github.com/cengage/react-magma', '_blank')
        }
      />
    </RepoLink>
  </HeaderWrap>
);

export const Masthead = props => {
  return (
    <StyledHeader
      breakpoint={magma.breakpoints.medium}
      isCompact
      logo={HeaderLogo}
      position={AppBarPosition.sticky}
      style={{ gridArea: 'masthead' }}
    >
      {props.children}
    </StyledHeader>
  );
};
