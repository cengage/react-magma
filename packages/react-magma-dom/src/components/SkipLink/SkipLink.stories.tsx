import React from 'react';
import { SkipLink } from '.';
import { ButtonVariant } from '../Button';

export default {
  component: SkipLink,
  title: 'SkipLink',
};

export const Default = () => {
  return (
    <SkipLink to="#" variant={ButtonVariant.solid}>
      Skip to content
    </SkipLink>
  );
};
