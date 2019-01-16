import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
import {
  DisplayInputStyles,
  HiddenStyles
} from '../SelectionControls/InputStyles';
import { Icon } from '../Icon/Icon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled, { css } from '../../theme/styled-components';
import { magma } from '../../theme/magma';
import 'focus-visible';

export interface CheckboxProps {
  autoFocus?: boolean;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  indeterminate?: boolean;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
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
    // focus state
    &:before {
      height: 30px;
      outline: 2px dotted ${magma.colors.pop03};
      position: absolute;
      width: 30px;
    }
  }

  &:after {
    // active state
    background: ${props =>
      props.inverse ? magma.colors.neutral08 : props.color};
  }

  ${HiddenInput}:not (:disabled):active + label & {
    &:after {
      opacity: 0.4;
      transform: scale(0);
      transition: transform 0s;
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
    ReactDOM.findDOMNode(
      this.checkboxInput.current
    ).indeterminate = this.props.indeterminate;
  }

  render() {
    return (
      <CheckboxCore
        value={this.props.value}
        handleBlur={this.props.handleBlur}
        handleChange={this.props.handleChange}
        handleFocus={this.props.handleFocus}
      >
        {({ handleBlur, handleChange, handleFocus, value }) => {
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
            required,
            style,
            textVisuallyHidden
          } = this.props;

          return (
            <StyledContainer style={style}>
              <HiddenInput
                ref={this.checkboxInput}
                autoFocus={autoFocus}
                id={id}
                disabled={disabled}
                indeterminate={indeterminate}
                required={required}
                type="checkbox"
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <StyledLabel htmlFor={id} inverse={inverse} style={labelStyle}>
                <StyledFakeInput
                  checked={value}
                  color={color ? color : magma.colors.primary}
                  disabled={disabled}
                  inverse={inverse}
                  style={inputStyle}
                >
                  <IndeterminateIcon
                    color={color ? color : magma.colors.primary}
                  />
                  <Icon size={12} type="checkmark" />
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

export default Checkbox;
