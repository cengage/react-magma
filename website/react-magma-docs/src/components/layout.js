import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Heading, magma, SkipLinkContent } from 'react-magma-dom';
import { ButtonProps } from '../components/ButtonProps';
import { IconButtonProps } from '../components/IconButtonProps';
import { convertTextToId } from '../utils';
import { CodeBlock } from './CodeBlock';
import { Divider } from './Divider';
import './layout.css';
import { LayoutComponent } from './LayoutComponent';
import { NetlifyFooter } from './NetlifyFooter';
import { PageContent } from './PageContent';
import { SimplePropsTable } from './SimplePropsTable';

const ContentArticle = styled.article`
  @media (max-width: 1025px) {
    margin: 0 auto;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
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
const SmartDocsHeading = props => {
  return props && props.children && props.children.props ? (
    <h1>{props.children.props.children}</h1>
  ) : (
    <PageHeading {...props} />
  );
};

export const Head = ({ title }) => (
  <>
    <title>{title ? `${title} - React Magma` : 'React Magma'}</title>
    <meta name="description" content="Sample" />
    <meta name="keywords" content="sample, something" />
    <html lang="en" />
  </>
);

export const Layout = ({ children, pageContext }) => {
  const title =
    pageContext && pageContext.frontmatter
      ? pageContext.frontmatter.pageTitle || pageContext.frontmatter.title || ''
      : '';
  const heading =
    pageContext && pageContext.frontmatter ? pageContext.frontmatter.title : '';
  const properties = (pageContext && pageContext.properties) || [];

  return (
    <LayoutComponent title={title} heading={heading}>
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
          PageContent: props => (
            <PageContent {...props}>{props.children}</PageContent>
          ),
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
