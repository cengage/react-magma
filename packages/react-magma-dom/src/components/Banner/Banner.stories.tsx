import React from 'react';
import { Banner, BannerProps } from '.';
import { AlertVariant } from '../AlertBase';
import { Card, CardBody } from '../Card';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<BannerProps> = args => (
  <>
    <Banner {...args}>Default (info) banner</Banner>
    <Banner {...args} variant={AlertVariant.success}>
      Default (success) banner
    </Banner>
    <Banner {...args} variant={AlertVariant.warning}>
      Default (waning) banner
    </Banner>
    <Banner {...args} variant={AlertVariant.danger}>
      Default (danger) banner
    </Banner>
  </>
);

export default {
  component: Banner,
  title: 'Banner',
};

export const Default = Template.bind({});
Default.args = {};

export const Inverse = Template.bind({});
Inverse.args = {
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
