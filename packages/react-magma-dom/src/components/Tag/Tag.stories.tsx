import React from 'react';
import { Card, CardBody } from '../Card';
import { AccountCircleIcon } from 'react-magma-icons';
import { magma } from '../../theme/magma';
import { Tag, TagColor, TagProps, TagSize } from '.';

export default {
  component: Tag,
  title: 'Tag',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = args => {
  return (
    <>
      <Tag icon={<AccountCircleIcon />} color={TagColor.primary} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag icon={<AccountCircleIcon />} color={TagColor.lowContrast} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag color={TagColor.highContrast} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag {...args}>Text Label</Tag>
    </>
  );
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
      <Tag
        icon={<AccountCircleIcon />}
        color={TagColor.primary}
        onClick={updateCounter}
        {...args}
      >
        Text Label
      </Tag>
    </>
  );
};

export const OnDelete = args => {
  const [isVisible, setIsVisible] = React.useState(true);

  function deleteMe() {
    setIsVisible(false);
  }
  return (
    <>
      {isVisible && (
        <Tag
          icon={<AccountCircleIcon />}
          color={TagColor.primary}
          onDelete={deleteMe}
          onClick={deleteMe}
          hi={'bye'}
          {...args}
        >
          Text Label
        </Tag>
      )}
    </>
  );
};

export const Disabled = args => {
  return (
    <>
      <Tag disabled color={TagColor.primary} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag disabled color={TagColor.lowContrast} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag disabled color={TagColor.highContrast} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag disabled {...args}>
        Text Label
      </Tag>
    </>
  );
};

export const Size = args => {
  return (
    <>
      <Tag icon={<AccountCircleIcon />} size={TagSize.small} {...args}>
        Text Label
      </Tag>
      <br />
      <br />
      <Tag size={TagSize.default}>Text Label</Tag>
    </>
  );
};

export const Inverse = args => {
  return (
    <Card background={magma.colors.neutral} isInverse>
      <CardBody>
        <Tag color={TagColor.primary} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag color={TagColor.lowContrast} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag color={TagColor.highContrast} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag isInverse {...args}>
          Text Label
        </Tag>
      </CardBody>
    </Card>
  );
};

export const InverseDisabled = args => {
  return (
    <Card background={magma.colors.neutral} isInverse>
      <CardBody>
        <Tag disabled color={TagColor.primary} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag disabled color={TagColor.lowContrast} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag disabled color={TagColor.highContrast} isInverse {...args}>
          Text Label
        </Tag>
        <br />
        <br />
        <Tag disabled isInverse {...args}>
          Text Label
        </Tag>
      </CardBody>
    </Card>
  );
};
