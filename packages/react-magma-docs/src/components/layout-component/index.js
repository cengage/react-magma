import React from 'react';
import Helmet from 'react-helmet';
import { SlidingDrawer } from '../sliding-drawer';
import Masthead from '../masthead';
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

export default props => (
  <>
    <GlobalStyles />
    <Helmet
      title={props.title ? `${props.title} - React Magma` : 'React Magma'}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <StyledSkipLink
      isInverse
      positionLeft={275}
      positionTop={16}
      variant="outline"
    />
    <div className="main-container">
      <Masthead />
      <SlidingDrawer />
      <main>
        <section className="content">{props.children}</section>
      </main>
    </div>
  </>
);
