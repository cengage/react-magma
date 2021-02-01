import React from 'react';
import { Checkbox } from '.';
import { FormGroup } from '../FormGroup';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const Default = () => {
  const [checked, updateChecked] = React.useState(false);
  return (
    <FormGroup labelText="Choose One or More">
      <Checkbox
        defaultChecked={true}
        id="customId"
        labelText="Uncontrolled Checkbox"
      />

      <Checkbox
        checked={checked}
        labelText="Controlled Checkbox"
        onChange={() => updateChecked(!checked)}
      />

      <Checkbox labelText="Checkbox label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines" />
    </FormGroup>
  );
};
