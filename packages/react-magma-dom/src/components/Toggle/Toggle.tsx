import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxCore } from 'react-magma-core';
import { HiddenStyles } from '../SelectionControls/InputStyles';
import { Icon } from '../Icon/Icon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled, { css } from '../../theme/styled-components';
import { magma } from '../../theme/magma';
import 'focus-visible';

export interface ToggleProps {
  autoFocus?: boolean;
  color?: string;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  labelText: string;
  required?: boolean;
  style?: React.CSSProperties;
  textVisuallyHidden?: boolean;
  value?: string;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input`
  ${HiddenStyles};
`;

const Track = styled<
  { checked?: boolean; color: string; disabled?: boolean },
  'span'
>('span')`
  background: ${magma.colors.neutral07};
  border: 2px solid;
  border-color:  ${magma.colors.neutral06};
  border-radius: 12px;
  cursor: pointer;
  height: 24px;
  margin-right: 10px;
  position: relative;
  width: 48px;

  ${props =>
    props.checked &&
    css`
      background: ${p => p.color};
      border-color: ${p => p.color};
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${magma.colors.neutral06};
      border-color: ${magma.colors.neutral06};
      cursor: not-allowed;
    `}

  ${HiddenInput}:focus.focus-visible + label & {
      outline: 2px dotted ${magma.colors.pop03};
      outline-offset: 3px;
  }
`;

const Thumb = styled<{ checked?: boolean; disabled?: boolean }, 'span'>('span')`
  background: ${magma.colors.neutral08};
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.3), 0 0 4px 0 rgba(0, 0, 0, 0.24),
    0 0 5px 0 rgba(0, 0, 0, 0.22);
  border-radius: 100%;
  height: 20px;
  left: 0;
  position: absolute;
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 20px;

  ${props =>
    props.checked &&
    css`
      left: 24px;
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${magma.colors.neutral05};
    `}
`;

const IconContainer = styled.span`
  color: ${magma.colors.neutral08};
  left: 7px;
  position: absolute;
  top: -1px;
`;

export const Toggle: React.FunctionComponent<ToggleProps> = (
  props: ToggleProps
) => (
  <CheckboxCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, value }) => {
      const {
        autoFocus,
        color,
        disabled,
        id,
        labelText,
        required,
        style,
        textVisuallyHidden
      } = props;

      return (
        <StyledContainer style={style}>
          <HiddenInput
            autoFocus={autoFocus}
            id={id}
            disabled={disabled}
            name={name}
            required={required}
            type="checkbox"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <StyledLabel htmlFor={id}>
            <Track
              checked={value}
              color={color ? color : magma.colors.success01}
              disabled={disabled}
            >
              <IconContainer>
                <Icon size={11} type="checkmark" />
              </IconContainer>
              <Thumb checked={value} disabled={disabled} />
            </Track>
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

export default Toggle;
