import React from 'react';

import styled from '@emotion/styled';
import { Location } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionButton,
  AccordionIconPosition,
  AccordionItem,
  AccordionItemContext,
  Hyperlink,
  magma,
  useIsInverse,
} from 'react-magma-dom';
import { LaunchIcon } from 'react-magma-icons';

import { getDocsPageSlug } from '../../utils';

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
    svg {
      color: ${magma.colors.neutral700};
    }
  }
  > div {
    height: ${props => (props.isOpen ? '100% !important' : '')};
  }
`;

const StyledAccordionPanel = styled.div`
  background: transparent;
  color: ${props =>
    props.isInverse ? magma.colors.neutral100 : magma.colors.neutral700};
  font-family: inherit;
  padding: 0;
  &[aria-hidden='false'] {
    padding-bottom: 10px;
  }
`;

const MainNavAccordionPanel = ({ children, isOpen }) => {
  const isInverse = useIsInverse();
  const { buttonId, panelId } = React.useContext(AccordionItemContext);

  if (!isOpen) {
    return null;
  }

  return (
    <StyledAccordionPanel
      aria-hidden={!isOpen}
      aria-labelledby={buttonId}
      id={panelId}
      isInverse={isInverse}
      role="region"
    >
      {children}
    </StyledAccordionPanel>
  );
};

MainNavAccordionPanel.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

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
  background: ${magma.colors.neutral200};
`;

const activeStyleDefault = {
  background: magma.colors.primary100,
  color: magma.colors.primary500,
};

const menuItemInsetStyles = `
  border-radius: ${magma.borderRadius};
  box-sizing: border-box;
  margin-left: ${magma.spaceScale.spacing03};
  margin-right: ${magma.spaceScale.spacing03};
  width: calc(100% - ${magma.spaceScale.spacing05});
`;

const headingStyles = `
  align-items: center;
  display: flex;
  gap: ${magma.spaceScale.spacing03};
  justify-content: flex-start;
  font-size: ${magma.typeScale.size02.fontSize};
  line-height: ${magma.typeScale.size02.lineHeight};
  font-weight: 500;
  margin: 0;
  padding: ${magma.spaceScale.spacing03};
  border-radius: ${magma.borderRadius};
  &:hover {
    ${LinkHoverStyles};
  }
`;

const TopLevelLabel = styled.span`
  ${headingStyles};
  padding: 0;
`;

const StyledAccordionButton = styled(AccordionButton)`
  && {
    border-top: 0;
  }
  ${headingStyles};
  ${menuItemInsetStyles};
  gap: 0;

  svg {
    height: ${magma.iconSizes.small}px;
    width: ${magma.iconSizes.small}px;
  }

  > div:first-of-type {
    align-items: center;
    display: flex;
    height: auto !important;
    line-height: 0;
    transform: none !important;
  }

  > div + span {
    min-width: ${magma.spaceScale.spacing03};
    width: ${magma.spaceScale.spacing03};
  }

  &[aria-expanded='false']:not([data-open='true']) > div:first-of-type {
    transform: rotate(-90deg) !important;
  }

  &[data-open='true'] > div:first-of-type {
    transform: none !important;
  }

  &:focus {
    position: relative;
    z-index: 2;
  }

  &:hover {
    ${LinkHoverStyles};
  }
`;

const StyledDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${magma.colors.neutral300};
  display: block;
  height: 0;
  margin: ${magma.spaceScale.spacing03} 18px;
  padding: 0;
`;

const StyledAccordionDivider = styled(StyledDivider)`
  margin-bottom: 0;
`;

const SpacedAccordionItem = styled(StyledAccordionItem)`
  margin-top: ${magma.spaceScale.spacing03};
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

const guideLineLeft = '26px';
const componentGroupLineTop = '25px';
const componentGroupMarkerTop = '20px';

const GuidedList = styled(List)`
  position: relative;

  &::before {
    background: ${magma.colors.neutral300};
    bottom: 0;
    content: '';
    left: ${guideLineLeft};
    position: absolute;
    top: 0;
    width: 1px;
    z-index: 1;
  }
`;

const ComponentGroupItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;

  &::before {
    background: ${magma.colors.neutral300};
    bottom: 0;
    content: '';
    left: ${guideLineLeft};
    position: absolute;
    top: ${componentGroupLineTop};
    width: 1px;
    z-index: 1;
  }

  &::after {
    background: ${magma.colors.neutral100};
    border: 1px solid ${magma.colors.neutral300};
    border-radius: 50%;
    content: '';
    height: 9px;
    left: ${guideLineLeft};
    position: absolute;
    top: ${componentGroupMarkerTop};
    transform: translate(-50%, -50%);
    width: 9px;
    z-index: 3;
  }
