import styled from '@emotion/styled';
import React from 'react';
import { Container, Heading, magma } from 'react-magma-dom';
import { CONTENT_MAX_WIDTH } from '../PageContent';
import { PANEL_WIDTH } from '../SlidingDrawer';

const ContentSection = styled.section`
  grid-area: content;
`;

const StyledHeadingContainer = styled(Container)`
  background: ${magma.colors.neutral200};
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
  const { children, heading } = props;

  return (
    <main>
      {/* components have headings, main page doesn't */}
      {heading ? (
        <>
          <StyledHeadingContainer>
            <div style={{ background: magma.colors.neutral200 }}>
              <HeadingWrapper>
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
    </main>
  );
};

