import React from 'react';
import { InputBase } from '../InputBase';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { Textarea } from '../Textarea';
import { Checkbox } from '../Checkbox';
import { FormGroup } from '../FormGroup';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Toggle } from '../Toggle';
import { Combobox } from '../Combobox';
import { Select } from '../Select';
import styled from '@emotion/styled';
import { Meta } from '@storybook/react/types-6-0';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 50px;
  grid-template-areas: 'one two';
`;

const One = styled.div`
  grid-area: one;
`;

const Two = styled.div`
  grid-area: two;
`;

export default {
  title: 'InputBase',
  component: InputBase,
} as Meta;

export const Default = args => {
  return (
    <Container>
      <One>
        <Input
          errorMessage="danger will robinson."
          labelText="Input"
          isClearable
        />
        <PasswordInput
          errorMessage="danger will robinson."
          labelText="PasswordInput"
        />
        <DatePicker
          errorMessage="danger will robinson."
          labelText="DatePicker"
          isClearable
        />
        <TimePicker
          errorMessage="danger will robinson."
          labelText="TimePicker"
        />
        <Textarea errorMessage="danger will robinson." labelText="Textarea" />
        <Checkbox errorMessage="danger will robinson." labelText="Checkbox" />
        <FormGroup errorMessage="danger will robinson." labelText="FormGroup">
          <Checkbox labelText="Checkbox One" />
          <Checkbox labelText="Checkbox Two" />
          <Checkbox labelText="Checkbox Three" />
        </FormGroup>
      </One>
      <Two>
        <RadioGroup
          errorMessage="danger will robinson."
          name="radio"
          labelText="RadioGroup"
        >
          <Radio labelText="Radio One" />
          <Radio labelText="Radio Two" />
          <Radio labelText="Radio Three" />
        </RadioGroup>
        <Combobox
          labelText="Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          errorMessage="danger will robinson."
          isClearable
        />
        <Combobox
          labelText="Combobox (multi)"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          errorMessage="danger will robinson."
          isMulti
        />
        <Select
          labelText="Select"
          items={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          errorMessage="danger will robinson."
        />
        <Select
          labelText="Select (multi)"
          items={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          errorMessage="danger will robinson."
          isMulti
        />
        <Toggle
          errorMessage="danger will robinson."
          labelText="Toggle"
          checked
        />
      </Two>
    </Container>
  );
};
Default.args = {};