`;

const ComponentGroupItemsList = styled(List)`
  margin: 0;
`;

const ComponentGroupsList = styled(List)`
  margin-top: calc(${magma.spaceScale.spacing05} * -1);
`;

const ComponentGroupLabel = styled.p`
  color: ${magma.colors.neutral500};
  font-size: ${magma.typeScale.size01.fontSize};
  font-weight: 500;
  letter-spacing: ${magma.typeScale.size01.letterSpacing};
  line-height: ${magma.typeScale.size01.lineHeight};
  margin: ${magma.spaceScale.spacing03} 0 0;
  padding: 12px 16px 12px calc(${guideLineLeft} + ${magma.spaceScale.spacing05});
  position: relative;
  text-transform: uppercase;
  z-index: 3;
`;

const StyledHyperlink = styled(Hyperlink)`
  ${LinkStyles}
  ${menuItemInsetStyles};
  padding: ${magma.spaceScale.spacing03};
  &:hover {
    ${LinkHoverStyles}
  }
  &:not([disabled]):hover {
    ${LinkHoverStyles}
  }
  &:not([disabled]):focus {
    color: inherit;
    position: relative;
    z-index: 2;
  }
`;

const StyledActiveLink2 = {
  content: "''",
  position: 'absolute',
  zIndex: '2',
  top: '0',
  left: '0',
  height: '100%',
  width: '2px',
  transform: 'none',
  borderRadius: '0',
  background: ` ${magma.colors.primary}`,
};

const pageItemRowStateStyles = `
  border-radius: 0;
  margin-left: ${guideLineLeft};
  margin-right: 0;
  padding-left: ${magma.spaceScale.spacing05};
  width: calc(100% - ${guideLineLeft});
`;

const PageItemHoverStyles = () => `
  ${pageItemRowStateStyles}
  background: ${magma.colors.neutral200};
  color: ${magma.colors.neutral700};
`;

const PageItemCurrentStyles = () => `
  ${pageItemRowStateStyles}
  background: ${magma.colors.primary100};
  color: ${magma.colors.primary500};
`;

const StyledLink2 = styled(Link)`
  align-items: center;
  color: ${magma.colors.neutral700};
  display: flex;
  font-size: ${magma.typeScale.size02.fontSize};
  justify-content: space-between;
  padding: 6px 18px 6px ${magma.spaceScale.spacing05};
  position: relative;
  ${pageItemRowStateStyles};
  text-decoration: none;
  &:hover {
    ${PageItemHoverStyles};
  }
  &:focus {
    color: ${magma.colors.neutral700};
    outline: 2px solid ${magma.colors.focus};
    outline-offset: -2px;
    z-index: 4;
  }
  &[aria-current='page'],
  &[aria-current='page']:hover,
  &[data-current='true'],
  &[data-current='true']:hover {
    ${PageItemCurrentStyles};
  }
  &[aria-current='page']:before,
  &[data-current='true']:before {
    ${StyledActiveLink2};
  }
