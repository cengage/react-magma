import { Badge, BadgeColor, BadgeVariant } from '.';
import { Card, CardBody } from '../Card';
import { magma } from '../../theme/magma';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Badge,
  title: 'Badge',
} as Meta;

export const Default = () => {
  return (
    <>
      <Badge color={BadgeColor.primary}>Primary</Badge>
      <Badge color={BadgeColor.secondary}>Secondary / High Contrast</Badge>
      <Badge color={BadgeColor.light}>Light / Low Contrast</Badge>
      <Badge color={BadgeColor.danger}>Danger</Badge>
      <Badge color={BadgeColor.success}>Success</Badge>
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
      <br />
      <br />
      <Badge color={BadgeColor.primary} onClick={() => {}}>
        Clickable Primary
      </Badge>
      <Badge color={BadgeColor.secondary} onClick={() => {}}>
        Clickable Secondary{' '}
      </Badge>
      <Badge color={BadgeColor.light} onClick={() => {}}>
        Clickable Light
      </Badge>
      <Badge color={BadgeColor.danger} onClick={() => {}}>
        Clickable Danger
      </Badge>
      <Badge color={BadgeColor.success} onClick={() => {}}>
        Clickable Success
      </Badge>
    </>
  );
};

export const Inverse = () => {
  return (
    <Card background={magma.colors.primary600} isInverse>
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
        <br />
        <br />
        <Badge color={BadgeColor.primary} onClick={() => {}} isInverse>
          Clickable Primary
        </Badge>
        <Badge color={BadgeColor.secondary} onClick={() => {}} isInverse>
          Clickable Secondary{' '}
        </Badge>
        <Badge color={BadgeColor.light} onClick={() => {}} isInverse>
          Clickable Light
        </Badge>
        <Badge color={BadgeColor.danger} onClick={() => {}} isInverse>
          Clickable Danger
        </Badge>
        <Badge color={BadgeColor.success} onClick={() => {}} isInverse>
          Clickable Success
        </Badge>
      </CardBody>
    </Card>
  );
};
