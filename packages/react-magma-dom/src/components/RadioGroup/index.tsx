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

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  containerStyle?: React.CSSProperties;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: string;
  name: string;
  testId?: string;
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
        containerStyle,
        labelledById,
        labelStyle,
        labelText,
        textVisuallyHidden,
        testId,
        name,
        children,
        ...other
      } = props;
      return (
        <div
          aria-labelledby={labelledById ? labelledById : id}
          style={containerStyle}
          data-testid={testId}
          role="radiogroup"
          {...{
            ...other,
            ...{ onBlur: null, onChange: null, onFocus: null, id: null }
          }}
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
