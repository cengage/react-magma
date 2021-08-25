import * as React from 'react';

import { LineChart, LineChartProps } from './LineChart';
import { ChartDataTable } from './ChartDataTable';
import {
  Heading,
  Paragraph,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from 'react-magma-dom';

interface BaseChartProps {
  description?: string;
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
  const { description, title, testId, type, ...other } = props;
  const firstTabRef = React.useRef<HTMLButtonElement>();

  return (
    <div ref={ref}>
      <Heading level={3}>{title}</Heading>
      {description && (
        <Paragraph style={{ maxWidth: '800px' }}>{description}</Paragraph>
      )}
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
            <Heading level={4}>{title}</Heading>
            {description && <Paragraph>{description}</Paragraph>}
            <ChartDataTable
              data={other.data}
              xData={{
                keyValue: other.x,
                label: other.componentProps?.xAxis?.label,
                tickFormat: other.componentProps?.xAxis?.tickFormat,
              }}
              yData={{
                keyValue: other.y,
                tickFormat: other.componentProps?.yAxis?.tickFormat,
              }}
            />
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    </div>
  );
}

export const Chart = React.forwardRef(BaseChart) as <T>(
  props: ChartProps<T> & { ref?: React.MutableRefObject<HTMLDivElement> }
) => ReturnType<typeof BaseChart>;
