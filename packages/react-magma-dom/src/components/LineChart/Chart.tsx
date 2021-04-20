import * as React from 'react';

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  Point,
} from 'victory';

import { LegendButton } from './LegendButton';
import { ThemeContext } from '../../theme/ThemeContext';
import magmaTheme from './magma-charts';

export interface ChartProps {
  data?: any;
}

export const Chart = props => {
  const { data } = props;
  const theme = React.useContext(ThemeContext);

  const [hiddenData, setHiddenData] = React.useState([]);

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

  function handleLegendClick(dataIndex: number) {
    if (hiddenData.includes(dataIndex)) {
      setHiddenData(hiddenData.filter(item => item !== dataIndex));
    } else {
      setHiddenData(hiddenData.concat([dataIndex]));
    }
  }

  return (
    <div style={{ maxHeight: '600px', maxWidth: '800px' }}>
      <VictoryChart
        domainPadding={24}
        theme={magmaTheme}
        height={400}
        padding={{ top: 8, left: 56, right: 48, bottom: 24 }}
        width={580}
      >
        <title>
          Annual sales figures for 2019 description - Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </title>
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

        {data.map(
          (dataset, i) =>
            !hiddenData.includes(i) && (
              <VictoryLine
                style={{
                  data: { stroke: colors[i] },
                  parent: { border: theme.colors.neutral04 },
                }}
                key={`line${i}`}
                data={dataset}
                labelComponent={<></>}
              />
            )
        )}
        {data.map(
          (dataset, i) =>
            !hiddenData.includes(i) && (
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
                dataComponent={
                  <Point
                    role="button"
                    tabIndex={0}
                    ariaLabel={({ datum }) => `x: ${datum.label}`}
                  />
                }
                labelComponent={Tooltip}
                key={`scatter${i}`}
              />
            )
        )}
      </VictoryChart>

      <div style={{ paddingBottom: '24px' }}>
        <p style={{ color: '#727272' }}>
          Select one or more of the categories below to filter out the ones you
          don’t want to see.
        </p>
        {data.map((datum, i) => (
          <LegendButton
            aria-label={`Toggle data for team ${i + 1}`}
            color={colors[i]}
            dataIndex={i}
            key={i}
            onClick={handleLegendClick}
          >
            Team {i + 1}
          </LegendButton>
        ))}
      </div>
    </div>
  );
};
