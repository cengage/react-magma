import React from 'react';
import { BlockQuote, BlockQuoteItem, BlockQuoteItemProps, fontStyles } from '.';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';
import { magma } from '../../theme/magma';

const Template: Story<BlockQuoteItemProps> = args => (
  <BlockQuote {...args}>
    <BlockQuoteItem {...args}>I like biscuits!</BlockQuoteItem>
    <BlockQuoteItem {...args} hasAttribution>
      Sir Nottingshire
    </BlockQuoteItem>
  </BlockQuote>
);

export default {
  title: 'Block Quote',
  component: BlockQuote,
  argTypes: {
    fontFamily: {
      control: {
        type: 'select',
        options: fontStyles,
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
    <Card background={magma.colors.foundation} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
