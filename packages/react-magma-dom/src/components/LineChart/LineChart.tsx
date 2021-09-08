import * as React from 'react';
import styled from '../../theme/styled';
import {
  VictoryAxis,
  VictoryAxisProps,
  VictoryChart,
  VictoryChartProps,
  VictoryLine,
  VictoryLineProps,
  VictoryScatter,
  VictoryScatterProps,
  VictoryTooltip,
  Point,
  VictoryVoronoiContainer,
} from 'victory';

import { LegendButton } from './LegendButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';

import magmaTheme from './magma-charts';
import { AxisTooltip, GraphTooltip } from './GraphTooltip';

export type LineChartAxisStyle = VictoryAxisProps['style'];
export type DataGetterPropType = VictoryLineProps['x'];

export type ChartDataOptions =
  | {
      label: string;
      x: string | number;
      y: string | number;
      [key: string]: any;
    }
  | { label: string; [key: string]: any }
  | any;

export interface LineChartData<T> {
  name: string;
  data: T[];
}

export interface LineChartComponentProps {
  chart?: VictoryChartProps;
  line?: VictoryLineProps;
  scatter?: VictoryScatterProps;
  xAxis?: VictoryAxisProps;
  yAxis?: VictoryAxisProps;
}

export interface LineChartProps<T extends ChartDataOptions> {
  componentProps?: LineChartComponentProps;
  data?: LineChartData<T>[];
  isMulti?: boolean;
  x?: keyof T;
  y?: keyof T;
}

const VictoryChartContainer = styled.div`
  max-height: 600px;
  max-width: 800px;
  svg {
    overflow: visible;
  }
`;

const DataLegendsContainer = styled.div`
  padding-bottom: 24px;
`;

const DataLegendsDescription = styled.p`
  color: ${props => props.theme.colors.neutral03};
  font-size: ${props => props.theme.typeScale.size02.fontSize};
`;

const ContainerLabelComponent = (
  <VictoryTooltip flyoutComponent={<AxisTooltip />} />
);

