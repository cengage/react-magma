import * as React from 'react';
import { ThemeContext } from '../../theme/themeContext';
import { CheckboxCore } from 'react-magma-core';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  DisplayInputFocusStyles
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../UtilityStyles';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled from '@emotion/styled';

export interface CheckboxProps {
  autoFocus?: boolean;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
  id?: string;
  testId?: string;
  indeterminate?: boolean;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  name?: string;
  required?: boolean;
  style?: React.CSSProperties;
  textVisuallyHidden?: boolean;
  value?: string;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input<{ indeterminate?: boolean }>`
  ${HiddenStyles};
`;

const StyledFakeInput = styled.span<{
  inverse: boolean;
  checked: boolean;
  disabled: boolean;
  color: string;
  indeterminate?: boolean;
}>`
  ${DisplayInputStyles};
  background: ${props => {
    if (props.inverse) {
      if (props.checked) {
        return props.theme.colors.neutral08;
      }
      return 'none';
    }
    if (props.disabled) {
      return props.theme.colors.neutral06;
    }
    if (props.checked) {
      return props.color ? props.color : props.theme.colors.primary;
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
    if (!props.checked && !props.indeterminate) {
      return props.theme.colors.neutral03;
    }
    return props.color ? props.color : props.theme.colors.primary;
  }};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    display: ${props => (props.disabled ? 'none' : 'block')};
    fill: ${props =>
      props.inverse
        ? props.color
          ? props.color
          : props.theme.colors.primary
        : props.theme.colors.neutral08};
    opacity: ${props => (props.checked ? '1' : '0')};
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  ${HiddenInput}:focus + label & {
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

  ${HiddenInput}:not (:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }

  ${HiddenInput}:indeterminate + label & {
    background: ${props => props.theme.colors.neutral08};
    border-color: ${props =>
      props.inverse
        ? props.theme.colors.neutral08
        : props.color
        ? props.color
        : props.theme.colors.primary};

    svg {
      display: none;
    }
  }
`;

const IndeterminateIcon = styled.span<{ color?: string }>`
  background: ${props =>
    props.color ? props.color : props.theme.colors.primary};
  display: none;
  height: 2px;
  width: 10px;

  ${HiddenInput}:indeterminate + label & {
    display: block;
  }
`;

export class Checkbox extends React.Component<CheckboxProps> {
  constructor(props) {
    super(props);

    this.setIndeterminate = this.setIndeterminate.bind(this);
  }

  readonly checkboxInput = React.createRef<any>();

  componentDidMount() {
    this.setIndeterminate();
  }

  componentDidUpdate() {
    this.setIndeterminate();
  }

  setIndeterminate() {
    this.checkboxInput.current.indeterminate = this.props.indeterminate;
  }

  render() {
    return (
      <CheckboxCore
        id={this.props.id}
        checked={this.props.checked}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
      >
        {({ id, onBlur, onChange, onFocus, checked }) => {
          const {
            autoFocus,
            color,
            disabled,
            indeterminate,
            inputStyle,
            inverse,
            labelStyle,
            labelText,
            name,
            required,
            style,
            textVisuallyHidden,
            testId,
            value
          } = this.props;

          return (
            <ThemeContext.Consumer>
              {theme =>
                theme && (
                  <StyledContainer style={style}>
                    <HiddenInput
                      autoFocus={autoFocus}
                      id={id}
                      data-testid={testId}
                      checked={checked}
                      disabled={disabled}
                      indeterminate={indeterminate}
                      name={name}
                      ref={this.checkboxInput}
                      required={required}
                      type="checkbox"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      onFocus={onFocus}
                    />
                    <StyledLabel
                      htmlFor={id}
                      inverse={inverse}
                      style={labelStyle}
                    >
                      <StyledFakeInput
                        checked={checked}
                        color={color ? color : ''}
                        disabled={disabled}
                        inverse={inverse}
                        style={inputStyle}
                        theme={theme}
                      >
                        <IndeterminateIcon
                          color={color ? color : ''}
                          theme={theme}
                        />
                        <CheckIcon size={12} />
                      </StyledFakeInput>
                      {textVisuallyHidden ? (
                        <HiddenLabelText>{labelText}</HiddenLabelText>
                      ) : (
                        labelText
                      )}
                    </StyledLabel>
                  </StyledContainer>
                )
              }
            </ThemeContext.Consumer>
          );
        }}
      </CheckboxCore>
    );
  }
}
