import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { CheckIcon, CloseIcon } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { descriptionSuffix, useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { StyledLabel } from '../SelectionControls/StyledLabel';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';

export enum ToggleTextPosition {
  left = 'left', // default
  right = 'right',
}

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, an element is checked (i.e., selected)
   * @default false
   */
  checked?: boolean;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * If true, checkbox is checked on first render
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Content of the error message for toggle. If a value is provided, the component will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * @internal
   */
  hasError?: boolean;
  isInverse?: boolean;
  /**
   * If true, a label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isTextVisuallyHidden?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content for label; can be a node or a string
   */
  labelText: React.ReactNode;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Whether the label appears to the left of the right of the toggle switch
   * @default ToggleTextPosition.left
   */
  textPosition?: ToggleTextPosition;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Style properties for the part of the component that slides back and forth on the track
   */
  thumbStyle?: React.CSSProperties;
  /**
   * Style properties for track on which the toggle thumb slides
   */
  trackStyle?: React.CSSProperties;
}

export function buildIconContainerColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return props.theme.colors.neutral900;
    }

    return props.isChecked
      ? props.theme.colors.neutral300
      : props.theme.colors.neutral100;
  }

  if (props.isInverse) {
    return props.isChecked
      ? props.theme.colors.green400
      : props.theme.colors.neutral1000;
  }

  return props.isChecked
    ? props.theme.colors.green600
    : props.theme.colors.neutral200;
}

function buildToggleBorderColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.85, props.theme.colors.neutral0);
    }

    return props.theme.colors.neutral300;
  }

  if (props.isInverse) {
    if (props.hasError) {
      return props.theme.colors.red500;
    }

    return props.isChecked
      ? props.theme.colors.green400
      : props.theme.colors.neutral400;
  }

  if (props.hasError) {
    return props.theme.colors.danger;
  }
  if (props.isChecked) {
    return props.theme.colors.green600;
  }

  return props.theme.colors.neutral700;
}

function buildToggleBackgroundColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.9, props.theme.colors.neutral900);
    }

    return props.isChecked ? props.theme.colors.neutral300 : 'transparent';
  }

  if (props.hasError) {
    return props.isInverse
      ? props.theme.colors.neutral900
      : props.theme.colors.neutral300;
  }

  if (props.isInverse) {
    return props.isChecked
      ? props.theme.colors.green400
      : props.theme.colors.neutral1000;
  }

  return props.isChecked
    ? props.theme.colors.green600
    : props.theme.colors.neutral200;
}

function buildThumbBackgroundColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral0);
    }

    return props.isChecked
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral300;
  }

  if (props.isChecked) {
    return props.isInverse
      ? props.theme.colors.green900
      : props.theme.colors.neutral0;
  }

  return props.isInverse
    ? props.theme.colors.neutral400
    : props.theme.colors.neutral700;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input`
  ${HiddenStyles};
`;

