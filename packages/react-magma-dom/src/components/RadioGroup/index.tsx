import * as React from 'react';
import { RadioCore } from 'react-magma-core';
import { RadioProps } from '../Radio';
import { HiddenStyles } from '../UtilityStyles';
import styled from '@emotion/styled';

const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
`;

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export interface RadioGroupProps {
  children: React.ReactChild | React.ReactChild[];
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
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
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface | null>(
  null
);

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (
  props: RadioGroupProps
): JSX.Element => (
  <RadioCore
    value={props.value}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onFocus={props.onFocus}
  >
    {({ onBlur, onChange, onFocus, selectedValue }) => {
      const {
        id,
        labelStyle,
        labelText,
        style,
        textVisuallyHidden,
        name,
        children
      } = props;
      return (
        <div aria-labelledby={id} role="radiogroup" style={style}>
          <RadioContext.Provider
            value={{
              name: name,
              selectedValue: selectedValue,
              onBlur: onBlur,
              onChange: onChange,
              onFocus: onFocus
            }}
          >
            {textVisuallyHidden ? (
              <HiddenLabel id={id} style={labelStyle}>
                {labelText}
              </HiddenLabel>
            ) : (
              <StyledLabel id={id} style={labelStyle}>
                {labelText}
              </StyledLabel>
            )}
            {children}
          </RadioContext.Provider>
        </div>
      );
    }}
  </RadioCore>
);
