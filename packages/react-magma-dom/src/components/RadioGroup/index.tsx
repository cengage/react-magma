import * as React from 'react';
import { RadioCore } from 'react-magma-core';
import { FormGroupLabel } from '../FormGroup';
import { HiddenStyles } from '../UtilityStyles';
import styled from '../../theme/styled';
import { omit } from '../utils';

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

export class RadioGroup extends React.Component<RadioGroupProps> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(onChange: (selectedValue: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: selectedValue } = event.target;
      this.props.onChange &&
        typeof this.props.onChange === 'function' &&
        this.props.onChange(event);
      onChange(selectedValue);
    };
  }

  render() {
    return (
      <RadioCore id={this.props.id} value={this.props.value}>
        {({ id, onChange, selectedValue }) => {
          const {
            containerStyle,
            labelledById,
            labelStyle,
            labelText,
            textVisuallyHidden,
            testId,
            name,
            children,
            ...rest
          } = this.props;
          const other = omit(['onBlur', 'onChange', 'onFocus', 'id'], rest);

          return (
            <div
              {...other}
              aria-labelledby={labelledById ? labelledById : id}
              style={containerStyle}
              data-testid={testId}
              role="radiogroup"
            >
              <RadioContext.Provider
                value={{
                  name: name,
                  selectedValue: selectedValue,
                  onBlur: this.props.onBlur,
                  onChange: this.handleChange(onChange),
                  onFocus: this.props.onFocus
                }}
              >
                {textVisuallyHidden ? (
                  <HiddenLabel id={id} style={labelStyle}>
                    {labelText}
                  </HiddenLabel>
                ) : (
                  <FormGroupLabel id={id} style={labelStyle}>
                    {labelText}
                  </FormGroupLabel>
                )}
                {children}
              </RadioContext.Provider>
            </div>
          );
        }}
      </RadioCore>
    );
  }
}
