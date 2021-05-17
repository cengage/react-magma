import React from 'react';
import {
  Accordion,
  AccordionProps,
  AccordionIconPosition,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '.';
import { Button } from '../Button';

import { Story } from '@storybook/react/types-6-0';

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
    isMultiple: {
      control: {
        type: 'boolean',
      },
    },
    expandedIndex: {
      control: {
        type: 'number',
      },
    },
  },
};

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
      <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
    </AccordionItem>
    <AccordionItem isDisabled>
      <AccordionButton>Section 4</AccordionButton>
      <AccordionPanel>Content for section four lorem ipsum</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  expandedIndex: 0,
};

export const Multiple = Template.bind({});
Multiple.args = {
  isMultiple: true,
  expandedIndex: [0],
};

export const ExpandCollapseAll = () => {
  const [expandedIndex, setExpandedIndex] = React.useState([0, 1]);

  const handleExpand = () => {
    setExpandedIndex([0, 1, 2]);
    console.log('handleExpand expandedIndex', expandedIndex);
  };

  const handleCollapse = () => {
    setExpandedIndex([]);
    console.log('handleCollapse expandedIndex', expandedIndex);
  };

  return (
    <>
      <Button onClick={handleExpand}>Expand All</Button>
      <Button onClick={handleCollapse}>Collapse All</Button>

      <Accordion isMultiple expandedIndex={expandedIndex}>
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
          <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
