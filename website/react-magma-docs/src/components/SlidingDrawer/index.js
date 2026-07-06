import React from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import FocusLock from 'react-focus-lock';
import { Container, IconButton, magma, Spacer } from 'react-magma-dom';
import { MenuIcon, CloseIcon } from 'react-magma-icons';

import { Logo } from '../Logo';
import { MainNav } from '../MainNav';

export const PANEL_WIDTH = 280;
const DRAWER_TRANSITION_DURATION = 250;
const DRAWER_NAVIGATION_DELAY = 180;

export class SlidingDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActivated: false,
    };
    this.toggleButtonRef = React.createRef();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleCloseMenuFromNav = this.handleCloseMenuFromNav.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  closeMenu = returnFocus => {
    if (this.state.isOpen) {
      if (typeof document !== 'undefined') {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        document.removeEventListener('keydown', this.handleKeypress, false);
      }

      this.setState({ isOpen: false }, () => {
        setTimeout(() => {
          this.setState({ isActivated: false });
          if (returnFocus) {
            this.toggleButtonRef.current.focus();
          }
        }, DRAWER_TRANSITION_DURATION);
      });
    }
  };

  componentWillUnmount = () => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeypress, false);
    }
  };

  openMenu = () => {
    if (typeof document !== 'undefined') {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      document.addEventListener('keydown', this.handleKeypress, false);
    }
    this.setState({ isOpen: true, isActivated: true });
  };

  handleCloseMenu() {
    this.closeMenu(true);
  }

  handleCloseMenuFromNav(event) {
    const shouldDelayNavigation =
      event &&
      this.state.isOpen &&
      typeof window !== 'undefined' &&
      window.innerWidth <= 1024 &&
      !event.defaultPrevented &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.shiftKey;
    const targetPath = event?.currentTarget?.getAttribute('href');

    if (shouldDelayNavigation && targetPath?.startsWith('/')) {
      event.preventDefault();
      this.closeMenu(false);
      window.setTimeout(() => {
        navigate(targetPath);
      }, DRAWER_NAVIGATION_DELAY);

      return;
    }

    this.closeMenu(false);
  }

  handleKeypress(event) {
    if (event.keyCode === 27) {
      this.closeMenu(true);
    }
  }

  render() {
    const slidein = keyframes`
            from { transform: translateX(-${PANEL_WIDTH}px); }
            to   { transform: translateX(0); }
        `;

    const slideout = keyframes`
            from { transform: translateX(0); }
            to   { transform: translateX(-${PANEL_WIDTH}px); }
        `;

    const Panel = styled(Container)`
      border-right: 1px solid
        ${props =>
          props.isInverse ? magma.colors.borderInverse : magma.colors.border};
      bottom: 0;
      grid-area: nav;
      margin: 0;
      overflow: auto;
      padding: 0 0 24px;
      position: fixed;
      top: 0;
      transform: translateX(-${PANEL_WIDTH}px);
      width: ${PANEL_WIDTH}px;

      ${props =>
        props.isActivated &&
        css`
          animation: 0.2s ${slideout};
          z-index: 11;
        `}

      ${props =>
        props.isOpen &&
        css`
          animation: 0.2s ${slidein};
          transform: translateX(0);
          z-index: 11;
        `};

      @media (min-width: 1025px) {
        animation: none;
        background: ${magma.colors.neutral100};
        top: 56px;
        transform: translateX(0);
      }
      @media (max-width: ${magma.breakpoints.large}px) {
        width: ${PANEL_WIDTH}px;
      }
    `;

    const PanelInner = styled.div`
      display: ${props => (props.isActivated ? 'block' : 'none')};
      @media (min-width: 1025px) {
        display: block;
      }
    `;

    const Overlay = styled.div`
      background: rgba(0, 0, 0, 0.6);
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 10;
    `;

    const MenuButton = styled.span`
      align-items: center;
      display: flex;
      height: 56px;
      position: fixed;
      top: 0;
      left: 6px;
      z-index: 11;
      @media (min-width: 1025px) {
        display: none;
      }
    `;

    const SmallLogoLink = styled.div`
      display: flex;
      align-items: center;
      color: ${magma.colors.neutral700};
      font-size: ${magma.typeScale.size05.fontSize};
      font-weight: 500;
      padding-top: 4px;
      text-decoration: none;
      text-transform: uppercase;
      svg {
        height: 24px;
      }
      @media (min-width: ${magma.breakpoints.large}px) {
        display: none;
      }
    `;

    const CloseButton = styled.span`
      justify-content: flex-end;
      flex: 1;
      text-align: right;
      button {
        bottom: 4px;
      }
      @media (min-width: ${magma.breakpoints.large}px) {
        display: none;
      }
    `;

    const { isOpen, isActivated } = this.state;
    const { isInverse } = this.props;

    return (
      <FocusLock disabled={!isOpen}>
        <Container gutterWidth={0}>
          <nav aria-label="Main site navigation">
            <MenuButton>
              <IconButton
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                color="secondary"
                icon={<MenuIcon />}
                onClick={this.openMenu}
                ref={this.toggleButtonRef}
                variant="link"
              />
            </MenuButton>
            <Panel
              isOpen={isOpen}
              isActivated={isActivated}
              isInverse={isInverse}
            >
              <PanelInner isActivated={isActivated}>
                <SmallLogoLink to="/">
                  <Spacer size={magma.spaceScale.spacing05} />
                  <Logo />
                  <Spacer size={magma.spaceScale.spacing04} />
                  React Magma
                  <CloseButton>
                    <IconButton
                      aria-label="Close navigation menu"
                      color="secondary"
                      icon={<CloseIcon />}
                      onClick={this.handleCloseMenu}
                      variant="link"
                    />
                  </CloseButton>
                </SmallLogoLink>
                <MainNav handleClick={this.handleCloseMenuFromNav} />
              </PanelInner>
            </Panel>
            {isActivated && <Overlay onClick={this.handleCloseMenu} />}
          </nav>
        </Container>
      </FocusLock>
    );
  }
}
