import React from 'react';
import { ProgressBar } from '.';

export default {
  component: ProgressBar,
  title: 'ProgressBar',
};

export const Default = () => {
  return <ProgressBar percentage={25} />;
};
