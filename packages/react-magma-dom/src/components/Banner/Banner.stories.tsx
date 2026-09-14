import React from 'react';

import styled from '@emotion/styled';
import { StoryFn, Meta } from '@storybook/react-webpack5';

import { AlertVariant } from '../AlertBase';
import { Badge, BadgeColor } from '../Badge';
import { Button, ButtonColor, ButtonSize } from '../Button';
import { Card, CardBody } from '../Card';
import { Hyperlink } from '../Hyperlink';

import { Banner, BannerProps } from '.';

function handleActionButtonClick() {
  alert('action button clicked!');
}

const BadgeAndAction = styled.div`
  align-items: center;
  display: flex;
`;

const PrimaryActionButton = (
  <Button
    color={ButtonColor.primary}
    isInverse={false}
    onClick={handleActionButtonClick}
    size={ButtonSize.small}
  >
    Action
  </Button>
);

const AdditionalInverseInfoBadge = (
  <>
    <Badge color={BadgeColor.info} isInverse>
      Badgery
    </Badge>
    <Badge color={BadgeColor.info} isInverse>
      More Badgery
    </Badge>
  </>
);

const AdditionalInverseDangerBadge = (
  <>
    <Badge color={BadgeColor.danger} isInverse>
      Badgery
    </Badge>
    <Badge color={BadgeColor.danger} isInverse>
      More Badgery
    </Badge>
  </>
);

const AdditionalInfoBadge = (
  <>
    <Badge color={BadgeColor.info}>Badgery</Badge>
    <Badge color={BadgeColor.info}>More Badgery</Badge>
  </>
);

const AdditionalDangerBadge = (
  <>
    <Badge color={BadgeColor.danger}>Badgery</Badge>
    <Badge color={BadgeColor.danger}>More Badgery</Badge>
  </>
);

const Template: StoryFn<BannerProps> = args => (
  <>
    <Banner
      {...args}
      additionalContent={
        args.isInverse ? AdditionalInfoBadge : AdditionalInverseInfoBadge
      }
    >
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
    <Banner additionalContent={PrimaryActionButton} isDismissible {...args}>
      Dismissible (info) banner
    </Banner>
    <Banner
      additionalContent={PrimaryActionButton}
      isDismissible
      variant={AlertVariant.success}
      {...args}
    >
      Dismissible (success) banner
    </Banner>
    <Banner
      additionalContent={PrimaryActionButton}
      isDismissible
      variant={AlertVariant.warning}
      {...args}
    >
      Dismissible (warning) banner
    </Banner>
    <Banner
      additionalContent={
        <BadgeAndAction>
          {args.isInverse
            ? AdditionalDangerBadge
            : AdditionalInverseDangerBadge}
          {PrimaryActionButton}
        </BadgeAndAction>
      }
      isDismissible
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

export const Default = {
  render: Template,
  args: {},
};

export const Inverse = {
  render: Template,

  args: {
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
