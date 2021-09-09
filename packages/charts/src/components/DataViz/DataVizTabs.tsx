import * as React from 'react';

import {
  Heading,
  Paragraph,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from 'react-magma-dom';
export interface DataVizTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: String;
  introContent?: React.Component;
  data?: any;
  testId?: string;
}

export const DataVizTabs = React.forwardRef<HTMLDivElement, DataVizTabsProps>(
  (props, ref) => {
    const { data, testId, ...other } = props;

    return (
      <div ref={ref} {...other}>
        <Heading level={3}>Simple Line</Heading>
        <Paragraph>
          Data table description - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec ullamcorper quam dolor, at consequat mi pretium
          in. Duis iaculis ligula nibh, sit amet.
        </Paragraph>
        <TabsContainer>
          <Tabs aria-label="Line Chart Demo">
            <Tab>Chart</Tab>
            <Tab>Data</Tab>
          </Tabs>
          <TabPanelsContainer>
            <TabPanel>Chart goes here!</TabPanel>
            <TabPanel>
              <Heading level={4}>2019 Annual Sales Figures</Heading>
              <Paragraph>Conversion rate by month</Paragraph>
              Table goes here!
            </TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      </div>
    );
  }
);
