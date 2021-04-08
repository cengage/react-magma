import React from 'react';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import FocusLock from 'react-focus-lock';
import { MenuIcon, CrossIcon } from 'react-magma-icons';
import { IconButton, magma } from 'react-magma-dom';
import { MainNav } from '../MainNav';

export class SlidingDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isActivated: false,
    };
    this.toggleButtonRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
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
            from { transform: translateX(-280px); }
            to   { transform: translateX(0); }
        `;

    const slideout = keyframes`
            from { transform: translateX(0); }
            to   { transform: translateX(-280px); }
        `;

    const Panel = styled.div`
      background: ${magma.colors.neutral08};
      border-right: 1px solid ${magma.colors.neutral06};
      bottom: 0;
      grid-area: nav;
      overflow: auto;
      padding-bottom: 20px;
      position: fixed;
      top: 0;
      transform: translateX(-280px);
      width: 280px;

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

      @media (min-width: 1024px) {
        animation: none;
        padding-top: 20px;
        top: 88px;
        transform: translateX(0);
      }
    `;

    const PanelInner = styled.div`
      display: ${props => (props.isOpen ? 'block' : 'none')};

      @media (min-width: 1024px) {
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
      z-index: 3;
    `;

    const MenuButton = styled.span`
      position: fixed;
      top: 4px;
      left: 2px;
      z-index: 11;

      @media (min-width: 769px) {
        top: 20px;
      }

      @media (min-width: 1024px) {
        display: none;
      }
    `;

    const CloseButton = styled.span`
      display: block;
      text-align: right;

      @media (min-width: 1024px) {
        display: none;
      }
    `;

    const { isOpen, isActivated } = this.state;

    return (
      <FocusLock disabled={!isOpen}>
        <nav aria-label="Main site navigation">
          {true && (
            <MenuButton>
              <IconButton
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                icon={<MenuIcon />}
                isInverse
                onClick={this.openMenu}
                ref={this.toggleButtonRef}
                variant="link"
              />
            </MenuButton>
          )}
          <Panel isOpen={isOpen} isActivated={isActivated}>
            <PanelInner isOpen={isOpen}>
              <CloseButton>
                <IconButton
                  aria-label="Close navigation menu"
                  color="secondary"
                  icon={<CrossIcon />}
                  onClick={this.handleCloseMenu}
                  variant="link"
                />
              </CloseButton>
              <MainNav handleClick={this.handleCloseMenuFromNav} />
            </PanelInner>
          </Panel>
          {isOpen && <Overlay onClick={this.handleCloseMenu} />}
        </nav>
      </FocusLock>
    );
  }
}
