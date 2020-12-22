/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { Layout } from './src/components/layout';
import { SlidingDrawer } from './src/components/SlidingDrawer';
import { Masthead } from './src/components/Masthead';
import { SkipLink, GlobalStyles } from 'react-magma-dom';
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

const MainContainer = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 280px auto;
    grid-template-rows: 80px auto;
    grid-template-areas:
      'masthead masthead'
      'nav content';
  }
`;

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <>
      <GlobalStyles />
      <StyledSkipLink
        isInverse
        positionLeft={275}
        positionTop={16}
        variant="outline"
      />
      <MainContainer>
        <Masthead />
        <SlidingDrawer />
        <Layout {...props}>{element}</Layout>
      </MainContainer>
    </>
  );
};
