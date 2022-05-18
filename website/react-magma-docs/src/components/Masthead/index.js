import React from 'react';
import { Link } from 'gatsby';
import { Logo, SmallLogo } from '../Logo';
import styled from '@emotion/styled';
import { Header } from '@cengage-patterns/header';
import { magma, AppBarPosition } from 'react-magma-dom';
import { GithubIcon } from 'react-magma-icons';

const LogoLink = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral};
  display: inline-flex;
  font-size: ${magma.typeScale.size04.fontSize};
  font-weight: 600;
  text-decoration: none;

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${magma.colors.neutral100};
  }

  &:focus {
    outline: 2px solid ${magma.colors.focusInverse};
  }
`;

const StyledHeader = styled(Header)`
  box-shadow: none;
  padding: 16px;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const SmallLogoWrap = styled.span`
  display: none;
  margin-right: 24px;
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
  margin-right: 24px;
  position: relative;
  top: 2px;
  svg {
    height: 31px;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const RepoLink = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  left: 52px;
`;

const HeaderLogo = (
  <HeaderWrap>
    <LogoLink to="/">
      <SmallLogoWrap>
        <SmallLogo />
      </SmallLogoWrap>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      {/* <Tag color={TagColor.primary} size={TagSize.small}>v3.0.0</Tag> */}
    </LogoLink>
    <RepoLink to="https://github.com/cengage/react-magma">
      <GithubIcon color={magma.colors.neutral} />
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
