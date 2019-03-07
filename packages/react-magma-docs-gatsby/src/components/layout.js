import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import MainNav from './main-nav/main-nav'
import Masthead from './masthead/masthead'
import { MDXProvider } from '@mdx-js/tag'
import { Location } from '@reach/router'
import { Transition, config } from 'react-spring'
import {
  Button,
  Checkbox,
  Heading,
  Icon,
  ICONS,
  IconButton,
  Input,
  Label,
  LinkButton,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  magma
} from 'react-magma-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { convertTextToId } from '../utils'
import './app.css'
import './layout.css'
import './syntax.css'

const PreComponent = ({ className, ...props }) =>
  props.children.props.props &&
  props.children.props.props.className === 'language-.jsx' ? (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      scope={{
        Button,
        Checkbox,
        Heading,
        Icon,
        ICONS,
        IconButton,
        Input,
        Label,
        LinkButton,
        Radio,
        RadioGroup,
        Select,
        Toggle,
        magma
      }}
    >
      <div className="pre-container">
        <LiveEditor tabIndex="-1" />
      </div>
      <LiveError />
      <LivePreview />
    </LiveProvider>
  ) : (
    <pre {...props} />
  )

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
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <main className="main">
          <Masthead />
          <MainNav />
          <section className="content">
            <MDXProvider
              components={{
                pre: PreComponent,
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
                    {() => style => <article className="content-article" style={style}>{children}</article>}
                  </Transition>
                )}
              </Location>
            </MDXProvider>
          </section>
        </main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
