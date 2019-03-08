import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
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
      <div>
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
    )}
  />
)

export default MainNav
