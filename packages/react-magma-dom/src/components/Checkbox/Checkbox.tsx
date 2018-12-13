import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
import { Icon } from '../Icon/Icon';
import styled from '../../theme/styled-components';
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
  inverse?: boolean;
  labelText: string;
  required?: boolean;
  value?: string;
}

const StyledContainer = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 0 10px;
`;

const HiddenInput = styled<{ indeterminate?: boolean }, 'input'>('input')`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  position: absolute;
  overflow: hidden;
  top: auto;
  white-space: nowrap;
  width: 1px;
`;

const StyledLabel = styled<{ inverse: boolean }, 'label'>('label')`
  align-items: flex-start;
  color: ${props => (props.inverse ? magma.colors.neutral08 : 'inherit')};
  display: flex;
  margin: 0;
  padding: 10px;
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
  align-items: center;
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
  border: 2px solid;
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
  display: flex;
  height: 20px;
  flex-shrink: 0;
  justify-content: center;
  margin: 2px 10px 0 -25px;
  margin-left: 0;
  position: relative;
  transition: all 0.2s ease-out;
  width: 20px;

  svg {
    display: ${props => (props.disabled ? 'none' : 'block')};
    fill: ${props => (props.inverse ? props.color : magma.colors.neutral08)};
    opacity: ${props => (props.checked ? '1' : '0')};
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  &:before,
  &:after { // focus state
    content: '';
    position: absolute;
  }

  ${HiddenInput}:focus.focus-visible + label & { // focus state
    &:before {
      height: 30px;
      outline: 2px dotted ${magma.colors.pop03};
      position: absolute;
      width: 30px;
    }
  }

  &:after { // active state
    background: ${props =>
      props.inverse ? magma.colors.neutral08 : props.color};
    border-radius: 50%;
    height: 40px;
    left: -12px;
    opacity: 0;
    padding: 50%;
    top: 50%
    transform: scale(1);
    transition: opacity 1s, transform 0.5s;
    width: 40px;
  }

  ${HiddenInput}:not(:disabled):active + label & {
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
            inverse,
            labelText,
            required
          } = this.props;

          return (
            <StyledContainer>
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
              <StyledLabel htmlFor={id} inverse={inverse}>
                <StyledFakeInput
                  id={id}
                  checked={value}
                  color={color ? color : magma.colors.primary}
                  disabled={disabled}
                  inverse={inverse}
                >
                  <IndeterminateIcon
                    color={color ? color : magma.colors.primary}
                  />
                  <Icon size={12} type="checkmark" />
                </StyledFakeInput>
                {labelText}
              </StyledLabel>
            </StyledContainer>
          );
        }}
      </CheckboxCore>
    );
  }
}

export default Checkbox;
