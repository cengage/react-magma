import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { SkipLinkContent, Heading } from 'react-magma-dom';
import { convertTextToId } from '../utils';
import './layout.css';
import { LayoutComponent } from './LayoutComponent';
import { SimplePropsTable } from './SimplePropsTable';
import { Divider } from './Divider';
import { NetlifyFooter } from './NetlifyFooter';
import styled from '@emotion/styled';
import { magma, Alert } from 'react-magma-dom';
import { DocsHeading } from './DocsHeading';
import { CodeBlock } from './CodeBlock';
import { Link } from 'gatsby';
import { IconButtonProps } from '../components/IconButtonProps';
import { ButtonProps } from '../components/ButtonProps';

const ContentArticle = styled.article`
  margin: 0 auto ${magma.spaceScale.spacing10};
  max-width: 900px;
  width: 80%;

  @media (max-width: 600px) {
    padding: 0 ${magma.spaceScale.spacing05};
    width: 100%;
  }
`;

const Table = props => <table {...props} />;

const PageHeading = props => <Heading level={1}>{props.children}</Heading>;

const SectionHeading = props => (
  <Heading
    level={2}
    id={convertTextToId(props.children)}
    style={{ marginTop: '-60px', paddingTop: '88px' }}
  >
    {props.children}
  </Heading>
);

const LinkHeading = props => (
  <Heading level={3} id={convertTextToId(props.children)}>
    {props.children}
  </Heading>
);

const H4 = props => <Heading level={4}>{props.children}</Heading>;
const H5 = props => <Heading level={5}>{props.children}</Heading>;
const H6 = props => <Heading level={6}>{props.children}</Heading>;
const SmartDocsHeading = props =>
  props && props.children && props.children.props ? (
    <DocsHeading
      to={props.children.props.href}
      type={props.children.props.title || ''}
    >
      {props.children.props.children}
    </DocsHeading>
  ) : (
    <PageHeading {...props} />
  );

export const Layout = ({ children, pageContext }) => {
  const title =
    pageContext && pageContext.frontmatter
      ? pageContext.frontmatter.pageTitle || pageContext.frontmatter.title || ''
      : '';

  const properties = (pageContext && pageContext.properties) || [];

  return (
    <LayoutComponent title={title}>
      <MDXProvider
        components={{
          code: CodeBlock,
          table: Table,
          h1: SmartDocsHeading,
          h2: SectionHeading,
          h3: LinkHeading,
          h4: H4,
          h5: H5,
          h6: H6,
          hr: Divider,
          Alert,
          Link,
          DocsHeading,
          ButtonProps,
          IconButtonProps,
          SimplePropsTable,
          pre: props => <div {...props} />,
          ...properties.reduce((acc, { name, properties }) => {
            return {
              ...acc,
              [name]: args => (
                <SimplePropsTable propertyValues={properties} {...args} />
              ),
            };
          }, {}),
        }}
      >
        <ContentArticle className="content-article">
          <SkipLinkContent>{children}</SkipLinkContent>
        </ContentArticle>
      </MDXProvider>
      <NetlifyFooter />
    </LayoutComponent>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
