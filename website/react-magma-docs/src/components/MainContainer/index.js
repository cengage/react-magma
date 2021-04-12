import React from 'react';
import styled from '@emotion/styled';
import { Masthead } from '../Masthead';
import { SlidingDrawer } from '../SlidingDrawer';
import {
  SkipLink,
  magma,
  Container,
  Toggle,
  GlobalStyles,
} from 'react-magma-dom';

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
  const [checked, updateChecked] = React.useState(false);

  function handleUpdateChecked() {
    updateChecked(!checked);
  }

  const HeaderToggle = (
    <Toggle
      checked={checked}
      isInverse
      labelText="Dark mode"
      onChange={handleUpdateChecked}
    />
  );

  const isInverse = checked;

  return (
    <Container
      gutterWidth={0}
      isInverse={isInverse}
      className={isInverse && 'isInverse'}
    >
      <GlobalStyles />
      <StyledSkipLink
        isInverse
        positionLeft={275}
        positionTop={16}
        variant="outline"
      />
      <StyledContainer>
        <Masthead>{HeaderToggle}</Masthead>
        <SlidingDrawer isInverse={isInverse} />
        {children}
      </StyledContainer>
    </Container>
  );
};