export function LineChart<T>(props: LineChartProps<T>) {
  const {
    data,
    x,
    componentProps: {
      chart = {},
      line = {},
      scatter = {},
      xAxis: {
        style: {
          axisLabel: xAxisLabel,
          tickLabels: xTickLabels,
          ...xRest
        } = {},
        ...xAxisOther
      },
      yAxis: {
        style: {
          axisLabel: yAxisLabel,
          tickLabels: yTickLabels,
          ...yRest
        } = {},
        ...yAxisOther
      } = {},
    } = {},
    y,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [hiddenData, setHiddenData] = React.useState<number[]>([]);
  const [width, setWidth] = React.useState<number>(800);
  const [focusedLine, setFocusedLine] = React.useState<number>(null);
  const [showXAxisLabel, setShowXAxisLabel] = React.useState<boolean>(true);

  const containerRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const scatterNames: string[] = data.map((_, i) => `scatter-${i}`);

  const chartEvents = [
    {
      target: 'data',
      childName: scatterNames,
      eventHandlers: {
        onMouseEnter: () => {
          return [
            {
              childName: 'xAxisGroupLabel',
              target: 'labels',
              mutation: props => {
                setShowXAxisLabel(false);
                return props;
              },
            },
          ];
        },
        onMouseLeave: () => {
          return [
            {
              childName: 'xAxisGroupLabel',
              target: 'labels',
              mutation: props => {
                setShowXAxisLabel(true);
                return props;
              },
            },
          ];
        },
      },
    },
  ];

  const xAxisStyles = {
    tickLabels: {
      fontSize: 14,
      ...xTickLabels,
    },
    axisLabel: {
      padding: 32,
      fontSize: 16,
      fontWeight: 'bold',
      ...xAxisLabel,
    },
    ...xRest,
  };

  const yAxisStyles = {
    tickLabels: {
      fontSize: 14,
      ...yTickLabels,
    },
    axisLabel: {
      padding: 56,
      fontSize: 16,
      fontWeight: 'bold',
      ...yAxisLabel,
    },
    ...yRest,
  };

  function updateWidth() {
    setWidth(containerRef.current.clientWidth);
  }

  function setLineOpacity(index: number) {
    return focusedLine === null ? 1 : focusedLine === index ? 1 : 0.1;
  }

  function handleLegendClick(dataIndex: number) {
    if (hiddenData.includes(dataIndex)) {
      setHiddenData(hiddenData.filter(item => item !== dataIndex));
    } else {
      setHiddenData(hiddenData.concat([dataIndex]));
    }
  }

  function focusCurrentLine(dataIndex: number) {
    setFocusedLine(dataIndex);
  }

  function resetLineFocus() {
    setFocusedLine(null);
  }

  return (
    <VictoryChartContainer ref={containerRef}>
      <VictoryChart
        domainPadding={32}
        events={chartEvents}
        height={400}
        padding={{ top: 8, left: 80, right: 0, bottom: 88 }}
        theme={magmaTheme}
        width={width}
        containerComponent={
          <VictoryVoronoiContainer
            name="xAxisGroupLabel"
            voronoiBlacklist={scatterNames}
            voronoiDimension="x"
            labels={showXAxisLabel ? () => ` ` : undefined}
            labelComponent={
              showXAxisLabel ? ContainerLabelComponent : undefined
            }
          />
        }
        {...chart}
      >
        <VictoryAxis {...xAxisOther} style={xAxisStyles} />
        <VictoryAxis {...yAxisOther} dependentAxis style={yAxisStyles} />

        {data.map(
          ({ data: dataset }, i) =>
            !hiddenData.includes(i) && (
              <VictoryLine
                style={{
                  data: {
                    opacity: setLineOpacity(i),
                    stroke: theme.charts.line.colors[i],
                    strokeWidth: '3',
                  },
                  parent: { border: theme.colors.neutral04 },
                }}
                key={`line${i}`}
                data={dataset as unknown as any[]}
                labelComponent={<></>}
                x={x as DataGetterPropType}
                y={y as DataGetterPropType}
                {...line}
              />
            )
        )}
        {data.map(
          ({ data: dataset }, i) =>
            !hiddenData.includes(i) && (
              <VictoryScatter
                name={`scatter-${i}`}
                style={{
                  data: {
                    fill: theme.colors.neutral08,
                    opacity: setLineOpacity(i),
                    stroke: theme.charts.line.colors[i],
                    strokeWidth: 2,
                  },
                }}
                size={4}
                data={dataset as unknown as any[]}
                dataComponent={
                  <Point
                    role="button"
                    tabIndex={0}
                    ariaLabel={({ datum }) => `${datum.label}`}
                  />
                }
                labels={() => ''}
                labelComponent={
                  <VictoryTooltip
                    text=""
                    flyoutComponent={<GraphTooltip index={i} />}
                  />
                }
                key={`scatter${i}`}
                x={x as DataGetterPropType}
                y={y as DataGetterPropType}
                {...scatter}
              />
            )
        )}
      </VictoryChart>

      <DataLegendsContainer>
        <DataLegendsDescription theme={theme}>
          {i18n.charts.line.dataLegendsLabel}
        </DataLegendsDescription>
        {data.map(({ name }, i) => {
          const legendButtonAriaLabel =
            i18n.charts.line.legendButtonAriaLabel.replace(/\{name\}/g, name);

          return (
            <LegendButton
              aria-label={legendButtonAriaLabel}
              color={theme.charts.line.colors[i]}
              dataIndex={i}
              isHidden={hiddenData.includes(i)}
              key={i}
              onClick={handleLegendClick}
              focusCurrentLine={focusCurrentLine}
              resetLineFocus={resetLineFocus}
            >
              {name}
            </LegendButton>
          );
        })}
      </DataLegendsContainer>
    </VictoryChartContainer>
  );
}
