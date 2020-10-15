/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";
import Layout from "./src/components/layout";
import { SlidingDrawer } from './src/components/sliding-drawer';
import Masthead from './src/components/masthead';

export const wrapRootElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <div className="main-container">
      <Masthead />
      <SlidingDrawer />
      <Layout {...props}>
        {element}
      </Layout>
    </div>;
};
