import { useState } from 'react';
import {
  Tooltip,
  TooltipProps,
  TooltipPosition,
  EnumTooltipPosition,
} from './index';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IconButton } from '../IconButton';
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from 'react-magma-icons';
import { Card, CardBody } from '../Card';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownDropDirection,
  DropdownMenuItem,
} from '../Dropdown';
import { Modal } from '../Modal';
import { VisuallyHidden } from '../VisuallyHidden';
import { Tag } from '../Tag';

const Template: Story<TooltipProps> = args => (
  <div
    style={{
      padding: '80px',
      textAlign: 'center',
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

export const Default = Template.bind({});
Default.args = {
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Bottom = Template.bind({});
Bottom.args = {
  position: TooltipPosition.bottom,
  content: 'Lorem ipsum dolar',
};

export const Left = Template.bind({});
Left.args = {
  position: EnumTooltipPosition.left,
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Right = Template.bind({});
Right.args = {
  position: TooltipPosition.right,
  content: 'Lorem ipsum dolar',
};

export const Inverse = Template.bind({});
Inverse.args = {
  content: 'Lorem ipsum dolar',
  isInverse: true,
};

export const Open = Template.bind({});
Open.args = {
  content: 'Lorem ipsum dolar',
  open: true,
};

export const Complex = () => {
  const [showModal, setShowModal] = useState(false);
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
          textAlign: 'center',
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
              <Tooltip
                position={EnumTooltipPosition.right}
                content={longContent}
              >
                <IconButton
                  aria-label="Right"
                  icon={<KeyboardArrowRightIcon />}
                  variant={ButtonVariant.solid}
                />
              </Tooltip>
              <Tooltip
                position={EnumTooltipPosition.left}
                content={longContent}
              >
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
              Some content here. Some content here. Some content here. Some content here. Some content here. Some content here. Some content here. Some content here. Some contenthere. 
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
