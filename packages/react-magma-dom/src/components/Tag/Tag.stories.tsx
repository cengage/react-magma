import React from 'react';
import { Card, CardBody } from '../Card';
import { AccountCircleIcon } from 'react-magma-icons';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Tag, TagColor, TagProps, TagSize } from '.';

const Template: Story<TagProps> = args => <Tag {...args}>Text Label</Tag>;

const TemplateIcon: Story<TagProps> = args => (
  <Tag {...args} icon={<AccountCircleIcon />}>
    Text Label
  </Tag>
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

export const Disabled = args => {
  return (
    <>
      <Tag {...args}>Disabled</Tag>
      <br />
      <br />
      <Tag {...args} color={TagColor.primary}>
        Disabled Primary
      </Tag>
      <br />
      <br />
      <Tag {...args} color={TagColor.highContrast}>
        Disabled High Contrast
      </Tag>
      <br />
      <br />
      <Tag {...args} color={TagColor.lowContrast}>
        Disabled Low Contrast
      </Tag>
    </>
  );
};
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const DisabledInverse = args => {
  return (
    <Card isInverse>
      <CardBody>
        <Tag {...args}>Disabled Inverse</Tag>
        <br />
        <br />
        <Tag {...args} color={TagColor.primary}>
          Disabled Inverse Primary
        </Tag>
        <br />
        <br />
        <Tag {...args} color={TagColor.highContrast}>
          Disabled Inverse High Contrast
        </Tag>
        <br />
        <br />
        <Tag {...args} color={TagColor.lowContrast}>
          Disabled Inverse Low Contrast
        </Tag>
      </CardBody>
    </Card>
  );
};
DisabledInverse.args = {
  ...Default.args,
  disabled: true,
  isInverse: true,
};

export const WithIcon = TemplateIcon.bind({});
WithIcon.args = {};

export const Size = Template.bind({});
Size.args = {
  ...Default.args,
  size: TagSize.small,
};

export const SizeWithIcon = TemplateIcon.bind({});
SizeWithIcon.args = {
  ...Default.args,
  size: TagSize.small,
};

export const SizeWithDelete = args => {
  const [isVisible, setIsVisible] = React.useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      {isVisible && (
        <Tag {...args} onDelete={deleteMe}>
          <span>Who the what the</span>Text Label
        </Tag>
      )}
    </>
  );
};
SizeWithDelete.args = {
  ...Default.args,
  size: TagSize.small,
};

export const SizeWithIconDelete = args => {
  const [isVisible, setIsVisible] = React.useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      {isVisible && (
        <Tag {...args} onDelete={deleteMe} icon={<AccountCircleIcon />}>
          Text Label
        </Tag>
      )}
    </>
  );
};
SizeWithIconDelete.args = {
  ...Default.args,
  size: TagSize.small,
};

export const OnClick = args => {
  const [counter, setCounter] = React.useState<number>(0);
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

export const OnDelete = args => {
  const [isVisible, setIsVisible] = React.useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      {isVisible && (
        <Tag {...args} onDelete={deleteMe}>
          Text Label
        </Tag>
      )}
    </>
  );
};
OnDelete.args = {};

export const OnDeleteWithIcon = args => {
  const [isVisible, setIsVisible] = React.useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      {isVisible && (
        <Tag
          {...args}
          onDelete={deleteMe}
          icon={<AccountCircleIcon />}
        >
          Text Label
        </Tag>
      )}
    </>
  );
};
OnDeleteWithIcon.args = {
  ...Default.args,
  color: TagColor.danger,
  isInverse: true,
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  color: TagColor.primary,
};

export const LowContrast = Template.bind({});
LowContrast.args = {
  ...Default.args,
  color: TagColor.lowContrast,
};

export const HighContrast = Template.bind({});
HighContrast.args = {
  ...Default.args,
  color: TagColor.highContrast,
};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <Card background={magma.colors.primary} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
