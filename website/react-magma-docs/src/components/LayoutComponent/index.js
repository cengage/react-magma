import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container, Heading } from 'react-magma-dom';

const ContentSection = styled.section`
  grid-area: content;
  background: ${magma.colors.neutral100};
`;

export const LayoutComponent = props => {
  return (
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
        <Container
          gutterWidth={0}
          style={{ background: magma.colors.neutral200 }}
        >
          <Heading
            level={1}
            style={{ padding: '32px 0 32px 100px', marginBottom: 0 }}
          >
            {props.heading}
          </Heading>
          <ContentSection className="content">{props.children}</ContentSection>
        </Container>
      </main>
    </>
  );
};
