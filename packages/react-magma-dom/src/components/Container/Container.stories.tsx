import React from 'react';
import { Container, ContainerProps } from './';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Hyperlink } from '../Hyperlink';
import { NavTabs, NavTab } from '../NavTabs';
import { Paragraph } from '../Paragraph';
import {
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from '../Tabs';

import { Story } from '@storybook/react/types-6-0';

export default {
  component: Container,
  title: 'Container',
};

const Template: Story<ContainerProps> = args => (
  <Container {...args}>{args.children}</Container>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div>
      <NavTabs aria-label="Sample Nav Tabs" style={{ marginBottom: '16px' }}>
        <NavTab isActive to="#">
          NavTab One
        </NavTab>
        <NavTab to="#">NavTab Two</NavTab>
      </NavTabs>
      <Heading level={2}>Content Heading</Heading>
      <Paragraph>
        Container content goes here. This content has a{' '}
        <Hyperlink to="#">hyperlink</Hyperlink>.
      </Paragraph>

      <TabsContainer activeIndex={1} style={{ marginBottom: '16px' }}>
        <Tabs aria-label="Sample Tabs">
          <Tab>First tab</Tab>
          <Tab>Second tab</Tab>
        </Tabs>

        <TabPanelsContainer>
          <TabPanel>
            <div>
              <Alert variant={AlertVariant.success} isDismissible>
                This is a success alert.{' '}
                <Hyperlink to="#">Follow this link</Hyperlink>
              </Alert>
              Main page
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Alert variant={AlertVariant.warning} isDismissible>
                This is a warning alert.{' '}
                <Hyperlink to="#">Follow this link</Hyperlink>
              </Alert>
              FAQ
            </div>
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    </div>
  ),
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  ...Default.args,
  maxWidth: '1024px',
};

export const Gutters = Template.bind({});
Gutters.args = {
  ...Default.args,
  gutterWidth: 80,
};
