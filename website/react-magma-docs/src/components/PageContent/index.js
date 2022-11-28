import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import { SubPageTabs } from '../SubPageTabs';
import { convertTextToId, convertTextToIdHyphen } from '../../utils';
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
    componentName && type && `/${NAV_TABS.DESIGN}/${convertTextToId(componentName)}/`;
  const apiLink = componentName && type && `/${NAV_TABS.API}/${convertTextToId(componentName)}/`;

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
          apiDocs: allMdx(
            filter: { fileAbsolutePath: { glob: "**/src/pages/api/**" } }
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
        }
      `}
      render={data => {
        const apiNode = getDataNode(data.apiDocs, componentName);
        const designNode = getDataNode(data.designComponentDocs, componentName);
        const designIntro = getDataNode(data.designIntro, componentName);
        const apiIntro = getDataNode(data.apiIntro, componentName);

        return (
          <>
            {apiNode || designNode ? (
              <>
                <TabsContainer isInverse={isInverse}>
                  <StyledTabs aria-label="" style={{ paddingLeft: '80px' }}>
                    {apiNode && (
                      <NavTab to={apiLink} isActive={type === NAV_TABS.API}>
                        Implementation
                      </NavTab>
                    )}
                    {designNode && (
                      <NavTab
                        to={designLink}
                        isActive={type === NAV_TABS.DESIGN}
                      >
                        Design
                      </NavTab>
                    )}
                  </StyledTabs>
                  <TabPanelsContainer>
                    {type === NAV_TABS.API ? (
                      <StyledTabPanel>
                        <Content>{children}</Content>
                        <PageNavigation>
                          <SubPageTabs pageData={apiNode} />
                        </PageNavigation>
                      </StyledTabPanel>
                    ) : (
                      <StyledTabPanel>
                        <Content>{children}</Content>
                        <PageNavigation>
                          <SubPageTabs pageData={designNode} />
                        </PageNavigation>
                      </StyledTabPanel>
                    )}
                  </TabPanelsContainer>
                </TabsContainer>
              </>
            ) : (
              <div style={{ display: 'flex' }}>
                <Content>{children}</Content>
                <PageNavigation>
                  <SubPageTabs pageData={designIntro || apiIntro} />
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
