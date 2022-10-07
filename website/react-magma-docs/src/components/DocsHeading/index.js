import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import {
  Heading,
  Hyperlink,
  Paragraph,
  TypographyVisualStyle,
  magma,
  TypographyColor,
  useIsInverse,
  TabsContainer,
  Tab,
  Tabs,
  TabPanelsContainer,
  TabPanel,
  TabsOrientation,
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

export const DocsHeading = ({ children, to, type }) => {
  const isInverse = useIsInverse();

  const activeTabIndex = type === 'api' ? 0 : 1;

  console.log('children', children);

  return (
    <>
      <Container style={{ background: magma.colors.neutral200 }}>
        <Heading level={1}>{children}</Heading>
      </Container>
      <Container>
        <TabsContainer activeIndex={activeTabIndex} isInverse={isInverse}>
          <Tabs aria-label="" style={{background: magma.colors.neutral200}}>
            <Tab>Implementation</Tab>
            <Tab>Design</Tab>
          </Tabs>
          <TabPanelsContainer>
            <TabPanel>
              <div>Implementation</div>
              <SubPageTabs pages={['something', 'here']} />
            </TabPanel>
            <TabPanel>
              <div>Design</div>
              <SubPageTabs pages={[]} />
            </TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      </Container>
    </>
  );
};

DocsHeading.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(['api', 'design']).isRequired,
};
