import React from 'react';
import { Tabs } from '.';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabPanel } from './TabPanel';

export default {
  component: Tabs,
  title: 'Tabs',
};

export const Default = () => {
  return (
    <TabsContainer activeIndex={1}>
      <Tabs aria-label="Sample Tabs">
        <Tab>Main page</Tab>
        <Tab>FAQ</Tab>
        <Tab>About us</Tab>
      </Tabs>

      <TabPanelsContainer>
        <TabPanel>
          <div>Main page</div>
        </TabPanel>
        <TabPanel>
          <div>FAQ</div>
        </TabPanel>
        <TabPanel>
          <div>About us</div>
        </TabPanel>
      </TabPanelsContainer>
    </TabsContainer>
  );
};
