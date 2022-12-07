import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { magma, Container } from 'react-magma-dom';

const ContentSection = styled.section`
  grid-area: content;
  padding: ${magma.spaceScale.spacing07} 0 0;
`;

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
      <Container gutterWidth={0}>
        <ContentSection className="content">{props.children}</ContentSection>
      </Container>
    </main>
  </>
);
