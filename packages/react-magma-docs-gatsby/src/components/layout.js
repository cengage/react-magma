import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import MainNav from './main-nav'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'
import { Button, Heading, Icon, ICONS, Input } from 'react-magma-dom'
import { IconContainer } from './iconContainer'
import { IconListContainer } from './iconListContainer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { convertTextToId } from '../utils'

import Header from './header'

import './syntax.css'

const Content = styled.article`
  grid-area: content;
`

const Main = styled.main`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 200px auto;
  grid-template-rows: 100px auto;
  grid-template-areas:
    'nav header'
    'nav content';
`

const PreComponent = ({ className, ...props }) =>
  props.children.props.props &&
  props.children.props.props.className === 'language-.jsx' ? (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      scope={{
        Button,
        Heading,
        Icon,
        ICONS,
        IconContainer,
        IconListContainer,
        Input,
      }}
    >
      <LiveEditor tabIndex="-1" />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  ) : (
    <pre {...props} />
  )

const Table = props => <table {...props} />

const SectionHeading = props => (
  <h2 id={convertTextToId(props.children)}>{props.children}</h2>
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
        <Main>
          <MainNav />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>
            <MDXProvider
              components={{
                pre: PreComponent,
                table: Table,
                h2: SectionHeading,
              }}
            >
              {children}
            </MDXProvider>
          </Content>
        </Main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
