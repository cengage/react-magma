import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';

import { magma } from '../../theme/magma';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Combobox } from '../Combobox';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Flex, FlexBehavior } from '../Flex';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Select } from '../Select';
import { Textarea } from '../Textarea';

import {
  Accordion,
  AccordionButton,
  AccordionIconPosition,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
} from '.';

export default {
  component: Accordion,
  title: 'Accordion',
  argTypes: {
    iconPosition: {
      control: {
        type: 'select',
        options: AccordionIconPosition,
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isMulti: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<AccordionProps> = args => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionButton>Section 1</AccordionButton>
      <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Section 2</AccordionButton>
      <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Section 3</AccordionButton>
      <AccordionPanel>
        Content for section three lorem ipsum. Content for section three lorem
        ipsum. Content for section three lorem ipsum. Content for section three
        lorem ipsum. Content for section three lorem ipsum. Content for section
        three lorem ipsum.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem isDisabled>
      <AccordionButton>Section 4</AccordionButton>
      <AccordionPanel>Content for section four lorem ipsum</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  defaultIndex: [0],
};

export const NoMulti = Template.bind({});
NoMulti.args = {
  defaultIndex: 0,
  isMulti: false,
};

export const Controlled = (args: any) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number[]>([]);

  const handleExpandedChange = (index: number) => {
    expandedIndex.includes(index)
      ? setExpandedIndex(expandedIndex.filter(item => item !== index))
      : setExpandedIndex(expandedIndex.concat([index]));
  };

  return (
    <Accordion
      {...args}
      index={expandedIndex}
      onExpandedChange={handleExpandedChange}
    >
      <AccordionItem>
        <AccordionButton>Section 1</AccordionButton>
        <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 2</AccordionButton>
        <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 3</AccordionButton>
        <AccordionPanel>Content for section three lorem ipsum</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

Controlled.args = {
  isMulti: true,
  index: [0],
};

export const ControlledNoMulti = (args: any) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const handleExpandedChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Accordion
      {...args}
      index={expandedIndex}
      onExpandedChange={handleExpandedChange}
    >
      <AccordionItem>
        <AccordionButton>Section 1</AccordionButton>
        <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 2</AccordionButton>
        <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 3</AccordionButton>
        <AccordionPanel>Content for section three lorem ipsum</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

ControlledNoMulti.args = {
  isMulti: false,
  index: 0,
};

export const ExpandCollapseAll = (args: any) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number[]>([]);

  const isAllExpanded = expandedIndex.length > 0;

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setExpandedIndex([]);
    } else {
      setExpandedIndex([0, 1, 2]);
    }
  };

  const handleExpandedChange = (index: number) => {
    if (expandedIndex.includes(index)) {
      setExpandedIndex(expandedIndex.filter(item => item !== index));
    } else {
      setExpandedIndex(expandedIndex.concat([index]));
    }
  };

  return (
    <>
      <ButtonGroup size={ButtonSize.small} variant={ButtonVariant.solid}>
        <Button onClick={handleToggleAll}>
          {isAllExpanded ? 'Collapse All' : 'Expand All'}
        </Button>
      </ButtonGroup>
      <br />
      <Accordion
        {...args}
        index={expandedIndex}
        onExpandedChange={handleExpandedChange}
      >
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section three lorem ipsum</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const Inverse = Template.bind({});
Inverse.args = {
  defaultIndex: [0],
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <div style={{ background: magma.colors.primary600, padding: '12px' }}>
      <Story />
    </div>
  ),
];
export const WithDropdown = (args: any) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Accordion {...args}>
        <AccordionItem>
          <AccordionButton>Personal Information</AccordionButton>
          <AccordionPanel>
            <Flex behavior={FlexBehavior.container} spacing={2}>
              <Flex behavior={FlexBehavior.item} xs={12} md={6}>
                <Input labelText="Email" />
              </Flex>
              <Flex behavior={FlexBehavior.item} xs={12} md={6}>
                <Input labelText="Full Name" />
              </Flex>
              <Flex behavior={FlexBehavior.item} xs={12}>
                <Textarea labelText="Message" />
                <Textarea labelText="Comments" />
                <Textarea labelText="Questions" />
                <Textarea labelText="Jokes" />
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Shipping Address</AccordionButton>
          <AccordionPanel>
            <Flex behavior={FlexBehavior.container} spacing={2}>
              <Flex behavior={FlexBehavior.item} xs={12} md={6}>
                <Input labelText="City" />
              </Flex>
              <Flex behavior={FlexBehavior.item} xs={12} md={6}>
                <Select
                  labelText="State"
                  items={[
                    { label: 'AL', value: 'al' },
                    { label: 'AK', value: 'ak' },
                    { label: 'CA', value: 'ca' },
                    { label: 'CO', value: 'co' },
                    { label: 'FL', value: 'fl' },
                    { label: 'MA', value: 'ma' },
                    { label: 'NJ', value: 'nj' },
                    { label: 'NY', value: 'ny' },
                    { label: 'OH', value: 'oh' },
                    { label: 'VA', value: 'va' },
                    { label: 'WY', value: 'wy' },
                  ]}
                />
              </Flex>
              <Flex behavior={FlexBehavior.item} xs={12}>
                <Textarea labelText="Additional Information" />
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Random</AccordionButton>
          <AccordionPanel>
            <Flex behavior={FlexBehavior.container} spacing={2}>
              <Flex behavior={FlexBehavior.item} xs={12} md={6}>
                <Combobox
                  isMulti
                  labelText="ComboBox Example"
                  defaultItems={[
                    { label: 'Pink', value: 'pink' },
                    { label: 'Orange', value: 'orange' },
                    { label: 'Purple', value: 'purple' },
                  ]}
                />
              </Flex>
              <Flex
                behavior={FlexBehavior.item}
                xs={12}
                md={6}
                style={{ marginTop: '28px' }}
              >
                <Dropdown>
                  <DropdownButton>Basic Dropdown</DropdownButton>
                  <DropdownContent>
                    <DropdownMenuItem>Menu item 1</DropdownMenuItem>
                    <DropdownMenuItem>Menu item 2</DropdownMenuItem>
                    <DropdownMenuItem>Menu item 3</DropdownMenuItem>
                    <DropdownMenuItem>Menu item number 4</DropdownMenuItem>
                    <DropdownMenuItem>Menu item number 5</DropdownMenuItem>
                    <DropdownMenuItem>Menu item 5</DropdownMenuItem>
                  </DropdownContent>
                </Dropdown>
              </Flex>
            </Flex>
            <Modal
              header="Modal Title"
              onClose={() => setShowModal(false)}
              isOpen={showModal}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                sed lorem in tellus dignissim varius in sit amet nibh.
                Suspendisse ac bibendum diam, at gravida ex. In ac eros et massa
                faucibus ultricies. Donec molestie tempor diam eleifend tempor.
                Cras nec feugiat dui, ac tincidunt elit. Duis ac vulputate
                lorem. Nullam maximus tortor eget cursus aliquam. Praesent leo
                quam, viverra iaculis elit at, pulvinar malesuada magna.
              </p>
              <p>
                <Button>This is a button</Button>
              </p>
            </Modal>
            <Button
              onClick={() => setShowModal(true)}
              style={{ marginTop: '12px' }}
            >
              Show Modal
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
WithDropdown.args = {
  isInverse: false,
  isMulti: false,
};
