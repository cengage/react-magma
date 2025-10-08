import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  HelpOutlineIcon,
} from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { Card, CardBody } from '../Card';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownDropDirection,
  DropdownMenuItem,
} from '../Dropdown';
import { Flex, FlexAlignItems, FlexBehavior } from '../Flex';
import { IconButton } from '../IconButton';
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { VisuallyHidden } from '../VisuallyHidden';

import {
  Tooltip,
  TooltipProps,
  TooltipPosition,
  EnumTooltipPosition,
} from './index';

const Template: StoryFn<TooltipProps> = args => (
  <div
    style={{
      padding: '80px',
      display: 'flex',
      justifyContent: 'center',
      background: args.isInverse
        ? magma.colors.neutral
        : magma.colors.neutral100,
    }}
  >
    <Tooltip {...args}>
      <Button isInverse={args.isInverse} size={ButtonSize.small}>
        Tooltip Trigger
      </Button>
    </Tooltip>
  </div>
);

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {},
} as Meta;

export const Default = {
  render: Template,

  args: {
    content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
  },
};

export const Bottom = {
  render: Template,

  args: {
    position: TooltipPosition.bottom,
    content: 'Lorem ipsum dolar',
  },
};

export const Left = {
  render: Template,

  args: {
    position: EnumTooltipPosition.left,
    content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
  },
};

export const Right = {
  render: Template,

  args: {
    position: TooltipPosition.right,
    content: 'Lorem ipsum dolar',
  },
};

export const Inverse = {
  render: Template,

  args: {
    content: 'Lorem ipsum dolar',
    isInverse: true,
  },
};

export const Open = {
  render: Template,

  args: {
    content: 'Lorem ipsum dolar',
    open: true,
  },
};

export const Complex = () => {
  const [showModal, setShowModal] = React.useState(false);
  const longContent = (
    <>
      This is too much content for a tooltip but I need it to test, you know?
      There could be lots of things put in here! How about a <Tag>tag!</Tag> or
      a{' '}
      <Button size={ButtonSize.small} isInverse>
        button!
      </Button>
      ?
    </>
  );

  return (
    <>
      <Tooltip
        position={EnumTooltipPosition.bottom}
        content="Tooltip bottom one. Tooltip bottom one"
      >
        <IconButton
          aria-label="Bottom"
          icon={<KeyboardArrowDownIcon />}
          variant={ButtonVariant.solid}
        />
      </Tooltip>
      <Tooltip
        position={EnumTooltipPosition.bottom}
        content="Tooltip bottom two"
      >
        <IconButton
          aria-label="Bottom"
          icon={<KeyboardArrowDownIcon />}
          variant={ButtonVariant.solid}
        />
      </Tooltip>
      <Dropdown dropDirection={DropdownDropDirection.down}>
        <DropdownButton>Basic Dropdown</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu item number two</DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
      <div
        style={{
          padding: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tooltip position={EnumTooltipPosition.right} content={longContent}>
          <IconButton
            aria-label="Right"
            icon={<KeyboardArrowRightIcon />}
            variant={ButtonVariant.solid}
          />
        </Tooltip>
        <Tooltip position={EnumTooltipPosition.bottom} content={longContent}>
          <IconButton
            aria-label="Bottom"
            icon={<KeyboardArrowDownIcon />}
            variant={ButtonVariant.solid}
          />
        </Tooltip>
        <Tooltip position={EnumTooltipPosition.top} content={longContent}>
          <IconButton
            aria-label="Top"
            icon={<KeyboardArrowUpIcon />}
            variant={ButtonVariant.solid}
          />
        </Tooltip>
        <Tooltip position={EnumTooltipPosition.left} content={longContent}>
          <IconButton
            aria-label="Left"
            icon={<KeyboardArrowLeftIcon />}
            variant={ButtonVariant.solid}
          />
        </Tooltip>
      </div>
      <Card>
        <CardBody>
          <Dropdown dropDirection={DropdownDropDirection.up}>
            <DropdownButton>Basic Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 1</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
              <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
          <Modal
            header="Modal Title"
            onClose={() => setShowModal(false)}
            isOpen={showModal}
          >
            <p>This is a modal with too many tooltips</p>
            <Tooltip
              position={EnumTooltipPosition.bottom}
              content={longContent}
            >
              <IconButton
                aria-label="Bottom"
                icon={<KeyboardArrowDownIcon />}
                variant={ButtonVariant.solid}
              />
            </Tooltip>
            <Tooltip position={EnumTooltipPosition.top} content={longContent}>
              <IconButton
                aria-label="Top"
                icon={<KeyboardArrowUpIcon />}
                variant={ButtonVariant.solid}
              />
            </Tooltip>
            <Tooltip position={EnumTooltipPosition.right} content={longContent}>
              <IconButton
                aria-label="Right"
                icon={<KeyboardArrowRightIcon />}
                variant={ButtonVariant.solid}
              />
            </Tooltip>
            <Tooltip position={EnumTooltipPosition.left} content={longContent}>
              <IconButton
                aria-label="Left"
                icon={<KeyboardArrowLeftIcon />}
                variant={ButtonVariant.solid}
              />
            </Tooltip>
          </Modal>
          <Button onClick={() => setShowModal(true)}>
            Show Modal
            <VisuallyHidden>(opens modal dialog)</VisuallyHidden>
          </Button>
          <p>
            Some content here. Some content here. Some content here. Some
            content here. Some content here. Some content here. Some content
            here. Some content here. Some contenthere.
          </p>
        </CardBody>
      </Card>
    </>
  );
};

const CustomStylesTemplate: StoryFn<TooltipProps> = args => {
  const customArrowStyles = {
    background: 'yellow',
    height: '15px',
    width: '15px',
    fill: 'red',
  };

  const customContainerStyles = {
    background: 'blue',
    padding: '10px',
  };

  const customTooltipStyles = {
    background: 'green',
    padding: '10px',
    width: '200px',
  };

  return (
    <div
      style={{
        padding: '80px',
        display: 'flex',
        justifyContent: 'center',
        background: args.isInverse
          ? magma.colors.neutral
          : magma.colors.neutral100,
      }}
    >
      <Tooltip
        {...args}
        arrowStyle={customArrowStyles}
        containerStyle={customContainerStyles}
        tooltipStyle={customTooltipStyles}
      >
        <Button isInverse={args.isInverse} size={ButtonSize.small}>
          Tooltip Trigger
        </Button>
      </Tooltip>
    </div>
  );
};

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
  },
};

export function Example() {
  const tooltipContentShort = (
    <>
      Tooltip wrapped in <b>div</b>
    </>
  );
  const tooltipContentLong = (
    <>
      Tooltip wrapped in <b>span</b>
    </>
  );

  return (
    <Flex
      behavior={FlexBehavior.container}
      alignItems={FlexAlignItems.center}
      spacing={2}
    >
      <Tooltip content={tooltipContentShort}>
        <div style={{ width: 'fit-content', height: 'fit-content' }}>
          <HelpOutlineIcon
            tabIndex="0"
            size={40}
            aria-label={'Tooltip wrapped in div'}
          />
        </div>
      </Tooltip>

      <Tooltip content={tooltipContentLong}>
        <span>
          <HelpOutlineIcon
            tabIndex="0"
            aria-label={'Tooltip wrapped in span'}
          />
        </span>
      </Tooltip>
    </Flex>
  );
}
