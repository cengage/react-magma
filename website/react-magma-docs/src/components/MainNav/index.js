import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql, withPrefix } from 'gatsby';
import { Location, Router } from '@reach/router';
import { ExpandMoreIcon, LaunchIcon } from 'react-magma-icons';
import { SubMenu2 } from './SubMenu';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import './accordion.css';
import styled from '@emotion/styled';
import { magma, useIsInverse } from 'react-magma-dom';

const activeStyleDefault = {
  color: magma.colors.neutral700,
  fontWeight: '600',
  background: magma.colors.neutral200,
};

const activeStyleInverse = {
  color: magma.colors.neutral600,
  fontWeight: 'bold',
  background: magma.colors.primary600,
};

const Heading2 = styled.h2`
  align-items: center;
  display: flex;
  font-size: ${magma.typeScale.size04.fontSize};
  font-weight: 500;
  line-height: ${magma.typeScale.size06.lineHeight};
  justify-content: space-between;
  margin: 0;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
`;

const Heading3 = styled.h3`
  color: ${props =>
    props.isInverse ? magma.colors.neutral500 : magma.colors.neutral700};
  font-size: ${magma.typeScale.size03.fontSize};
  font-weight: 600;
  margin: ${magma.spaceScale.spacing03} 0 0 0;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
`;

const HR = styled.hr`
  background: ${props =>
    props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border: none;
  margin: 0;
  height: 1px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0 0 ${magma.spaceScale.spacing03} 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LinkStyles = props => `
  align-items: center;
  color: ${props.isInverse ? magma.colors.neutral600 : magma.colors.neutral700};
  display: flex;
  font-size: ${magma.typeScale.size02.fontSize};
  justify-content: space-between;
  line-height: ${magma.typeScale.size03.lineHeight};
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing06};
  text-decoration: none;
`;

const LinkHoverStyles = props => `
background: ${
  props.isInverse ? magma.colors.foundation02 : magma.colors.neutral200
};
color: ${props.isInverse ? magma.colors.neutral600 : magma.colors.neutral700};
`;

const StyledLink = styled(Link)`
  ${LinkStyles};

  &:hover,
  &:focus {
    ${LinkHoverStyles}
  }
`;

const StyledExternalLink = styled.a`
  ${LinkStyles};

  &:hover,
  &:focus {
    ${LinkHoverStyles}
  }
`;

const StyledLink2 = styled(Link)`
  align-items: center;
  color: ${props =>
    props.isInverse ? magma.colors.neutral600 : magma.colors.neutral700};
  display: flex;
  font-size: ${magma.typeScale.size02.fontSize};
  justify-content: space-between;
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing09};
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${props =>
      props.isInverse ? magma.colors.primary600 : magma.colors.neutral200};
    color: ${props =>
      props.isInverse ? magma.colors.neutral600 : magma.colors.neutral700};
  }
`;

export const MainNav = ({ ...props }) => {
  const isInverse = useIsInverse();
  const activeStyle = isInverse ? activeStyleInverse : activeStyleDefault;

  return (
    <StaticQuery
      query={graphql`
        fragment navFields on MdxEdge {
          node {
            frontmatter {
              title
              isPattern
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
          designComponentDocs: allMdx(
            filter: {
              fileAbsolutePath: { glob: "**/src/pages/design/**" }
              frontmatter: { isPattern: { ne: true } }
            }
            sort: { order: ASC, fields: frontmatter___title }
          ) {
            edges {
              ...navFields
            }
          }
          designPatternDocs: allMdx(
            filter: {
              fileAbsolutePath: { glob: "**/src/pages/design/**" }
              frontmatter: { isPattern: { eq: true } }
            }
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
            filter: {
              fileAbsolutePath: { glob: "**/src/pages/design-intro/**" }
            }
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
                isInverse={isInverse}
                onClick={props.handleClick}
                to="/"
              >
                Introduction
              </StyledLink>
              <StyledLink
                activeStyle={activeStyle}
                aria-label="Contribution Guidelines"
                isInverse={isInverse}
                to="/contribution-guidelines/"
              >
                Contribution Guidelines
              </StyledLink>
              <StyledExternalLink
                activeStyle={activeStyle}
                aria-label="View project on GitHub"
                isInverse={isInverse}
                href="https://github.com/cengage/react-magma"
              >
                GitHub
                <LaunchIcon size={magma.iconSizes.small} />
              </StyledExternalLink>
            </ListItem>
          </List>
          <HR isInverse={isInverse} />
          <Location>
            {({ location }) => (
              <Accordion accordion={false}>
                <AccordionItem expanded={location.pathname.includes('design')}>
                  <AccordionItemTitle>
                    <Heading2 isInverse={isInverse}>
                      Design
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <List>
                      <Heading3 isInverse={isInverse}>Intro</Heading3>
                      {data.designIntro.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                    <Heading3 isInverse={isInverse}>Components</Heading3>
                    <List>
                      {data.designComponentDocs.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                    <Heading3 isInverse={isInverse}>Patterns</Heading3>
                    <List>
                      {data.designPatternDocs.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                <HR isInverse={isInverse} />
                <AccordionItem expanded={location.pathname.includes('api')}>
                  <AccordionItemTitle>
                    <Heading2 isInverse={isInverse}>
                      Components
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <Heading3 isInverse={isInverse}>Intro</Heading3>
                    <List>
                      {data.apiIntro.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                    <Heading3 isInverse={isInverse}>API</Heading3>
                    <List>
                      {data.apiDocs.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                <HR isInverse={isInverse} />
                <AccordionItem
                  expanded={location.pathname.includes('patterns')}
                >
                  <AccordionItemTitle>
                    <Heading2 isInverse={isInverse}>
                      Patterns
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <Heading3 isInverse={isInverse}>Intro</Heading3>
                    <List>
                      {data.patternsIntro.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                    <Heading3 isInverse={isInverse}>API</Heading3>
                    <List>
                      {data.patternsDocs.edges.map(({ node }) => (
                        <ListItem key={node.fields.slug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            isInverse={isInverse}
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
                <HR isInverse={isInverse} />
              </Accordion>
            )}
          </Location>
        </>
      )}
    />
  );
};

MainNav.propTypes = {
  handleClick: PropTypes.func,
};
