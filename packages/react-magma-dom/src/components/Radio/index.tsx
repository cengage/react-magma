import * as React from 'react';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputFocusStyles,
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { RadioContext } from '../RadioGroup';
import {
  RadioButtonCheckedIcon,
  RadioButtonUncheckedIcon,
} from 'react-magma-icons';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { transparentize } from 'polished';

export enum RadioTextPosition {
  left = 'left',
  right = 'right', // default
}

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * @internal
   */
  css?: any; // Adding css prop to fix emotion error
  /**
   * Hex code for the background color
   * @default theme.colors.primary
   */
  color?: string;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Style properties for the radio button element
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
   * @internal
   */
  testId?: string;
  /**
   * Whether the label appears to the left of the right of the radio button
   * @default RadioTextPosition.right
   */
  textPosition?: RadioTextPosition;
}

const HiddenLabelText = styled('span')`
  ${HiddenStyles};
`;

const HiddenInput = styled('input')<{ indeterminate?: boolean }>`
  ${HiddenStyles};
`;

function buildRadioIconColor(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return props.theme.colors.neutral300;
  }
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  if (props.isChecked) {
    return props.color;
  }
  return props.theme.colors.neutral700;
}

export function buildErrorBorder(props) {
  if (props.hasError) {
    if (props.isInverse) {
      return `0 0 0 2px ${props.theme.colors.danger200}`;
    }
    return `0 0 0 2px ${props.theme.colors.danger}`;
  }
  return `inherit`;
}

const StyledFakeInput = styled('span')<{
  isChecked?: boolean;
  hasError?: boolean;
  isInverse: boolean;
  disabled: boolean;
  color: string;
  textPosition?: RadioTextPosition;
  theme?: any;
}>`
  ${DisplayInputStyles};
  color: ${props => buildRadioIconColor(props)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: ${props =>
    props.textPosition === 'left'
      ? `0 0 0 ${props.theme.spaceScale.spacing03}`
      : `0 ${props.theme.spaceScale.spacing03} 0 0`};
  box-shadow: ${buildErrorBorder};

  ${HiddenInput}:checked:not (:disabled) + label & {
    background: ${props => {
      if (props.isInverse) {
        return props.theme.colors.neutral100;
      }
    }};
  }

  ${HiddenInput}:focus + label & {
    // focus state
    &:before {
      ${props => buildDisplayInputFocusStyles(props)};
    }
  }

  &:after {
    // active state
    background: ${props => buildDisplayInputActiveBackground(props)};
  }

  ${HiddenInput}:not(:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }
`;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const id = useGenerateId(props.id);
    const context = React.useContext(RadioContext);
    const theme = React.useContext(ThemeContext);
    const {
      color = theme.colors.primary,
      containerStyle,
      disabled,
      inputStyle,
      isInverse,
      isTextVisuallyHidden,
      labelStyle,
      labelText,
      required,
      testId,
      textPosition,
      value,
      ...other
    } = props;

    return (
      <StyledContainer style={containerStyle}>
        <HiddenInput
          {...other}
          aria-labelledby={context.descriptionId}
          id={id}
          ref={ref}
          checked={context.selectedValue === value}
          data-testid={testId}
          disabled={disabled}
          name={context.name}
          required={context.required || required}
          type="radio"
          value={value}
          onBlur={context.onBlur}
          onChange={context.onChange}
          onFocus={context.onFocus}
        />
        <StyledLabel
          htmlFor={id}
          isInverse={context.isInverse || isInverse}
          style={labelStyle}
        >
          {!isTextVisuallyHidden &&
            textPosition === RadioTextPosition.left &&
            labelText}

          <StyledFakeInput
            isChecked={context.selectedValue === value}
            color={color}
            disabled={disabled}
            isInverse={context.isInverse || isInverse}
            hasError={context.hasError}
            style={inputStyle}
            textPosition={textPosition}
            theme={theme}
          >
            {context.selectedValue === value ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </StyledFakeInput>
          {isTextVisuallyHidden ? (
            <HiddenLabelText>{labelText}</HiddenLabelText>
          ) : (
            textPosition !== RadioTextPosition.left && labelText && labelText
          )}
        </StyledLabel>
      </StyledContainer>
    );
  }
);
