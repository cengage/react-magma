import * as React from 'react';
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

import {
  I18nContext,
  ThemeContext,
  useDescendants,
  styled,
} from 'react-magma-dom';

import magmaTheme from './magma-charts';
import { AxisTooltip, GraphTooltip } from './GraphTooltip';
import { CustomPointComponent } from './CustomPointComponent';
import { LegendButton } from './LegendButton';

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
  /**
   * @internal
   */
  tabRef?: React.MutableRefObject<HTMLButtonElement>;
  x?: keyof T;
  y?: keyof T;
}

const LineChartContainer = styled.div`
  max-height: 600px;
  max-width: 800px;
  svg {
    overflow: visible;
  }
`;

const VictoryChartContainer = styled.div``;

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
    data,
    tabRef,
    x,
    y,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [hiddenData, setHiddenData] = React.useState<number[]>([]);
  const [width, setWidth] = React.useState<number>(800);
  const [focusedLine, setFocusedLine] = React.useState<number>(null);
  const [showXAxisLabel, setShowXAxisLabel] = React.useState<boolean>(true);

  const containerRef = React.useRef<HTMLDivElement>();
  const firstLegendButtonRef = React.useRef<HTMLButtonElement>();

  const [pointRefArray, registerPoint, unregisterPoint] = useDescendants();

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
      color: '#3f3f3f',
      fontSize: 12,
      ...xTickLabels,
    },
    axisLabel: {
      color: '#3f3f3f',
      padding: 44,
      fontSize: 14,
      fontWeight: 'bold',
      ...xAxisLabel,
    },
    ...xRest,
  };

  const yAxisStyles = {
    tickLabels: {
      fontSize: 12,
      ...yTickLabels,
    },
    axisLabel: {
      color: '#3f3f3f',
      padding: 64,
      fontSize: 14,
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

  const buildLineIndexes = (acc, point) => {
    if (point.current) {
      const currentLineIndex = parseInt(
        point.current.getAttribute('data-line-index'),
        10
      );
      !acc.includes(currentLineIndex) &&
        acc.push(parseInt(point.current.getAttribute('data-line-index'), 10));
    }
    return acc;
  };

  const buildLineIndexData = point => {
    const currentLineIndex = parseInt(
      point.current.getAttribute('data-line-index'),
      10
    );
    const lineIndexes = pointRefArray.current.reduce(buildLineIndexes, []);

    const lowestLineIndex = lineIndexes[0];
    const highestLineIndex = lineIndexes[lineIndexes.length - 1];

    return {
      currentLineIndex,
      lineIndexes,
      lowestLineIndex,
      highestLineIndex,
    };
  };

  const findPointToFocus = index => point =>
    point.current &&
    parseInt(point.current.getAttribute('data-line-index'), 10) === index;

  function handleChartContainerKeyDown(event: React.KeyboardEvent) {
    const { key, shiftKey } = event;
    switch (key) {
      case 'Tab': {
        event.preventDefault();
        shiftKey
          ? tabRef.current.focus()
          : firstLegendButtonRef.current.focus();
        break;
      }
      case 'ArrowRight': {
        const focusedPointIndex = pointRefArray.current.findIndex(
          point => point.current === document.activeElement
        );

        if (focusedPointIndex !== undefined) {
          focusedPointIndex === pointRefArray.current.length - 1
            ? (pointRefArray.current[0].current as HTMLButtonElement).focus()
            : (
                pointRefArray.current[focusedPointIndex + 1]
                  .current as HTMLButtonElement
              ).focus();
        }
        break;
      }
      case 'ArrowLeft': {
        const focusedPointIndex = pointRefArray.current.findIndex(
          point => point.current === document.activeElement
        );

        if (focusedPointIndex !== undefined) {
          focusedPointIndex === 0
            ? (
                pointRefArray.current[pointRefArray.current.length - 1]
                  .current as HTMLButtonElement
              ).focus()
            : (
                pointRefArray.current[focusedPointIndex - 1]
                  .current as HTMLButtonElement
              ).focus();
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const focusedPoint = pointRefArray.current.find(
          point => point.current === document.activeElement
        );

        if (focusedPoint && focusedPoint.current) {
          const {
            currentLineIndex,
            lineIndexes,
            lowestLineIndex,
            highestLineIndex,
          } = buildLineIndexData(focusedPoint);

          switch (currentLineIndex) {
            case lowestLineIndex: {
              (
                pointRefArray.current.find(findPointToFocus(highestLineIndex))
                  .current as HTMLButtonElement
              ).focus();
              break;
            }
            default: {
              const nextLowestLineIndex =
                lineIndexes[lineIndexes.indexOf(currentLineIndex) - 1];
              (
                pointRefArray.current.find(
                  findPointToFocus(nextLowestLineIndex)
                ).current as HTMLButtonElement
              ).focus();
            }
          }
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const focusedPoint = pointRefArray.current.find(
          point => point.current === document.activeElement
        );

        if (focusedPoint && focusedPoint.current) {
          const {
            currentLineIndex,
            lineIndexes,
            lowestLineIndex,
            highestLineIndex,
          } = buildLineIndexData(focusedPoint);

          switch (currentLineIndex) {
            case highestLineIndex: {
              (
                pointRefArray.current.find(findPointToFocus(lowestLineIndex))
                  .current as HTMLButtonElement
              ).focus();
              break;
            }
            default: {
              const nextHighestLineIndex =
                lineIndexes[lineIndexes.indexOf(currentLineIndex) + 1];
              (
                pointRefArray.current.find(
                  findPointToFocus(nextHighestLineIndex)
                ).current as HTMLButtonElement
              ).focus();
            }
          }
        }
        break;
      }
    }
  }

  return (
    <LineChartContainer ref={containerRef}>
      <VictoryChartContainer
        ref={containerRef}
        onKeyDown={handleChartContainerKeyDown}
      >
        <VictoryChart
          domainPadding={32}
          events={chartEvents}
          height={400}
          padding={{ top: 0, left: 80, right: 0, bottom: 62 }}
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
              voronoiPadding={32}
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
                  size={5}
                  data={dataset as unknown as any[]}
                  dataComponent={
                    <Point
                      ariaLabel={({ datum }) => `${datum.label}`}
                      pathComponent={
                        <CustomPointComponent
                          lineIndex={i}
                          pointRefArray={pointRefArray}
                          registerPoint={registerPoint}
                          unregisterPoint={unregisterPoint}
                        />
                      }
                      role="button"
                      tabIndex={0}
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
      </VictoryChartContainer>

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
              ref={i === 0 ? firstLegendButtonRef : undefined}
              resetLineFocus={resetLineFocus}
            >
              {name}
            </LegendButton>
          );
        })}
      </DataLegendsContainer>
    </LineChartContainer>
  );
}
