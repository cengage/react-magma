import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'
import { Location } from '@reach/router'
import { Transition, config } from 'react-spring'
import { SkipLinkContent } from 'react-magma-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { convertTextToId } from '../utils'
import './app.css'
import './layout.css'
import './syntax.css'
import LayoutComponent from './layout-comoponent'

const PreComponent = ({ className, components, ...props }) => {
  const hideCode = props.children.props.props.hideCode
  const hidePreview = props.children.props.props.hidePreview

  return props.children.props.props &&
    props.children.props.props.className === 'language-.jsx' ? (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      scope={components}
    >
      <div
        className="pre-container"
        style={hideCode ? { display: 'none' } : null}
      >
        <LiveEditor tabIndex="-1" />
      </div>
      <LiveError />
      <div style={hidePreview ? { display: 'none' } : null}>
        <LivePreview />
      </div>
    </LiveProvider>
  ) : (
    <pre {...props} />
  )
}

const Table = props => (
  <div style={{ margin: '10px 0' }}>
    <table {...props} />
  </div>
)

const SectionHeading = props => (
  <h2 id={convertTextToId(props.children)}>{props.children}</h2>
)

const LinkHeading = props => (
  <h3 id={convertTextToId(props.children)}>{props.children}</h3>
)

const Layout = ({ children }) => (
  <LayoutComponent>
    <MDXProvider
      components={{
        table: Table,
        h2: SectionHeading,
        h3: LinkHeading,
      }}
    >
      <Location>
        {({ location }) => (
          <Transition
            config={config.slow}
            keys={location.pathname}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {() => style => (
              <article className="content-article" style={style}>
                <SkipLinkContent>{children}</SkipLinkContent>
              </article>
            )}
          </Transition>
        )}
      </Location>
    </MDXProvider>
  </LayoutComponent>
)

export const ScopeableLayout = ({ children, components, ...props }) => (
  <LayoutComponent>
    <MDXProvider
      components={{
        pre: preProps => <PreComponent {...preProps} components={components} />,
        table: Table,
        h2: SectionHeading,
        h3: LinkHeading,
      }}
    >
      <Location>
        {({ location }) => (
          <Transition
            config={config.slow}
            keys={location.pathname}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {() => style => (
              <article className="content-article" style={style}>
                <SkipLinkContent>{children}</SkipLinkContent>
              </article>
            )}
          </Transition>
        )}
      </Location>
    </MDXProvider>
  </LayoutComponent>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
