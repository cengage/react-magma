import React from 'react';

import styled from '@emotion/styled';
import { Meta } from '@storybook/react-webpack5';

import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';
import { magma } from '../../theme/magma';

import {
  Card,
  CardBorderRadius,
  CardCalloutType,
  CardCornerTreatment,
  CardProps,
} from '.';

const CardExamples = styled.div<{ $isInverse?: boolean }>`
  background: ${props =>
    props.$isInverse ? magma.colors.neutral1100 : 'transparent'};
  display: grid;
  gap: ${magma.spaceScale.spacing05};
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding: ${magma.spaceScale.spacing05};
`;

const calloutTypes = [
  CardCalloutType.primary,
  CardCalloutType.danger,
  CardCalloutType.info,
  CardCalloutType.success,
  CardCalloutType.warning,
];

const formatCalloutType = (calloutType: CardCalloutType) =>
  `${calloutType.charAt(0).toUpperCase()}${calloutType.slice(1)}`;

export default {
  component: Card,
  title: 'Card',
  argTypes: {
    borderRadius: {
      control: {
        type: 'select',
      },
      options: Object.values(CardBorderRadius),
    },
    cornerTreatment: {
      control: {
        type: 'select',
      },
      options: Object.values(CardCornerTreatment),
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    hasDropShadow: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = {
  render: (args: CardProps) => {
    return (
      <CardExamples $isInverse={args.isInverse}>
        <Card {...args} calloutType={undefined}>
          <CardBody>
            <CardHeading>Default Card</CardHeading>
            Some content
          </CardBody>
        </Card>
        {calloutTypes.map(calloutType => (
          <Card {...args} calloutType={calloutType} key={calloutType}>
            <CardBody>
              <CardHeading>
                {formatCalloutType(calloutType)} Callout
              </CardHeading>
              Some content
            </CardBody>
          </Card>
        ))}
      </CardExamples>
    );
  },

  args: {
    borderRadius: CardBorderRadius.medium,
    cornerTreatment: CardCornerTreatment.squareTopLeft,
    isInverse: false,
    align: '',
    background: '',
    calloutType: '',
    width: null,
  },
};
