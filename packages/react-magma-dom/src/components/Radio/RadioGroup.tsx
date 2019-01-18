import * as React from 'react';
import { RadioCore } from 'react-magma-core';
import { RadioProps } from './Radio';
import { HiddenStyles } from '../UtilityStyles';

const styled = require('styled-components').default;

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

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (
  props: RadioGroupProps
): JSX.Element => (
  <RadioCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, selectedValue }) => {
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
          {textVisuallyHidden ? (
            <HiddenLabel id={id} style={labelStyle}>
              {labelText}
            </HiddenLabel>
          ) : (
            <StyledLabel id={id} style={labelStyle}>
              {labelText}
            </StyledLabel>
          )}
          {React.Children.map(
            children,
            (child: React.ReactElement<RadioProps>) => {
              if (!React.isValidElement(child)) {
                return null;
              }

              return React.cloneElement<RadioProps>(child, {
                ...child.props,
                name,
                checked: selectedValue === child.props.value,
                handleChange: handleChange,
                handleBlur: handleBlur,
                handleFocus: handleFocus
              });
            }
          )}
        </div>
      );
    }}
  </RadioCore>
);
