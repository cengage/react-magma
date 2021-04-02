import * as React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from 'victory';

import magmaTheme from './magma-charts';

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const data2012 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];
const data2013 = [
  { quarter: 1, earnings: 15000 },
  { quarter: 2, earnings: 12500 },
  { quarter: 3, earnings: 19500 },
  { quarter: 4, earnings: 13000 },
];
const data2014 = [
  { quarter: 1, earnings: 11500 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 20000 },
  { quarter: 4, earnings: 15500 },
];
const data2015 = [
  { quarter: 1, earnings: 18000 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 15000 },
  { quarter: 4, earnings: 12000 },
];
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (props, ref) => {
    const { testId, ...other } = props;

    return (
      <div {...other} ref={ref} data-testid={testId}>
        <VictoryChart domainPadding={24} theme={magmaTheme}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `$${x / 1000}k`}
          />
          <VictoryStack>
            <VictoryBar data={data2012} x="quarter" y="earnings" />
            <VictoryBar data={data2013} x="quarter" y="earnings" />
            <VictoryBar data={data2014} x="quarter" y="earnings" />
            <VictoryBar data={data2015} x="quarter" y="earnings" />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
);
