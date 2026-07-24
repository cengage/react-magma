import React from 'react';

import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Alert, Heading, magma, SkipLinkContent } from 'react-magma-dom';

import { PageContent } from './PageContent';
import { convertTextToId } from '../utils';
import './layout.css';
import { ButtonProps } from './ButtonProps';
import { CodeBlock } from './CodeBlock';
import { Divider } from './Divider';
import { IconButtonProps } from './IconButtonProps';
import { LayoutComponent } from './LayoutComponent';
import { LeadParagraph } from './LeadParagraph';
import { NetlifyFooter } from './NetlifyFooter';
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
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function scrollWithoutAnimation(top) {
  const html = document.querySelector('html');
  const previousScrollBehavior = html?.style.scrollBehavior;

  if (html) {
    html.style.scrollBehavior = 'auto';
  }

  window.scrollTo(0, Math.max(0, top));

  window.requestAnimationFrame(() => {
    if (html) {
      html.style.scrollBehavior = previousScrollBehavior;
    }
  });
}

function scrollToHash(hash) {
  if (!hash) {
    return false;
  }

  const targetId = decodeURIComponent(hash.slice(1));
  const element =
    document.getElementById(targetId) ||
    document.getElementsByName(targetId)[0];

  if (!element) {
    return false;
  }

  const offset = -40;
  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;

  scrollWithoutAnimation(elementPosition + offset);

  return true;
}

function scrollToRoute(location) {
  if (typeof window === 'undefined') {
    return;
  }

  if (location?.hash && scrollToHash(location.hash)) {
    return;
  }

  scrollWithoutAnimation(0);
}

const SmartDocsHeading = props => {
  return props && props.children && props.children.props ? (
    <h1>{props.children.props.children}</h1>
  ) : (
    <PageHeading {...props} />
  );
};

export const Layout = ({ children, location, pageContext }) => {
  const title =
    pageContext && pageContext.frontmatter
      ? pageContext.frontmatter.pageTitle || pageContext.frontmatter.title || ''
      : '';
  const heading =
    pageContext && pageContext.frontmatter ? pageContext.frontmatter.title : '';
  const properties = (pageContext && pageContext.properties) || [];

  useIsomorphicLayoutEffect(() => {
    scrollToRoute(location);

    const frame = window.requestAnimationFrame(() => {
      scrollToRoute(location);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location?.hash, location?.pathname, location?.search]);

  return (
    <LayoutComponent title={title} heading={heading}>
      <MDXProvider
        components={{
          // Inline code: simple highlight for single backticks
          code: props => <code>{props.children}</code>,
          pre: ({ children: preChildren }) => {
            return <CodeBlock children={preChildren} {...preChildren.props} />;
          },
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
          LeadParagraph,
          PageContent: props => (
            <PageContent {...props}>{props.children}</PageContent>
          ),
          ButtonProps,
          IconButtonProps,
          SimplePropsTable,
          ...properties.reduce((acc, { name, properties: propertyValues }) => {
            return {
              ...acc,
              [name]: args => (
                <SimplePropsTable propertyValues={propertyValues} {...args} />
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
  location: PropTypes.object,
};
