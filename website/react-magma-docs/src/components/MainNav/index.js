import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql, withPrefix } from 'gatsby';
import { Location, Router } from '@reach/router';
import { ExpandMoreIcon, LaunchIcon } from 'react-magma-icons';
import { SubMenu, SubMenu2 } from './SubMenu';
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
  color: ${magma.colors.neutral};
  font-size: ${magma.typeScale.size04.fontSize};
  font-weight: 700;
  margin: ${magma.spaceScale.spacing03} 0 0 0;
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
  align-items: center;
  color: ${magma.colors.neutral};
  display: flex;
  font-size: ${magma.typeScale.size03.fontSize};
  justify-content: space-between;
  line-height: ${magma.typeScale.size03.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${magma.colors.neutral06};
    color: ${magma.colors.neutral};
  }
`;

const StyledLink2 = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral};
  display: flex;
  font-size: ${magma.typeScale.size03.fontSize};
  justify-content: space-between;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing09};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${magma.colors.neutral06};
    color: ${magma.colors.neutral};
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
        patternsDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/patterns/**" } }
          sort: { order: ASC, fields: frontmatter___title }
        ) {
          edges {
            ...navFields
          }
        }
        designIntro: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/design-intro/**" } }
          sort: { order: ASC, fields: frontmatter___order }
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
        patternsIntro: allMdx(
          filter: {
            fileAbsolutePath: { glob: "**/src/pages/patterns-intro/**" }
          }
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
            <StyledLink
              activeStyle={activeStyle}
              aria-label="Contribution Guidelines"
              to="/contribution-guidelines/"
            >
              Contribution Guidelines
            </StyledLink>
            <StyledLink
              activeStyle={activeStyle}
              aria-label="View project on GitHub"
              to="https://github.com/cengage/react-magma"
            >
              GitHub
              <LaunchIcon size={magma.iconSizes.small} />
            </StyledLink>
          </ListItem>
        </List>
        <HR />
        <Location>
          {({ location }) => (
            <Accordion accordion={false}>
              <AccordionItem expanded={location.pathname.includes('design')}>
                <AccordionItemTitle>
                  <Heading2>
                    Design
                    <ExpandMoreIcon size={magma.iconSizes.medium} />
                  </Heading2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <List>
                    <Heading3>Intro</Heading3>
                    {data.designIntro.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                  <Heading3>Components</Heading3>
                  <List>
                    {data.designDocs.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
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
              <AccordionItem expanded={location.pathname.includes('api')}>
                <AccordionItemTitle>
                  <Heading2>
                    Components
                    <ExpandMoreIcon size={magma.iconSizes.medium} />
                  </Heading2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <Heading3>Intro</Heading3>
                  <List>
                    {data.apiIntro.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                  <Heading3>API</Heading3>
                  <List>
                    {data.apiDocs.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
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
              <AccordionItem expanded={location.pathname.includes('patterns')}>
                <AccordionItemTitle>
                  <Heading2>
                    Patterns
                    <ExpandMoreIcon size={magma.iconSizes.medium} />
                  </Heading2>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <Heading3>Intro</Heading3>
                  <List>
                    {data.patternsIntro.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
                            path={withPrefix(node.fields.slug)}
                            headings={node.headings}
                            handleClick={props.handleClick}
                          />
                        </Router>
                      </ListItem>
                    ))}
                  </List>
                  <Heading3>API</Heading3>
                  <List>
                    {data.patternsDocs.edges.map(({ node }) => (
                      <ListItem key={node.fields.slug}>
                        <StyledLink2
                          activeStyle={activeStyle}
                          onClick={props.handleClick}
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </StyledLink2>
                        <Router>
                          <SubMenu2
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
