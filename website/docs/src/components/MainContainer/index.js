import React from 'react';
import styled from '@emotion/styled';
import { Masthead } from '../Masthead';
import { DarkModeContext } from '../DarkMode/DarkModeContext';

import { SkipLink, magma, Container } from '@react-magma/dom';
import { GlobalStyles } from '@react-magma/themes';

const StyledContainer = styled.div`
  @media (min-width: ${magma.breakpoints.large}px) {
    display: grid;
    grid-template-columns: 0 auto;
    grid-template-rows: 88px auto;
    grid-template-areas:
      'masthead masthead'
      'nav content';
  }
`;

const SideBar = styled.div`

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
          <SideBar />
          {children}
        </StyledContainer>
      </Container>
    </DarkModeContext.Provider>
  );
};
