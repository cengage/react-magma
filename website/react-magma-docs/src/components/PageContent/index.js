import React from 'react';

import styled from '@emotion/styled';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import {
  magma,
  NavTab,
  NavTabs,
  TabPanel,
  TabPanelsContainer,
  TabsContainer,
  useIsInverse,
} from 'react-magma-dom';

import { convertTextToId } from '../../utils';
import { PANEL_WIDTH } from '../SlidingDrawer';
import { SubPageTabs } from '../SubPageTabs';

export const CONTENT_MAX_WIDTH = 1112;

const NAV_TABS = {
  API: 'api',
  API_INTRO: 'api_intro',
  DESIGN: 'design',
  DESIGN_INTRO: 'design_intro',
  DATA_VISUALIZATION: 'data_visualization',
};

// Special case pages that don't have secondary navigation.
const PAGES_NO_NAV = ['contribution_guidelines', 'select_migration'];

const TabsWrapper = styled.div`
  position: sticky;
  top: 56px;
  z-index: 8;
  background: ${magma.colors.neutral200};
`;

// Implementation & Design tabs
const StyledTabs = styled(NavTabs)`
  background: ${magma.colors.neutral200};
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH}px;
  position: sticky;
  top: 56px;
  z-index: 8;

  @media (max-width: ${CONTENT_MAX_WIDTH + PANEL_WIDTH}px) {
    padding-left: 24px;
  }
  @media (max-width: ${magma.breakpoints.medium}px) {
    padding-left: 16px;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  &::before {
    content: '';
    visibility: hidden;
  }
`;

const StyledTabsContainer = styled(TabsContainer)`
  max-width: 100%;
  flex-direction: column;
`;

const StyledTabPanelsContainer = styled(TabPanelsContainer)`
  background: ${magma.colors.neutral100};
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const Content = styled.div`
  flex: 1 1 auto;
  margin: 48px auto;
  max-width: 868px;
  padding: 0 24px;
  @media (max-width: ${magma.breakpoints.medium}px) {
    margin: 40px 24px;
    min-width: 0;
    padding: 0;
  }
  @media (max-width: ${magma.breakpoints.small}px) {
    margin: 32px 16px;
    min-width: 0;
    padding: 0;
  }
`;

const ContentOutsideDocs = styled(Content)`
  max-width: 1164px;
`;

const PageNavigation = styled.div`
  flex: 0 0 auto;
  @media (max-width: ${magma.breakpoints.large}px) {
    display: none;
  }
`;

function getDataNode(data, name) {
  return data?.edges.find(item => {
    const title = item.node.frontmatter.title;

    return title && convertTextToId(title.toLowerCase()) === name;
  });
}

export const PageContent = ({ children, componentName, type }) => {
  const isInverse = useIsInverse();

  const data = useStaticQuery(graphql`
    query SideNavQuery {
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
      apiIntro: allMdx(
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

  const apiDocs = getDataNode(data.apiDocs, componentName);
  const designDocs = getDataNode(data.designComponentDocs, componentName);

  const dataVisualization = getDataNode(data.dataVisualization, componentName);

  const designIntro = getDataNode(data.designIntro, componentName);
  const apiIntro = getDataNode(data.apiIntro, componentName);

  const designLink = designDocs?.node.fields.slug;
  const apiLink = apiDocs?.node.fields.slug;
  const dataVisualizationLink = dataVisualization?.node.fields.slug;

  const hasDocs = !!(apiDocs || designDocs || dataVisualization);

  let apiNavTabToLink = apiLink;

  if (dataVisualization) {
    apiNavTabToLink = dataVisualizationLink;
  }

  const designNavTabToLink = designLink;

  const getPageData = () => {
    if (dataVisualization) {
      if (type === NAV_TABS.DATA_VISUALIZATION) {
        return dataVisualization;
      }
    }
    if (apiDocs || designDocs) {
      if (type === NAV_TABS.API) {
        return apiDocs;
      }
      if (type === NAV_TABS.DESIGN) {
        return designDocs;
      }
    }
    if (designIntro || apiIntro) {
      if (type === NAV_TABS.API_INTRO) {
        return apiIntro;
      }
      if (type === NAV_TABS.DESIGN_INTRO) {
        return designIntro;
      }
    }
  };

  return (
    <>
      {hasDocs ? (
        <>
          <StyledTabsContainer isInverse={isInverse}>
            <TabsWrapper>
              <StyledTabs aria-label="">
                {apiDocs ? (
                  <NavTab
                    component={<Link to={apiNavTabToLink}>Implementation</Link>}
                    isActive={type === NAV_TABS.API}
                  />
                ) : null}
                {designDocs ? (
                  <NavTab
                    component={<Link to={designNavTabToLink}>Design</Link>}
                    isActive={type === NAV_TABS.DESIGN}
                  />
                ) : null}
              </StyledTabs>
            </TabsWrapper>

            <StyledTabPanelsContainer>
              <StyledTabPanel>
                <Content>{children}</Content>
                <PageNavigation>
                  <SubPageTabs
                    pageData={getPageData()}
                    hasHorizontalNav={hasDocs}
                  />
                </PageNavigation>
              </StyledTabPanel>
            </StyledTabPanelsContainer>
          </StyledTabsContainer>
        </>
      ) : (
        <div style={{ display: 'flex', background: magma.colors.neutral100 }}>
          {PAGES_NO_NAV.includes(componentName) ? (
            <ContentOutsideDocs>{children}</ContentOutsideDocs>
          ) : (
            <Content>{children}</Content>
          )}

          <PageNavigation>
            <SubPageTabs pageData={getPageData()} hasHorizontalNav={hasDocs} />
          </PageNavigation>
        </div>
      )}
    </>
  );
};

PageContent.propTypes = {
  children: PropTypes.node,
  componentName: PropTypes.string,
  type: PropTypes.oneOf([
    'api',
    'api_intro',
    'design',
    'design_intro',
    'data_visualization',
  ]),
};
