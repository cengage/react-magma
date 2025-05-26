import * as React from 'react';

import styled from '@emotion/styled';
import {
  I18nContext,
  ThemeContext,
  ThemeInterface,
  I18nInterface,
} from 'react-magma-dom';
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
  VictoryVoronoiContainer,
} from 'victory';

import { CustomAxisComponent } from './CustomAxisComponent';
import { CustomScatterDataComponent } from './CustomPointComponent';
import { AxisTooltip, GraphTooltip } from './GraphTooltip';
import { LegendButton } from './LegendButton';
import { magmaTheme } from './magma-charts';

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

/**
 * @deprecated Please use CarbonChart instead
 */
// NOTE: These props are manually copied to line-chart.mdx
export interface LineChartProps<T extends ChartDataOptions> {
  /**
   * Props passed to each component that makes up the line chart. See `victory` for accepted props.
   */
  componentProps?: LineChartComponentProps;
  /**
   * Data used to build the chart
   */
  data?: LineChartData<T>[];
  isMulti?: boolean;
  /**
   * @internal
   */
  lastFocusedScatterPoint: React.MutableRefObject<SVGPathElement | null>;
  /**
   * @internal
   */
  pointRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  /**
   * @internal
   */
  registerPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
  /**
   * @internal
   */
  tabRef: React.MutableRefObject<HTMLButtonElement | null>;
  /**
   * @internal
   */
  unregisterPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
  /**
   * Value of x key in chart data
   */
  x?: keyof T;
  /**
   * Value of y key in chart data
   */
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
  color: ${(props: any) => props.theme.colors.neutral};
  font-size: ${(props: any) => props.theme.typeScale.size02.fontSize};
`;

export function LineChart<T>(props: LineChartProps<T>) {
  const {
    componentProps: {
      chart = {},
      line = {},
      scatter = {},
      xAxis: {
        style: {
          axisLabel: xAxisLabel = undefined,
          tickLabels: xTickLabels = undefined,
          ...xRest
        } = {},
        ...xAxisOther
      } = { style: {} },
      yAxis: {
        style: {
          axisLabel: yAxisLabel = undefined,
          tickLabels: yTickLabels = undefined,
          ...yRest
        } = {},
        ...yAxisOther
      } = { style: {} },
    } = {},
    data = [],
    lastFocusedScatterPoint,
    pointRefArray,
    registerPoint,
    unregisterPoint,
    tabRef,
    x,
    y,
  } = props;

  const theme: ThemeInterface = React.useContext(ThemeContext);
  const i18n: I18nInterface = React.useContext(I18nContext);

  const [hiddenData, setHiddenData] = React.useState<number[]>([]);
  const [width, setWidth] = React.useState<number>(800);
  const [focusedLine, setFocusedLine] = React.useState<number | null>(null);
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);
  const [showXAxisLabel, setShowXAxisLabel] = React.useState<boolean>(true);
  const [hoveringOnXAxisLine, setHoveringOnXAxisLine] =
    React.useState<boolean>(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const firstLegendButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    updateWidth();

    window.addEventListener('resize', updateWidth);
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showTooltip]);

  const scatterNames: string[] = data.map((_, i) => `scatter-${i}`);

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
    containerRef.current && setWidth(containerRef.current.clientWidth);
  }

  function handleEsc(event: KeyboardEvent): any {
    if (event.key === 'Escape') {
      setShowTooltip(null);
      setShowXAxisLabel(false);
    }
  }

  function handleMouseMove() {
    !showTooltip && setShowXAxisLabel(true);
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

  const buildLineIndexes = (
    acc: number[],
    point: React.MutableRefObject<Element>
  ) => {
    if (point.current) {
      const currentLineIndex = parseInt(
        point.current.getAttribute('data-line-index') as string,
        10
      );

      !acc.includes(currentLineIndex) &&
        acc.push(
          parseInt(point.current.getAttribute('data-line-index') as string, 10)
        );
    }

    return acc;
  };

  const buildLineIndexData = (point: React.MutableRefObject<Element>) => {
    const currentLineIndex = parseInt(
      point.current.getAttribute('data-line-index') as string,
      10
    );
    const currentPointIndex = parseInt(
      point.current.getAttribute('data-point-index') as string,
      10
    );
    const lineIndexes = pointRefArray.current.reduce(buildLineIndexes, []);

    const lowestLineIndex = lineIndexes[0];
    const highestLineIndex = lineIndexes[lineIndexes.length - 1];

    return {
      currentLineIndex,
      currentPointIndex,
      lineIndexes,
      lowestLineIndex,
      highestLineIndex,
    };
  };

  const findPointToFocus =
    (lineIndex: number, pointIndex: number) =>
    (point: React.MutableRefObject<Element>) =>
      point.current &&
      parseInt(point.current.getAttribute('data-line-index') as string, 10) ===
        lineIndex &&
      parseInt(point.current.getAttribute('data-point-index') as string, 10) ===
        pointIndex;

  function handleChartContainerKeyDown(event: React.KeyboardEvent) {
    const { key, shiftKey } = event;

    switch (key) {
      case 'Tab': {
        event.preventDefault();
        lastFocusedScatterPoint.current = (
          pointRefArray.current.find(
            point => point.current === document.activeElement
          ) as React.MutableRefObject<Element>
        ).current as SVGPathElement;
        shiftKey
          ? tabRef.current && tabRef.current.focus()
          : firstLegendButtonRef.current &&
            firstLegendButtonRef.current.focus();
        break;
      }
      case 'ArrowRight': {
        const focusedPointIndex = pointRefArray.current.findIndex(
          point => point.current === document.activeElement
        );

        if (focusedPointIndex !== undefined) {
          focusedPointIndex === pointRefArray.current.length - 1
            ? (pointRefArray.current[0]?.current as HTMLButtonElement)?.focus()
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
            currentPointIndex,
            lineIndexes,
            lowestLineIndex,
            highestLineIndex,
          } = buildLineIndexData(focusedPoint);

          switch (currentLineIndex) {
            case lowestLineIndex: {
              (
                (
                  pointRefArray.current.find(
                    findPointToFocus(highestLineIndex, currentPointIndex)
                  ) as React.MutableRefObject<Element>
                ).current as HTMLButtonElement
              ).focus();
              break;
            }
            default: {
              const nextLowestLineIndex =
                lineIndexes[lineIndexes.indexOf(currentLineIndex) - 1];

              (
                (
                  pointRefArray.current.find(
                    findPointToFocus(nextLowestLineIndex, currentPointIndex)
                  ) as React.MutableRefObject<Element>
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
            currentPointIndex,
            lineIndexes,
            lowestLineIndex,
            highestLineIndex,
          } = buildLineIndexData(focusedPoint);

          switch (currentLineIndex) {
            case highestLineIndex: {
              (
                (
                  pointRefArray.current.find(
                    findPointToFocus(lowestLineIndex, currentPointIndex)
                  ) as React.MutableRefObject<Element>
                ).current as HTMLButtonElement
              ).focus();
              break;
            }
            default: {
              const nextHighestLineIndex =
                lineIndexes[lineIndexes.indexOf(currentLineIndex) + 1];

              (
                (
                  pointRefArray.current.find(
                    findPointToFocus(nextHighestLineIndex, currentPointIndex)
                  ) as React.MutableRefObject<Element>
                ).current as HTMLButtonElement
              ).focus();
            }
          }
        }
        break;
      }
    }
  }

  function handleFirstLegendButtonKeydown(event: React.KeyboardEvent) {
    const { key, shiftKey } = event;

    switch (key) {
      case 'Tab': {
        if (
          shiftKey &&
          lastFocusedScatterPoint &&
          lastFocusedScatterPoint.current &&
          pointRefArray.current.find(
            point => point.current === lastFocusedScatterPoint.current
          )
        ) {
          event.preventDefault();
          lastFocusedScatterPoint.current.focus();
        }
        break;
      }
    }
  }

  return (
    <LineChartContainer ref={containerRef}>
      <VictoryChartContainer onKeyDown={handleChartContainerKeyDown}>
        <VictoryChart
          domainPadding={32}
          height={400}
          padding={{ top: 0, left: 80, right: 0, bottom: 62 }}
          theme={magmaTheme}
          width={width}
          containerComponent={
            <VictoryVoronoiContainer
              name="xAxisGroupLabel"
              voronoiBlacklist={scatterNames}
              voronoiDimension="x"
              labels={
                hoveringOnXAxisLine && showXAxisLabel ? () => ` ` : undefined
              }
              labelComponent={
                showXAxisLabel ? (
                  <VictoryTooltip
                    flyoutComponent={
                      <AxisTooltip
                        dataLength={data.length}
                        hiddenData={hiddenData}
                      />
                    }
                  />
                ) : undefined
              }
              role="presentation"
              voronoiPadding={32}
            />
          }
          {...chart}
        >
          <VictoryAxis {...yAxisOther} dependentAxis style={yAxisStyles} />
          {data.map(
            ({ data: dataset }, i) =>
              !hiddenData.includes(i) && (
                <VictoryLine
                  style={{
                    data: {
                      opacity: setLineOpacity(i),
                      stroke: theme.iterableColors[i],
                      strokeWidth: '3',
                    },
                    parent: { border: theme.colors.neutral400 },
                  }}
                  key={`line${i}`}
                  data={dataset as unknown as any[]}
                  labelComponent={<React.Fragment />}
                  x={x as DataGetterPropType}
                  y={y as DataGetterPropType}
                  {...line}
                />
              )
          )}
          <VictoryAxis
            {...xAxisOther}
            style={xAxisStyles}
            gridComponent={
              <CustomAxisComponent
                events={{
                  onMouseEnter: () => setHoveringOnXAxisLine(true),
                  onMouseLeave: () => setHoveringOnXAxisLine(false),
                }}
              />
            }
          />
          {data.map(
            ({ data: dataset }, i) =>
              !hiddenData.includes(i) && (
                <VictoryScatter
                  name={`scatter-${i}`}
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onBlur: () => {
                          setShowXAxisLabel(true);
                          setShowTooltip(null);

                          return [
                            {
                              target: 'labels',
                              mutation: () => ({ active: undefined }),
                            },
                          ];
                        },
                        onClick: () => {
                          return [
                            {
                              target: 'labels',
                              mutation: props => {
                                setShowTooltip(
                                  `${props.datum.lineIndex}-${props.datum.index}`
                                );

                                return { active: true };
                              },
                            },
                          ];
                        },
                        onFocus: () => {
                          setShowXAxisLabel(false);

                          return [
                            {
                              target: 'labels',
                              mutation: props => {
                                setShowTooltip(
                                  `${props.datum.lineIndex}-${props.datum.index}`
                                );

                                return { active: true };
                              },
                            },
                          ];
                        },
                        onMouseEnter: () => {
                          setShowXAxisLabel(false);

                          return [
                            {
                              target: 'labels',
                              mutation: props => {
                                setShowTooltip(
                                  `${props.datum.lineIndex}-${props.datum.index}`
                                );

                                return { active: true };
                              },
                            },
                          ];
                        },
                        onMouseLeave: () => {
                          setShowTooltip(null);
                          setShowXAxisLabel(true);
                        },
                      },
                    },
                  ]}
                  style={{
                    data: {
                      fill: theme.colors.neutral100,
                      opacity: setLineOpacity(i),
                      stroke: theme.iterableColors[i],
                      strokeWidth: 2,
                    },
                  }}
                  size={5}
                  data={
                    dataset.map((datum, index) => ({
                      index,
                      lineIndex: i,
                      ...datum,
                    })) as unknown as any[]
                  }
                  dataComponent={
                    <CustomScatterDataComponent
                      lineIndex={i}
                      pointRefArray={pointRefArray}
                      registerPoint={registerPoint}
                      unregisterPoint={unregisterPoint}
                    />
                  }
                  labels={() => ''}
                  labelComponent={
                    <VictoryTooltip
                      text=""
                      flyoutComponent={
                        <GraphTooltip index={i} showTooltip={showTooltip} />
                      }
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
              color={theme.iterableColors[i]}
              dataIndex={i}
              isHidden={hiddenData.includes(i)}
              key={i}
              name={name}
              onClick={handleLegendClick}
              onKeyDown={i === 0 ? handleFirstLegendButtonKeydown : undefined}
              focusCurrentLine={focusCurrentLine}
              ref={i === 0 ? firstLegendButtonRef : undefined}
              resetLineFocus={resetLineFocus}
            />
          );
        })}
      </DataLegendsContainer>
    </LineChartContainer>
  );
}
