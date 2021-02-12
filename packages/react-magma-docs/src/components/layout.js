import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { SkipLinkContent, Label, Heading } from 'react-magma-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { convertTextToId } from '../utils';
import './layout.css';
import { LayoutComponent } from './LayoutComponent';
import { editorTheme } from './editorTheme';
import { v4 as uuid } from 'uuid';
import { SimplePropsTable } from './SimplePropsTable';
import { Divider } from './Divider';
import { NetlifyFooter } from './NetlifyFooter';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';
import { DocsHeading } from './DocsHeading';
import { CodeBlock } from './CodeBlock';

const PreContainer = styled.div`
  border: 1px solid ${magma.colors.neutral06};
  display: grid;
  max-width: 100%;
`;

const DemoContainer = styled.div`
  border: 1px solid ${magma.colors.neutral06};
  margin-bottom: ${magma.spaceScale.spacing06};
  padding: ${magma.spaceScale.spacing04};
`;

const ContentArticle = styled.article`
  margin: 0 auto ${magma.spaceScale.spacing10};
  max-width: 900px;
  width: 80%;

  @media (max-width: 600px) {
    padding: 0 ${magma.spaceScale.spacing05};
    width: 100%;
  }
`;

const PreComponent = ({ className, components, ...props }) => {
  const hideCode = props.children.props.hideCode;
  const hidePreview = props.children.props.hidePreview;

  const liveEditorId = React.useRef(uuid());

  return props.children.props &&
    props.children.props.className === 'language-.jsx' ? (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      scope={components}
      theme={editorTheme}
    >
      {!hideCode && (
        <>
          <Label htmlFor={liveEditorId.current}>Code Example</Label>
          <PreContainer>
            <LiveEditor
              textareaId={liveEditorId.current}
              ignoreTabKey
              tabIndex="-1"
            />
          </PreContainer>
        </>
      )}
      <LiveError />
      {!hidePreview && (
        <DemoContainer>
          <LivePreview />
        </DemoContainer>
      )}
    </LiveProvider>
  ) : (
    <div {...props} />
  );
};

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

export const ScopeableLayout = ({ children, components, pageContext }) => {
  const properties = (pageContext && pageContext.properties) || [];

  return (
    <MDXProvider
      components={{
        pre: preProps => <PreComponent {...preProps} components={components} />,
        table: Table,
        h2: SectionHeading,
        h3: LinkHeading,
        hr: Divider,
        SimplePropsTable: SimplePropsTable,
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
      {children}
    </MDXProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
