import React from 'react';
import styled from '@emotion/styled';
import {
  Drawer,
  IconButton,
  magma,
  useMediaQuery,
  VisuallyHidden,
} from '@react-magma/dom';
import { MenuIcon } from 'react-magma-icons';
import { Logo } from '../Logo';
import { Content } from './Content';

console.log(Content)

const MainNav = styled.div`
  border-right: 1px solid ${magma.colors.neutral06};
  background: ${magma.colors.neutral07};
  overflow-y: auto;
  /* top: 56px; */
  height: calc(100vh - 56px);
`;

const StyledDrawer = styled(Drawer)`
  background: ${magma.colors.neutral07};
  overflow-y: auto;
  height: calc(100vh - 56px);
  > div {
    padding: 16px 0 0 0;
    > svg {
      position: relative;
      left: 16px;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  color: ${magma.colors.neutral};
  position: fixed;
  top: 4px;
  left: 4px;
  z-index: 11;
  min-width: auto;
  width: 40px;
  border-radius: 50%;
  span {
    padding-left: 0;
  }
`;

export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const isSmallerScreen = useMediaQuery(
    `(max-width:${magma.breakpoints.large}px)`
  );

  return (
    <>
      {isSmallerScreen ? (
        <>
          <StyledIconButton
            onClick={() => setShowDrawer(true)}
            aria-label="Open navigation menu"
            icon={<MenuIcon />}
            isInverse
            variant="link"
          >
            <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
          </StyledIconButton>
          <StyledDrawer
            onClose={() => setShowDrawer(false)}
            isOpen={showDrawer}
            position="left"
          >
            <Logo />
            <Content/>
          </StyledDrawer>
        </>
      ) : (
        <MainNav><Content/></MainNav>
      )}
    </>
  );
};
