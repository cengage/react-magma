import * as React from 'react';

import {
  AreaChart,
  StackedAreaChart,
  DonutChart,
  GroupedBarChart,
  LineChart,
  LollipopChart,
  PieChart,
  SimpleBarChart,
  StackedBarChart,
  RadarChart,
  BoxplotChart,
  BubbleChart,
  BulletChart,
  GaugeChart,
  HistogramChart,
  MeterChart,
  ScatterChart,
  ComboChart,
  ChartOptions,
} from '@carbon/charts-react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import {
  Announce,
  DropdownDivider,
  DropdownMenuItem,
  InverseContext,
  ThemeInterface,
  ThemeContext,
  useDeviceDetect,
  useIsInverse,
  VisuallyHidden,
} from 'react-magma-dom';
import {
  FullscreenExitIcon,
  FullscreenIcon,
  MoreVertIcon,
  TableIcon,
} from 'react-magma-icons';

import { useCarbonModalFocusManagement } from '../../hooks/useCarbonModalFocusManagement';
// @ts-ignore
import './carbon-charts.css';
import {
  ChartFullscreenButton,
  ChartMoreOptionsButton,
  ChartTableButton,
  ChartTableModal,
} from '../ChartTable';
import type { ChartDataTableColumn } from '../ChartTable';
import { useChartToolbarI18n } from '../ChartTable/chartToolbarI18n';

export enum CarbonChartType {
  area = 'area',
  areaStacked = 'areaStacked',
  bar = 'bar',
  barGrouped = 'barGrouped',
  barStacked = 'barStacked',
  boxplot = 'boxplot',
  bubble = 'bubble',
  bullet = 'bullet',
  donut = 'donut',
  gauge = 'gauge',
  histogram = 'histogram',
  line = 'line',
  lollipop = 'lollipop',
  meter = 'meter',
  pie = 'pie',
  radar = 'radar',
  scatter = 'scatter',
  combo = 'combo',
}

export interface ChartToolbarConfig {
  /**
   * When true, renders a "Show as table" button that opens a Magma Modal
   * with the chart data in an accessible table.
   * @default true
   */
  showAsTable?: boolean;
  /**
   * When true, renders a fullscreen toggle button.
   * @default true
   */
  fullscreen?: boolean;
  /**
   * Additional menu items rendered inside a "More options" dropdown,
   * below the built-in "Download as CSV", "Download as PNG", and "Download as JPG" items.
   * Pass DropdownMenuItem elements.
   */
  moreOptions?: React.ReactNode;
  /**
   * Custom column definitions for the table modal.
   * If omitted, columns are auto-derived from the dataset object keys.
   */
  tableColumns?: ChartDataTableColumn[];
  /**
   * First line of the modal heading.
   * @default "Tabular representation"
   */
  tableHeaderLabel?: string;
  /**
   * Heading level for the modal header.
   * @default 2
   */
  tableHeaderLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Heading level for the chart title.
   * @default 2
   */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Custom content rendered before the chart title.
   *
   * The content is placed inline in the title row and follows the same
   * accessibility rules as `titleSuffix`.
   */
  titlePrefix?: React.ReactNode;

  /**
   * Custom content rendered after the chart title and before toolbar actions.
   *
   * The content is placed inline in the title row and renders outside the
   * heading element to preserve `options.title` as the heading's accessible name.
   * Useful for patterns like Tooltip + IconButton.
   */
  titleSuffix?: React.ReactNode;
}

export interface CarbonChartProps extends React.HTMLAttributes<HTMLDivElement> {
  dataSet: Array<object>;
  isInverse?: boolean;
  /**
   * For a complete list of options, see Carbon Charts documentation
   */
  options: ChartOptions;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Type of Chart: area, bar, donut, line, etc.
   */
  type: CarbonChartType;
  /**
   * Text for the aria-label attribute for main SVG container, if provided
   */
  ariaLabel?: string;
  /**
   * When provided, renders an accessible Magma toolbar above the chart with
   * "Show as table", fullscreen, and "More options" buttons. Carbon's built-in
   * toolbar is automatically disabled.
   */
  chartToolbar?: ChartToolbarConfig;
  /**
   * Custom content rendered below the toolbar row and above the chart itself,
   * for example a filter. Requires `chartToolbar`; ignored without it.
   *
   * Providing this lays the toolbar out in normal flow instead of overlaying
   * the single row Carbon reserves for its title, so the rendered height
   * becomes toolbar + content + chart rather than the chart box alone. Set
   * `options.height` so the chart still has a definite height of its own.
   */
  additionalContent?: React.ReactNode;
}

const ChartContentWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const FullscreenRoot = styled.div<{
  isFlowLayout?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  height: 100%;
  width: 100%;

  &:fullscreen,
  &:-webkit-full-screen {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary700
        : props.theme.colors.neutral100};

    ${props =>
      props.isFlowLayout
        ? `
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 2em;

    .carbon-chart-wrapper,
    .carbon-chart-content {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-height: 0;
    }

    .cds--chart-holder {
      flex: 1 1 auto;
      height: auto !important;
      min-height: 0;
    }
    `
        : `
    .cds--chart-holder {
      height: 100vh !important;
    }
    `}
  }
