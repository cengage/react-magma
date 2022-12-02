import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container, Heading } from 'react-magma-dom';

const ContentSection = styled.section`
  grid-area: content;
`;

const HeadingWrapper = styled.div`
  padding: 34px 0;
  margin: 0 auto;
  max-width: 1112px;

  @media (max-width: ${magma.breakpoints.large}px) {
    padding: 34px 24px;
  }
  @media (max-width: ${magma.breakpoints.medium}px) {
    padding: 32px 16px;
  }
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
            style={{ background: magma.colors.neutral200 }}
          >
            <HeadingWrapper>
              <Heading level={1}>{heading}</Heading>
            </HeadingWrapper>
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
