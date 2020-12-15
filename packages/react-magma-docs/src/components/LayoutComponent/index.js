import React from 'react';
import Helmet from 'react-helmet';

export const LayoutComponent = props => (
  <>
    <Helmet
      title={props.title ? `${props.title} - React Magma` : 'React Magma'}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <main>
      <section className="content">{props.children}</section>
    </main>
  </>
);