`;

const CarbonChartWrapper = styled.div<{
  isInverse?: boolean;
  groupsLength: number;
  theme: ThemeInterface;
}>`
  .cds--cc--legend-fieldset {
    border: 0;
    margin: 0;
    min-inline-size: 0;
    padding: 0;
  }

  .cds--cc--legend-fieldset > legend {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    top: auto;
    white-space: nowrap;
    width: 1px;
  }

  &:fullscreen,
  &:-webkit-full-screen {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary700
        : props.theme.colors.neutral100};

    .cds--chart-holder {
      height: 100vh !important;
    }
  }

  .cds--chart-holder.filled,
  .cds--chart-holder.filled .cds--cc--chart-wrapper {
    background-color: ${props =>
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.neutral100};
  }

  .cds--data-table thead tr th {
    background: ${props =>
      props.isInverse ? props.theme.colors.primary700 : ''} !important;
  }
  .cds--data-table td,
  .cds--data-table tbody th {
    color: ${props => props.theme.colors.neutral700};
  }
  .cds--data-table tbody tr,
  .cds--data-table tbody tr td,
  .cds--data-table tbody tr th {
    color: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
  }
  .cds--data-table tr {
    block-size: 2.5rem;
  }

  .cds--cc--tooltip .content-box .datapoint-tooltip p {
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    padding: ${props => props.theme.spaceScale.spacing02};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
    max-width: 142px;
    white-space: normal;
  }

  .cds--modal-container {
    clip-path: inset(0% 0% 0% 0% round ${props => props.theme.borderRadius});
    background: ${props =>
      props.isInverse ? props.theme.colors.primary700 : ''};
    .cds--data-table th {
      background: ${props =>
        props.isInverse ? props.theme.colors.primary600 : ''};
    }
    .cds--data-table td {
      border-top: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : 'inherit'};
      border-bottom: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : 'inherit'};
      background: ${props => (props.isInverse ? '#202565' : '')};
    }
    .cds--data-table tr:hover td {
      background: ${props =>
        props.isInverse ? props.theme.colors.primary600 : ''};
    }
  }

  .chart-holder p,
  .chart-holder div,
  .chart-holder text,
  .cds--cc--axes g.axis .axis-title,
  .cds--cc--title p.title,
  .cds--cc--axes g.axis g.tick text {
    font-family: ${props => props.theme.bodyFont} !important;
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
  }

  .cds--cc--axes {
    overflow: visible;
  }

  div.cds--cc--legend {
    div.legend-item {
      div.checkbox {
        background: ${props =>
          props.isInverse
            ? props.theme.colors.neutral900
            : props.theme.colors.neutral100};
        border: none;
        width: ${props => props.theme.spaceScale.spacing05};
        height: ${props => props.theme.spaceScale.spacing05};
        svg {
          left: 2px;
          position: relative;
        }
      }
      p {
        font-size: ${props => props.theme.typeScale.size03.fontSize};
        margin: 0 ${props => props.theme.spaceScale.spacing03} 0 0;
      }
    }
  }
  div.cds--cc--legend.has-deactivated-items {
    div.legend-item {
      div.checkbox {
        border: 1px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.neutral100
              : props.theme.colors.neutral900};
      }
      div.checkbox.active {
        border: 1px solid transparent;
      }
    }
  }
  .chart-holder {
    .cds--cc--axes g.axis g.tick text {
      fill: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
    }
    .cds--cc--axes g.axis path.domain {
      stroke: ${props =>
        props.isInverse ? props.theme.colors.neutral100 : ''};
    }
    .cds--cc--grid g.x.grid g.tick line,
    .cds--cc--grid g.y.grid g.tick line {
      stroke: ${props =>
        props.isInverse
          ? transparentize(0.5, props.theme.colors.neutral100)
          : ''};
    }
    .cds--cc--grid rect.chart-grid-backdrop.stroked {
      stroke: ${props =>
        props.isInverse ? props.theme.colors.neutral100 : ''};
    }
    .cds--cc--skeleton .shimmer-effect-lines {
      filter: ${props => (props.isInverse ? 'invert(1)' : '')};
    }
    /* .chart-holder.cds--chart-holder.filled,
    .cds--cc--skeleton rect.chart-skeleton-backdrop,
    .cds--cc--grid rect.chart-grid-backdrop {
    } */

    .cds--cc--grid rect.chart-grid-backdrop {
      fill: transparent;
    }
    .cds--cc--scatter circle.dot,
    .cds--cc--scatter circle.dot.hovered {
      padding: 10px;
    }
    .cds--cc--scatter-stacked circle.dot.hovered,
    .cds--cc--scatter-stacked circle.dot.unfilled,
    .cds--cc--scatter circle.dot.unfilled {
      stroke-width: 6px;
      transition: 0.1s all linear;
    }
    .cds--cc--scatter circle.dot {
      filter: drop-shadow(
          1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          -1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px 1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px -1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        );
    }
    .cds--cc--scatter circle.dot.hovered {
      stroke-width: 0.5em;
      transition: 0.1s all linear;
      filter: drop-shadow(
          1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          -1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px 1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px -1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        );
    }
    .cds--cc--lollipop circle.dot,
    .cds--cc--lollipop circle.dot.filled,
    .cds--cc--lollipop circle.dot.hovered {
      stroke-width: 15px;
    }
    .cds--cc--scatter-stacked circle.dot,
    .cds--cc--scatter-stacked circle.dot.hovered,
    .cds--cc--scatter-stacked circle.dot.unfilled,
    .cds--cc--scatter circle.dot.unfilled,
    .cds--cc--lollipop circle.dot.filled,
    .cds--cc--lollipop circle.dot,
    .cds--cc--lollipop circle.dot.hovered {
      transition: 0.1s all linear;
      filter: drop-shadow(
          1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          -1px 0px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px 1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        )
        drop-shadow(
          0px -1px 0px
            ${props =>
              props.isInverse
                ? props.theme.colors.primary600
                : props.theme.colors.neutral100}
        );
    }
    .cds--cc--lollipop .cds--cc--scatter circle.dot.hovered {
      transition: 0.1s all linear;
      stroke-width: 1.1em;
    }

    .cds--cc--tooltip {
      ${props => {
        const chartColors =
          (props.isInverse
            ? props.theme.chartColorsInverse
            : props.theme.chartColors) || [];

        return chartColors.reduce((result, color, index) => {
          const indexNum = index + 1;
          const newResult =
            result +
            `.tooltip-${props.groupsLength}-1-${indexNum} { background-color: ${color}; }`;

          return newResult;
        }, '');
      }}
    }

    .cds--overflow-menu-options__btn:focus {
      outline-color: ${props =>
        props.isInverse ? props.theme.colors.focusInverse : ''};
    }

    .cds--btn {
      min-height: auto;
      display: flex;
      flex: 0 auto;
      align-items: center;
      text-align: center;
      padding: 20px;
      margin: 0;
      line-height: ${props => props.theme.typeScale.size03.lineHeight};
      margin: 0;
      min-width: ${props => props.theme.spaceScale.spacing13};
      overflow: hidden;
      position: relative;
      right: ${props => props.theme.spaceScale.spacing04};
      text-align: center;
      height: 40px;
      font-family: ${props => props.theme.bodyFont};
      font-size: ${props => props.theme.typeScale.size03.fontSize};
      border-radius: ${props => props.theme.borderRadius};
      font-weight: 500;
    }

    .cds--btn--primary {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.tertiary500
          : props.theme.colors.primary};
      color: ${props => (props.isInverse ? props.theme.colors.neutral900 : '')};
    }

    *:focus {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus} !important;
      outline-offset: 0;
    }
    circle.dot:focus {
      outline: none !important;
    }
    .cds--overflow-menu-options__btn:focus,
    .cds--overflow-menu:focus,
    .cds--overflow-menu__trigger:focus,
    .toolbar-control:focus {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus} !important;
    }
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):focus
      div.checkbox,
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):hover
      div.checkbox {
      border: ${props =>
        props.isInverse ? `1px solid ${props.theme.colors.focusInverse}` : ''};
    }
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):hover
      div.checkbox {
      box-shadow: 0 0 0 2px
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus} !important;
    }

    .cds--btn--primary {
      &:focus {
        outline: 2px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.focusInverse
              : props.theme.colors.focus};
      }
      outline-offset: 2px;
      border: none;
      box-shadow: none;
    }
    .cds--modal-header {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.primary600
          : props.theme.colors.neutral100};
      margin-bottom: 0;
      border-bottom: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : props.theme.colors.neutral300};
    }
    .cds--modal-header__heading {
      font-weight: 600;
    }

    .cds--modal-close {
      position: absolute;
      top: 0;
      right: 0;
      &:focus {
        outline: 2px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.focusInverse
              : props.theme.colors.focus};
        border-color: none;
      }
      outline-offset: 0;
      border: none;
    }
  }

  .cds--modal-footer.cds--modal-footer {
    display: flex;
    align-items: center;
    border-top: 1px solid
      ${props =>
        props.isInverse
          ? transparentize(0.8, props.theme.colors.neutral100)
          : props.theme.colors.neutral300};
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.neutral100} !important;
  }
  .layout-child.header {
    height: auto !important;
    p {
      text-overflow: inherit;
      overflow: auto;
      white-space: normal;
    }
  }

  &.has-magma-toolbar .cds--cc--title p.title {
    visibility: hidden;
  }

  svg:not(:root) {
    overflow: visible;
  }

  circle.dot:focus {
    outline: none;
    stroke: ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus} !important;
    stroke-width: 6px !important;
    stroke-opacity: 1 !important;
    paint-order: stroke fill;
  }

  .cds--cc--chart-wrapper text {
    font-size: ${props => props.theme.typeScale.size02.fontSize};
  }

  g.center text,
  .pie-label {
    fill: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
  }

  // Zoom responsive tweaks

  @media screen and (max-width: 760px) {
    .cds--modal-container {
      overflow-y: auto;
    }
    .cds--chart-holder .cds--modal .cds--modal-container .cds--modal-content {
      overflow: visible;
    }
    .cds--chart-holder
      .cds--modal
      .cds--modal-container
      .cds--modal-content
      table
      th {
      position: relative;
    }
  }
