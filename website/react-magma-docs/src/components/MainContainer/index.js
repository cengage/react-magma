import React from 'react';
import styled from '@emotion/styled';
import { DarkModeToggle } from '../DarkModeToggle';
import { Masthead } from '../Masthead';
import { SlidingDrawer } from '../SlidingDrawer';
import { SkipLink, magma, Container, GlobalStyles } from 'react-magma-dom';

const StyledContainer = styled.div`
  @media (min-width: ${magma.breakpoints.large}px) {
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

  const isBrowser = typeof window !== 'undefined';

  React.useEffect(() => {
    if (localStorage.getItem('isRMDarkMode') === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  function handleDarkModeClick() {
    localStorage.setItem('isRMDarkMode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  return (
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
        <Masthead>
          {isBrowser && (
            <DarkModeToggle
              isDarkMode={isDarkMode}
              onClick={handleDarkModeClick}
            />
          )}
        </Masthead>
        <SlidingDrawer isInverse={isDarkMode} />
        {children}
      </StyledContainer>
    </Container>
  );
};
