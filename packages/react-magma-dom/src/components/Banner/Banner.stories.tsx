import React from 'react';
import { Banner, BannerProps } from '.';
import { AlertVariant } from '../AlertBase';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Hyperlink } from '../Hyperlink';

function handleActionButtonClick() {
  alert('action button clicked!');
}

const Template: Story<BannerProps> = args => (
  <>
    <Banner {...args}>
      Default (info) banner with&nbsp;
      <Hyperlink to="#" isInverse={args.isInverse}>
        hyperlink
      </Hyperlink>
    </Banner>
    <Banner {...args} variant={AlertVariant.success}>
      Default (success) banner with&nbsp;
      <Hyperlink to="#" isInverse={args.isInverse}>
        hyperlink
      </Hyperlink>
    </Banner>
    <Banner {...args} variant={AlertVariant.warning}>
      Default (warning) banner with&nbsp;
      <Hyperlink to="#" isInverse={args.isInverse}>
        hyperlink
      </Hyperlink>
    </Banner>
    <Banner {...args} variant={AlertVariant.danger}>
      Default (danger) banner with&nbsp;
      <Hyperlink to="#" isInverse={args.isInverse}>
        hyperlink
      </Hyperlink>
    </Banner>
    <br />
    <br />
    <Banner
      isDismissible
      actionButtonText="Action"
      actionButtonOnClick={handleActionButtonClick}
      {...args}
    >
      Dismissible (info) banner
    </Banner>
    <Banner
      isDismissible
      actionButtonText="Action"
      actionButtonOnClick={handleActionButtonClick}
      variant={AlertVariant.success}
      {...args}
    >
      Dismissible (success) banner
    </Banner>
    <Banner
      isDismissible
      actionButtonText="Action"
      actionButtonOnClick={handleActionButtonClick}
      variant={AlertVariant.warning}
      {...args}
    >
      Dismissible (warning) banner
    </Banner>
    <Banner
      isDismissible
      actionButtonText="Action"
      actionButtonOnClick={handleActionButtonClick}
      variant={AlertVariant.danger}
      {...args}
    >
      Dismissible (danger) banner
    </Banner>
  </>
);

export default {
  component: Banner,
  title: 'Banner',
} as Meta;

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
