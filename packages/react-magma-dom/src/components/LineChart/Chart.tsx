import * as React from 'react';

import { LineChart, LineChartProps } from './LineChart';
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

interface BaseChartProps {
  testId?: string;
  title: string;
  type: string;
}
export interface ChartProps<T extends any>
  extends BaseChartProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    LineChartProps<T> {}

function BaseChart<T>(
  props: ChartProps<T>,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  const { title, testId, type, ...other } = props;
  const firstTabRef = React.useRef<HTMLButtonElement>();

  return (
    <div ref={ref} {...other}>
      <Heading level={3}>Line Chart Proof of Concept</Heading>
      <Paragraph style={{ maxWidth: '800px' }}>{title}</Paragraph>
      <TabsContainer>
        <Tabs aria-label="Line Chart Demo">
          <Tab ref={firstTabRef}>Chart</Tab>
          <Tab>Data</Tab>
        </Tabs>
        <TabPanelsContainer>
          <TabPanel>
            {type === 'line' && (
              <LineChart<T> {...other} tabRef={firstTabRef} />
            )}
          </TabPanel>
          <TabPanel>
            <Heading level={4}>2019 Annual Sales Figures</Heading>
            <Paragraph>Conversion rate by month</Paragraph>
            <DataTable data={other.data} />
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    </div>
  );
}

export const Chart = React.forwardRef(BaseChart) as <T>(
  props: ChartProps<T> & { ref?: React.MutableRefObject<HTMLDivElement> }
) => ReturnType<typeof BaseChart>;
