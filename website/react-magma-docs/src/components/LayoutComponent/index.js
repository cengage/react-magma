import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container, Heading } from 'react-magma-dom';
import { CONTENT_MAX_WIDTH } from '../PageContent';
import { PANEL_WIDTH } from '../SlidingDrawer';

const ContentSection = styled.section`
  grid-area: content;
`;

const StyledContainerTest = styled(Container)`
  background: ${magma.colors.neutral200} !important;
  color: ${magma.colors.neutral700};
  display: flow-root;
  margin: 0 auto;
  padding: 0;
  h1 {
    margin: 0;
  }
`;

const HeadingWrapper = styled.div`
  background: ${magma.colors.neutral200};
  padding: 34px 0;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;

  @media (max-width: ${CONTENT_MAX_WIDTH + PANEL_WIDTH}px) {
    padding: 34px 24px;
  }
  @media (max-width: ${magma.breakpoints.medium}px) {
    padding: 32px 16px 22px;
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
        {/* component's have headings, or main page */}
        {heading ? (
          <StyledContainerTest>
            <HeadingWrapper>
              <Heading level={1}>{heading}</Heading>
            </HeadingWrapper>
            <>{children}</>
          </StyledContainerTest>
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
