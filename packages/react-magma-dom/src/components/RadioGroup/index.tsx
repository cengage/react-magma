import * as React from 'react';
import { RadioCore } from 'react-magma-core';
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  id?: string;
  testId?: string;
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface | null>(
  null
);

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (
  props: RadioGroupProps
): JSX.Element => (
  <RadioCore
    id={props.id}
    value={props.value}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onFocus={props.onFocus}
  >
    {({ id, onBlur, onChange, onFocus, selectedValue }) => {
      const {
        labelStyle,
        labelText,
        style,
        textVisuallyHidden,
        testId,
        name,
        children
      } = props;
      return (
        <div
          aria-labelledby={id}
          data-testid={testId}
          role="radiogroup"
          style={style}
        >
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
