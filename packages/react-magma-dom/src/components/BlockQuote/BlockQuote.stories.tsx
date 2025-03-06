import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { Card, CardBody } from '../Card';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
} from '../Typography';

import { BlockQuote, BlockQuoteItem, BlockQuoteItemProps } from '.';

const Template: Story<BlockQuoteItemProps> = args => (
  <BlockQuote {...args}>
    <BlockQuoteItem {...args}>I like biscuits!</BlockQuoteItem>
    <BlockQuoteItem {...args} hasAttribution>
      Sir Nottingshire
    </BlockQuoteItem>
  </BlockQuote>
);

export default {
  title: 'BlockQuote',
  component: BlockQuote,
  argTypes: {
    contextVariant: {
      control: {
        type: 'select',
        options: TypographyContextVariant,
      },
    },
    color: {
      control: {
        type: 'select',
        options: TypographyColor,
      },
    },
    visualStyle: {
      control: {
        type: 'select',
        options: TypographyVisualStyle,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
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
