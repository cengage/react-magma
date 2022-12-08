import React, { useState } from 'react';
import { Card, CardBody } from '../Card';
import { AccountCircleIcon } from 'react-magma-icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Tag, TagColor, TagProps, TagSize } from '.';

const Template: Story<TagProps> = args => (
  <>
    <>
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
    </>
    <p>
      <Tag {...args} icon={<AccountCircleIcon />}>
        Default Icon
      </Tag>
      <Tag {...args} icon={<AccountCircleIcon />} color={TagColor.primary}>
        Primary Icon
      </Tag>
      <Tag {...args} icon={<AccountCircleIcon />} color={TagColor.highContrast}>
        High Contrast Icon
      </Tag>
      <Tag {...args} icon={<AccountCircleIcon />} color={TagColor.lowContrast}>
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
  </>
);

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
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};

export const InverseDisabled = Template.bind({});
InverseDisabled.args = {
  isInverse: true,
  disabled: true,
};

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
InverseDisabled.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const OnClick = args => {
  const [counter, setCounter] = useState<number>(0);
  function updateCounter() {
    setCounter(count => count + 1);
  }
  return (
    <>
      <p>
        <strong>Counter: </strong> <span>{counter}</span>
      </p>
      <Tag {...args} onClick={updateCounter}>
        Text Label
      </Tag>
    </>
  );
};
OnClick.args = {};

export const WithDelete = args => {
  const [isVisible, setIsVisible] = useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      <p>
        {isVisible && (
          <Tag {...args} onDelete={deleteMe}>
            Delete
          </Tag>
        )}
      </p>
      <p>
        {isVisible && (
          <Tag {...args} onDelete={deleteMe} icon={<AccountCircleIcon />}>
            Delete Icon
          </Tag>
        )}
      </p>
      <p>
        {isVisible && (
          <Tag size={TagSize.small} {...args} onDelete={deleteMe}>
            Delete Small
          </Tag>
        )}
      </p>
      <p>
        {isVisible && (
          <Tag
            size={TagSize.small}
            {...args}
            onDelete={deleteMe}
            icon={<AccountCircleIcon />}
          >
            Delete Icon Small
          </Tag>
        )}
      </p>
    </>
  );
};

WithDelete.args = {
  ...Default.args,
};
