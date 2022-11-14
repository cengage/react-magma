import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container, Heading } from 'react-magma-dom';

const ContentSection = styled.section`
  grid-area: content;
  margin-top: 12px;
`;

export const LayoutComponent = props => {
  console.log('props', props);
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
          // style={props?.heading && { background: magma.colors.neutral100 }}
        >
          {props?.heading && (
            <Heading
              level={1}
              style={
                {
                  padding: '32px 0 32px 100px',
                  // marginBottom: '40px',
                  marginBottom: '0',
                  background: magma.colors.neutral200,
                }
              }
            >
              {props.heading}
            </Heading>
          )}
          <ContentSection
            className="content"
            style={
              props && props.heading && {
                marginTop: '40px',
              }
            }
          >
            {props.children}
          </ContentSection>
        </Container>
      </main>
    </>
  );
};
