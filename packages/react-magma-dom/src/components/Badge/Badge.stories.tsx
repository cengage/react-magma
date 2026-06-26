import React from 'react';

import { Meta } from '@storybook/react-webpack5';
import { CheckCircleIcon, InfoIcon } from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { Card, CardBody } from '../Card';

import { Badge, BadgeColor, BadgeVariant, BadgeWeight } from '.';

export default {
  component: Badge,
  title: 'Badge',
} as Meta;

const noop = () => undefined;

export const Default = () => {
  return (
    <>
      <Badge color={BadgeColor.primary}>Primary</Badge>
      <Badge color={BadgeColor.secondary}>Secondary / High Contrast</Badge>
      <Badge color={BadgeColor.light}>Light / Low Contrast</Badge>
      <Badge color={BadgeColor.danger}>Danger</Badge>
      <Badge color={BadgeColor.success}>Success</Badge>
      <Badge color={BadgeColor.info}>Info</Badge>
      <Badge color={BadgeColor.warning}>Warning</Badge>
      <br />
      <br />
      <Badge variant={BadgeVariant.counter}>1</Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.secondary}>
        28
      </Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.light}>
        777
      </Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.danger}>
        9999
      </Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.success}>
        33333
      </Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.info}>
        12
      </Badge>
      <Badge variant={BadgeVariant.counter} color={BadgeColor.warning}>
        45
      </Badge>
      <br />
      <br />
      <Badge color={BadgeColor.primary} onClick={noop}>
        Clickable Primary
      </Badge>
      <Badge color={BadgeColor.secondary} onClick={noop}>
        Clickable Secondary{' '}
      </Badge>
      <Badge color={BadgeColor.light} onClick={noop}>
        Clickable Light
      </Badge>
      <Badge color={BadgeColor.danger} onClick={noop}>
        Clickable Danger
      </Badge>
      <Badge color={BadgeColor.success} onClick={noop}>
        Clickable Success
      </Badge>
      <Badge color={BadgeColor.info} onClick={noop}>
        Clickable Info
      </Badge>
      <Badge color={BadgeColor.warning} onClick={noop}>
        Clickable Warning
      </Badge>
    </>
  );
};

export const WithIcon = () => {
  return (
    <>
      <Badge color={BadgeColor.primary} leftIcon={<CheckCircleIcon />}>
        Left icon
      </Badge>
      <Badge color={BadgeColor.secondary} rightIcon={<InfoIcon />}>
        Right icon
      </Badge>
      <Badge
        color={BadgeColor.light}
        leftIcon={<CheckCircleIcon />}
        rightIcon={<InfoIcon />}
      >
        Both icons
      </Badge>
      <Badge color={BadgeColor.danger} leftIcon={<CheckCircleIcon />}>
        Danger
      </Badge>
      <Badge
        color={BadgeColor.success}
        leftIcon={<CheckCircleIcon />}
        rightIcon={<InfoIcon />}
      >
        Success
      </Badge>
      <br />
      <br />
      <Badge variant={BadgeVariant.counter} leftIcon={<CheckCircleIcon />}>
        3
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.success}
        leftIcon={<CheckCircleIcon />}
        rightIcon={<InfoIcon />}
      >
        28
      </Badge>
      <br />
      <br />
      <Badge
        color={BadgeColor.success}
        leftIcon={<CheckCircleIcon />}
        rightIcon={<InfoIcon />}
        onClick={noop}
      >
        Clickable success
      </Badge>
    </>
  );
};

