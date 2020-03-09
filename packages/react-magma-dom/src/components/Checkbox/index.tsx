import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputBorderColor,
  buildDisplayInputFocusStyles
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled from '@emotion/styled';
import { useGenerateId } from '../../utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  isTextVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  ref?: any;
  testId?: string;
}

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

export const HiddenInput = styled.input`
  ${HiddenStyles};
`;

export function buildCheckboxBackground(props) {
  if (props.isInverse) {
    if (
      (props.checked && !props.disabled) ||
      (props.isIndeterminate && !props.disabled)
    ) {
      return props.theme.colors.neutral08;
    }
    return 'none';
  }
  if (props.disabled) {
    return props.theme.colors.neutral06;
  }
  if (props.checked) {
    return props.color ? props.color : props.theme.colors.primary;
  }
  return props.theme.colors.neutral08;
}

export function buildCheckIconColor(props) {
  if (props.disabled) {
    return props.theme.colors.disabledText;
  }
  if (props.isInverse) {
    if (props.color) {
      return props.color;
    }
    return props.theme.colors.primary;
  }
  return props.theme.colors.neutral08;
}

export const StyledFakeInput = styled.span<{
  checked?: boolean;
  color: string;
  disabled?: boolean;
  isIndeterminate?: boolean;
  isInverse?: boolean;
}>`
  ${DisplayInputStyles};
  background: ${props => buildCheckboxBackground(props)};
  border-color: ${props => buildDisplayInputBorderColor(props)};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    display: ${props => (props.checked ? 'block' : 'none')};
    fill: ${props => buildCheckIconColor(props)};
    opacity: ${props => (props.checked ? '1' : '0')};
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  ${HiddenInput}:focus + label & {
    &:before {
      ${props => buildDisplayInputFocusStyles(props)};
    }
  }

  &:after {
    // active state
    background: ${props => buildDisplayInputActiveBackground(props)};
  }

  /* prettier-ignore */
  ${HiddenInput}:not(:disabled):active + label & {
    &:after {
      ${DisplayInputActiveStyles}
    }
  }
`;

export const Checkbox: React.FunctionComponent<
  CheckboxProps
> = React.forwardRef((props: CheckboxProps, ref: any) => {
  const [isChecked, updateIsChecked] = React.useState(Boolean(props.checked));

  const id = useGenerateId(props.id);

  React.useEffect(() => {
    updateIsChecked(Boolean(props.checked));
  }, [props.checked]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked: targetChecked } = event.target;

    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);

    updateIsChecked(targetChecked);
  }

  const theme = React.useContext(ThemeContext);

  const {
    color,
    containerStyle,
    disabled,
    inputStyle,
    isInverse,
    labelStyle,
    labelText,
    isTextVisuallyHidden,
    testId,
    ...other
  } = props;

  return (
    <StyledContainer style={containerStyle}>
      <HiddenInput
        {...other}
        id={id}
        data-testid={testId}
        checked={isChecked}
        disabled={disabled}
        ref={ref}
        type="checkbox"
        onChange={handleChange}
      />
      <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
        <StyledFakeInput
          checked={isChecked}
          color={color ? color : ''}
          disabled={disabled}
          isInverse={isInverse}
          style={inputStyle}
          theme={theme}
        >
          <CheckIcon size={12} />
        </StyledFakeInput>
        {isTextVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}
      </StyledLabel>
    </StyledContainer>
  );
});
