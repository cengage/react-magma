import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  DisplayInputFocusStyles
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../UtilityStyles';
import { Icon } from '../Icon/Icon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { styled } from '../../theme/styled-components';
import { magma } from '../../theme/magma';
import 'focus-visible';

export interface CheckboxProps {
  autoFocus?: boolean;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: (value: string) => void;
  handleFocus?: () => void;
  id: string;
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

const HiddenInput = styled<{ indeterminate?: boolean }, 'input'>('input')`
  ${HiddenStyles};
`;

const StyledFakeInput = styled<
  {
    inverse: boolean;
    checked: boolean;
    disabled: boolean;
    color: string;
    indeterminate?: boolean;
  },
  'span'
>('span')`
  ${DisplayInputStyles};
  background: ${props => {
    if (props.inverse) {
      if (props.checked) {
        return magma.colors.neutral08;
      }
      return 'none';
    }
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.checked) {
      return props.color;
    }
    return magma.colors.neutral08;
  }};
  border-color: ${props => {
    if (props.inverse) {
      if (props.disabled) {
        return magma.colors.disabledInverseText;
      }
      return magma.colors.neutral08;
    }
    if (props.disabled) {
      return magma.colors.neutral05;
    }
    if (!props.checked && !props.indeterminate) {
      return magma.colors.neutral03;
    }
    return props.color;
  }};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    display: ${props => (props.disabled ? 'none' : 'block')};
    fill: ${props => (props.inverse ? props.color : magma.colors.neutral08)};
    opacity: ${props => (props.checked ? '1' : '0')};
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  ${HiddenInput}:focus.focus-visible + label & {
    &:before {
      ${DisplayInputFocusStyles};
    }
  }

  &:after {
    // active state
    background: ${props =>
      props.inverse ? magma.colors.neutral08 : props.color};
  }

  ${HiddenInput}:not (:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }

  ${HiddenInput}:indeterminate + label & {
    background: ${magma.colors.neutral08};
    border-color: ${props =>
      props.inverse ? magma.colors.neutral08 : props.color};

    svg {
      display: none;
    }
  }
`;

const IndeterminateIcon = styled<{ color?: string }, 'span'>('span')`
  background: ${props => props.color};
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

  private checkboxInput = React.createRef<any>();

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
        checked={this.props.checked}
        handleBlur={this.props.handleBlur}
        handleChange={this.props.handleChange}
        handleFocus={this.props.handleFocus}
      >
        {({ handleBlur, handleChange, handleFocus, checked }) => {
          const {
            autoFocus,
            color,
            disabled,
            id,
            indeterminate,
            inputStyle,
            inverse,
            labelStyle,
            labelText,
            name,
            required,
            style,
            textVisuallyHidden,
            value
          } = this.props;

          return (
            <StyledContainer style={style}>
              <HiddenInput
                autoFocus={autoFocus}
                id={id}
                checked={checked}
                disabled={disabled}
                indeterminate={indeterminate}
                name={name}
                ref={this.checkboxInput}
                required={required}
                type="checkbox"
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <StyledLabel htmlFor={id} inverse={inverse} style={labelStyle}>
                <StyledFakeInput
                  checked={checked}
                  color={color ? color : magma.colors.primary}
                  disabled={disabled}
                  inverse={inverse}
                  style={inputStyle}
                >
                  <IndeterminateIcon
                    color={color ? color : magma.colors.primary}
                  />
                  <Icon size={12} type="check" />
                </StyledFakeInput>
                {textVisuallyHidden ? (
                  <HiddenLabelText>{labelText}</HiddenLabelText>
                ) : (
                  labelText
                )}
              </StyledLabel>
            </StyledContainer>
          );
        }}
      </CheckboxCore>
    );
  }
}
