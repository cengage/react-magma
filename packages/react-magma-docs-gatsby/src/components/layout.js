import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import MainNav from './main-nav'
import styled from 'styled-components'

import Header from './header'

// const GlobalStyles = createGlobalStyle`
//   body,html {
//     margin:0;
//     padding:0;
//   }
// `

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
          <Content>{children}</Content>
        </Main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
