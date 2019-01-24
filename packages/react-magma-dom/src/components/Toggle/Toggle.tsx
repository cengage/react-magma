import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
import { FocusStyles, HiddenStyles } from '../UtilityStyles';
import { Icon } from '../Icon/Icon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { styled, css } from '../../theme/styled-components';
import { magma } from '../../theme/magma';
import 'focus-visible';

enum ToggleTextPostition {
  left = 'left',
  right = 'right'
}

export interface ToggleProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  labelStyle?: React.CSSProperties;
  labelText: string;
  required?: boolean;
  style?: React.CSSProperties;
  textPosition?: ToggleTextPostition;
  textVisuallyHidden?: boolean;
  thumbStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  value?: string;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input`
  ${HiddenStyles};
`;

const Track = styled<{ checked?: boolean; disabled?: boolean }, 'span'>('span')`
  background: ${magma.colors.neutral07};
  border: 2px solid;
  border-color:  ${magma.colors.neutral05};
  border-radius: 12px;
  cursor: pointer;
  height: 24px;
  position: relative;
  width: 48px;

  ${props =>
    props.checked &&
    css`
      background: ${magma.colors.success02};
      border-color: ${magma.colors.success02};
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${magma.colors.neutral06};
      border-color: ${magma.colors.neutral06};
      cursor: not-allowed;
    `}

  ${HiddenInput}:focus.focus-visible + label & {
      ${FocusStyles}
      outline-offset: 3px;
  }

  &:before { // active state
    background: ${magma.colors.neutral02};
    border-radius: 50%;
    content: '';
    display: block;
    height: 40px;
    left: -12px;
    opacity: 0;
    margin-top: -22px;
    padding: 50%;
    position: absolute;
    top: 50%;
    transform: scale(1);
    transition: opacity 1s, transform 0.25s;
    width: 40px;

    ${props =>
      props.checked &&
      css`
        background: ${magma.colors.success02};
        left: 12px;
      `}
  }

  ${HiddenInput}:not(:disabled):active + label & {
    &:before {
      opacity: 0.4;
      transform: scale(0);
      transition: transform 0s;
    }
  }
`;

const Thumb = styled<{ checked?: boolean; disabled?: boolean }, 'span'>('span')`
  background: ${magma.colors.neutral08};
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.3), 0 0 4px 0 rgba(0, 0, 0, 0.24),
    0 0 5px 0 rgba(0, 0, 0, 0.22);
  border-radius: 100%;
  height: 20px;
  left: 0;
  margin-top: -10px;
  position: absolute;
  top: 50%;
  transition: left 0.25s;
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
      box-shadow: 0 0 0;
    `}
`;

const IconContainer = styled.span`
  color: ${magma.colors.neutral08};
  left: 7px;
  position: absolute;
  margin-top: -11px;
  top: 50%;
`;

const SpanTextLeft = styled.span`
  padding-right: 10px;
`;

const SpanTextRight = styled.span`
  padding-left: 10px;
`;

const renderLabelText = (
  textVisuallyHidden,
  labelText,
  textPosition,
  labelStyle
) => {
  if (textVisuallyHidden) {
    return <HiddenLabelText>{labelText}</HiddenLabelText>;
  }

  return textPosition === ToggleTextPostition.left ? (
    <SpanTextLeft style={labelStyle}>{labelText}</SpanTextLeft>
  ) : (
    <SpanTextRight style={labelStyle}>{labelText}</SpanTextRight>
  );
};

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
        disabled,
        id,
        labelStyle,
        labelText,
        required,
        style,
        textPosition,
        textVisuallyHidden,
        trackStyle,
        thumbStyle
      } = props;

      return (
        <StyledContainer>
          <HiddenInput
            autoFocus={autoFocus}
            id={id}
            checked={value}
            disabled={disabled}
            name={name}
            required={required}
            type="checkbox"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <StyledLabel htmlFor={id} style={style}>
            {textPosition !== ToggleTextPostition.right &&
              renderLabelText(
                textVisuallyHidden,
                labelText,
                ToggleTextPostition.left,
                labelStyle
              )}
            <Track checked={value} disabled={disabled} style={trackStyle}>
              <IconContainer>
                <Icon size={11} type="check" />
              </IconContainer>
              <Thumb checked={value} disabled={disabled} style={thumbStyle} />
            </Track>
            {textPosition === ToggleTextPostition.right &&
              renderLabelText(
                textVisuallyHidden,
                labelText,
                ToggleTextPostition.right,
                labelStyle
              )}
          </StyledLabel>
        </StyledContainer>
      );
    }}
  </CheckboxCore>
);

export default Toggle;
