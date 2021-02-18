import React from 'react';
import { Radio } from '.';
import { RadioGroup } from '../RadioGroup';

export default {
  component: Radio,
  title: 'Radio',
};

export const Default = () => {
  return (
    <RadioGroup labelText="Basic Usage" id="basicGroup" name="basic">
      <Radio id="radio1" labelText="Option one label" value="1" />

      <Radio
        id="radio2"
        labelText="Option two label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines"
        value="2"
      />
    </RadioGroup>
  );
};
