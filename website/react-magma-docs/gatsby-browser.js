/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { Layout } from './src/components/layout';
import { MainContainer } from './src/components/MainContainer';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return (
    <>
      <MainContainer>
        <Layout {...props}>{element}</Layout>
      </MainContainer>
    </>
  );
};
