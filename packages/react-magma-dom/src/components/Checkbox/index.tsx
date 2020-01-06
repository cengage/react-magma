import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  DisplayInputStyles,
  DisplayInputActiveStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputBorderColor,
  buildDisplayInputFocusStyles
} from '../SelectionControls/InputStyles';
import { HiddenStyles } from '../UtilityStyles';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
// Using the base `styled` from `emotion` until import mapping is fixed: https://github.com/emotion-js/emotion/pull/1220
// import styled from '../../theme/styled';
import styled from '@emotion/styled';
import { useGenerateId } from '../utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
  containerStyle?: React.CSSProperties;
  indeterminate?: boolean;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  onIndeterminateClick?: (event: React.SyntheticEvent) => void;
  testId?: string;
  textVisuallyHidden?: boolean;
}

const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

const HiddenInput = styled.input<{ indeterminate?: boolean }>`
  ${HiddenStyles};
`;

export function buildCheckboxBackground(props) {
  if (props.inverse) {
    if (props.checked || props.indeterminate) {
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

const StyledFakeInput = styled.span<{
  inverse: boolean;
  checked: boolean;
  disabled: boolean;
  color: string;
  indeterminate?: boolean;
}>`
  ${DisplayInputStyles};
  background: ${props => buildCheckboxBackground(props)};
  border-color: ${props => buildDisplayInputBorderColor(props)};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    display: ${props => (props.checked && !props.disabled ? 'block' : 'none')};
    fill: ${props =>
      props.inverse
        ? props.color
          ? props.color
          : props.theme.colors.primary
        : props.theme.colors.neutral08};
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

const IndeterminateIcon = styled.span<{ color?: string }>`
  background: ${props =>
    props.color ? props.color : props.theme.colors.primary};
  height: 2px;
  width: 10px;
  display: block;
`;

export const Checkbox: React.FunctionComponent<CheckboxProps> = (
  props: CheckboxProps
) => {
  const [isChecked, updateIsChecked] = React.useState(
    props.indeterminate ? false : Boolean(props.checked)
  );

  const id = useGenerateId(props.id);

  React.useEffect(() => {
    updateIsChecked(props.indeterminate ? false : Boolean(props.checked));
  }, [props.checked]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked: targetChecked } = event.target;

    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);

    if (!indeterminate) {
      updateIsChecked(targetChecked);
    }
  }

  const theme = React.useContext(ThemeContext);

  const {
    color,
    containerStyle,
    disabled,
    indeterminate,
    inputStyle,
    inverse,
    labelStyle,
    labelText,
    textVisuallyHidden,
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
        indeterminate={indeterminate}
        type="checkbox"
        onChange={handleChange}
      />
      <StyledLabel htmlFor={id} inverse={inverse} style={labelStyle}>
        <StyledFakeInput
          checked={isChecked}
          color={color ? color : ''}
          disabled={disabled}
          indeterminate={indeterminate}
          inverse={inverse}
          style={inputStyle}
          theme={theme}
        >
          {indeterminate && (
            <IndeterminateIcon
              data-testid="indeterminateIcon"
              color={color ? color : ''}
              theme={theme}
            />
          )}
          <CheckIcon size={12} />
        </StyledFakeInput>
        {textVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}
      </StyledLabel>
    </StyledContainer>
  );
};
