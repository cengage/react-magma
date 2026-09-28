import React from 'react';

import { StoryFn, Meta } from '@storybook/react-webpack5';
import { AccountCircleIcon } from 'react-magma-icons';

import { Button } from '../Button';
import { Card, CardBody } from '../Card';

import { Tag, TagColor, TagProps, TagSize } from '.';

const dataVizTagColors = [
  { color: TagColor.blue, label: 'Blue' },
  { color: TagColor.teal, label: 'Teal' },
  { color: TagColor.pink, label: 'Pink' },
  { color: TagColor.purple, label: 'Purple' },
];

const tagColorExamples = [
  { color: TagColor.primary, label: 'Primary' },
  ...dataVizTagColors,
];

const tagGroupStyles: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const Template: StoryFn<TagProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <p style={tagGroupStyles}>
          <Tag {...args}>Default</Tag>
          <Tag {...args} color={TagColor.highContrast}>
            High Contrast
          </Tag>
          <Tag {...args} color={TagColor.lowContrast}>
            Low Contrast
          </Tag>
        </p>
        <p style={tagGroupStyles}>
          {tagColorExamples.map(({ color, label }) => (
            <Tag {...args} color={color} key={color}>
              {label}
            </Tag>
          ))}
        </p>
        <p style={tagGroupStyles}>
          <Tag {...args} icon={<AccountCircleIcon />}>
            Default Icon
          </Tag>
          <Tag {...args} icon={<AccountCircleIcon />} color={TagColor.primary}>
            Primary Icon
          </Tag>
          <Tag
            {...args}
            icon={<AccountCircleIcon />}
            color={TagColor.highContrast}
          >
            High Contrast Icon
          </Tag>
          <Tag
            {...args}
            icon={<AccountCircleIcon />}
            color={TagColor.lowContrast}
          >
            Low Contrast Icon
          </Tag>
        </p>
        <p style={tagGroupStyles}>
          {dataVizTagColors.map(({ color, label }) => (
            <Tag {...args} color={color} icon={<AccountCircleIcon />} key={color}>
              {label} Icon
            </Tag>
          ))}
        </p>
        <p style={tagGroupStyles}>
          <Tag {...args} size={TagSize.small}>
            Default Small
          </Tag>
          <Tag {...args} size={TagSize.small} color={TagColor.primary}>
            Primary Small
          </Tag>
          <Tag {...args} size={TagSize.small} color={TagColor.highContrast}>
            High Contrast Small
          </Tag>
          <Tag {...args} size={TagSize.small} color={TagColor.lowContrast}>
            Low Contrast Small
          </Tag>
        </p>
        <p style={tagGroupStyles}>
          {dataVizTagColors.map(({ color, label }) => (
            <Tag {...args} color={color} key={color} size={TagSize.small}>
              {label} Small
            </Tag>
          ))}
        </p>
        <p style={tagGroupStyles}>
          <Tag {...args} icon={<AccountCircleIcon />} size={TagSize.small}>
            Default Small Icon
          </Tag>
          <Tag
            {...args}
            icon={<AccountCircleIcon />}
            size={TagSize.small}
            color={TagColor.primary}
          >
            Primary Small Icon
          </Tag>
          <Tag
            {...args}
            icon={<AccountCircleIcon />}
            size={TagSize.small}
            color={TagColor.highContrast}
          >
            High Contrast Small Icon
          </Tag>
          <Tag
            {...args}
            icon={<AccountCircleIcon />}
            size={TagSize.small}
            color={TagColor.lowContrast}
          >
            Low Contrast Small Icon
          </Tag>
        </p>
        <p style={tagGroupStyles}>
          <Tag
            size={args.size}
            color={args.color}
            isInverse={args.isInverse}
            disabled={args.disabled}
            onClick={() => {
              console.log('clicked');
            }}
          >
            Clickable Tag
          </Tag>
          <Tag
            size={args.size}
            color={args.color}
            isInverse={args.isInverse}
            disabled={args.disabled}
            onDelete={() => {
              console.log('clicked');
            }}
          >
            Deletetable
          </Tag>
        </p>
        <p style={tagGroupStyles}>
          {dataVizTagColors.map(({ color, label }) => (
            <Tag
              color={color}
              disabled={args.disabled}
              isInverse={args.isInverse}
              key={color}
              onDelete={() => {
                console.log('clicked');
              }}
              size={args.size}
            >
              {label} Deletable
            </Tag>
          ))}
        </p>
        <p style={tagGroupStyles}>
          {dataVizTagColors.map(({ color, label }) => (
            <Tag
              color={color}
              disabled={args.disabled}
              isInverse={args.isInverse}
              key={color}
              onDelete={() => {
                console.log('clicked');
              }}
              size={TagSize.small}
            >
              {label} Small Deletable
            </Tag>
          ))}
        </p>
      </CardBody>
    </Card>
  );
};

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(TagSize),
    },
    color: {
      control: { type: 'select' },
      options: Object.values(TagColor),
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = {
  render: Template,

  args: {
    disabled: false,
    isInverse: false,
  },
};

export const OnClick = {
  render: args => {
    const [counter, setCounter] = React.useState<number>(0);

    function updateCounter() {
      setCounter(count => count + 1);
    }

    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <p>
            <strong>Counter: </strong> <span>{counter}</span>
          </p>
          <Tag {...args} onClick={updateCounter}>
            Text Label
          </Tag>
        </CardBody>
      </Card>
    );
  },

  args: {},
};

export const WithDelete = {
  render: args => {
    const [isVisibleDefault, setIsVisibleDefault] = React.useState(true);
    const [isVisibleIcon, setIsVisibleIcon] = React.useState(true);
    const [isVisibleSmall, setIsVisibleSmall] = React.useState(true);
    const [isVisibleSmallIcon, setIsVisibleSmallIcon] = React.useState(true);

    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <p>
            {isVisibleDefault && (
              <Tag {...args} onDelete={() => setIsVisibleDefault(false)}>
                Math
              </Tag>
            )}
          </p>
          <p>
            {isVisibleIcon && (
              <Tag
                {...args}
                onDelete={() => setIsVisibleIcon(false)}
                icon={<AccountCircleIcon />}
              >
                Deleteable
              </Tag>
            )}
          </p>
          <p>
            {isVisibleSmall && (
              <Tag
                size={TagSize.small}
                {...args}
                onDelete={() => setIsVisibleSmall(false)}
              >
                Deleteable Small
              </Tag>
            )}
          </p>
          <p>
            {isVisibleSmallIcon && (
              <Tag
                size={TagSize.small}
                {...args}
                onDelete={() => setIsVisibleSmallIcon(false)}
                icon={<AccountCircleIcon />}
              >
                Icon Small
              </Tag>
            )}
          </p>

          <Button
            isInverse={args.isInverse}
            onClick={() => {
              setIsVisibleDefault(true);
              setIsVisibleIcon(true);
              setIsVisibleSmall(true);
              setIsVisibleSmallIcon(true);
            }}
          >
            Make all tags visible
          </Button>
        </CardBody>
      </Card>
    );
  },

  args: {
    ...Default.args,
  },
};
