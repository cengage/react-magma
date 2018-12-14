import * as React from 'react';
import { RadioContext } from './RadioGroup';
import { RadioCore } from 'react-magma-core';
import styled from '../../theme/styled-components';
import { magma } from '../../theme/magma';
import 'focus-visible';

export interface RadioProps {
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  handleChange?: () => void;
  id: string;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  required?: boolean;
  style?: React.CSSProperties;
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
    disabled: boolean;
    color: string;
  },
  'span'
>('span')`
  align-items: center;
  background: ${props => {
    if (props.inverse) {
      return 'none';
    }
    if (props.disabled) {
      return magma.colors.neutral06;
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
    return magma.colors.neutral03;
  }};
  border-radius: 100%;
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

  &:before,
  &:after { // focus state
    content: '';
    position: absolute;
  }

  ${HiddenInput}:checked:not(:disabled) + label & {
    background: ${props => {
      if (props.inverse) {
        return magma.colors.neutral08;
      }
    }};
    border-color: ${props => {
      if (props.inverse) {
        return magma.colors.neutral08;
      }
      if (props.disabled) {
        return magma.colors.disabledInverseText;
      }
      return props.color;
    }};
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
`;

const SelectedIcon = styled<{ color: string }, 'span'>('span')`
  background: ${props => props.color};
  border-radius: 100%;
  display: none;
  height: 10px;
  width: 10px;

  ${HiddenInput}:checked + label & {
    display: block;
  }
`;

export const Radio: React.FunctionComponent<RadioProps> = (
  props: RadioProps
): JSX.Element => (
  <RadioContext.Consumer>
    {context =>
      context && (
        <RadioCore
          selectedValue={context.selectedValue}
          handleChange={context.handleChange}
          value={props.value}
        >
          {({ handleChange, checked }) => {
            const {
              color,
              disabled,
              id,
              inputStyle,
              inverse,
              labelStyle,
              labelText,
              required,
              style,
              value
            } = props;
            const { name } = context;

            return (
              <StyledContainer style={style}>
                <HiddenInput
                  aria-checked={checked}
                  id={id}
                  disabled={disabled}
                  name={name}
                  required={required}
                  type="radio"
                  value={value}
                  onChange={handleChange}
                />
                <StyledLabel htmlFor={id} inverse={inverse} style={labelStyle}>
                  <StyledFakeInput
                    color={color ? color : magma.colors.primary}
                    disabled={disabled}
                    inverse={inverse}
                    style={inputStyle}
                  >
                    <SelectedIcon
                      color={color ? color : magma.colors.primary}
                    />
                  </StyledFakeInput>
                  {labelText}
                </StyledLabel>
              </StyledContainer>
            );
          }}
        </RadioCore>
      )
    }
  </RadioContext.Consumer>
);

export default Radio;
