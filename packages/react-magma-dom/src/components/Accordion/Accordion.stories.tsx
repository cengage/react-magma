import React from 'react';
import {
  Accordion,
  AccordionProps,
  AccordionIconPosition,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '.';
import { Button, ButtonSize, ButtonVariant } from '../Button';

import { Story } from '@storybook/react/types-6-0';
import { magma } from '../../theme/magma';

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
  defaultIndex: [0],
};

export const NoMulti = Template.bind({});
NoMulti.args = {
  defaultIndex: 0,
  isMulti: false,
};

export const Controlled = Template.bind({});
Controlled.args = {
  index: [0],
};

export const ControlledNoMulti = Template.bind({});
ControlledNoMulti.args = {
  index: 0,
};

export const ExpandCollapseAll = args => {
  const [expandedIndex, setExpandedIndex] = React.useState([]);
  const [disableExpandAll, setDisableExpandAll] = React.useState(false);
  const [disableCollapseAll, setDisableCollapseAll] = React.useState(true);

  const handleExpandAll = () => {
    setExpandedIndex([0, 1, 2]);
  };

  const handleCollapseAll = () => {
    setExpandedIndex([]);
  };

  const handleExpandedChange = index => {
    if (expandedIndex.includes(index)) {
      setExpandedIndex(expandedIndex.filter(item => item !== index));
    } else {
      setExpandedIndex(expandedIndex.concat([index]));
    }
  };

  React.useEffect(() => {
    if (expandedIndex.length === 0) {
      setDisableCollapseAll(true);
      setDisableExpandAll(false);
    } else if (expandedIndex.length === 3) {
      setDisableCollapseAll(false);
      setDisableExpandAll(true);
    } else {
      setDisableCollapseAll(false);
      setDisableExpandAll(false);
    }
  }, [expandedIndex]);

  return (
    <>
      <Button
        disabled={disableExpandAll}
        onClick={handleExpandAll}
        size={ButtonSize.small}
        variant={ButtonVariant.solid}
      >
        Expand All
      </Button>
      <Button
        disabled={disableCollapseAll}
        onClick={handleCollapseAll}
        size={ButtonSize.small}
        variant={ButtonVariant.solid}
      >
        Collapse All
      </Button>

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
          <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <div style={{background: magma.colors.primary600}}>
      <Story />
    </div>
  ),
];