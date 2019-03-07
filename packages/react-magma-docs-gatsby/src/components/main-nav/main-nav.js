import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { IconButton } from 'react-magma-dom'
import { Router } from '@reach/router'
import './main-nav.css'

import { convertTextToId } from '../../utils'

const SubMenu = ({ headings }) => (
  <ul className="submenu">
    {headings.map((heading, index) => (
      <li key={index}>
        <a href={`#${convertTextToId(heading.value)}`}>{heading.value}</a>
      </li>
    ))}
  </ul>
)

const OpenMenu = () => {
  // TODO: Aria-expanded
  // TODO: Trap focus
  // TODO: Aria-hide content below overlay
  // TODO: Aria-hide and not allow focus over nav when menu is hidden
  // TODO: Close menu on escape press
  document.getElementsByTagName('html')[0].classList.add("nav-open");
}

const CloseMenu = () => {
  // TODO: Aria-expanded
  // TODO: Put focus on menu button
  // TODO: Close menu after tabbing out?
  // TODO: Trap focus
  // TODO: Aria-hide content below overlay
  // TODO: Add close button to menu and make that work too
  // TODO: Close menu on escape press
  document.getElementsByTagName('html')[0].classList.remove("nav-open");
}

const MainNav = () => (
  <StaticQuery
    query={graphql`
      fragment navFields on MdxEdge {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
          fields {
            slug
          }
          headings(depth: h2) {
            depth
            value
          }
        }
      }
      query NavQuery {
        designDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/design/**" } }
          sort: { order: ASC, fields: frontmatter___order }
        ) {
          edges {
            ...navFields
          }
        }
        apiDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/api/**" } }
          sort: { order: ASC, fields: frontmatter___order }
        ) {
          edges {
            ...navFields
          }
        }
      }
    `}
    render={data => (
      <nav>
        <span className="menu-button">
          <IconButton
              aria-expanded={false}
              icon="menu"
              iconOnly
              inverse
              onClick={OpenMenu}
              size="large"
              variant="link">Open Navigation Menu</IconButton>
          </span>
          <div className="main-nav">
            <div className="main-nav-inner">
              <div style={{"textAlign": "right"}}>
                <IconButton
                    color="secondary"
                    icon="cross"
                    iconOnly
                    onClick={CloseMenu}
                    variant="link">Close Navigation Menu</IconButton>
              </div>
              <h2>Magma System</h2>
              <ul>
                <li><a href="/">Introduction</a></li>
              </ul>
              <hr />
              <h2>Develop</h2>
              <ul>
                {data.apiDocs.edges.map(({ node }) => (
                  <li key={node.fields.slug}>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                    <Router>
                      <SubMenu path={node.fields.slug} headings={node.headings} />
                    </Router>
                  </li>
                ))}
              </ul>
              <hr />
              <h2>Design</h2>
              <ul>
                {data.designDocs.edges.map(({ node }) => (
                  <li key={node.fields.slug}>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </nav>
    )}
  />
)

export default MainNav
