import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  useIsInverse,
  TabsContainer,
  Tab,
  Tabs,
  TabPanelsContainer,
  TabPanel,
  TabsOrientation,
} from 'react-magma-dom';

export const SubPageTabs = ({ pages }) => {
  const isInverse = useIsInverse();

  console.log('pages', pages);

  return (
    <>
      <TabsContainer
        isInverse={isInverse}
        style={{
          maxWidth: '600px',
          height: '300px',
        }}
      >
        <TabPanelsContainer>
          <TabPanel>
            <div>Email</div>
          </TabPanel>
          <TabPanel>
            <div>Android</div>
          </TabPanel>
          <TabPanel>
            <div>Notifications</div>
          </TabPanel>
        </TabPanelsContainer>
        <Tabs aria-label="Sample Tabs" orientation={TabsOrientation.vertical}>
          <Tab>First item</Tab>
          <Tab>Second item</Tab>
          <Tab>Third item</Tab>
        </Tabs>
      </TabsContainer>
    </>
  );
};

SubPageTabs.propTypes = {
  pages: PropTypes.array,
};
