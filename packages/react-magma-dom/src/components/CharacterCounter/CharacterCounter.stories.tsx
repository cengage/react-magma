import React from 'react';
import { CharacterCounter } from '.';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

export default {
  component: CharacterCounter,
  title: 'CharacterCounter',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = args => {
  return <Input isClearable labelText="Character Counter" maxLength={5} />;
};

export const Texty = args => {
  return <Textarea labelText="Character Counter" maxLength={456} />;
};
