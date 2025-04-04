import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { AlertVariant } from '../AlertBase';
import { Badge } from '../Badge';
import { Card, CardBody } from '../Card';
import { Hyperlink } from '../Hyperlink';

import { Banner, BannerProps } from '.';

function handleActionButtonClick() {
  alert('action button clicked!');
}

const AdditionalBadge = (
  <>
    <Badge>Badgery</Badge>
    <Badge>More Badgery</Badge>
  </>
);

const Template: Story<BannerProps> = args => (
  <>
    <Banner {...args} additionalContent={AdditionalBadge}>
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
      additionalContent={AdditionalBadge}
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
