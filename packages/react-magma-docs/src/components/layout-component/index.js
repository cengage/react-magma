import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { SlidingDrawer } from '../sliding-drawer'
import Masthead from '../masthead'
import { SkipLink, GlobalStyles } from 'react-magma-dom'
import styled from '@emotion/styled'

const StyledSkipLink = styled(SkipLink)`
  display: none;

  &:not(:disabled):focus {
    background: transparent;
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
`

export default props => (
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
        <GlobalStyles />
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <StyledSkipLink
          isInverse
          positionLeft={275}
          positionTop={16}
          variant="outline"
        />
        <div className="main-container">
          <Masthead />
          <SlidingDrawer />
          <main className="content">{props.children}</main>
        </div>
      </>
    )}
  />
)
