import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  Checkbox,
  CheckboxProps,
  HiddenLabelText,
  HiddenInput,
  StyledFakeInput
} from '../Checkbox';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled from '@emotion/styled';
import { useGenerateId, Omit } from '../utils';

export interface IndeterminateCheckboxProps
  extends Omit<CheckboxProps, 'checked'> {
  status: string;
}

export enum IndeterminateCheckboxStatus {
  checked = 'checked',
  indeterminate = 'indeterminate',
  unchecked = 'unchecked' //default
}

const IndeterminateIcon = styled.span<{ color?: string; disabled?: boolean }>`
  background: ${props =>
    props.disabled
      ? props.theme.colors.disabledText
      : props.color
      ? props.color
      : props.theme.colors.primary};
  height: 2px;
  width: 10px;
  display: block;
`;

export const IndeterminateCheckbox: React.FunctionComponent<
  IndeterminateCheckboxProps
> = React.forwardRef((props: IndeterminateCheckboxProps) => {
  const [isChecked, updateIsChecked] = React.useState(
    props.status === 'indeterminate'
      ? false
      : Boolean(props.status === 'checked')
  );

  const id = useGenerateId(props.id);
  const ref = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    updateIsChecked(
      props.status === 'indeterminate'
        ? false
        : Boolean(props.status === 'checked')
    );
  }, [props.status === 'checked']);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked: targetChecked } = event.target;
    const isFocused = ref.current === document.activeElement ? true : false;

    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);

    if (props.status !== 'indeterminate') {
      updateIsChecked(targetChecked);
    }

    if (isFocused) {
      setTimeout(() => {
        ref.current.focus();
      }, 0);
    }
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
    status,
    testId,
    ...other
  } = props;

  return status === 'indeterminate' ? (
    <StyledContainer style={containerStyle}>
      <HiddenInput
        {...other}
        checked={false}
        id={id}
        data-testid={testId}
        disabled={disabled}
        ref={ref}
        type="checkbox"
        onChange={handleChange}
      />
      <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
        <StyledFakeInput
          color={color ? color : ''}
          disabled={disabled}
          indeterminate
          isInverse={isInverse}
          style={inputStyle}
          theme={theme}
        >
          <IndeterminateIcon
            data-testid="indeterminateIcon"
            color={color ? color : ''}
            disabled={disabled}
            theme={theme}
          />
        </StyledFakeInput>
        {isTextVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}
      </StyledLabel>
    </StyledContainer>
  ) : (
    <Checkbox
      {...other}
      checked={isChecked}
      color={color ? color : ''}
      disabled={disabled}
      labelText={labelText}
      id={id}
      isInverse={isInverse}
      onChange={handleChange}
      ref={ref}
      style={inputStyle}
      testId={testId}
    />
  );
});
