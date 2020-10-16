import * as React from 'react';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputBorderColor,
  buildDisplayInputFocusStyles,
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { RadioContext } from '../RadioGroup';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';

export enum RadioTextPosition {
  left = 'left',
  right = 'right', // default
}

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  css?: any; // Adding css prop to fix emotion error
  color?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  isTextVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: React.ReactNode;
  ref?: any;
  testId?: string;
  textPosition?: RadioTextPosition;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input<{ indeterminate?: boolean }>`
  ${HiddenStyles};
`;

const StyledFakeInput = styled.span<{
  checked?: boolean;
  hasError?: boolean;
  isInverse: boolean;
  disabled: boolean;
  color: string;
  textPosition?: RadioTextPosition;
  theme?: any;
}>`
  ${DisplayInputStyles};
  background: ${props => {
    if (props.isInverse) {
      return 'none';
    }
    if (props.disabled) {
      return props.theme.colors.neutral06;
    }
    return props.theme.colors.neutral08;
  }};
  border-color: ${props => buildDisplayInputBorderColor(props)};
  border-radius: 100%;
  box-shadow: ${props =>
    props.isInverse && props.hasError
      ? `0 0 0 1px ${props.theme.colors.neutral08}`
      : '0 0 0'};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: ${props =>
    props.textPosition === 'left' ? '2px 0 0 10px' : '2px 10px 0 0'};

  ${HiddenInput}:checked:not(:disabled) + label & {
    background: ${props => {
      if (props.isInverse) {
        return props.theme.colors.neutral08;
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

const SelectedIcon = styled.span<{ color: string; theme?: any }>`
  background: ${props =>
    props.color ? props.color : props.theme.colors.primary};
  border-radius: 100%;
  display: none;
  height: 10px;
  width: 10px;

  ${HiddenInput}:checked + label & {
    display: block;
  }
`;

export const Radio: React.FunctionComponent<RadioProps> = React.forwardRef(
  (props: RadioProps, ref: any) => {
    const id = useGenerateId(props.id);
    const context = React.useContext(RadioContext);
    const {
      color,
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

    const theme = React.useContext(ThemeContext);

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
            checked={context.selectedValue === value}
            color={color ? color : ''}
            disabled={disabled}
            isInverse={context.isInverse || isInverse}
            hasError={context.hasError}
            style={inputStyle}
            textPosition={textPosition}
            theme={theme}
          >
            <SelectedIcon color={color ? color : ''} theme={theme} />
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
