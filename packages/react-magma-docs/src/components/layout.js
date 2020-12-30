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
import { NetlifyFooter } from './NetlifyFooter';

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
          <div className="pre-container">
            <LiveEditor
              textareaId={liveEditorId.current}
              ignoreTabKey
              tabIndex="-1"
            />
          </div>
        </>
      )}
      <LiveError />
      {!hidePreview && (
        <div className="demo-container">
          <LivePreview />
        </div>
      )}
    </LiveProvider>
  ) : (
    <pre {...props} />
  );
};

const Table = props => (
  <div style={{ margin: '10px 0' }}>
    <table {...props} />
  </div>
);

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

export const Layout = ({ children, pageContext }) => {
  const title =
    pageContext && pageContext.frontmatter
      ? pageContext.frontmatter.pageTitle || pageContext.frontmatter.title || ''
      : '';

  return (
    <LayoutComponent title={title}>
      <MDXProvider
        components={{
          table: Table,
          h2: SectionHeading,
          h3: LinkHeading,
        }}
      >
        <article className="content-article">
          <SkipLinkContent>{children}</SkipLinkContent>
        </article>
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