const Track = styled.span<{
  isChecked?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  background: ${buildToggleBackgroundColor};
  border: 2px solid ${props => buildToggleBorderColor(props)};
  border-radius: 9999px;
  box-shadow: ${props =>
    props.isInverse && props.hasError
      ? `0 0 0 1px ${props.theme.colors.neutral0}`
      : '0 0 0'};
  cursor: pointer;
  height: 28px;
  position: relative;
  width: 48px;

  ${props =>
    props.isChecked &&
    css`
      background: ${buildToggleBackgroundColor(props)};
      border-color: ${buildToggleBorderColor(props)};
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${buildToggleBackgroundColor(props)};
      border-color: ${buildToggleBorderColor(props)};
      cursor: not-allowed;
    `}

  ${HiddenInput}:focus + label & {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 2px;
  }
`;

const Thumb = styled.span<{
  isChecked?: boolean;
  isInverse?: boolean;
  disabled?: boolean;
  theme?: ThemeInterface;
}>`
  background: ${buildThumbBackgroundColor};
  border-radius: 100%;
  height: 20px;
  left: 2px;
  margin-top: -10px;
  position: absolute;
  top: 50%;
  transition: left 0.25s;
  width: 20px;

  ${props =>
    props.isChecked &&
    css`
      left: 22px;
    `}
`;

const IconContainer = styled.span<{
  disabled?: boolean;
  theme?: ThemeInterface;
  isChecked?: boolean;
  isInverse?: boolean;
}>`
  color: ${props => buildIconContainerColor(props)};
  left: 2px;
  position: absolute;
  top: 2px;

  svg {
    display: block;
  }
`;

const SpanTextLeft = styled.span`
  padding-right: 10px;
`;

const SpanTextRight = styled.span`
  padding-left: 10px;
`;

const renderLabelText = (
  isTextVisuallyHidden: boolean,
  labelText: React.ReactNode,
  textPosition: ToggleTextPosition,
  labelStyle: React.CSSProperties
) => {
  if (isTextVisuallyHidden) {
    return <HiddenLabelText>{labelText}</HiddenLabelText>;
  }

  return textPosition === ToggleTextPosition.left ? (
    <SpanTextLeft style={labelStyle}>{labelText}</SpanTextLeft>
  ) : (
    <SpanTextRight style={labelStyle}>{labelText}</SpanTextRight>
  );
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (props, ref) => {
    const {
      containerStyle,
      checked,
      defaultChecked,
      disabled,
      errorMessage,
      id: defaultId,
      isTextVisuallyHidden,
      labelStyle,
      labelText,
      onChange,
      textPosition,
      testId,
      trackStyle,
      thumbStyle,
      ...other
    } = props;
    const [isChecked, updateIsChecked] = React.useState(
      Boolean(defaultChecked) || Boolean(checked)
    );

    const id = useGenerateId(defaultId);
    const isControlled = typeof checked === 'boolean' ? true : false;

    React.useEffect(() => {
      if (typeof checked === 'boolean') {
        updateIsChecked(checked);
      }
    }, [checked]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { checked: targetChecked } = event.target;

      onChange && typeof onChange === 'function' && onChange(event);

      if (!isControlled) {
        updateIsChecked(targetChecked);
      }
    }

    const theme = React.useContext(ThemeContext);
    const context = React.useContext(FormGroupContext);

    const descriptionId = errorMessage ? `${id}${descriptionSuffix}` : null;
    const groupDescriptionId = context.descriptionId;

    const describedBy =
      descriptionId && groupDescriptionId
        ? `${groupDescriptionId} ${descriptionId}`
        : descriptionId
          ? descriptionId
          : groupDescriptionId
            ? groupDescriptionId
            : null;

    const hasError = context.hasError || !!errorMessage;

    const isInverse = useIsInverse(props.isInverse);

    return (
      <>
        <StyledContainer>
          <HiddenInput
            {...other}
            aria-checked={isChecked}
            aria-describedby={describedBy}
            id={id}
            data-testid={testId}
            disabled={disabled}
            checked={isChecked}
            type="checkbox"
            onChange={handleChange}
            ref={ref}
            role="switch"
          />
          <StyledLabel
            htmlFor={id}
            isInverse={isInverse}
            style={containerStyle}
            textColor={!isInverse ? theme.colors.brand.navy : undefined}
          >
            {textPosition !== ToggleTextPosition.right &&
              renderLabelText(
                isTextVisuallyHidden,
                labelText,
                ToggleTextPosition.left,
                labelStyle
              )}
            <Track
              isChecked={isChecked}
              data-testid="toggle-track"
              disabled={disabled}
              hasError={hasError}
              isInverse={isInverse}
              style={trackStyle}
              theme={theme}
            >
              <Thumb
                isChecked={isChecked}
                isInverse={isInverse}
                disabled={disabled}
                style={thumbStyle}
                theme={theme}
              >
                <IconContainer
                  data-testid="toggle-state-icon"
                  disabled={disabled}
                  theme={theme}
                  isInverse={isInverse}
                  isChecked={isChecked}
                >
                  {isChecked ? (
                    <CheckIcon aria-hidden size={theme.iconSizes.xSmall} />
                  ) : (
                    <CloseIcon aria-hidden size={theme.iconSizes.xSmall} />
                  )}
                </IconContainer>
              </Thumb>
            </Track>
            {textPosition === ToggleTextPosition.right &&
              renderLabelText(
                isTextVisuallyHidden,
                labelText,
                ToggleTextPosition.right,
                labelStyle
              )}
          </StyledLabel>
        </StyledContainer>
        {!!errorMessage && (
          <InputMessage
            errorColor={isInverse ? theme.colors.red500 : undefined}
            errorIconColor={isInverse ? theme.colors.red500 : undefined}
            id={descriptionId}
            hasError
            isInverse={isInverse}
          >
            {errorMessage}
          </InputMessage>
        )}
      </>
    );
  }
);
