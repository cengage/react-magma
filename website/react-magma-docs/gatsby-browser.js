/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { Layout } from './src/components/layout';
import { MainContainer } from './src/components/MainContainer';
import { Masthead } from './src/components/Masthead';
import { SlidingDrawer } from './src/components/SlidingDrawer';
import {
  SkipLink,
  GlobalStyles,
  magma,
  Container,
  Toggle,
} from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledSkipLink = styled(SkipLink)`
  display: none;

  &:not(:disabled):focus {
    background: transparent;
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
`;

const HeaderToggle = <Toggle labelText="Dark mode" />;

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <Container
      className="isInverse"
      gutterWidth={0}
      isInverse
      style={{ background: magma.colors.foundation }}
    >
      <GlobalStyles />
      <StyledSkipLink
        isInverse
        positionLeft={275}
        positionTop={16}
        variant="outline"
      />
      <MainContainer>
        <Masthead>{HeaderToggle}</Masthead>
        <SlidingDrawer />
        <Layout {...props}>{element}</Layout>
      </MainContainer>
    </Container>
  );
};
