import React from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, navigate } from 'gatsby';
import FocusLock from 'react-focus-lock';
import { Container, IconButton, magma, Spacer } from 'react-magma-dom';
import { MenuIcon, CloseIcon } from 'react-magma-icons';

import { Logo } from '../Logo';
import { MainNav } from '../MainNav';

export const PANEL_WIDTH = 280;
const DRAWER_TRANSITION_DURATION = 250;
const DRAWER_NAVIGATION_DELAY = 180;
const NAV_PANEL_ID = 'main-site-navigation-panel';

export class SlidingDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActivated: false,
    };
    this.toggleButtonRef = React.createRef();
    this.closeButtonRef = React.createRef();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleCloseMenuFromNav = this.handleCloseMenuFromNav.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  focusElement(ref, fallbackSelector) {
    const fallbackElement =
      typeof document !== 'undefined'
        ? document.querySelector(fallbackSelector)
        : null;
    const element =
      ref?.current && typeof ref.current.focus === 'function'
        ? ref.current
        : fallbackElement;

    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }

  closeMenu = returnFocus => {
    if (this.state.isOpen) {
      if (typeof document !== 'undefined') {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        document.removeEventListener('keydown', this.handleKeypress, false);
      }

      this.setState({ isOpen: false }, () => {
        setTimeout(() => {
          this.setState({ isActivated: false }, () => {
            if (returnFocus) {
              this.focusElement(
                this.toggleButtonRef,
                '[aria-label="Open navigation menu"]'
              );
            }
          });
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
    this.setState({ isOpen: true, isActivated: true }, () => {
      window.requestAnimationFrame(() => {
        this.focusElement(
          this.closeButtonRef,
          '[aria-label="Close navigation menu"]'
        );
      });
    });
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

    const MobileDrawerHeader = styled.div`
      align-items: center;
      display: flex;
      min-height: 48px;
      padding: 0 ${magma.spaceScale.spacing04};
      @media (min-width: ${magma.breakpoints.large}px) {
        display: none;
      }
    `;

    const SmallLogoLink = styled(Link)`
      align-items: center;
      display: flex;
      color: ${magma.colors.neutral700};
      font-size: ${magma.typeScale.size05.fontSize};
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      svg {
        height: 24px;
      }

      &:focus {
        outline: 2px solid ${magma.colors.focus};
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
                aria-controls={NAV_PANEL_ID}
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
              id={NAV_PANEL_ID}
            >
              <PanelInner isActivated={isActivated}>
                <MobileDrawerHeader>
                  <SmallLogoLink to="/">
                    <Logo />
                    <Spacer size={magma.spaceScale.spacing04} />
                    React Magma
                  </SmallLogoLink>
                  <CloseButton>
                    <IconButton
                      aria-label="Close navigation menu"
                      color="secondary"
                      icon={<CloseIcon />}
                      onClick={this.handleCloseMenu}
                      ref={this.closeButtonRef}
                      variant="link"
                    />
                  </CloseButton>
                </MobileDrawerHeader>
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
