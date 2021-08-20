import React from 'react';
import { FormGroup } from '.';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: FormGroup,
  title: 'FormGroup',
};

export default meta;

export const Default = () => {
  return (
    <>
      <FormGroup labelText="Choose One or More Colors">
        <Checkbox labelText="Red" />
        <Checkbox labelText="Blue" />
        <Checkbox labelText="Purple" />
      </FormGroup>
      <br />
      <FormGroup
        id="myCustomId"
        labelText="Turn on Notifications for the Following"
      >
        <Toggle labelText="Product updates" />
        <Toggle labelText="Promotions and sales" />
      </FormGroup>
    </>
  );
};
