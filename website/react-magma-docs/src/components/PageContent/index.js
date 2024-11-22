/* eslint-disable complexity */
import styled from '@emotion/styled';
import { graphql, Link, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
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
  PATTERNS: 'patterns',
  PATTERNS_INTRO: 'patterns_intro',
};

// Special case pages that don't have secondary navigation.
const PAGES_NO_NAV = [
  'contribution_guidelines',
  'getting_started_patterns',
  'select_migration',
];

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
    return convertTextToId(item.node.frontmatter.title.toLowerCase()) === name;
  });
}

export const PageContent = ({ children, componentName, type }) => {
  const isInverse = useIsInverse();

  return (
    <StaticQuery
      query={graphql`
        query SideNavQuery {
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
      render={data => {
        const apiDocs = getDataNode(data.apiDocs, componentName);
        const designDocs = getDataNode(data.designComponentDocs, componentName);
        const patternsDocs = getDataNode(data.patternsDocs, componentName);
        const designPatternDocs = getDataNode(
          data.designPatternDocs,
          componentName
        );

        const designIntro = getDataNode(data.designIntro, componentName);
        const apiIntro = getDataNode(data.apiIntro, componentName);
        const patternsIntro = getDataNode(data.patternsIntro, componentName);

        const designLink = designDocs?.node.fields.slug;
        const apiLink = apiDocs?.node.fields.slug;
        const patternsLink = patternsDocs?.node.fields.slug;
        const designPatternsLink = designPatternDocs?.node.fields.slug;

        const hasDocs = !!(
          apiDocs ||
          designDocs ||
          patternsDocs ||
          designPatternDocs
        );

        const apiNavTabToLink = patternsDocs ? patternsLink : apiLink;
        const designNavTabToLink = designPatternDocs
          ? designPatternsLink
          : designLink;

        const getPageData = () => {
          if (designPatternDocs || patternsDocs) {
            if (type === NAV_TABS.DESIGN) {
              return designPatternDocs;
            }
            if (type === NAV_TABS.API) {
              return patternsDocs;
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
          if (designIntro || patternsIntro || apiIntro) {
            if (type === NAV_TABS.API_INTRO) {
              return apiIntro;
            }
            if (type === NAV_TABS.DESIGN_INTRO) {
              return designIntro;
            }
            if (type === NAV_TABS.PATTERNS_INTRO) {
              return patternsIntro;
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
                      {apiDocs || patternsDocs ? (
                        <NavTab
                          component={
                            <Link to={apiNavTabToLink}>Implementation</Link>
                          }
                          isActive={type === NAV_TABS.API}
                        />
                      ) : (
                        <></>
                      )}
                      {designDocs || designPatternDocs ? (
                        <NavTab
                          component={
                            <Link to={designNavTabToLink}>Design</Link>
                          }
                          isActive={type === NAV_TABS.DESIGN}
                        />
                      ) : (
                        <></>
                      )}
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
              <div
                style={{ display: 'flex', background: magma.colors.neutral100 }}
              >
                {PAGES_NO_NAV.includes(componentName) ? (
                  <ContentOutsideDocs>{children}</ContentOutsideDocs>
                ) : (
                  <Content>{children}</Content>
                )}

                <PageNavigation>
                  <SubPageTabs
                    pageData={getPageData()}
                    hasHorizontalNav={hasDocs}
                  />
                </PageNavigation>
              </div>
            )}
          </>
        );
      }}
    />
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
    'patterns',
    'patterns_intro',
  ]),
};