`;

const foundationSlugs = [
  '/design-intro/colors/',
  '/design-intro/layout/',
  '/design-intro/spacing/',
  '/design-intro/typography/',
];

const PANEL_INDEX = {
  design: 0,
  develop: 1,
  foundations: 3,
  components: 4,
  dataVisualization: 5,
};

const componentNavGroups = [
  {
    label: 'Buttons',
    titles: [
      'Button',
      'ButtonGroup',
      'Icon Button',
      'Toggle Button',
      'Toggle Button Group',
    ],
  },
  {
    label: 'Inputs',
    titles: [
      'Checkbox',
      'Combobox',
      'Date Picker',
      'Date Time Picker',
      'Dropzone',
      'Fieldset',
      'Form',
      'Form Group',
      'Indeterminate Checkbox',
      'Input',
      'Native Select',
      'Password Input',
      'Radio Button',
      'Search',
      'Select',
      'Textarea',
      'Time Picker',
      'Toggle',
    ],
  },
  {
    label: 'AI Interface',
    titles: ['AI Button'],
  },
  {
    label: 'Data Display',
    titles: [
      'Badge',
      'Block Quote',
      'Datagrid',
      'Heading',
      'Icon',
      'List',
      'Paragraph',
      'Table',
      'Tag',
      'TreeView',
    ],
  },
  {
    label: 'Feedback',
    titles: [
      'Alert',
      'Banner',
      'Empty State',
      'Loading Indicator',
      'Progress Bar',
      'Spinner',
      'Toast',
    ],
  },
  {
    label: 'Surface',
    titles: ['Accordion', 'AppBar', 'Card'],
  },
  {
    label: 'Overlays',
    titles: ['Drawer', 'Modal', 'Popover', 'Tooltip'],
  },
  {
    label: 'Navigation',
    titles: [
      'Breadcrumb',
      'Dropdown',
      'Hyperlink',
      'Nav Tabs',
      'Pagination',
      'Skip Link',
      'Stepper',
      'Tabs',
    ],
  },
  {
    label: 'Layout',
    titles: [
      'Breakpoints Container',
      'Container',
      'Flex',
      'Grid',
      'Hide at Breakpoint',
      'Spacer',
    ],
  },
  {
    label: 'Utils',
    titles: [
      'Announce',
      'Character Counter',
      'Global Styles',
      'Internationalization',
      'Transition',
      'Visually Hidden',
      'useDeviceDetect Hook',
      'useFocusLock Hook',
      'useMediaQuery Hook',
    ],
  },
];

function isFoundationPage(location) {
  return foundationSlugs.some(slug => location.pathname.includes(slug));
}

function isDesignPage(location) {
  return location.pathname.includes('/design-intro/get-started/');
}

function isDesignComponentPage(location) {
  return location.pathname.includes('/design/');
}

function isComponentPage(location) {
  return location.pathname.includes('/api/') || isDesignComponentPage(location);
}

function isDevelopPage(location) {
  return (
    location.pathname.includes('/api-intro/') ||
    location.pathname.includes('/contribution-guidelines/')
  );
}

function getRoutePanelIndex(location) {
  if (isDesignPage(location)) {
    return PANEL_INDEX.design;
  }
  if (isDevelopPage(location)) {
    return PANEL_INDEX.develop;
  }
  if (isFoundationPage(location)) {
    return PANEL_INDEX.foundations;
  }
  if (isComponentPage(location)) {
    return PANEL_INDEX.components;
  }
  if (location.pathname.includes('data-visualization')) {
    return PANEL_INDEX.dataVisualization;
  }
}

function isCurrentPath(location, slug) {
  return location.pathname.replace(/\/$/, '') === slug?.replace(/\/$/, '');
}

function getExpandedIndexForLocation(location) {
  const routePanelIndex = getRoutePanelIndex(location);

  return typeof routePanelIndex === 'number' ? [routePanelIndex] : [];
}

function getGroupedComponentDocs(apiDocs) {
  const docsByTitle = new Map(
    apiDocs.edges.map(edge => [edge.node.frontmatter.title, edge])
  );

  const groupedDocs = componentNavGroups.map(({ label, titles }) => {
    const edges = titles
      .map(title => {
        const edge = docsByTitle.get(title);

        if (edge) {
          docsByTitle.delete(title);
        }

        return edge;
      })
      .filter(Boolean);

    return { label, edges };
  });

  const remainingDocs = Array.from(docsByTitle.values());

  if (remainingDocs.length) {
    const utilsGroup = groupedDocs.find(group => group.label === 'Utils');

    if (utilsGroup) {
      utilsGroup.edges = utilsGroup.edges.concat(remainingDocs);
    }
  }

  return groupedDocs.filter(group => group.edges.length);
}

const MainNavItems = ({
  activeStyle,
  data,
  designComponentSlugByTitle,
  designIntroDocs,
  foundationDocs,
  handleClick,
  location,
}) => {
  const routePanelIndex = getRoutePanelIndex(location);
  const previousRoutePanelIndex = React.useRef(routePanelIndex);
  const [expandedIndex, setExpandedIndex] = React.useState(() =>
    getExpandedIndexForLocation(location)
  );

  React.useEffect(() => {
    if (routePanelIndex !== previousRoutePanelIndex.current) {
      setExpandedIndex(getExpandedIndexForLocation(location));
      previousRoutePanelIndex.current = routePanelIndex;
    }
  }, [location, routePanelIndex]);

  const handleExpandedChange = index => {
    setExpandedIndex(currentExpandedIndex =>
      currentExpandedIndex.includes(index)
        ? currentExpandedIndex.filter(item => item !== index)
        : currentExpandedIndex.concat(index)
    );
  };

  const isPanelOpen = index => expandedIndex.includes(index);

  return (
    <>
      <StyledAccordion
        iconPosition={AccordionIconPosition.left}
        index={expandedIndex}
        onExpandedChange={handleExpandedChange}
      >
        <StyledAccordionItem isOpen={isPanelOpen(PANEL_INDEX.design)}>
          <StyledAccordionButton
            data-open={isPanelOpen(PANEL_INDEX.design) ? 'true' : undefined}
          >
            <TopLevelLabel>Design</TopLevelLabel>
          </StyledAccordionButton>
          <MainNavAccordionPanel isOpen={isPanelOpen(PANEL_INDEX.design)}>
            <GuidedList>
              {designIntroDocs.map(({ node }) => (
                <ListItem key={getDocsPageSlug(node)}>
                  <StyledLink2
                    activeStyle={activeStyle}
                    onClick={handleClick}
                    to={getDocsPageSlug(node)}
                  >
                    {node.frontmatter.title}
                  </StyledLink2>
                </ListItem>
              ))}
            </GuidedList>
          </MainNavAccordionPanel>
        </StyledAccordionItem>

        <StyledAccordionItem isOpen={isPanelOpen(PANEL_INDEX.develop)}>
          <StyledAccordionButton
            data-open={isPanelOpen(PANEL_INDEX.develop) ? 'true' : undefined}
          >
            <TopLevelLabel>Develop</TopLevelLabel>
          </StyledAccordionButton>
          <MainNavAccordionPanel isOpen={isPanelOpen(PANEL_INDEX.develop)}>
            <GuidedList>
              {data.developDocs.edges.map(({ node }) => (
                <ListItem key={getDocsPageSlug(node)}>
                  <StyledLink2
                    activeStyle={activeStyle}
                    onClick={handleClick}
                    to={getDocsPageSlug(node)}
                  >
                    {node.frontmatter.title}
                  </StyledLink2>
                </ListItem>
              ))}
              <ListItem>
                <StyledLink2
                  activeStyle={activeStyle}
                  onClick={handleClick}
                  to="/contribution-guidelines/"
                >
                  Contribution Guidelines
                </StyledLink2>
              </ListItem>
            </GuidedList>
          </MainNavAccordionPanel>
        </StyledAccordionItem>

        <StyledAccordionDivider />

        <SpacedAccordionItem isOpen={isPanelOpen(PANEL_INDEX.foundations)}>
          <StyledAccordionButton
            data-open={
              isPanelOpen(PANEL_INDEX.foundations) ? 'true' : undefined
            }
          >
            <TopLevelLabel>Foundations</TopLevelLabel>
          </StyledAccordionButton>
          <MainNavAccordionPanel isOpen={isPanelOpen(PANEL_INDEX.foundations)}>
            <GuidedList>
              {foundationDocs.map(({ node }) => (
                <ListItem key={getDocsPageSlug(node)}>
                  <StyledLink2
                    activeStyle={activeStyle}
                    onClick={handleClick}
                    to={getDocsPageSlug(node)}
                  >
                    {node.frontmatter.title}
                  </StyledLink2>
                </ListItem>
              ))}
            </GuidedList>
          </MainNavAccordionPanel>
        </SpacedAccordionItem>

        <StyledAccordionItem isOpen={isPanelOpen(PANEL_INDEX.components)}>
          <StyledAccordionButton
            data-open={isPanelOpen(PANEL_INDEX.components) ? 'true' : undefined}
          >
            <TopLevelLabel>Components</TopLevelLabel>
          </StyledAccordionButton>
          <MainNavAccordionPanel isOpen={isPanelOpen(PANEL_INDEX.components)}>
            <ComponentGroupsList>
              {getGroupedComponentDocs(data.apiDocs).map(group => (
                <ComponentGroupItem key={group.label}>
                  <ComponentGroupLabel>{group.label}</ComponentGroupLabel>
                  <ComponentGroupItemsList>
                    {group.edges.map(({ node }) => {
                      const apiSlug = getDocsPageSlug(node);
                      const designSlug =
                        designComponentSlugByTitle[node.frontmatter.title];
                      const isCurrentComponent =
                        isCurrentPath(location, apiSlug) ||
                        isCurrentPath(location, designSlug);

                      return (
                        <ListItem key={apiSlug}>
                          <StyledLink2
                            activeStyle={activeStyle}
                            aria-current={
                              isCurrentComponent ? 'page' : undefined
                            }
                            data-current={
                              isCurrentComponent ? 'true' : undefined
                            }
                            onClick={handleClick}
                            to={apiSlug}
                          >
                            {node.frontmatter.title}
                          </StyledLink2>
                        </ListItem>
                      );
                    })}
                  </ComponentGroupItemsList>
                </ComponentGroupItem>
              ))}
            </ComponentGroupsList>
          </MainNavAccordionPanel>
        </StyledAccordionItem>

        <StyledAccordionItem
          isOpen={isPanelOpen(PANEL_INDEX.dataVisualization)}
        >
          <StyledAccordionButton
            data-open={
              isPanelOpen(PANEL_INDEX.dataVisualization) ? 'true' : undefined
            }
          >
            <TopLevelLabel>Data Visualization</TopLevelLabel>
          </StyledAccordionButton>
          <MainNavAccordionPanel
            isOpen={isPanelOpen(PANEL_INDEX.dataVisualization)}
          >
            <GuidedList>
              {data.dataVisualization.edges.map(({ node }) => (
                <ListItem key={getDocsPageSlug(node)}>
                  <StyledLink2
                    activeStyle={activeStyle}
                    onClick={handleClick}
                    to={getDocsPageSlug(node)}
                  >
                    {node.frontmatter.title}
                  </StyledLink2>
                </ListItem>
              ))}
            </GuidedList>
          </MainNavAccordionPanel>
        </StyledAccordionItem>
      </StyledAccordion>

      <StyledDivider />

      <StyledHyperlink
        aria-label="View project on GitHub"
        to="https://github.com/cengage/react-magma"
        opensInNewTab
      >
        <TopLevelLabel>
          <LaunchIcon size={magma.iconSizes.small} />
          GitHub
        </TopLevelLabel>
      </StyledHyperlink>
    </>
  );
};

MainNavItems.propTypes = {
  activeStyle: PropTypes.object,
  data: PropTypes.object,
  designComponentSlugByTitle: PropTypes.object,
  designIntroDocs: PropTypes.array,
  foundationDocs: PropTypes.array,
  handleClick: PropTypes.func,
  location: PropTypes.object,
};

export const MainNav = ({ ...props }) => {
  const activeStyle = activeStyleDefault;

  const data = useStaticQuery(graphql`
    fragment navFields on MdxEdge {
      node {
        frontmatter {
          title
        }
        internal {
          contentFilePath
        }
        fields {
          slug
          headings
        }
      }
    }
    query NavQuery {
      designComponentDocs: allMdx(
        filter: {
          internal: { contentFilePath: { glob: "**/src/pages/design/**" } }
        }
        sort: { frontmatter: { title: ASC } }
      ) {
        edges {
          ...navFields
        }
      }
      apiDocs: allMdx(
        filter: {
          internal: { contentFilePath: { glob: "**/src/pages/api/**" } }
        }
        sort: { frontmatter: { title: ASC } }
      ) {
        edges {
          ...navFields
        }
      }
      dataVisualization: allMdx(
        filter: {
          internal: {
            contentFilePath: { glob: "**/src/pages/data-visualization/**" }
          }
        }
        sort: { frontmatter: { order: ASC } }
      ) {
        edges {
          ...navFields
        }
      }
      designIntro: allMdx(
        filter: {
          internal: {
            contentFilePath: { glob: "**/src/pages/design-intro/**" }
          }
        }
        sort: { frontmatter: { order: ASC } }
      ) {
        edges {
          ...navFields
        }
      }
      developDocs: allMdx(
        filter: {
          internal: { contentFilePath: { glob: "**/src/pages/api-intro/**" } }
        }
        sort: { frontmatter: { order: ASC } }
      ) {
        edges {
          ...navFields
        }
      }
    }
  `);

  const designIntroDocs = data.designIntro.edges.filter(
    ({ node }) => !foundationSlugs.includes(getDocsPageSlug(node))
  );
  const foundationDocs = data.designIntro.edges.filter(({ node }) =>
    foundationSlugs.includes(getDocsPageSlug(node))
  );
  const designComponentSlugByTitle = data.designComponentDocs.edges.reduce(
    (acc, { node }) => ({
      ...acc,
      [node.frontmatter.title]: getDocsPageSlug(node),
    }),
    {}
  );

  return (
    <StyledWrapper>
      <Location>
        {({ location }) => (
          <MainNavItems
            activeStyle={activeStyle}
            data={data}
            designComponentSlugByTitle={designComponentSlugByTitle}
            designIntroDocs={designIntroDocs}
            foundationDocs={foundationDocs}
            handleClick={props.handleClick}
            location={location}
          />
        )}
      </Location>
    </StyledWrapper>
  );
};

MainNav.propTypes = {
  handleClick: PropTypes.func,
};
