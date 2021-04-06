/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { Layout } from './src/components/layout';
import { MainContainer } from './src/components/MainContainer';

import { GlobalStyles } from 'react-magma-dom';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return (
    <>
      <GlobalStyles isInverse />
      <MainContainer>
        <Layout {...props}>{element}</Layout>
      </MainContainer>
    </>
  );
};