`;

/* Carbon themes
https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/interfaces/enums.ts#L12)
*/
enum ChartTheme {
  WHITE = 'white', // default
  G100 = 'g100', // isInverse
  G90 = 'g90',
  G10 = 'g10',
}

interface ColorsObject {
  [key: string]: string;
}

type ExtendedChartOptions = ChartOptions & {
  title?: string;
  colors?: string[];
};

const ToolbarWrapper = styled.div<{
  isFlowLayout?: boolean;
  isFullscreen?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  z-index: 2;

  ${props =>
    props.isFlowLayout
      ? `
  position: relative;
  `
      : `
  left: ${props.isFullscreen ? '2em' : '0'};
  position: absolute;
  right: ${props.isFullscreen ? '2em' : '0'};
  top: ${props.isFullscreen ? '2em' : '0'};
  `}

  button {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.primary500};

    &:focus {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
      outline-offset: 0;
    }
  }
`;

const ChartTitle = styled.h2<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  font-family: ${props => props.theme.bodyFont} !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  letter-spacing: normal !important;
  line-height: 1.25 !important;
  margin: 0 !important;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700} !important;
`;

const TitleGroup = styled.div<{ theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing02};
  min-width: 0;
`;

const TitleSlot = styled.div`
  align-items: center;
  display: flex;
`;

