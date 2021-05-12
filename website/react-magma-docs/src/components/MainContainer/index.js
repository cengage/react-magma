import React from 'react';
import styled from '@emotion/styled';
import { Masthead } from '../Masthead';
import { SlidingDrawer } from '../SlidingDrawer';
import { DarkModeContext } from '../DarkMode/DarkModeContext';

import {
  SkipLink,
  ngl,
  magma,
  Container,
  GlobalStyles,
  ThemeContext,
} from 'react-magma-dom';

const StyledContainer = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.large}px) {
    display: grid;
    grid-template-columns: 280px auto;
    grid-template-rows: 88px auto;
    grid-template-areas:
      'masthead masthead'
      'nav content';
  }
`;

const StyledSkipLink = styled(SkipLink)`
  display: none;

  &:not(:disabled):focus {
    background: transparent;
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
`;

export const MainContainer = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const darkModeValue = { isDarkMode, setIsDarkMode };

  const [theme, setTheme] = React.useState(magma);
  const themeValue = { theme, setTheme };

  React.useEffect(() => {
    if (localStorage.getItem('isRMDarkMode') === 'true') {
      setIsDarkMode(true);
    }

    if (localStorage.getItem('rmTheme') === 'ngl') {
      setTheme(ngl);
    }
  }, []);

  return (
    <ThemeContext.Provider value={themeValue}>
      <DarkModeContext.Provider value={darkModeValue}>
        <Container
          gutterWidth={0}
          isInverse={isDarkMode}
          className={isDarkMode && 'isInverse'}
        >
          <GlobalStyles />
          <StyledSkipLink
            isInverse
            positionLeft={275}
            positionTop={16}
            variant="outline"
          />
          <StyledContainer theme={theme}>
            <Masthead />
            <SlidingDrawer isInverse={isDarkMode} />
            {children}
          </StyledContainer>
        </Container>
      </DarkModeContext.Provider>
    </ThemeContext.Provider>
  );
};
