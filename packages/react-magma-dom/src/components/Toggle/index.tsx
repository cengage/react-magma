import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
import { HiddenStyles } from '../UtilityStyles';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';

enum ToggleTextPostition {
  left = 'left',
  right = 'right'
}

export interface ToggleProps {
  autoFocus?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: () => void;
  onFocus?: () => void;
  id?: string;
  testId?: string;
  labelStyle?: React.CSSProperties;
  labelText: string;
  required?: boolean;
  style?: React.CSSProperties;
  textPosition?: ToggleTextPostition;
  textVisuallyHidden?: boolean;
  theme?: any;
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

const Track = styled.span<{ checked?: boolean; disabled?: boolean }>`
  background: ${props => props.theme.colors.neutral07};
  border: 2px solid;
  border-color: ${props => props.theme.colors.neutral05};
  border-radius: 12px;
  cursor: pointer;
  height: 24px;
  position: relative;
  width: 48px;

  ${props =>
    props.checked &&
    css`
      background: ${props.theme.colors.success02};
      border-color: ${props.theme.colors.success02};
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${props.theme.colors.neutral06};
      border-color: ${props.theme.colors.neutral06};
      cursor: not-allowed;
    `}

  ${HiddenInput}:focus + label & {
    outline: 2px dotted ${props => props.theme.colors.pop03};
    outline-offset: 3px;
  }

  &:before { // active state
    background: ${props => props.theme.colors.neutral02};
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
        background: ${props.theme.colors.success02};
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

const Thumb = styled.span<{ checked?: boolean; disabled?: boolean }>`
  background: ${props => props.theme.colors.neutral08};
  box-shadow: ${props => props.theme.colors.toggleBoxShadow};
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
      background: ${props.theme.colors.neutral05};
      box-shadow: 0 0 0;
    `}
`;

const IconContainer = styled.span`
  color: ${props => props.theme.colors.neutral08};
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
    id={props.id}
    checked={props.checked}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onFocus={props.onFocus}
  >
    {({ id, onBlur, onChange, onFocus, checked }) => {
      const {
        autoFocus,
        disabled,
        labelStyle,
        labelText,
        required,
        style,
        textPosition,
        textVisuallyHidden,
        testId,
        trackStyle,
        thumbStyle,
        value
      } = props;

      return (
        <ThemeContext.Consumer>
          {theme =>
            theme && (
              <StyledContainer>
                <HiddenInput
                  autoFocus={autoFocus}
                  id={id}
                  data-testid={testId}
                  checked={checked}
                  disabled={disabled}
                  name={name}
                  required={required}
                  type="checkbox"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onFocus={onFocus}
                />
                <StyledLabel htmlFor={id} style={style}>
                  {textPosition !== ToggleTextPostition.right &&
                    renderLabelText(
                      textVisuallyHidden,
                      labelText,
                      ToggleTextPostition.left,
                      labelStyle
                    )}
                  <Track
                    checked={checked}
                    disabled={disabled}
                    style={trackStyle}
                    theme={theme}
                  >
                    <IconContainer theme={theme}>
                      <CheckIcon size={11} />
                    </IconContainer>
                    <Thumb
                      checked={checked}
                      disabled={disabled}
                      style={thumbStyle}
                      theme={theme}
                    />
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
            )
          }
        </ThemeContext.Consumer>
      );
    }}
  </CheckboxCore>
);

export default Toggle;
