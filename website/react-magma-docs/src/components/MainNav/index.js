import styled from '@emotion/styled';
import { Location } from '@reach/router';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  magma
} from 'react-magma-dom';

const StyledWrapper = styled.div`
  margin-top: 8px;
  *:focus {
    outline-offset: 0;
  }
  @media (max-width: 1024px) {
    margin-top: 4px;
  }
`;
const StyledAccordion = styled(Accordion)`
  border-bottom: 0;
`;

const StyledAccordionItem = styled(AccordionItem)`
  h3 {
    color: ${magma.colors.neutral700};
    font-size: ${magma.typeScale.size01.fontSize};
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    text-indent: 0;
    margin: 12px 0;
    padding-left: ${magma.spaceScale.spacing05};
  }
  button {
    &[aria-expanded='true'] {
      box-shadow: inset 0 1px 0 0 ${magma.colors.neutral300};
    }
    svg {
      color: ${magma.colors.neutral700};
    }
  }
  > div {
    height: ${props => (props.isOpen ? '100% !important' : '')};
  }
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  padding: 0;
  &[aria-hidden='false'] {
    box-shadow: inset 0 -1px 0 0 ${magma.colors.neutral300};
    padding-bottom: 10px;
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
    outline: 2px solid ${magma.colors.focus};
    outline-offset: 0;
  }
`;

const LinkHoverStyles = () => `
  color: ${magma.colors.neutral700};
  background: ${magma.colors.neutral300};
`;

const activeStyleDefault = {
  background: magma.colors.neutral300,
};

const headingStyles = `
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

const Heading2 = styled.h2`
  ${headingStyles};
`;

const StyledAccordionButton = styled(AccordionButton)`
  border-top: 0;
  ${headingStyles};
  &:hover {
    ${LinkHoverStyles};
  }
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

// Returns the index of the accordion panel to open by default
function defaultPanelIndex(location) {
  if (location.pathname.includes('design')) {
    return [0];
  }
  if (location.pathname.includes('api-intro')) {
    return [1];
  }
  if (location.pathname.includes('api') && !location.pathname.includes('chart')) {
    return [2];
  }
  if (location.pathname.includes('patterns')) {
    return [3];
  }
  if (location.pathname.includes('chart')) {
    return [4];
  }
}

function isAccordionItemOpen(location, id) {
  return location.pathname.includes(id);
}

const dataVisualizationPages = ['Chart', 'LineChart'];

export const MainNav = ({ ...props }) => {
  const activeStyle = activeStyleDefault;

  const ref = useRef();

  // Sets focus on "Introduction" for keyboard navigation.
  React.useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
  }, []);

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
        <StyledWrapper>
          <Location>
            {({ location }) => (
              <>
                <StyledLink
                  activeStyle={activeStyle}
                  aria-label="Introduction to the Magma System"
                  onClick={props.handleClick}
                  ref={ref}
                  to="/"
                >
                  <Heading2>Introduction</Heading2>
                </StyledLink>
                <StyledLink
                  activeStyle={activeStyle}
                  aria-label="Contribution Guidelines"
                  to="/contribution-guidelines/"
                >
                  <Heading2>Contributing</Heading2>
                </StyledLink>
                <StyledAccordion isMulti defaultIndex={defaultPanelIndex(location)}>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'design')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Designing</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                      <List>
                        {data.designIntro.edges.map(({ node }) => (
                          <ListItem key={node.fields.slug}>
                            <StyledLink2
                              activeStyle={activeStyle}
                              onClick={props.handleClick}
                              to={node.fields.slug}
                            >
                              {node.frontmatter.title}
                            </StyledLink2>
                          </ListItem>
                        ))}
                      </List>
                    </StyledAccordionPanel>
                  </StyledAccordionItem>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'api-intro')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Developing</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
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
                          </ListItem>
                        ))}
                      </List>
                    </StyledAccordionPanel>
                  </StyledAccordionItem>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'api')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Components</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                      <List>
                        {data.apiDocs.edges
                          .filter(({ node }) => !dataVisualizationPages.includes(node.frontmatter.title))
                          .map(({ node }) => (
                            <ListItem key={node.fields.slug}>
                              <StyledLink2
                                activeStyle={activeStyle}
                                onClick={props.handleClick}
                                to={node.fields.slug}
                              >
                                {node.frontmatter.title}
                              </StyledLink2>
                            </ListItem>
                          ))}
                      </List>
                    </StyledAccordionPanel>
                  </StyledAccordionItem>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'patterns')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Patterns</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
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
                          </ListItem>
                        ))}
                        {data.patternsDocs.edges.map(({ node }) => (
                          <ListItem key={node.fields.slug}>
                            <StyledLink2
                              activeStyle={activeStyle}
                              onClick={props.handleClick}
                              to={node.fields.slug}
                            >
                              {node.frontmatter.title}
                            </StyledLink2>
                          </ListItem>
                        ))}
                      </List>
                    </StyledAccordionPanel>
                  </StyledAccordionItem>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'chart')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Data Visualization</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                      <List>
                        {data.designComponentDocs.edges
                          .filter(({ node }) => dataVisualizationPages.includes(node.frontmatter.title))
                          .map(({ node }) => (
                            <ListItem key={node.fields.slug}>
                              <StyledLink2
                                activeStyle={activeStyle}
                                onClick={props.handleClick}
                                to={node.fields.slug}
                              >
                                {node.frontmatter.title}
                              </StyledLink2>
                            </ListItem>
                          ))}
                        {data.apiDocs.edges
                          .filter(({ node }) => dataVisualizationPages.includes(node.frontmatter.title))
                          .map(({ node }) => (
                            <ListItem key={node.fields.slug}>
                              <StyledLink2
                                activeStyle={activeStyle}
                                onClick={props.handleClick}
                                to={node.fields.slug}
                              >
                                {node.frontmatter.title}
                              </StyledLink2>
                            </ListItem>
                          ))}
                      </List>
                    </StyledAccordionPanel>
                  </StyledAccordionItem>
                </StyledAccordion>
              </>
            )}
          </Location>
        </StyledWrapper>
      )}
    />
  );
};

MainNav.propTypes = {
  handleClick: PropTypes.func,
};
