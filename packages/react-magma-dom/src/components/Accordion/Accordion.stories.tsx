import React from 'react';
import {
  Accordion,
  AccordionProps,
  AccordionIconPosition,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '.';
import { Button, ButtonVariant } from '../Button';

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
Default.args = {};

export const Multiple = Template.bind({});
Multiple.args = {
  isMultiple: true,
};
