import React from 'react';
import { Announce } from '.';

export default {
  component: Announce,
  title: 'Announce',
};

export const Default = () => {
  return (
    <Announce>
      <p>Announce goes here</p>
    </Announce>
  );
};
