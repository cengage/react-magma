import React from 'react';
import { Textarea } from '.';

export default {
  component: Textarea,
  title: 'Textarea',
};

export const Default = () => {
  return <Textarea labelText="Textarea" value="Some text" />;
};
