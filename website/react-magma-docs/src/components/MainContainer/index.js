import React from 'react';

import styled from '@emotion/styled';
import { SkipLink, magma, Container, GlobalStyles } from 'react-magma-dom';

import { DarkModeContext } from '../DarkMode/DarkModeContext';
import { Masthead } from '../Masthead';
import { SlidingDrawer } from '../SlidingDrawer';

const RootContainer = styled(Container)`
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral0};
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral100};
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 240px auto;
    grid-template-rows: 56px auto;
    grid-template-areas:
      'masthead masthead'
      'nav content';
  }
`;

const StyledSkipLink = styled(SkipLink)`
  display: none;

  @media (min-width: 1024px) {
    display: inline-flex;
  }
`;

export const MainContainer = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const drawerRef = React.useRef();
  const menuButtonRef = React.useRef();
  const value = { isDarkMode, setIsDarkMode };

  React.useEffect(() => {
    if (localStorage.getItem('isRMDarkMode') === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={value}>
      <RootContainer
        gutterWidth={0}
        isInverse={isDarkMode}
        className={isDarkMode ? 'isInverse' : undefined}
      >
        <GlobalStyles />
        <StyledSkipLink positionLeft={220} positionTop={3} variant="solid" />
        <StyledContainer isInverse={isDarkMode}>
          <Masthead
            isMenuOpen={isMenuOpen}
            menuButtonRef={menuButtonRef}
            onOpenMenu={() => drawerRef.current.openMenu()}
          />
          <SlidingDrawer
            isInverse={isDarkMode}
            onOpenChange={setIsMenuOpen}
            ref={drawerRef}
            toggleButtonRef={menuButtonRef}
          />
          {children}
        </StyledContainer>
      </RootContainer>
    </DarkModeContext.Provider>
  );
};
