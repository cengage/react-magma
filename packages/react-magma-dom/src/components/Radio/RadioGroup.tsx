import * as React from 'react';
import { RadioGroupCore } from 'react-magma-core';
const styled = require('styled-components').default;

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

export interface RadioGroupProps {
  children: React.ReactChild | React.ReactChild[];
  labelText: string;
  name: string;
  handleChange?: () => void;
  value?: string;
}

export interface RadioContextInterface {
  name: string;
  selectedValue?: string;
  handleChange?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface | null>(
  null
);

export const RadioGroup: React.SFC<RadioGroupProps> = (
  props: RadioGroupProps
): JSX.Element => (
  <RadioContext.Provider
    value={{
      name: props.name,
      selectedValue: props.value,
      handleChange: props.handleChange
    }}
  >
    <StyledLabel>{props.labelText}</StyledLabel>
    <div role="radiogroup">{props.children}</div>
  </RadioContext.Provider>
);

export default RadioGroup;
