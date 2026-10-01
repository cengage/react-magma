import React from 'react';

import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { magma, Container, Heading, useIsInverse } from 'react-magma-dom';

import { CONTENT_MAX_WIDTH } from '../PageContent';
import { PANEL_WIDTH } from '../SlidingDrawer';

const ContentSection = styled.section`
  grid-area: content;
`;

const StyledMain = styled.main`
  grid-area: content;
  min-width: 0;
`;

const StyledHeadingContainer = styled(Container)`
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral100};
  padding: 0;
  h1 {
    margin: 0;
  }
`;

const HeadingWrapper = styled.div`
  background: ${props =>
    props.isInverse ? magma.colors.neutral1100 : magma.colors.neutral100};
  padding: 24px 0;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;

  @media (max-width: ${CONTENT_MAX_WIDTH + PANEL_WIDTH + 48}px) {
    padding: 24px;
  }
  @media (max-width: ${magma.breakpoints.medium}px) {
    padding: 24px 16px;
  }
`;

export const LayoutComponent = props => {
  const { children, heading, title } = props;
  const isInverse = useIsInverse();

  return (
    <>
      <Helmet
        title={title ? `${title} - Magma` : 'Magma'}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <StyledMain>
        {/* components have headings, main page doesn't */}
        {heading ? (
          <>
            <StyledHeadingContainer isInverse={isInverse}>
              <div>
                <HeadingWrapper isInverse={isInverse}>
                  <Heading level={1}>{heading}</Heading>
                </HeadingWrapper>
              </div>
            </StyledHeadingContainer>
            <>{children}</>
          </>
        ) : (
          <Container gutterWidth={0}>
            <ContentSection className="content" style={{ marginTop: '40px' }}>
              {children}
            </ContentSection>
          </Container>
        )}
      </StyledMain>
    </>
  );
};
