import * as React from 'react';
import { HiddenStyles } from '../SelectionControls/InputStyles';
import { RadioGroupCore } from 'react-magma-core';
const styled = require('styled-components').default;

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export interface RadioGroupProps {
  children: React.ReactChild | React.ReactChild[];
  handleBlur?: () => void;
  handleChange?: (event: React.SyntheticEvent) => void;
  handleFocus?: () => void;
  id: string;
  labelStyle?: React.CSSProperties;
  labelText: string;
  name: string;
  style?: React.CSSProperties;
  textVisuallyHidden?: boolean;
  value?: string;
}

export interface RadioContextInterface {
  name: string;
  selectedValue?: string;
  handleBlur?: () => void;
  handleChange?: (event: React.SyntheticEvent) => void;
  handleFocus?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface | null>(
  null
);

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (
  props: RadioGroupProps
): JSX.Element => (
  <div aria-labelledby={props.id} role="radiogroup" style={props.style}>
    <RadioContext.Provider
      value={{
        name: props.name,
        selectedValue: props.value,
        handleBlur: props.handleBlur,
        handleChange: props.handleChange,
        handleFocus: props.handleFocus
      }}
    >
      {props.textVisuallyHidden ? (
        <HiddenLabel id={props.id} style={props.labelStyle}>
          {props.labelText}
        </HiddenLabel>
      ) : (
        <StyledLabel id={props.id} style={props.labelStyle}>
          {props.labelText}
        </StyledLabel>
      )}
      <div>{props.children}</div>
    </RadioContext.Provider>
  </div>
);