export const LightWeight = () => {
  return (
    <>
      <Badge color={BadgeColor.primary} weight={BadgeWeight.light}>
        Primary
      </Badge>
      <Badge color={BadgeColor.secondary} weight={BadgeWeight.light}>
        Secondary
      </Badge>
      <Badge color={BadgeColor.light} weight={BadgeWeight.light}>
        Light
      </Badge>
      <Badge color={BadgeColor.danger} weight={BadgeWeight.light}>
        Danger
      </Badge>
      <Badge color={BadgeColor.success} weight={BadgeWeight.light}>
        Success
      </Badge>
      <Badge color={BadgeColor.info} weight={BadgeWeight.light}>
        Info
      </Badge>
      <Badge color={BadgeColor.warning} weight={BadgeWeight.light}>
        Warning
      </Badge>
      <br />
      <br />
      <Badge variant={BadgeVariant.counter} weight={BadgeWeight.light}>
        1
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.secondary}
        weight={BadgeWeight.light}
      >
        28
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.light}
        weight={BadgeWeight.light}
      >
        777
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.danger}
        weight={BadgeWeight.light}
      >
        9999
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.success}
        weight={BadgeWeight.light}
      >
        33333
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.info}
        weight={BadgeWeight.light}
      >
        12
      </Badge>
      <Badge
        variant={BadgeVariant.counter}
        color={BadgeColor.warning}
        weight={BadgeWeight.light}
      >
        45
      </Badge>
      <br />
      <br />
      <Badge
        color={BadgeColor.primary}
        leftIcon={<CheckCircleIcon />}
        weight={BadgeWeight.light}
      >
        Left icon
      </Badge>
      <Badge
        color={BadgeColor.info}
        rightIcon={<InfoIcon />}
        weight={BadgeWeight.light}
      >
        Right icon
      </Badge>
      <Badge
        color={BadgeColor.success}
        leftIcon={<CheckCircleIcon />}
        rightIcon={<InfoIcon />}
        weight={BadgeWeight.light}
        onClick={noop}
      >
        Clickable success
      </Badge>
    </>
  );
};

export const Inverse = () => {
  return (
    <Card background={magma.colors.primary700} isInverse>
      <CardBody>
        <Badge color={BadgeColor.primary} isInverse>
          Primary
        </Badge>
        <Badge color={BadgeColor.secondary} isInverse>
          Secondary / High Contrast
        </Badge>
        <Badge color={BadgeColor.light} isInverse>
          Light / Low Contrast
        </Badge>
        <Badge color={BadgeColor.danger} isInverse>
          Danger
        </Badge>
        <Badge color={BadgeColor.success} isInverse>
          Success
        </Badge>
        <Badge color={BadgeColor.info} isInverse>
          Info
        </Badge>
        <Badge color={BadgeColor.warning} isInverse>
          Warning
        </Badge>
        <br />
        <br />
        <Badge color={BadgeColor.primary} isInverse weight={BadgeWeight.light}>
          Light Primary
        </Badge>
        <Badge
          color={BadgeColor.secondary}
          isInverse
          weight={BadgeWeight.light}
        >
          Light Secondary
        </Badge>
        <Badge color={BadgeColor.light} isInverse weight={BadgeWeight.light}>
          Light
        </Badge>
        <Badge color={BadgeColor.danger} isInverse weight={BadgeWeight.light}>
          Light Danger
        </Badge>
        <Badge color={BadgeColor.success} isInverse weight={BadgeWeight.light}>
          Light Success
        </Badge>
        <Badge color={BadgeColor.info} isInverse weight={BadgeWeight.light}>
          Light Info
        </Badge>
        <Badge color={BadgeColor.warning} isInverse weight={BadgeWeight.light}>
          Light Warning
        </Badge>
        <br />
        <br />
        <Badge variant={BadgeVariant.counter} isInverse>
          1
        </Badge>
        <Badge
          variant={BadgeVariant.counter}
          color={BadgeColor.secondary}
          isInverse
        >
          28
        </Badge>
        <Badge
          variant={BadgeVariant.counter}
          color={BadgeColor.light}
          isInverse
        >
          777
        </Badge>
        <Badge
          variant={BadgeVariant.counter}
          color={BadgeColor.danger}
          isInverse
        >
          9999
        </Badge>
        <Badge
          variant={BadgeVariant.counter}
          color={BadgeColor.success}
          isInverse
        >
          33333
        </Badge>
        <Badge variant={BadgeVariant.counter} color={BadgeColor.info} isInverse>
          12
        </Badge>
        <Badge
          variant={BadgeVariant.counter}
          color={BadgeColor.warning}
          isInverse
        >
          45
        </Badge>
        <br />
        <br />
        <Badge color={BadgeColor.primary} onClick={noop} isInverse>
          Clickable Primary
        </Badge>
        <Badge color={BadgeColor.secondary} onClick={noop} isInverse>
          Clickable Secondary{' '}
        </Badge>
        <Badge color={BadgeColor.light} onClick={noop} isInverse>
          Clickable Light
        </Badge>
        <Badge color={BadgeColor.danger} onClick={noop} isInverse>
          Clickable Danger
        </Badge>
        <Badge color={BadgeColor.success} onClick={noop} isInverse>
          Clickable Success
        </Badge>
        <Badge color={BadgeColor.info} onClick={noop} isInverse>
          Clickable Info
        </Badge>
        <Badge color={BadgeColor.warning} onClick={noop} isInverse>
          Clickable Warning
        </Badge>
      </CardBody>
    </Card>
  );
};
