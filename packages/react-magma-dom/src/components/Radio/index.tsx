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
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { generateId } from '../utils';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
  // disabled?: boolean;
  // id?: string;
  testId?: string;
  innerRef?: any;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  // required?: boolean;
  // style?: React.CSSProperties;
  textVisuallyHidden?: boolean;
  // value?: string;
}

interface RadioState {
  id?: string;
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
      outline: 2px dotted ${props => props.theme.colors.pop03};
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

export class RadioComponent extends React.Component<RadioProps, RadioState> {
  state: RadioState = {
    id: generateId(this.props.id)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  render() {
    const { id } = this.state;
    const {
      color,
      disabled,
      innerRef,
      inputStyle,
      inverse,
      labelStyle,
      labelText,
      required,
      style,
      textVisuallyHidden,
      testId,
      value,
      ...other
    } = this.props;
    return (
      <RadioContext.Consumer>
        {context =>
          context && (
            <ThemeContext.Consumer>
              {theme => (
                <StyledContainer style={style}>
                  <HiddenInput
                    ref={innerRef}
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
                    {...{ ...other, id }}
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
}

export const Radio = React.forwardRef((props: RadioProps, ref) => (
  <RadioComponent innerRef={ref} {...props} />
));
