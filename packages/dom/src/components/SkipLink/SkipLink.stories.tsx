import React from 'react';
import { SkipLink } from '.';
import { ButtonColor, ButtonVariant } from '../Button';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: SkipLink,
  title: 'SkipLink',
};

export default meta;

export const Default = () => {
  return (
    <SkipLink
      to="#"
      color={ButtonColor.success}
      variant={ButtonVariant.outline}
    >
      Skip to content
    </SkipLink>
  );
};
