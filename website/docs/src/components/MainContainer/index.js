import React from 'react';
import styled from '@emotion/styled';
import { Masthead } from '../Masthead';
import { Sidebar } from '../Sidebar';
import { DarkModeContext } from '../DarkMode/DarkModeContext';

import { SkipLink, magma, Container, GlobalStyles } from '@react-magma/dom';

const StyledContainer = styled.div`
  @media (min-width: ${magma.breakpoints.large + 1}px) {
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

  &:not(:disabled):focus {
    background: transparent;
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
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
        <StyledContainer>
          <Masthead />
          <Sidebar />
          {children}
        </StyledContainer>
      </Container>
    </DarkModeContext.Provider>
  );
};
