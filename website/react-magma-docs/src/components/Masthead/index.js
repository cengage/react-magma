import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'gatsby';
import {
  magma,
  AppBarPosition,
  ButtonColor,
  ButtonVariant,
  IconButton,
  AppBar,
  useIsInverse,
} from 'react-magma-dom';
import { GithubIcon, MenuIcon } from 'react-magma-icons';

import { Logo } from '../Logo';

const LogoLink = styled(Link)`
  align-items: center;
  color: ${props =>
    props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
  display: inline-flex;
  font-size: ${magma.typeScale.size05.fontSize};
  font-weight: 700;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: ${props =>
      props.isInverse ? magma.colors.neutral0 : magma.colors.brand.navy};
  }

  &:focus {
    outline: 2px solid ${magma.colors.focus};
  }
`;

const StyledHeader = styled(AppBar)`
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral0};
  border-bottom: 1px solid
    ${props =>
      props.isInverse ? magma.colors.neutral800 : magma.colors.neutral200};
  box-shadow: none;
  padding: 24px 16px;

  @media (max-width: 1024px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const MenuButton = styled.span`
  align-items: center;
  display: inline-flex;
  margin-right: 8px;

  @media (min-width: 1025px) {
    display: none;
  }
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
`;

const getHeaderLogo = isInverse => (
  <HeaderWrap>
    <LogoLink isInverse={isInverse} to="/">
      <SmallLogoWrap>
        <Logo />
      </SmallLogoWrap>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      Magma
      {/* <Tag color={TagColor.primary} size={TagSize.small}>v3.0.0</Tag> */}
    </LogoLink>
    <RepoLink>
      <IconButton
        color={ButtonColor.subtle}
        icon={<GithubIcon />}
        variant={ButtonVariant.link}
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.open('https://github.com/cengage/react-magma', '_blank');
          }
        }}
      />
    </RepoLink>
  </HeaderWrap>
);

export const Masthead = props => {
  const isInverse = useIsInverse();

  return (
    <StyledHeader
      breakpoint={magma.breakpoints.medium}
      isCompact
      isInverse={isInverse}
      position={AppBarPosition.sticky}
      style={{ gridArea: 'masthead' }}
    >
      <MenuButton>
        <IconButton
          aria-label="Open navigation menu"
          aria-controls="main-site-navigation-panel"
          aria-expanded={props.isMenuOpen}
          color={ButtonColor.subtle}
          icon={<MenuIcon />}
          onClick={props.onOpenMenu}
          ref={props.menuButtonRef}
          variant={ButtonVariant.link}
        />
      </MenuButton>
      {getHeaderLogo(isInverse)}
    </StyledHeader>
  );
};
