import React from 'react';
import {
  Accordion,
  AccordionIconPosition,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
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
  },
};

export const Default = args => {
  return (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionButton>Section 1</AccordionButton>
        <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 2</AccordionButton>
        <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
      </AccordionItem>
      <AccordionItem isDisabled>
        <AccordionButton>Section 3</AccordionButton>
        <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
