import React from 'react';

import styled from '@emotion/styled';
import { Meta } from '@storybook/react';

import { magma } from '../../theme/magma';
import { Checkbox } from '../Checkbox';
import { Combobox } from '../Combobox';
import { DatePicker } from '../DatePicker';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { InputBase } from '../InputBase';
import { PasswordInput } from '../PasswordInput';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { TimePicker } from '../TimePicker';
import { Toggle } from '../Toggle';

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

export const Default = {
  render: args => {
    return (
      <Container>
        <One>
          <Input
            errorMessage="danger will robinson."
            labelText="Input"
            isClearable
          />
          <Input defaultValue={0} labelText="Default value `0`" isClearable />
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
          <Toggle errorMessage="danger will robinson." labelText="Toggle" />
          <Toggle
            errorMessage="danger will robinson."
            labelText="Toggle"
            checked
          />
        </Two>
      </Container>
    );
  },

  args: {},
};

export const Inverse = {
  render: args => {
    return (
      <Container style={{ backgroundColor: magma.colors.primary600 }}>
        <One>
          <Input
            errorMessage="danger will robinson."
            labelText="Input"
            isClearable
            isInverse
          />
          <Input
            defaultValue={0}
            labelText="Default value `0`"
            isClearable
            isInverse
          />
          <PasswordInput
            errorMessage="danger will robinson."
            labelText="PasswordInput"
            isInverse
          />
          <DatePicker
            errorMessage="danger will robinson."
            labelText="DatePicker"
            isClearable
            isInverse
          />
          <TimePicker
            errorMessage="danger will robinson."
            labelText="TimePicker"
            isInverse
          />
          <Textarea
            errorMessage="danger will robinson."
            labelText="Textarea"
            isInverse
          />
          <Checkbox
            errorMessage="danger will robinson."
            labelText="Checkbox"
            isInverse
          />
          <FormGroup
            errorMessage="danger will robinson."
            labelText="FormGroup"
            isInverse
          >
            <Checkbox labelText="Checkbox One" isInverse />
            <Checkbox labelText="Checkbox Two" isInverse />
            <Checkbox labelText="Checkbox Three" isInverse />
          </FormGroup>
        </One>
        <Two>
          <RadioGroup
            errorMessage="danger will robinson."
            name="radio"
            labelText="RadioGroup"
            isInverse
          >
            <Radio labelText="Radio One" isInverse />
            <Radio labelText="Radio Two" isInverse />
            <Radio labelText="Radio Three" isInverse />
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
            isInverse
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
            isInverse
          />
          <Select
            labelText="Select"
            items={[
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
              { label: 'Green', value: 'green' },
            ]}
            errorMessage="danger will robinson."
            isInverse
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
            isInverse
          />
          <Toggle
            errorMessage="danger will robinson."
            labelText="Toggle"
            isInverse
          />
          <Toggle
            errorMessage="danger will robinson."
            labelText="Toggle"
            checked
            isInverse
          />
        </Two>
      </Container>
    );
  },
};
