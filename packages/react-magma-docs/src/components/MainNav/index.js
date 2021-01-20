import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql, withPrefix } from 'gatsby';
import { Location, Router } from '@reach/router';
import { AngleDownIcon } from 'react-magma-icons';
import { SubMenu } from './SubMenu';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import './accordion.css';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const activeStyle = {
  color: magma.colors.neutral,
  fontWeight: 'bold',
  background: magma.colors.neutral07,
};

const Heading2 = styled.h2`
  align-items: center;
  display: flex;
  font-size: ${magma.typeScale.size05.fontSize};
  font-weight: 600;
  line-height: ${magma.typeScale.size05.lineHeight};
  justify-content: space-between;
  margin: 0;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06}
    ${magma.spaceScale.spacing04};
`;

const Heading3 = styled.h3`
  font-size: ${magma.typeScale.size04.fontSize};
  line-height: ${magma.typeScale.size04.lineHeight};
  margin: ${magma.spaceScale.spacing05} 0 0;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
`;

const HR = styled.hr`
  background: ${magma.colors.neutral06};
  border: none;
  margin: ${magma.spaceScale.spacing03} 0;
  height: 1px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  color: ${magma.colors.neutral03};
  display: block;
  font-size: ${magma.typeScale.size03.fontSize};
  line-height: ${magma.typeScale.size03.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${magma.colors.neutral07};
    color: ${magma.colors.neutral03};
  }
`;

export const MainNav = ({ ...props }) => (
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
      <>
        <Heading2>Magma System</Heading2>
        <List>
          <ListItem>
            <StyledLink
              activeStyle={activeStyle}
              aria-label="Introduction to the Magma System"
              onClick={props.handleClick}
              to="/"
            >
              Introduction
            </StyledLink>
          </ListItem>
        </List>
        <HR />
        <Location>
          {({ location }) => (
            <Accordion accordion={false}>
              <AccordionItem expanded={location.pathname.includes('api')}>
                <AccordionItemTitle>
                  <Heading2>
                    Develop
                    <AngleDownIcon size="16" />
                  </Heading2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <List>
                    {data.apiIntro.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink>
                        <Router>
                          <SubMenu
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                  <Heading3>Component API</Heading3>
                  <List>
                    {data.apiDocs.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink>
                        <Router>
                          <SubMenu
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                </AccordionItemBody>
              </AccordionItem>
              <HR />
              <AccordionItem expanded={location.pathname.includes('design')}>
                <AccordionItemTitle>
                  <Heading2>
                    Design
                    <AngleDownIcon size="16" />
                  </Heading2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <List>
                    {data.designIntro.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink>
                        <Router>
                          <SubMenu
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                    {data.designDocs.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink>
                        <Router>
                          <SubMenu
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                </AccordionItemBody>
              </AccordionItem>
              <HR />
            </Accordion>
          )}
        </Location>
      </>
    )}
  />
);

MainNav.propTypes = {
  handleClick: PropTypes.func,
};
