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
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const StyledAccordion = styled(Accordion)`
  margin-top: 8px;
  *:focus {
    outline-offset: 0;
  }
  @media (max-width: 1024px) {
    margin-top: 4px;
  }
`;
const StyledAccordionItem = styled(AccordionItem)`
  /* Accordion styles */
  .accordion__body {
    animation: fadein 0.35s ease-in;
    display: block;
    &[aria-hidden='false'] {
      box-shadow: inset 0 -1px 0 0 ${magma.colors.neutral300};
      padding-bottom: 10px;
    }
  }
  .accordion__body--hidden {
    animation: fadeout 0.35s ease-in;
    display: none;
  }
  @keyframes fadein {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }
  @keyframes fadeout {
    0% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  }
`;

const LinkStyles = () => `
  align-items: center;
  display:block;
  color: ${magma.colors.neutral700};
  font-size: ${magma.typeScale.size03.fontSize};
  line-height: ${magma.typeScale.size03.lineHeight};
  padding: 0;
  text-decoration: none;
  &:focus{
    color: ${magma.colors.neutral700};
    outline: 2px solid ${magma.colors.info500};
    outline-offset: 0;
  }
`;

const LinkHoverStyles = () => `
  color: ${magma.colors.neutral700};
  background: ${magma.colors.neutral300};
`;

const StyledAccordionItemTitle = styled(AccordionItemTitle)`
  cursor: pointer;
  border: none;
  svg {
    transition: transform 0.35s;
  }
  &[aria-expanded='true'] {
    box-shadow: inset 0 1px 0 0 ${magma.colors.neutral300};
  }
  &[aria-expanded='true'] svg {
    transform: rotate(-180deg);
  }
`;

const activeStyleDefault = {
  background: magma.colors.neutral300,
};

const Heading2 = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: ${magma.typeScale.size03.fontSize};
  line-height: ${magma.typeScale.size03.lineHeight};
  font-weight: 500;
  margin: 0;
  padding: ${magma.spaceScale.spacing03} 18px;
  &:hover {
    ${LinkHoverStyles};
  }
`;

const Heading3 = styled.h3`
  color: ${magma.colors.neutral700};
  font-size: ${magma.typeScale.size01.fontSize};
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  text-indent: 0;
  padding-left: ${magma.spaceScale.spacing05};
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

const StyledLink = styled(Link)`
  ${LinkStyles};
  &:hover {
    ${LinkHoverStyles}
  }
`;

const StyledActiveLink2 = {
  content: "''",
  position: 'absolute',
  zIndex: '1',
  top: '0',
  left: '0',
  height: '100%',
  width: '4px',
  borderRadius: '2px',
  background: ` ${magma.colors.primary}`,
};

const StyledLink2 = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral700};
  display: flex;
  font-size: ${magma.typeScale.size02.fontSize};
  justify-content: space-between;
  padding: 6px 26px;
  position: relative;
  text-decoration: none;
  &:hover {
    ${LinkHoverStyles};
  }
  &:focus {
    color: ${magma.colors.neutral700};
  }
  &:focus:before {
    ${StyledActiveLink2};
  }
  &[aria-current='page']:before {
    ${StyledActiveLink2};
  }
`;

export const MainNav = ({ ...props }) => {
  const activeStyle = activeStyleDefault;

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
          <Location>
            {({ location }) => (
              <StyledAccordion accordion={false}>
                <StyledAccordionItem>
                  <StyledLink
                    activeStyle={activeStyle}
                    aria-label="Introduction to the Magma System"
                    onClick={props.handleClick}
                    to="/"
                  >
                    <Heading2>Introduction</Heading2>
                  </StyledLink>

                  <StyledLink
                    activeStyle={activeStyle}
                    aria-label="Contribution Guidelines"
                    to="/contribution-guidelines/"
                  >
                    <Heading2>Contribution Guidelines</Heading2>
                  </StyledLink>

                  <StyledLink
                    activeStyle={activeStyle}
                    aria-label="View project on GitHub"
                    href="https://github.com/cengage/react-magma"
                  >
                    <Heading2>
                      GitHub
                      <LaunchIcon size={magma.iconSizes.small} />
                    </Heading2>
                  </StyledLink>
                </StyledAccordionItem>
                <StyledAccordionItem
                  expanded={location.pathname.includes('design')}
                >
                  <StyledAccordionItemTitle>
                    <Heading2>
                      Design
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </StyledAccordionItemTitle>
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
                      {data.designComponentDocs.edges.map(({ node }) => (
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
                    <Heading3>Patterns</Heading3>
                    <List>
                      {data.designPatternDocs.edges.map(({ node }) => (
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
                </StyledAccordionItem>

                <StyledAccordionItem
                  expanded={location.pathname.includes('api')}
                >
                  <StyledAccordionItemTitle>
                    <Heading2>
                      Components
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </StyledAccordionItemTitle>
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
                </StyledAccordionItem>

                <StyledAccordionItem
                  expanded={location.pathname.includes('patterns')}
                >
                  <StyledAccordionItemTitle>
                    <Heading2>
                      Patterns
                      <ExpandMoreIcon size={magma.iconSizes.medium} />
                    </Heading2>
                  </StyledAccordionItemTitle>
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
                </StyledAccordionItem>
              </StyledAccordion>
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
