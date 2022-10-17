import React, { useState } from 'react';
import { Textarea } from '.';
import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { LabelPosition } from '../FormFieldContainer';
import { Spacer } from '../Spacer';

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
      <Spacer size="12" />
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

export const LeftLabel = () => {
  const [fieldValue, setValue] = useState('');
  return (
    <>
      <Textarea
        labelText="Textarea"
        value={fieldValue}
        onChange={e => {
          setValue(e.target.value);
        }}
        labelPosition={LabelPosition.left}
      />
      <Spacer size="12" />
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

export const Inverse = () => {
  const [fieldValue, setValue] = useState('');
  return (
    <Card isInverse>
      <CardBody>
        <Textarea
          labelText="Textarea"
          value={fieldValue}
          onChange={e => {
            setValue(e.target.value);
          }}
          isInverse
        />
        <Spacer size="12" />
        <Button
          onClick={e => {
            setValue('');
          }}
          isInverse
        >
          Clear
        </Button>
      </CardBody>
    </Card>
  );
};
