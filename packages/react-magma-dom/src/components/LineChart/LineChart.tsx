import * as React from 'react';

import { Chart } from './Chart';
import { DataTable } from './DataTable';
import {
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from '../Tabs';

import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any;
  testId?: string;
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
            <TabPanel>
              <Chart data={data} />
            </TabPanel>
            <TabPanel>
              <Heading level={4}>2019 Annual Sales Figures</Heading>
              <Paragraph>Conversion rate by month</Paragraph>
              <DataTable data={data} />
            </TabPanel>
          </TabPanelsContainer>
        </TabsContainer>
      </div>
    );
  }
);
