import React from 'react';
import { Banner } from '.';
import { AlertVariant } from '../AlertBase';

export default {
  component: Banner,
  title: 'Banner',
};

export const Default = () => {
  return (
    <>
      <Banner>Default (info) banner</Banner>
      <Banner variant={AlertVariant.success}>Default (info) banner</Banner>
      <Banner variant={AlertVariant.warning}>Default (info) banner</Banner>
      <Banner variant={AlertVariant.danger}>Default (info) banner</Banner>
    </>
  );
};
