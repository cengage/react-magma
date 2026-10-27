import React from 'react';

import { Meta, StoryFn } from '@storybook/react-webpack5';
import {
  CalendarTodayIcon,
  FormatListBulletedIcon,
  GridViewIcon,
  ViewWeekIcon,
} from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { ButtonSize } from '../Button';
import { Container } from '../Container';

import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlProps,
} from '.';

const Template: StoryFn<SegmentedControlProps> = args => (
  <SegmentedControl aria-label="Time range" defaultValue="day" {...args}>
    <SegmentedControlItem value="day">Day</SegmentedControlItem>
    <SegmentedControlItem value="week">Week</SegmentedControlItem>
    <SegmentedControlItem value="month">Month</SegmentedControlItem>
  </SegmentedControl>
);

enum ItemContent {
  text = 'text',
  leadingIcon = 'leadingIcon',
  trailingIcon = 'trailingIcon',
  bothIcons = 'bothIcons',
  iconOnly = 'iconOnly',
}

interface PlaygroundArgs extends SegmentedControlProps {
  disabledItem: number;
  hasTooltip: boolean;
  itemContent: ItemContent;
  itemCount: number;
}

const PLAYGROUND_ITEMS = [
  { label: 'Day', icon: <CalendarTodayIcon /> },
  { label: 'Week', icon: <ViewWeekIcon /> },
  { label: 'Month', icon: <GridViewIcon /> },
  { label: 'Quarter', icon: <FormatListBulletedIcon /> },
  { label: 'Year', icon: <CalendarTodayIcon /> },
  { label: 'All time', icon: <ViewWeekIcon /> },
  { label: 'Custom', icon: <GridViewIcon /> },
];

const PlaygroundTemplate: StoryFn<PlaygroundArgs> = ({
  disabledItem,
  hasTooltip,
  itemContent,
  itemCount,
  ...args
}) => (
  <SegmentedControl aria-label="Time range" defaultValue="day" {...args}>
    {PLAYGROUND_ITEMS.slice(0, itemCount).map((item, index) => {
      const value = item.label.toLowerCase();
      const isDisabled = disabledItem === index + 1;

      if (itemContent === ItemContent.iconOnly) {
        return (
          <SegmentedControlItem
            aria-label={item.label}
            disabled={isDisabled}
            hasTooltip={hasTooltip}
            icon={item.icon}
            key={value}
            value={value}
          />
        );
      }

      const hasLeading =
        itemContent === ItemContent.leadingIcon ||
        itemContent === ItemContent.bothIcons;
      const hasTrailing =
        itemContent === ItemContent.trailingIcon ||
        itemContent === ItemContent.bothIcons;

      return (
        <SegmentedControlItem
          disabled={isDisabled}
          key={value}
          leadingIcon={hasLeading ? item.icon : undefined}
          trailingIcon={hasTrailing ? <CalendarTodayIcon /> : undefined}
          value={value}
        >
          {item.label}
        </SegmentedControlItem>
      );
    })}
  </SegmentedControl>
);

export default {
  component: SegmentedControl,
  title: 'SegmentedControl',
  decorators: [
    (Story, context) => (
      <Container
        isInverse={context.args.isInverse}
        style={{
          background: context.args.isInverse
            ? magma.colors.neutral1100
            : undefined,
          padding: '20px',
        }}
      >
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(ButtonSize),
    },
    isAnimated: {
      control: { type: 'boolean' },
    },
    isInverse: {
      control: { type: 'boolean' },
    },
    isFullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    breakpoint: {
      control: { type: 'number' },
      description:
        'Viewport width (px) below which the control becomes a Dropdown. Empty = never switches.',
    },
    // A callback, not a setting: calls are logged in the Actions tab
    onChange: { action: 'onChange', control: false },
  },
} as Meta;

const componentArgs = {
  size: ButtonSize.medium,
  isAnimated: true,
  isInverse: false,
  isFullWidth: false,
  disabled: false,
};

export const Default = {
  render: PlaygroundTemplate,

  argTypes: {
    itemCount: {
      control: { type: 'range', min: 2, max: 7, step: 1 },
      description: 'Number of SegmentedControlItem children (story only)',
      table: { category: 'Items' },
    },
    itemContent: {
      control: { type: 'select' },
      options: Object.values(ItemContent),
      description:
        'Item content: `children`, `leadingIcon`, `trailingIcon`, or `icon`',
      table: { category: 'Items' },
    },
    hasTooltip: {
      control: { type: 'boolean' },
      description: '`hasTooltip` on each item (icon only)',
      table: { category: 'Items' },
    },
    disabledItem: {
      control: { type: 'range', min: 0, max: 7, step: 1 },
      description: '`disabled` on the item at this position; 0 for none',
      table: { category: 'Items' },
    },
  },

  args: {
    ...componentArgs,
    breakpoint: 600,
    itemCount: 3,
    itemContent: ItemContent.text,
    hasTooltip: false,
    disabledItem: 0,
  },
};

