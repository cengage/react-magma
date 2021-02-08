import React from 'react';
import { Tabs, TabsIconPosition } from '.';
import { Tab } from './Tab';
import { TabsContainer } from './TabsContainer';
import { TabPanelsContainer } from './TabPanelsContainer';
import { TabPanel } from './TabPanel';
import { EmailIcon, AndroidIcon, NotificationsIcon } from 'react-magma-icons';

export default {
  component: Tabs,
  title: 'Tabs',
};

export const Default = () => {
  const emailIcon = <EmailIcon />;
  const androidIcon = <AndroidIcon />;
  const bellIcon = <NotificationsIcon />;

  return (
    <TabsContainer activeIndex={1}>
      <Tabs aria-label="Sample Tabs" iconPosition={TabsIconPosition.left}>
        <Tab icon={emailIcon}>First item</Tab>
        <Tab icon={androidIcon}>Second item</Tab>
        <Tab icon={bellIcon}>Third item</Tab>
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
