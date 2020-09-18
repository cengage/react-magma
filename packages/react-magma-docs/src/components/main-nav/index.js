import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Location, Router } from '@reach/router'
import './main-nav.css'
import { AngleDownIcon } from 'react-magma-icons'
import { magma } from 'react-magma-dom'
import { convertTextToId } from '../../utils'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion'

const handleAnchorLinkClick = (id, handleClick, e) => {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top)

  e.preventDefault()
  const targetID = id
  const targetAnchor = document.getElementById(id)
  if (!targetAnchor) return
  const originalTop = distanceToTop(targetAnchor)

  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

  const checkIfDone = setInterval(function() {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1'
      targetAnchor.focus()
      window.history.pushState('', '', '#' + targetID)
      clearInterval(checkIfDone)
    }
  }, 100)

  handleClick()
}

const SubMenu = ({ headings, handleClick }) => {
  return (
    <ul className="submenu">
      {headings.map((heading, index) => {
        const id = convertTextToId(heading.value)

        return (
          <li key={index}>
            <a
              href={`#${id}`}
              onClick={e => {
                handleAnchorLinkClick(id, handleClick, e)
              }}
            >
              {heading.value}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const activeStyle = {
  color: magma.colors.neutral01,
  fontWeight: 'bold',
  background: magma.colors.neutral07,
}

const MainNav = ({ ...props }) => (
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
          sort: { order: ASC, fields: frontmatter___title }
        ) {
          edges {
            ...navFields
          }
        }
        apiDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/api/**" } }
          sort: { order: ASC, fields: frontmatter___title }
        ) {
          edges {
            ...navFields
          }
        }
        designIntro: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/design-intro/**" } }
          sort: { order: ASC, fields: frontmatter___title }
        ) {
          edges {
            ...navFields
          }
        }
        apiIntro: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/api-intro/**" } }
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
          <li>
            <Link
              activeStyle={activeStyle}
              aria-label="Introduction to the Magma System"
              onClick={props.handleClick}
              to="/"
            >
              Introduction
            </Link>
          </li>
        </ul>
        <hr />
        <Location>
          {({ location }) => (
            <Accordion accordion={false}>
              <AccordionItem expanded={location.pathname.includes('api')}>
                <AccordionItemTitle>
                  <h2>
                    Develop
                    <AngleDownIcon size="16" />
                  </h2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>
                    {data.apiIntro.edges.map(({ node }) => (
                      <li key={node.fields.slug}>
                        <Link
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </Link>
                        <Router>
                          <SubMenu
                            path={node.fields.slug}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </li>
                    ))}
                  </ul>
                  <h3>Component API</h3>
                  <ul>
                    {data.apiDocs.edges.map(({ node }) => (
                      <li key={node.fields.slug}>
                        <Link
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </Link>
                        <Router>
                          <SubMenu
                            path={node.fields.slug}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </li>
                    ))}
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
              <hr />
              <AccordionItem expanded={location.pathname.includes('design')}>
                <AccordionItemTitle>
                  <h2>
                    Design
                    <AngleDownIcon size="16" />
                  </h2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>
                    {data.designIntro.edges.map(({ node }) => (
                      <li key={node.fields.slug}>
                        <Link
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </Link>
                        <Router>
                          <SubMenu
                            path={node.fields.slug}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </li>
                    ))}
                    {data.designDocs.edges.map(({ node }) => (
                      <li key={node.fields.slug}>
                        <Link
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </Link>
                        <Router>
                          <SubMenu
                            path={node.fields.slug}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </li>
                    ))}
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
              <hr />
            </Accordion>
          )}
        </Location>
      </div>
    )}
  />
)

MainNav.propTypes = {
  handleClick: PropTypes.func,
}

export default MainNav
