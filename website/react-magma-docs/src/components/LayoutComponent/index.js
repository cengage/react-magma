import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container, Heading } from 'react-magma-dom';

const ContentSection = styled.section`
  grid-area: content;
`;

export const LayoutComponent = props => {
  const { children, heading, title } = props;

  return (
    <>
      <Helmet
        title={title ? `${title} - React Magma` : 'React Magma'}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <main>
        {/* component */}
        {heading ? (
          <Container
            gutterWidth={0}
            style={{ background: magma.colors.neutral100 }}
          >
            <Heading
              level={1}
              style={{
                padding: '32px 0 32px 100px',
                marginBottom: '0',
                background: magma.colors.neutral200,
              }}
            >
              {heading}
            </Heading>
            <div>{children}</div>
          </Container>
        ) : (
          <Container gutterWidth={0}>
            <ContentSection className="content" style={{ marginTop: '40px' }}>
              {children}
            </ContentSection>
          </Container>
        )}
      </main>
    </>
  );
};
