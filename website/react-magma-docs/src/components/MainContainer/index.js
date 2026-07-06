import React from 'react';

import styled from '@emotion/styled';
import { SkipLink, magma, Container, GlobalStyles } from 'react-magma-dom';

import { DarkModeContext } from '../DarkMode/DarkModeContext';
import { Masthead } from '../Masthead';
import { PANEL_WIDTH, SlidingDrawer } from '../SlidingDrawer';

const StyledContainer = styled.div`
  background: ${magma.colors.neutral100};
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: ${PANEL_WIDTH}px auto;
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

const StyledSlidingDrawer = styled(SlidingDrawer)`
  background: ${magma.colors.neutral100};
`;

export const MainContainer = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const value = { isDarkMode, setIsDarkMode };

  React.useEffect(() => {
    if (localStorage.getItem('isRMDarkMode') === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={value}>
      <Container gutterWidth={0} isInverse={isDarkMode} className={isDarkMode}>
        <GlobalStyles />
        <StyledSkipLink
          positionLeft={PANEL_WIDTH - 20}
          positionTop={3}
          variant="solid"
        />
        <StyledContainer>
          <Masthead />
          <StyledSlidingDrawer isInverse={isDarkMode} />
          {children}
        </StyledContainer>
      </Container>
    </DarkModeContext.Provider>
  );
};