export const Responsive = {
  render: args => (
    <>
      <p>
        Below {args.breakpoint}px wide this renders as a Dropdown. Resize the
        window or use the Storybook viewport toolbar to see it switch.
      </p>
      <SegmentedControl aria-label="Layout" defaultValue="list" {...args}>
        <SegmentedControlItem
          leadingIcon={<FormatListBulletedIcon />}
          value="list"
        >
          List
        </SegmentedControlItem>
        <SegmentedControlItem leadingIcon={<GridViewIcon />} value="grid">
          Grid
        </SegmentedControlItem>
        <SegmentedControlItem
          disabled
          leadingIcon={<CalendarTodayIcon />}
          value="calendar"
        >
          Calendar
        </SegmentedControlItem>
        <SegmentedControlItem leadingIcon={<ViewWeekIcon />} value="week">
          Week
        </SegmentedControlItem>
      </SegmentedControl>
    </>
  ),

  args: { ...componentArgs, breakpoint: 600 },
};

export const WithoutAnimation = {
  render: Template,

  args: { ...componentArgs, isAnimated: false },
};

export const Sizes = {
  render: args => (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {Object.values(ButtonSize).map(size => (
        <SegmentedControl
          key={size}
          aria-label={`Time range, ${size}`}
          defaultValue="day"
          {...args}
          size={size}
        >
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  ),

  args: { ...componentArgs },
};

export const TextAndIcon = {
  render: args => (
    <SegmentedControl aria-label="Layout" defaultValue="list" {...args}>
      <SegmentedControlItem
        value="list"
        leadingIcon={<FormatListBulletedIcon />}
      >
        List
      </SegmentedControlItem>
      <SegmentedControlItem value="grid" leadingIcon={<GridViewIcon />}>
        Grid
      </SegmentedControlItem>
      <SegmentedControlItem
        value="calendar"
        trailingIcon={<CalendarTodayIcon />}
      >
        Calendar
      </SegmentedControlItem>
      <SegmentedControlItem
        value="week"
        leadingIcon={<ViewWeekIcon />}
        trailingIcon={<CalendarTodayIcon />}
      >
        Week
      </SegmentedControlItem>
    </SegmentedControl>
  ),

  args: { ...componentArgs },
};

export const IconOnly = {
  render: args => (
    <SegmentedControl aria-label="Layout" defaultValue="list" {...args}>
      <SegmentedControlItem
        aria-label="List view"
        icon={<FormatListBulletedIcon />}
        value="list"
      />
      <SegmentedControlItem
        aria-label="Grid view"
        icon={<GridViewIcon />}
        value="grid"
      />
      <SegmentedControlItem
        aria-label="Week view"
        icon={<ViewWeekIcon />}
        value="week"
      />
    </SegmentedControl>
  ),

  args: { ...componentArgs },
};

export const IconOnlyWithTooltip = {
  render: args => (
    <SegmentedControl aria-label="Layout" defaultValue="list" {...args}>
      <SegmentedControlItem
        aria-label="List view"
        hasTooltip
        icon={<FormatListBulletedIcon />}
        value="list"
      />
      <SegmentedControlItem
        aria-label="Grid view"
        hasTooltip
        icon={<GridViewIcon />}
        value="grid"
      />
      <SegmentedControlItem
        aria-label="Week view"
        hasTooltip
        icon={<ViewWeekIcon />}
        value="week"
      />
    </SegmentedControl>
  ),

  args: { ...componentArgs },
};

export const FullWidth = {
  render: Template,

  args: { ...componentArgs, isFullWidth: true },
};

export const LongLabels = {
  render: args => (
    <div style={{ maxWidth: '320px' }}>
      <SegmentedControl aria-label="Audience" defaultValue="all" {...args}>
        <SegmentedControlItem value="all">All students</SegmentedControlItem>
        <SegmentedControlItem value="submitted" title="Submitted on time">
          Submitted on time
        </SegmentedControlItem>
        <SegmentedControlItem value="late" title="Late or missing">
          Late or missing
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  ),

  args: { ...componentArgs, isFullWidth: true },
};

export const Disabled = {
  render: Template,

  args: { ...componentArgs, disabled: true },
};

export const DisabledItem = {
  render: args => (
    <SegmentedControl aria-label="Time range" defaultValue="day" {...args}>
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week" disabled>
        Week
      </SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  ),

  args: { ...componentArgs },
};

export const Inverse = {
  render: Template,

  args: { ...componentArgs, isInverse: true },
};

export const Controlled = {
  render: args => {
    const [value, setValue] = React.useState('week');

    return (
      <>
        <SegmentedControl
          aria-label="Time range"
          {...args}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            args.onChange?.(event, newValue);
          }}
        >
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
        <p>Selected: {value}</p>
      </>
    );
  },

  args: { ...componentArgs },
};
