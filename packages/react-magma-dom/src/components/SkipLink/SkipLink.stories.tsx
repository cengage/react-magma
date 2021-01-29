import React from 'react';
import { SkipLink } from '.';
import { ButtonColor, ButtonVariant } from '../Button';

export default {
  component: SkipLink,
  title: 'SkipLink',
};

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
