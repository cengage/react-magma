import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import {
  magma,
  useIsInverse,
  TabsContainer,
  Tab,
  Tabs,
  TabPanelsContainer,
  TabPanel,
} from 'react-magma-dom';
import { SubPageTabs } from '../SubPageTabs';

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & + p {
    line-height: ${magma.typeScale.size04.lineHeight};
    font-size: ${magma.typeScale.size04.fontSize};
  }

  @media (min-width: ${magma.breakpoints.small}px) {
    align-items: center;
    flex-direction: row;
    & + p {
      line-height: ${magma.typeScale.size05.lineHeight};
      font-size: ${magma.typeScale.size05.fontSize};
    }
  }
`;

const StyledTabs = styled(Tabs)`
  background: ${magma.colors.neutral200};
`;

export const DocsHeading = ({ children, type }) => {
  const isInverse = useIsInverse();
  const activeTabIndex = type === 'api' ? 0 : 1;

  return (
    <StaticQuery
      query={graphql`
        query NavQueryTest {
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
        }
      `}
      render={data => {
        const apiNode = data.apiDocs.edges.find(item => {
          return item.node.frontmatter.title === children;
        });
        const designNode = data.designComponentDocs.edges.find(item => {
          return item.node.frontmatter.title === children;
        });

        return (
          <>
            <Container>
              {(apiNode || designNode) && (
                <TabsContainer
                  activeIndex={activeTabIndex}
                  isInverse={isInverse}
                >
                  <StyledTabs aria-label="">
                    {apiNode && <Tab>Implementation</Tab>}
                    {designNode && <Tab>Design</Tab>}
                  </StyledTabs>
                  jfehgdrghd grkjgjbrghj rkejghrgjrg
                  {children}
                  <TabPanelsContainer>
                    <TabPanel>
                      <SubPageTabs pageData={apiNode} />
                    </TabPanel>
                    <TabPanel>
                      <SubPageTabs pageData={designNode} />
                    </TabPanel>
                  </TabPanelsContainer>
                </TabsContainer>
              )}
            </Container>
          </>
        );
      }}
    />
  );
};

DocsHeading.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(['api', 'design']).isRequired,
};
