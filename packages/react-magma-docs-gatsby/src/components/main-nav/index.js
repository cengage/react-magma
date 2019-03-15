import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import './main-nav.css'

import { convertTextToId } from '../../utils'

const SubMenu = ({ headings, handleClick }) => (
  <ul className="submenu">
    {headings.map((heading, index) => (
      <li key={index}>
        <a href={`#${convertTextToId(heading.value)}`} onClick={handleClick}>{heading.value}</a>
      </li>
    ))}
  </ul>
)

const MainNav = ({...props}) => (
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
      <div className="main-nav">
          <h2>Magma System</h2>
          <ul>
            <li><a href="/" onClick={props.handleClick}>Introduction</a></li>
          </ul>
          <hr />
          <h2>Develop</h2>
          <ul>
            {data.apiDocs.edges.map(({ node }) => (
              <li key={node.fields.slug}>
                <Link onClick={props.handleClick} to={node.fields.slug}>{node.frontmatter.title}</Link>
                <Router>
                  <SubMenu path={node.fields.slug} headings={node.headings} handleClick={props.handleClick} />
                </Router>
              </li>
            ))}
          </ul>
          <hr />
          <h2>Design</h2>
          <ul>
            {data.designDocs.edges.map(({ node }) => (
              <li key={node.fields.slug}>
                <Link onClick={props.handleClick} to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
    )}
  />
)

MainNav.propTypes = {
  handleClick: PropTypes.function
}

export default MainNav
