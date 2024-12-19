import React from 'react';
import { Card, CardBody } from '../Card';
import { AccountCircleIcon } from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Tag, TagColor, TagProps, TagSize } from '.';
import { Button } from '../Button';

const Template: Story<TagProps> = args => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <p>
          <Tag {...args}>Default</Tag>
          <Tag {...args} color={TagColor.primary}>
            Primary
          </Tag>
          <Tag {...args} color={TagColor.highContrast}>
            High Contrast
          </Tag>
          <Tag {...args} color={TagColor.lowContrast}>
            Low Contrast
          </Tag>
        </p>
        <p>
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
        <p>
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
        <p>
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
        <p>
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
            Deletetable Tag
          </Tag>
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
      control: {
        type: 'select',
        options: TagSize,
      },
    },
    color: {
      control: {
        type: 'select',
        options: TagColor,
      },
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

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isInverse: false,
};

export const OnClick = args => {
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
};
OnClick.args = {};

export const WithDelete = args => {
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
              Delete
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
              Delete Icon
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
              Delete Small
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
              Delete Icon Small
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
};

WithDelete.args = {
  ...Default.args,
};
