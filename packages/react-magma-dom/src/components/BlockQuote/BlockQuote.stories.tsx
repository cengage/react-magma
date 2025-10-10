import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Card, CardBody } from '../Card';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
} from '../Typography';

import { BlockQuote, BlockQuoteItem, BlockQuoteItemProps } from '.';

const Template: StoryFn<BlockQuoteItemProps> = args => (
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

export const Default = {
  render: Template,

  args: {
    isInverse: false,
  },
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};