const ChartSlot = styled.div<{ theme: ThemeInterface }>`
  margin: ${props => props.theme.spaceScale.spacing05} 0 0;
`;

const ToolbarActions = styled.div<{ theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing02};

  > * button,
  > button {
    height: 2rem;
    min-height: 2rem;
    min-width: 2rem;
    padding: 4px;
    width: 2rem;
  }

  [role='tooltip'] {
    padding: ${props => props.theme.spaceScale.spacing03}
      ${props => props.theme.spaceScale.spacing04};
    text-align: center;
    white-space: nowrap;
  }

  [data-testid='dropdownContent'] {
    padding: ${props => props.theme.spaceScale.spacing03} 0;
  }

  [role='menuitem'],
  [data-testid='dropdownMenuItem'] {
    padding: ${props => props.theme.spaceScale.spacing03}
      ${props => props.theme.spaceScale.spacing05};
  }
`;

function sanitizeCsvValue(value: string): string {
  const trimmed = value.trimStart();

  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${value}`;
  }

  return value;
}

function downloadCsv(dataSet: Array<Record<string, unknown>>, title: string) {
  if (!dataSet.length) return;
  const keys = Object.keys(dataSet[0]);
  const header = keys.map(k => sanitizeCsvValue(k)).join(',');
  const rows = dataSet.map(row =>
    keys
      .map(k => {
        const v = row[k];
        const s = sanitizeCsvValue(String(v ?? ''));

        return s.includes(',') || s.includes('"') || s.includes('\n')
          ? `"${s.replace(/"/g, '""')}"`
          : s;
      })
      .join(',')
  );
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `${title || 'chart-data'}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

interface CarbonChartCore {
  services?: {
    domUtils?: { exportToPNG: () => void; exportToJPG: () => void };
  };
}

interface CarbonChartComponent {
  chart?: CarbonChartCore;
}

function exportCarbonChartImage(
  chart: CarbonChartCore | null | undefined,
  toolbarWrapper: Element | null | undefined,
  format: 'png' | 'jpg'
) {
  const domUtils = chart?.services?.domUtils;

  if (!domUtils) return;

  const magmaWrapper = toolbarWrapper?.classList.contains('has-magma-toolbar')
    ? toolbarWrapper
    : null;

  magmaWrapper?.classList.remove('has-magma-toolbar');

  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    magmaWrapper?.classList.add('has-magma-toolbar');
  };

  try {
    if (format === 'jpg') {
      domUtils.exportToJPG();
    } else {
      domUtils.exportToPNG();
    }
  } catch (error) {
    console.warn('Carbon chart image export failed', error);
  } finally {
    // Re-add before the next paint so the title swap is never visible on
    // screen; the timeout is only a fallback for when requestAnimationFrame is
    // paused (e.g. the tab is in the background).
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(restore);
    }
    setTimeout(restore, 1000);
  }
}

const ALL_CHARTS: Record<CarbonChartType, React.ComponentType<any>> = {
  area: AreaChart,
  areaStacked: StackedAreaChart,
  bar: SimpleBarChart,
  barGrouped: GroupedBarChart,
  barStacked: StackedBarChart,
  donut: DonutChart,
  line: LineChart,
  lollipop: LollipopChart,
  pie: PieChart,
  radar: RadarChart,
  boxplot: BoxplotChart,
  bubble: BubbleChart,
  bullet: BulletChart,
  gauge: GaugeChart,
  histogram: HistogramChart,
  meter: MeterChart,
  scatter: ScatterChart,
  combo: ComboChart,
};

interface InternalToolbarProps {
  chartRef: React.MutableRefObject<CarbonChartComponent | null>;
  config: ChartToolbarConfig;
  dataSet: Array<Record<string, unknown>>;
  isFlowLayout: boolean;
  isInverse: boolean;
  isTableOpen: boolean;
  isFullscreen: boolean;
  onOpenTable: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleFullscreen: () => void;
  theme: ThemeInterface;
  title: string;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

function CarbonChartToolbar({
  chartRef,
  config,
  dataSet,
  isFlowLayout,
  isInverse,
  isTableOpen,
  isFullscreen,
  onOpenTable,
  onToggleFullscreen,
  theme,
  title,
  wrapperRef,
}: InternalToolbarProps) {
  const t = useChartToolbarI18n();
  const showTable = config.showAsTable !== false;
  const showFullscreen = config.fullscreen !== false;
  const resolvedTitle = title || t.defaultTitle;

  const exportImage = React.useCallback(
    (format: 'png' | 'jpg') => {
      exportCarbonChartImage(
        chartRef.current?.chart,
        wrapperRef.current?.querySelector('.carbon-chart-wrapper'),
        format
      );
    },
    [chartRef, wrapperRef]
  );

  const handleDownloadCsv = React.useCallback(() => {
    downloadCsv(dataSet, title);
  }, [dataSet, title]);

  const handleDownloadPng = React.useCallback(() => {
    exportImage('png');
  }, [exportImage]);

  const handleDownloadJpg = React.useCallback(() => {
    exportImage('jpg');
  }, [exportImage]);

  const moreOptionsContent = (
    <>
      <DropdownMenuItem onClick={handleDownloadCsv}>
        {t.downloadAsCsv}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDownloadPng}>
        {t.downloadAsPng}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDownloadJpg}>
        {t.downloadAsJpg}
      </DropdownMenuItem>
      {config.moreOptions && (
        <>
          <DropdownDivider />
          {config.moreOptions}
        </>
      )}
    </>
  );

  return (
    <ToolbarWrapper
      isFlowLayout={isFlowLayout}
      isFullscreen={isFullscreen}
      isInverse={isInverse}
      theme={theme}
    >
      <TitleGroup theme={theme}>
        {config.titlePrefix ? (
          <TitleSlot>{config.titlePrefix}</TitleSlot>
        ) : null}
        <ChartTitle
          as={`h${config.titleLevel ?? 2}` as keyof JSX.IntrinsicElements}
          isInverse={isInverse}
          theme={theme}
        >
          {resolvedTitle}
        </ChartTitle>
        {config.titleSuffix ? (
          <TitleSlot>{config.titleSuffix}</TitleSlot>
        ) : null}
      </TitleGroup>
      <ToolbarActions theme={theme}>
        {showTable && (
          <ChartTableButton
            ariaLabel={resolvedTitle}
            icon={<TableIcon size={20} />}
            isInverse={isInverse}
            isTableOpen={isTableOpen}
            onClick={onOpenTable}
          />
        )}
        {showFullscreen && (
          <ChartFullscreenButton
            ariaLabel={`${isFullscreen ? 'Exit' : 'View'} ${resolvedTitle} full screen`}
            icon={<FullscreenIcon size={20} />}
            exitIcon={<FullscreenExitIcon size={20} />}
            isInverse={isInverse}
            isFullscreen={isFullscreen}
            onClick={onToggleFullscreen}
          />
        )}
        <ChartMoreOptionsButton
          icon={<MoreVertIcon size={20} />}
          isInverse={isInverse}
        >
          {moreOptionsContent}
        </ChartMoreOptionsButton>
      </ToolbarActions>
    </ToolbarWrapper>
  );
}

export const CarbonChart = React.forwardRef<HTMLDivElement, CarbonChartProps>(
  (props, ref) => {
    const {
      testId,
      isInverse: isInverseProp,
      type,
      dataSet,
      options,
      additionalContent,
      ariaLabel,
      chartToolbar,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext) as ThemeInterface;
    const isInverse = useIsInverse(isInverseProp);
    const toolbarI18n = useChartToolbarI18n();
    const internalRef = React.useRef<HTMLDivElement | null>(null);
    const chartComponentRef = React.useRef<CarbonChartComponent | null>(null);

    const [isTableOpen, setIsTableOpen] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [legendAnnouncement, setLegendAnnouncement] = React.useState('');
    const legendGroupAnnounceRef = React.useRef<HTMLDivElement | null>(null);
    const lastTableTriggerRef = React.useRef<HTMLButtonElement | null>(null);
    const legendAnnouncedRef = React.useRef(false);
    const selectionSignatureRef = React.useRef<string | undefined>(undefined);
    const { isMacOS, isChrome } = useDeviceDetect();

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const fullscreenEnabled = chartToolbar
      ? chartToolbar.fullscreen !== false
      : false;

    const isFlowLayout = Boolean(chartToolbar && additionalContent);

    const savedHeightRef = React.useRef<string>('');

    React.useEffect(() => {
      if (!fullscreenEnabled) return;

      const onFullscreenChange = () => {
        const isFs = !!document.fullscreenElement;

        setIsFullscreen(isFs);

        const chartHolder =
          internalRef.current?.querySelector<HTMLElement>('.cds--chart-holder');

        if (chartHolder && !isFlowLayout) {
          if (isFs) {
            savedHeightRef.current = chartHolder.style.height;
            chartHolder.style.height = '100vh';
          } else {
            chartHolder.style.height = savedHeightRef.current;
          }
        }
      };

      document.addEventListener('fullscreenchange', onFullscreenChange);

      return () => {
        document.removeEventListener('fullscreenchange', onFullscreenChange);
        // Restore height if the component unmounts while in fullscreen.
        const chartHolder =
          internalRef.current?.querySelector<HTMLElement>('.cds--chart-holder');

        if (chartHolder && document.fullscreenElement) {
          chartHolder.style.height = savedHeightRef.current;
        }
      };
    }, [fullscreenEnabled, isFlowLayout]);

    const openTableModal = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        lastTableTriggerRef.current = event.currentTarget;
        setIsTableOpen(true);
      },
      []
    );

    const closeTableModal = React.useCallback(() => {
      setIsTableOpen(false);
      requestAnimationFrame(() => {
        lastTableTriggerRef.current?.focus();
      });
    }, []);

    const toggleFullscreen = React.useCallback(() => {
      if (!document.fullscreenElement && internalRef.current) {
        internalRef.current.requestFullscreen().catch(() => {
          // Fullscreen request may be denied by the browser or user agent
        });
      } else if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {
          // Exit fullscreen may fail if already exited
        });
      }
    }, []);

    const chartTitle: string =
      (options as ExtendedChartOptions).title || toolbarI18n.defaultTitle;

    const legendLabel = `${ariaLabel || chartTitle}. ${toolbarI18n.legendInstructions}`;

    React.useEffect(() => {
      const container = internalRef.current;

      if (!container) return;

      const applyListSemantics = (legend: Element) => {
        const itemsHost = legend.matches('[data-name="legend-items"]')
          ? legend
          : legend.querySelector('[data-name="legend-items"]') || legend;

        itemsHost.removeAttribute('aria-label');

        if (itemsHost.getAttribute('role') !== 'list') {
          itemsHost.setAttribute('role', 'list');
        }

        legend.querySelectorAll('.legend-item').forEach(item => {
          if (item.getAttribute('role') !== 'listitem') {
            item.setAttribute('role', 'listitem');
          }
        });

        container.querySelectorAll('[role="list"]').forEach(el => {
          if (el !== itemsHost && el.contains(itemsHost)) {
            el.removeAttribute('role');
          }
        });
        container.querySelectorAll('[aria-label="Data groups"]').forEach(el => {
          if (el !== itemsHost && el.contains(itemsHost)) {
            el.removeAttribute('aria-label');
          }
        });
      };

      const unwrapFieldset = (fieldset: Element) => {
        fieldset.querySelector(':scope > legend')?.remove();
        fieldset.replaceWith(...Array.from(fieldset.childNodes));
      };

      const wrapLegend = () => {
        const legend = container.querySelector('.cds--cc--legend');

        if (!legend) return;

        applyListSemantics(legend);

        const closestFieldset = legend.closest(
          'fieldset.cds--cc--legend-fieldset'
        );

        container
          .querySelectorAll('fieldset.cds--cc--legend-fieldset')
          .forEach(fieldset => {
            if (fieldset !== closestFieldset) {
              unwrapFieldset(fieldset);
            }
          });

        if (closestFieldset) {
          const existingCaption =
            closestFieldset.querySelector(':scope > legend');

          if (existingCaption && existingCaption.textContent !== legendLabel) {
            existingCaption.textContent = legendLabel;
          }

          return;
        }

        const fieldset = document.createElement('fieldset');
        const caption = document.createElement('legend');

        fieldset.className = 'cds--cc--legend-fieldset';
        caption.textContent = legendLabel;
        legend.before(fieldset);
        fieldset.append(caption, legend);
      };

      wrapLegend();
      const observer = new MutationObserver(wrapLegend);

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['role', 'aria-label'],
      });

      return () => observer.disconnect();
    }, [legendLabel]);

    React.useEffect(() => {
      const container = internalRef.current;

      if (!container || !isMacOS || !isChrome) return;

      let announceTimer: ReturnType<typeof setTimeout>;
      let alternateSuffix = false;

      const closestLegend = (node: EventTarget | null) =>
        node instanceof Element ? node.closest('.cds--cc--legend') : null;

      const handleFocusIn = (event: FocusEvent) => {
        const enteredLegend = closestLegend(event.target);
        const cameFromLegend = closestLegend(event.relatedTarget);

        if (enteredLegend && !cameFromLegend) {
          if (legendGroupAnnounceRef.current) {
            legendGroupAnnounceRef.current.textContent = '';
          }

          clearTimeout(announceTimer);
          announceTimer = setTimeout(() => {
            if (legendGroupAnnounceRef.current) {
              alternateSuffix = !alternateSuffix;
              legendGroupAnnounceRef.current.textContent =
                legendLabel + (alternateSuffix ? ' ' : '');
            }
          }, 250);
        }
      };

      const handleFocusOut = (event: FocusEvent) => {
        const leftLegend =
          closestLegend(event.target) && !closestLegend(event.relatedTarget);

        // Reset once focus leaves the legend so re-entering announces again.
        if (leftLegend) {
          clearTimeout(announceTimer);

          if (legendGroupAnnounceRef.current) {
            legendGroupAnnounceRef.current.textContent = '';
          }
        }
      };

      container.addEventListener('focusin', handleFocusIn);
      container.addEventListener('focusout', handleFocusOut);

      return () => {
        clearTimeout(announceTimer);
        container.removeEventListener('focusin', handleFocusIn);
        container.removeEventListener('focusout', handleFocusOut);
      };
    }, [isMacOS, isChrome, legendLabel]);

    const handleModalDownloadCsv = React.useCallback(() => {
      downloadCsv(dataSet as Array<Record<string, unknown>>, chartTitle);
    }, [dataSet, chartTitle]);

    useCarbonModalFocusManagement(internalRef);

    const colorScale = React.useMemo(() => {
      const scaleColorsObj: ColorsObject = {};
      const customColors = (options as ExtendedChartOptions).colors || [];
      const allColors = [...customColors, ...theme.chartColors];
      const allInverseColors = [...customColors, ...theme.chartColorsInverse];
      const allGroups = dataSet.map(item =>
        'group' in item ? (item as Record<string, unknown>)['group'] : null
      );
      const uniqueGroups = Array.from(new Set(allGroups));

      if (uniqueGroups.length <= allColors.length) {
        for (let i = 0; i < uniqueGroups.length; i++) {
          const group = uniqueGroups[i];

          scaleColorsObj[String(group ?? 'null')] = isInverse
            ? allInverseColors[i]
            : allColors[i];
        }
      }

      return scaleColorsObj;
    }, [
      dataSet,
      options,
      theme.chartColors,
      theme.chartColorsInverse,
      isInverse,
    ]);

    const newOptions = {
      ...options,
      theme: isInverse ? ChartTheme.G100 : ChartTheme.WHITE,
      color: {
        scale: colorScale,
      },
      tooltip: {
        ...(options?.tooltip || {}),
        truncation: {
          type: 'none',
        },
      },
      ...(chartToolbar
        ? {
            toolbar: { enabled: false },
            title: chartTitle,
            ...(options.fileDownload
              ? {}
              : { fileDownload: { fileName: chartTitle } }),
          }
        : {}),
    };

    const ChartType = ALL_CHARTS[type];

    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (internalRef.current) {
          internalRef.current
            .querySelectorAll<SVGGElement>('g[aria-label]')
            .forEach(g => {
              const role = g.getAttribute('role');

              if (!role) {
                g.setAttribute('role', 'img');
              } else if (role === 'graphics-object group') {
                g.setAttribute('role', 'graphics-object');
              }
            });
        }
      }, 0);

      return () => clearTimeout(timer);
    }, [type, dataSet]);

    React.useEffect(() => {
      const wrapper = internalRef.current;

      if (!wrapper) return;

      const observer = new MutationObserver(() => {
        const allItems = wrapper.querySelectorAll<HTMLElement>(
          '.legend-item:not(.additional)'
        );

        if (allItems.length <= 1) return;

        const activeLabels: string[] = [];

        allItems.forEach(el => {
          const checkbox = el.querySelector<HTMLElement>('.checkbox');
          const label = el.querySelector('p');

          if (checkbox?.getAttribute('aria-checked') === 'true' && label) {
            activeLabels.push(label.textContent?.trim() || '');
          }
        });

        // Carbon re-applies aria-checked (with the same values) on every
        // render, which still triggers this observer. Only announce when the
        // selection actually changed, otherwise unrelated re-renders (e.g.
        // the legend group announcement) cause phantom announcements.
        const selectionSignature = `${activeLabels.join('|')}::${allItems.length}`;

        if (selectionSignatureRef.current === selectionSignature) return;

        const isFirstRun = selectionSignatureRef.current === undefined;

        selectionSignatureRef.current = selectionSignature;

        if (isFirstRun) return;

        if (activeLabels.length === 1) {
          if (!legendAnnouncedRef.current) {
            legendAnnouncedRef.current = true;
            setLegendAnnouncement(`Only ${activeLabels[0]} is selected`);
          }
        } else if (activeLabels.length === allItems.length) {
          legendAnnouncedRef.current = false;
          setLegendAnnouncement('All items selected');
        } else {
          legendAnnouncedRef.current = false;
          setLegendAnnouncement('');
        }
      });

      observer.observe(wrapper, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['aria-checked'],
      });

      return () => observer.disconnect();
    }, [type, dataSet]);

    // Make Carbon Charts data points keyboard-focusable.
    React.useEffect(() => {
      const wrapper = internalRef.current;

      if (!wrapper) return;

      const isDot = (el: EventTarget | null): el is SVGCircleElement =>
        el instanceof Element &&
        el.nodeName.toLowerCase() === 'circle' &&
        el.classList.contains('dot');

      const onFocusIn = (e: FocusEvent) => {
        if (!isDot(e.target)) return;
        const dot = e.target as SVGCircleElement;

        dot.style.opacity = '1';
        const { left, top, width, height } = dot.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;

        dot.dispatchEvent(
          new MouseEvent('mouseover', {
            bubbles: true,
            clientX: cx,
            clientY: cy,
            screenX: cx,
            screenY: cy,
          })
        );
        dot.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            clientX: cx,
            clientY: cy,
            screenX: cx,
            screenY: cy,
          })
        );
      };

      const onFocusOut = (e: FocusEvent) => {
        if (!isDot(e.target)) return;
        const dot = e.target;

        dot.style.opacity = '';
        dot.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (!isDot(e.target)) return;
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        const dot = e.target;
        const { left, top, width, height } = dot.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;

        dot.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            clientX: cx,
            clientY: cy,
          })
        );
      };

      const rafId = requestAnimationFrame(() => {
        wrapper
          .querySelectorAll<SVGCircleElement>('circle.dot')
          .forEach(dot => {
            if (!dot.hasAttribute('tabindex')) {
              dot.setAttribute('tabindex', '0');
            }
          });
      });

      wrapper.addEventListener('focusin', onFocusIn);
      wrapper.addEventListener('focusout', onFocusOut);
      wrapper.addEventListener('keydown', onKeyDown);

      return () => {
        cancelAnimationFrame(rafId);
        wrapper.removeEventListener('focusin', onFocusIn);
        wrapper.removeEventListener('focusout', onFocusOut);
        wrapper.removeEventListener('keydown', onKeyDown);
      };
    }, [type]);

    const groupsLength = Object.keys(colorScale).length;

    const showTable = chartToolbar?.showAsTable !== false;

    if (!ChartType) return null;

    return (
      <FullscreenRoot
        ref={mergedRef}
        isFlowLayout={isFlowLayout}
        isInverse={isInverse}
        theme={theme}
      >
        <VisuallyHidden>
          <Announce>{legendAnnouncement}</Announce>
        </VisuallyHidden>
        <VisuallyHidden>
          <div aria-live="polite" ref={legendGroupAnnounceRef} />
        </VisuallyHidden>
        <CarbonChartWrapper
          data-testid={testId}
          isInverse={isInverse}
          theme={theme}
          className={`carbon-chart-wrapper${
            chartToolbar ? ' has-magma-toolbar' : ''
          }`}
          groupsLength={groupsLength < 6 ? groupsLength : 14}
          role="region"
          aria-label={ariaLabel || chartTitle}
          aria-roledescription="chart"
          {...rest}
        >
          <ChartContentWrapper className="carbon-chart-content">
            {chartToolbar && (
              /*
               * Slot content comes from the adopter, so it resolves
               * `isInverse` from context rather than from our prop. Without
               * this provider a Magma component in a title slot would stay
               * light on an inverse chart.
               */
              <InverseContext.Provider value={{ isInverse }}>
                <CarbonChartToolbar
                  chartRef={chartComponentRef}
                  config={chartToolbar}
                  dataSet={dataSet as Array<Record<string, unknown>>}
                  isFlowLayout={isFlowLayout}
                  isInverse={isInverse}
                  isTableOpen={isTableOpen}
                  isFullscreen={isFullscreen}
                  onOpenTable={openTableModal}
                  onToggleFullscreen={toggleFullscreen}
                  theme={theme}
                  title={chartTitle}
                  wrapperRef={internalRef}
                />
                {isFlowLayout && (
                  <ChartSlot theme={theme}>{additionalContent}</ChartSlot>
                )}
              </InverseContext.Provider>
            )}
            <ChartType
              ref={chartComponentRef}
              data={dataSet}
              options={newOptions}
            />
          </ChartContentWrapper>
        </CarbonChartWrapper>
        {chartToolbar && showTable && (
          <ChartTableModal
            columns={chartToolbar.tableColumns}
            portalContainer={isFullscreen ? internalRef.current : undefined}
            dataSet={dataSet as Array<Record<string, React.ReactNode>>}
            headerLabel={chartToolbar.tableHeaderLabel}
            headerLevel={chartToolbar.tableHeaderLevel}
            isInverse={isInverse}
            isOpen={isTableOpen}
            onClose={closeTableModal}
            onDownloadCsv={handleModalDownloadCsv}
            title={chartTitle}
          />
        )}
      </FullscreenRoot>
    );
  }
);
