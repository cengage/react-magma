import React from 'react';

import { ScaleTypes } from '@carbon/charts-react';
import { StoryFn, Meta } from '@storybook/react/types-6-0';
import {
  Badge,
  BadgeColor,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  Card,
  IconButton,
  Tooltip,
} from 'react-magma-dom';
import { InfoIcon } from 'react-magma-icons';

import { CarbonChart, CarbonChartProps, CarbonChartType } from '../CarbonChart';

export default {
  component: CarbonChart,
  title: 'CarbonChart/ChartToolbar',
  argTypes: {
    isInverse: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const donutDataSet = [
  { group: 'Not attempted', value: 5 },
  { group: 'Poor performance (Score less than 33%)', value: 15 },
  { group: 'High performance (Score greater than 66%)', value: 50 },
  { group: 'Average performance (Score between 33% and 66%)', value: 30 },
];

const barDataSet = [
  { group: 'Chapter 1', value: 85 },
  { group: 'Chapter 2', value: 72 },
  { group: 'Chapter 3', value: 91 },
  { group: 'Chapter 4', value: 64 },
];

// ---------------------------------------------------------------------------
// Full toolbar – Donut chart (all buttons via chartToolbar prop)
// ---------------------------------------------------------------------------

/**
 * Full toolbar with Show as Table, Full Screen, and More Options buttons,
 * driven entirely by the `chartToolbar` prop on CarbonChart.
 *
 * Carbon's built-in toolbar is automatically disabled when `chartToolbar`
 * is provided. The Magma toolbar renders accessible replacements with
 * proper ARIA attributes, focus management, and heading semantics.
 */
const FullToolbarTemplate: StoryFn<CarbonChartProps> = args => (
  <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
    <CarbonChart {...args} />
  </Card>
);

export const DonutWithToolbar = {
  render: FullToolbarTemplate,
  args: {
    isInverse: false,
    type: CarbonChartType.donut,
    dataSet: donutDataSet,
    options: {
      title: 'Overall Activity Performance',
      resizable: true,
      height: '400px',
      donut: {
        center: { label: 'Questions' },
      },
      legend: {
        truncation: { type: 'none' },
      },
    },
    chartToolbar: {},
  },
};

// ---------------------------------------------------------------------------
// Bar chart with custom table columns
// ---------------------------------------------------------------------------

export const BarWithToolbar = {
  render: FullToolbarTemplate,
  args: {
    isInverse: false,
    type: CarbonChartType.bar,
    dataSet: barDataSet,
    options: {
      title: 'Chapter Performance',
      axes: {
        left: { mapsTo: 'value' },
        bottom: { mapsTo: 'group', scaleType: 'labels' },
      },
      height: '400px',
    },
    chartToolbar: {
      tableColumns: [
        { header: 'Chapter', key: 'group' },
        { header: 'Score (%)', key: 'value' },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Inverse theme
// ---------------------------------------------------------------------------

export const InverseTheme = {
  render: FullToolbarTemplate,
  args: {
    isInverse: true,
    type: CarbonChartType.donut,
    dataSet: donutDataSet,
    options: {
      title: 'Inverse Theme Demo',
      resizable: true,
      height: '400px',
      donut: {
        center: { label: 'Questions' },
      },
      legend: {
        truncation: { type: 'none' },
      },
    },
    chartToolbar: {},
  },
};

// ---------------------------------------------------------------------------
// Table only (no fullscreen or more options)
// ---------------------------------------------------------------------------

export const TableOnly = {
  render: FullToolbarTemplate,
  args: {
    isInverse: false,
    type: CarbonChartType.donut,
    dataSet: donutDataSet,
    options: {
      title: 'Table Only (No Fullscreen)',
      resizable: true,
      height: '400px',
      donut: {
        center: { label: 'Questions' },
      },
      legend: {
        truncation: { type: 'none' },
      },
    },
    chartToolbar: {
      fullscreen: false,
    },
  },
};

// ---------------------------------------------------------------------------
// Custom content slots
// ---------------------------------------------------------------------------

const chartInfoLabel =
  'Scores are averaged across all attempts in the selected term.';

const ChartInfoTooltip = () => (
  <Tooltip content={chartInfoLabel}>
    <IconButton
      aria-label={chartInfoLabel}
      icon={<InfoIcon />}
      size={ButtonSize.small}
      type={ButtonType.button}
      variant={ButtonVariant.link}
    />
  </Tooltip>
);

const slotContent = {
  tooltip: <ChartInfoTooltip />,
  badge: <Badge color={BadgeColor.success}>Live</Badge>,
  none: undefined,
};

interface TitleSlotsArgs extends Omit<CarbonChartProps, 'options'> {
  content: keyof typeof slotContent;
  slotPosition: 'titleSuffix' | 'titlePrefix';
  title: string;
}

export const TitleSlots = {
  render: ({ content, slotPosition, title, ...args }: TitleSlotsArgs) => (
    <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
      <CarbonChart
        {...args}
        options={{
          title,
          axes: {
            left: { mapsTo: 'value' },
            bottom: { mapsTo: 'group', scaleType: ScaleTypes.LABELS },
          },
          height: '400px',
        }}
        chartToolbar={{
          titlePrefix:
            slotPosition === 'titlePrefix' ? slotContent[content] : undefined,
          titleSuffix:
            slotPosition === 'titleSuffix' ? slotContent[content] : undefined,
        }}
      />
    </Card>
  ),
  argTypes: {
    content: {
      control: { type: 'radio' },
      options: ['tooltip', 'badge', 'none'],
    },
    slotPosition: {
      control: { type: 'radio' },
      options: ['titleSuffix', 'titlePrefix'],
    },
    title: { control: { type: 'text' } },
  },
  args: {
    content: 'tooltip',
    isInverse: false,
    slotPosition: 'titleSuffix',
    title: 'Chapter Performance',
    type: CarbonChartType.bar,
    dataSet: barDataSet,
  },
};
