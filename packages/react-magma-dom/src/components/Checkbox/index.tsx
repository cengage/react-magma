import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, reactNodeToString, useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputBorderColor,
  buildDisplayInputFocusStyles,
} from '../SelectionControls/InputStyles';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { StyledLabel } from '../SelectionControls/StyledLabel';

export enum CheckboxTextPosition {
  left = 'left',
  right = 'right', // default
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, element is checked (i.e. selected)
   * @default false
   */
  checked?: boolean;
  /**
   * Hex code for the background color
   * @default #3942B0 (theme.colors.primary)
   */
  color?: string;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * If true, checkbox is checked on first render
   */
  defaultChecked?: boolean;
  /**
   * If true, element is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Content of the error message for an individual checkbox. If a value is provided, the input will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /*
   * @internal
   */
  hasError?: boolean;
  /**
   * Style properties for the checkbox element
   */
  inputStyle?: React.CSSProperties;
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
   * Content of label; can be node or string
   */
  labelText: React.ReactNode;
  /**
   * Action that fires when selected value of the checkbox changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Whether the label appears to the left of the right of the checkbox
   * @default CheckboxTextPosition.right
   */
  textPosition?: CheckboxTextPosition;
  /**
   * @internal
   */
  hideFocus?: boolean;
}

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

export const HiddenInput = styled.input`
  ${HiddenStyles};
`;

function buildCheckIconColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return props.theme.colors.neutral300;
  }
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  if (props.isChecked || props.isIndeterminate) {
    return props.color;
  }
  return props.theme.colors.neutral700;
}

export const StyledFakeInput = styled.span<{
  isChecked?: boolean;
  color: string;
  disabled?: boolean;
  isIndeterminate?: boolean;
  isInverse?: boolean;
  hasError?: boolean;
  hideFocus?: boolean;
  textPosition?: CheckboxTextPosition;
  theme?: ThemeInterface;
}>`
  ${DisplayInputStyles};
  border: 2px solid;
  border-color: ${props => buildDisplayInputBorderColor(props)};
  color: ${props => buildCheckIconColor(props)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: ${props =>
    props.textPosition === 'left'
      ? `${props.theme.spaceScale.spacing01} 0 0 ${props.theme.spaceScale.spacing03}`
      : `0 ${props.theme.spaceScale.spacing03} 0 0`};

  svg {
    flex-shrink: 0;
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  ${HiddenInput}:focus + label & {
    &:before {
      ${props => !props.hideFocus && buildDisplayInputFocusStyles(props)};
    }
  }

  &:after {
    // active state
    background: ${props => buildDisplayInputActiveBackground(props)};
    top: -10px;
    left: -10px;
  }

  /* prettier-ignore */
  ${HiddenInput}:not(:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }
`;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { checked, id: defaultId, defaultChecked, onChange } = props;
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

    const {
      color = theme.colors.primary,
      containerStyle,
      disabled,
      errorMessage,
      inputStyle,
      labelStyle,
      labelText,
      isTextVisuallyHidden,
      testId,
      textPosition,
      ...rest
    } = props;
    const other = omit(['defaultChecked'], rest);

    const descriptionId = errorMessage && `${id}__desc`;
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
        <StyledContainer additionalContent style={containerStyle}>
          <HiddenInput
            {...other}
            aria-label={reactNodeToString(labelText)}
            aria-describedby={describedBy}
            id={id}
            data-testid={testId}
            checked={isChecked}
            disabled={disabled}
            ref={ref}
            type="checkbox"
            onChange={handleChange}
          />
          <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
            {!isTextVisuallyHidden &&
              textPosition === CheckboxTextPosition.left &&
              labelText}

            <StyledFakeInput
              isChecked={isChecked}
              color={color}
              disabled={disabled}
              hasError={hasError}
              hideFocus={props.hideFocus}
              isInverse={isInverse}
              style={inputStyle}
              textPosition={textPosition}
              theme={theme}
              aria-hidden="true"
            >
              {isChecked ? (
                <CheckBoxIcon size={theme.iconSizes.medium} />
              ) : (
                <CheckBoxOutlineBlankIcon size={theme.iconSizes.medium} />
              )}
            </StyledFakeInput>

            {isTextVisuallyHidden ? (
              <HiddenLabelText>{labelText}</HiddenLabelText>
            ) : (
              textPosition !== CheckboxTextPosition.left &&
              labelText &&
              labelText
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
