/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import { SubPageTabs } from '../SubPageTabs';
import { convertTextToId, convertUnderscoreToHyphen } from '../../utils';
import {
  TabPanelsContainer,
  TabPanel,
  TabsContainer,
  magma,
  NavTabs,
  NavTab,
  useIsInverse,
} from 'react-magma-dom';

const NAV_TABS = {
  API: 'api',
  DESIGN: 'design',
  PATTERNS: 'patterns',
};

const StyledTabs = styled(NavTabs)`
  background: ${magma.colors.neutral200};
`;

const StyledTabPanel = styled(TabPanel)`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  flex: 1 1 auto;
  margin: 48px 100px;
  @media (max-width: ${magma.breakpoints.medium}px) {
    margin: 24px 50px;
  }
`;

const PageNavigation = styled.div`
  flex: 0 0 auto;
  @media (max-width: ${magma.breakpoints.medium}px) {
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

  const designLink =
    componentName &&
    `/${NAV_TABS.DESIGN}/${convertUnderscoreToHyphen(componentName)}/`;
  const apiLink =
    componentName &&
    `/${NAV_TABS.API}/${convertUnderscoreToHyphen(componentName)}/`;
  const patternsLink =
    componentName &&
    `/${NAV_TABS.PATTERNS}/${convertUnderscoreToHyphen(componentName)}/`;

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

        const hasDocs = !!(
          apiDocs ||
          designDocs ||
          patternsDocs ||
          designPatternDocs
        );

        const apiNavTabToLink = patternsDocs ? patternsLink : apiLink;

        const getPageData = () => {
          if (apiDocs || designDocs) {
            if (type === NAV_TABS.API) {
              return apiDocs;
            }
            if (type === NAV_TABS.DESIGN) {
              return designDocs;
            }
          }
          if (designIntro || patternsIntro || apiIntro) {
            if (type === NAV_TABS.API) {
              return apiIntro;
            }
            if (type === NAV_TABS.DESIGN) {
              return designIntro;
            }
            return patternsIntro;
          }
        };

        return (
          <>
            {hasDocs ? (
              <>
                <TabsContainer isInverse={isInverse}>
                  <StyledTabs aria-label="" style={{ paddingLeft: '80px' }}>
                    {apiDocs || patternsDocs ? (
                      <NavTab
                        to={apiNavTabToLink}
                        isActive={type === NAV_TABS.API}
                      >
                        Implementation
                      </NavTab>
                    ) : (
                      <></>
                    )}
                    {designDocs || designPatternDocs ? (
                      <NavTab
                        to={designLink}
                        isActive={type === NAV_TABS.DESIGN}
                      >
                        Design
                      </NavTab>
                    ) : (
                      <></>
                    )}
                  </StyledTabs>

                  <TabPanelsContainer>
                    <StyledTabPanel>
                      <Content>{children}</Content>
                      <PageNavigation>
                        <SubPageTabs pageData={getPageData()} />
                      </PageNavigation>
                    </StyledTabPanel>
                  </TabPanelsContainer>
                </TabsContainer>
              </>
            ) : (
              <div style={{ display: 'flex' }}>
                <Content>{children}</Content>
                <PageNavigation>
                  <SubPageTabs
                    pageData={getPageData()}
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
  type: PropTypes.oneOf(['api', 'design']),
};
