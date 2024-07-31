import React from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import FocusLock from 'react-focus-lock';
import { Logo } from '../Logo';
import { MenuIcon, CloseIcon } from 'react-magma-icons';
import { Container, IconButton, magma, Spacer } from 'react-magma-dom';
import { MainNav } from '../MainNav';

export const PANEL_WIDTH = 240;

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
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
      document.removeEventListener('keydown', this.handleKeypress, false);

      this.setState({ isOpen: false }, () => {
        setTimeout(() => {
          this.setState({ isActivated: false });
          if (returnFocus) {
            this.toggleButtonRef.current.focus();
          }
        }, 250);
      });
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeypress, false);
  };

  openMenu = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    this.setState({ isOpen: true, isActivated: true });

    document.addEventListener('keydown', this.handleKeypress, false);
  };

  handleCloseMenu() {
    this.closeMenu(true);
  }

  handleCloseMenuFromNav() {
    this.closeMenu(false);
  }

  handleKeypress(event) {
    if (event.keyCode === 27) {
      this.closeMenu(true);
    }
  }

  render() {
    const slidein = keyframes`
            from { transform: translateX(-300px); }
            to   { transform: translateX(0); }
        `;

    const slideout = keyframes`
            from { transform: translateX(0); }
            to   { transform: translateX(-300px); }
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
      transform: translateX(-300px);
      width: ${PANEL_WIDTH}px;

      ${props =>
        props.isActivated &&
        css`
          animation: 0.2s ${slideout};
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
        background: ${magma.colors.neutral200};
        top: 56px;
        transform: translateX(0);
      }
      @media (max-width: ${magma.breakpoints.large}px) {
        width: 300px;
      }
    `;

    const PanelInner = styled.div`
      display: ${props => (props.isOpen ? 'block' : 'none')};
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
      position: fixed;
      top: 4px;
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
              <PanelInner isOpen={isOpen}>
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
            {isOpen && <Overlay onClick={this.handleCloseMenu} />}
          </nav>
        </Container>
      </FocusLock>
    );
  }
}
