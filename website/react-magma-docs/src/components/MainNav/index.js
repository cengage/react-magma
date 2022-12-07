import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql, withPrefix } from 'gatsby';
import { Location, Router } from '@reach/router';
import { LaunchIcon } from 'react-magma-icons';
import { SubMenu2 } from './SubMenu';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Hyperlink,
  magma,
} from 'react-magma-dom';
import styled from '@emotion/styled';

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
    outline: 2px solid ${magma.colors.info500};
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

const StyledHyperlink = styled(Hyperlink)`
  ${LinkStyles}
  &:hover {
    ${LinkHoverStyles}
  }
  &:not([disabled]):hover {
    ${LinkHoverStyles}
  }
  &:not([disabled]):focus {
    color: inherit;
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
  if (location.pathname.includes('api')) {
    return [1];
  }
  if (location.pathname.includes('patterns')) {
    return [2];
  }
}

function isAccordionItemOpen(location, id) {
  return location.pathname.includes(id);
}

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
        <StyledWrapper>
          <Location>
            {({ location }) => (
              <>
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

                <StyledHyperlink
                  aria-label="View project on GitHub"
                  to="https://github.com/cengage/react-magma"
                  target="_blank"
                >
                  <Heading2>
                    GitHub
                    <LaunchIcon size={magma.iconSizes.small} />
                  </Heading2>
                </StyledHyperlink>

                <StyledAccordion defaultIndex={defaultPanelIndex(location)}>
                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'design')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Design</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
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
                    </StyledAccordionPanel>
                  </StyledAccordionItem>

                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'api')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Components</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
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
                    </StyledAccordionPanel>
                  </StyledAccordionItem>

                  <StyledAccordionItem
                    isOpen={isAccordionItemOpen(location, 'patterns')}
                  >
                    <StyledAccordionButton>
                      <Heading2>Patterns</Heading2>
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
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
