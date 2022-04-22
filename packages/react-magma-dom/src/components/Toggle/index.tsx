import * as React from 'react';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { CheckIcon } from 'react-magma-icons';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { css } from '@emotion/core';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export enum ToggleTextPosition {
  left = 'left', // default
  right = 'right',
}

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, element is checked (i.e. selected)
   * @default false
   */
  checked?: boolean;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * If true, checkbox is checked on first render
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
   * If true, label text will be hidden visually, but will still be read by assistive technology
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
  testId?: string;
  /**
   * Whether the label appears to the left of the right of the toggle switch
   * @default ToggleTextPosition.left
   */
  textPosition?: ToggleTextPosition;
  /**
   * @internal
   */
  theme?: any;
  /**
   * Style properties for the part of the component that slides back and forth on the track
   */
  thumbStyle?: React.CSSProperties;
  /**
   * Style properties for track on which the toggle thumb slides
   */
  trackStyle?: React.CSSProperties;
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
  theme?: any;
}>`
  background: ${props => props.theme.colors.neutral04};
  border: 2px solid;
  border-color: ${props =>
    props.hasError ? props.theme.colors.danger : props.theme.colors.neutral04};
  border-radius: 12px;
  box-shadow: ${props =>
    props.isInverse && props.hasError
      ? `0 0 0 1px ${props.theme.colors.neutral08}`
      : '0 0 0'};
  cursor: pointer;
  height: 24px;
  position: relative;
  width: 48px;

  ${props =>
    props.isChecked &&
    css`
      background: ${props.theme.colors.success02};
      border-color: ${props.hasError
        ? props.theme.colors.danger
        : props.theme.colors.success02};
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${props.theme.colors.neutral06};
      border-color: ${props.theme.colors.neutral06};
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

  &:before {
    // active state
    background: ${props => props.theme.colors.neutral};
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
      props.isChecked &&
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

const Thumb = styled.span<{
  isChecked?: boolean;
  disabled?: boolean;
  theme?: any;
}>`
  background: ${props => props.theme.colors.neutral08};
  border-radius: 100%;
  height: 20px;
  left: 0;
  margin-top: -10px;
  position: absolute;
  top: 50%;
  transition: left 0.25s;
  width: 20px;

  ${props =>
    props.isChecked &&
    css`
      left: 24px;
    `}
`;

const IconContainer = styled.span<{ disabled?: boolean; theme?: any }>`
  color: ${props =>
    props.disabled
      ? props.theme.colors.neutral05
      : props.theme.colors.neutral08};
  left: ${props => props.theme.spaceScale.spacing02};
  position: absolute;
  top: ${props => props.theme.spaceScale.spacing01};

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

    const descriptionId = errorMessage ? `${id}__desc` : null;
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
              <IconContainer disabled={disabled} theme={theme}>
                <CheckIcon size={theme.iconSizes.xSmall} />
              </IconContainer>
              <Thumb
                isChecked={isChecked}
                disabled={disabled}
                style={thumbStyle}
                theme={theme}
              />
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
          <InputMessage id={descriptionId} hasError isInverse={isInverse}>
            {errorMessage}
          </InputMessage>
        )}
      </>
    );
  }
);
