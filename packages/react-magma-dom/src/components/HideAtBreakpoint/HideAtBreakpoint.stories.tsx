import { HideAtBreakpoint } from '.';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { magma } from '../../theme/magma';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: HideAtBreakpoint,
  title: 'HideAtBreakpoint',
} as Meta;

export const Default = () => {
  return (
    <>
      <HideAtBreakpoint maxWidth={599}>
        <Card isInverse>
          <CardBody>
            <strong>Max-Width:</strong> This text will be visible when the
            browser width is greater than or equal to 600px.
          </CardBody>
        </Card>
        <br />
      </HideAtBreakpoint>
      <HideAtBreakpoint minWidth={600}>
        <Card isInverse background={magma.colors.info}>
          <CardBody>
            <strong>Min-Width:</strong> This text will be visible when the
            browser width is less than 600px.
          </CardBody>
        </Card>
        <br />
      </HideAtBreakpoint>
      <HideAtBreakpoint>
        <Card isInverse background={magma.colors.success}>
          <CardBody>This text will always be visible.</CardBody>
        </Card>
      </HideAtBreakpoint>
    </>
  );
};
