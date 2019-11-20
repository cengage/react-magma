import * as React from 'react';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  DisplayInputFocusStyles
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../UtilityStyles';
import { RadioContext } from '../RadioGroup';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../utils';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  css?: any; // Adding css prop to fix emotion error
  color?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  ref?: any;
  testId?: string;
  textVisuallyHidden?: boolean;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input<{ indeterminate?: boolean }>`
  ${HiddenStyles};
`;

const StyledFakeInput = styled.span<{
  inverse: boolean;
  disabled: boolean;
  color: string;
}>`
  ${DisplayInputStyles};
  background: ${props => {
    if (props.inverse) {
      return 'none';
    }
    if (props.disabled) {
      return props.theme.colors.neutral06;
    }
    return props.theme.colors.neutral08;
  }};
  border-color: ${props => {
    if (props.inverse) {
      if (props.disabled) {
        return props.theme.colors.disabledInverseText;
      }
      return props.theme.colors.neutral08;
    }
    if (props.disabled) {
      return props.theme.colors.neutral05;
    }
    return props.theme.colors.neutral03;
  }};
  border-radius: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  ${HiddenInput}:checked:not(:disabled) + label & {
    background: ${props => {
      if (props.inverse) {
        return props.theme.colors.neutral08;
      }
    }};
    border-color: ${props => {
      if (props.inverse) {
        return props.theme.colors.neutral08;
      }
      if (props.disabled) {
        return props.theme.colors.disabledInverseText;
      }
      return props.color ? props.color : props.theme.colors.primary;
    }};
  }

  ${HiddenInput}:focus + label & {
    // focus state
    &:before {
      ${DisplayInputFocusStyles};
      outline: 2px dotted
        ${props =>
          props.inverse
            ? props.theme.colors.neutral08
            : props.theme.colors.pop02};
      top: -7px;
      left: -7px;
    }
  }

  &:after {
    // active state
    background: ${props =>
      props.inverse
        ? props.theme.colors.neutral08
        : props.color
        ? props.color
        : props.theme.colors.primary};
  }

  ${HiddenInput}:not(:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }
`;

const SelectedIcon = styled.span<{ color: string }>`
  background: ${props =>
    props.color ? props.color : props.theme.colors.primary};
  border-radius: 100%;
  display: none;
  height: 10px;
  width: 10px;

  ${HiddenInput}:checked + label & {
    display: block;
  }
`;

export const Radio: React.FunctionComponent<RadioProps> = React.forwardRef(
  (props: RadioProps, ref: any) => {
    const id = useGenerateId(props.id);
    const {
      color,
      containerStyle,
      disabled,
      inputStyle,
      inverse,
      labelStyle,
      labelText,
      required,
      textVisuallyHidden,
      testId,
      value,
      ...other
    } = props;

    return (
      <RadioContext.Consumer>
        {context =>
          context && (
            <ThemeContext.Consumer>
              {theme => (
                <StyledContainer style={containerStyle}>
                  <HiddenInput
                    {...other}
                    id={id}
                    ref={ref}
                    checked={context.selectedValue === value}
                    data-testid={testId}
                    disabled={disabled}
                    name={context.name}
                    required={required}
                    type="radio"
                    value={value}
                    onBlur={context.onBlur}
                    onChange={context.onChange}
                    onFocus={context.onFocus}
                  />
                  <StyledLabel
                    htmlFor={id}
                    inverse={inverse}
                    style={labelStyle}
                  >
                    <StyledFakeInput
                      color={color ? color : ''}
                      disabled={disabled}
                      inverse={inverse}
                      style={inputStyle}
                      theme={theme}
                    >
                      <SelectedIcon color={color ? color : ''} theme={theme} />
                    </StyledFakeInput>
                    {textVisuallyHidden ? (
                      <HiddenLabelText>{labelText}</HiddenLabelText>
                    ) : (
                      labelText
                    )}
                  </StyledLabel>
                </StyledContainer>
              )}
            </ThemeContext.Consumer>
          )
        }
      </RadioContext.Consumer>
    );
  }
);
