import React from 'react';

import { Meta } from '@storybook/react';

import { magma } from '../../theme/magma';
import { CardBody } from '../Card/CardBody';
import { Card } from '../Card/index';

import { Breakpoint, BreakpointsContainer, BreakpointScreenSize } from '.';

export default {
  component: BreakpointsContainer,
  title: 'BreakpointsContainer',
} as Meta;

export const Default = () => {
  return (
    <BreakpointsContainer>
      <Breakpoint screenSize={BreakpointScreenSize.xs}>
        <Card background={magma.colors.secondary}>
          <CardBody>
            <strong>Extra-Small: </strong>This will be shown from 0 pixels, up
            to 599px.
          </CardBody>
        </Card>
      </Breakpoint>

      <Breakpoint screenSize={BreakpointScreenSize.small}>
        <Card isInverse background={magma.colors.warning500}>
          <CardBody>
            <strong>Small: </strong>This will be shown from 600px pixels up to
            767px.
          </CardBody>
        </Card>
      </Breakpoint>

      <Breakpoint screenSize={BreakpointScreenSize.medium}>
        <Card isInverse background={magma.colors.info700}>
          <CardBody>
            <strong>Medium: </strong>This text will be visible when the browser
            width is 768px and up to 1023px.
          </CardBody>
        </Card>
      </Breakpoint>

      <Breakpoint screenSize={BreakpointScreenSize.large}>
        <Card isInverse background={magma.colors.success}>
          <CardBody>
            <strong>Large: </strong>This text will be visible when the browser
            width is 1024px and to 1199px.
          </CardBody>
        </Card>
      </Breakpoint>

      <Breakpoint screenSize={BreakpointScreenSize.xl}>
        <Card isInverse background={magma.colors.danger}>
          <CardBody>
            <strong>Extra-Large: </strong>This text will be visible when the
            browser width is 1200px and greater.
          </CardBody>
        </Card>
      </Breakpoint>

      <br />

      <Card>
        <CardBody>
          This text will always be visible, as it is not part of a breakpoint.
        </CardBody>
      </Card>
    </BreakpointsContainer>
  );
};
