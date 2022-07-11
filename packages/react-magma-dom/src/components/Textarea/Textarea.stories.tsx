import React, { useState } from 'react';
import { Textarea } from '.';
import { Button } from '../Button';

export default {
  component: Textarea,
  title: 'Textarea',
};

export const Default = () => {
  const [fieldValue, setValue] = useState('');
  return (
    <>
      <Textarea
        labelText="Textarea"
        value={fieldValue}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
      <Button
        onClick={e => {
          setValue('');
        }}
      >
        Clear
      </Button>
    </>
  );
};
