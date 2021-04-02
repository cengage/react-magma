import * as React from 'react';

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryLegend,
} from 'victory';

import { ThemeContext } from '../../theme/ThemeContext';
import magmaTheme from './magma-charts';

export interface ChartProps {
  data?: any;
}

export const Chart = props => {
  const { data } = props;
  const theme = React.useContext(ThemeContext);

  const XAxisStyles = {
    tickLabels: {
      fontSize: 8,
    },
    axisLabel: {
      padding: 28,
      fontSize: 10,
      fontWeight: 'bold',
    },
  };

  const YAxisStyles = {
    tickLabels: {
      fontSize: 8,
    },
    axisLabel: {
      padding: 40,
      fontSize: 10,
      fontWeight: 'bold',
    },
  };

  const Tooltip = (
    <VictoryTooltip
      pointerLength={0}
      flyoutStyle={{
        stroke: '#DFDFDF',
        fill: theme.colors.neutral08,
        fontSize: 8,
      }}
    />
  );

  const colors = [
    theme.colors.primary,
    theme.colors.pop,
    theme.colors.success,
    theme.colors.pop02,
    theme.colors.danger,
    theme.colors.pop05,
  ];

  return (
    <div style={{ maxHeight: '600px', maxWidth: '800px' }}>
      <VictoryChart
        domainPadding={24}
        theme={magmaTheme}
        height={400}
        padding={{ top: 8, left: 56, right: 48, bottom: 148 }}
        width={580}
      >
        <VictoryAxis
          tickFormat={['Jan', 'Feb', 'March', 'April', 'May']}
          label="2019 Annual Sales Figures"
          style={XAxisStyles}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 8]}
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8]}
          label="Conversion Rate"
          tickFormat={t => `$${t}0k`}
          style={YAxisStyles}
        />

        {data.map((dataset, i) => (
          <VictoryLine
            style={{
              data: { stroke: colors[i] },
              parent: { border: theme.colors.neutral04 },
            }}
            key={`line${i}`}
            data={dataset}
            labelComponent={<></>}
          />
        ))}
        {data.map((dataset, i) => (
          <VictoryScatter
            style={{
              data: {
                fill: theme.colors.neutral08,
                stroke: colors[i],
                strokeWidth: 2,
              },
            }}
            size={4}
            data={dataset}
            labelComponent={Tooltip}
            key={`scatter${i}`}
          />
        ))}

        <VictoryLegend
          x={0}
          y={320}
          title="Select one or more of the categories below to filter out the ones you don’t want to see."
          orientation="horizontal"
          gutter={20}
          style={{
            title: { fontSize: 8 },
          }}
          data={[
            { name: 'Team 1', symbol: { fill: theme.colors.primary } },
            { name: 'Team 2', symbol: { fill: theme.colors.pop } },
            { name: 'Team 3', symbol: { fill: theme.colors.success } },
            { name: 'Team 4', symbol: { fill: theme.colors.pop02 } },
          ]}
        />
      </VictoryChart>
    </div>
  );
};
