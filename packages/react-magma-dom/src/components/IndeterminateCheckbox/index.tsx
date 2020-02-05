import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  CheckboxProps,
  HiddenLabelText,
  HiddenInput,
  StyledFakeInput
} from '../Checkbox';
import { CheckIcon } from '../Icon/types/CheckIcon';
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

const IndeterminateIcon = styled.span<{
  color?: string;
  disabled?: boolean;
  theme?: any;
}>`
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

export const IndeterminateCheckbox: React.FunctionComponent<IndeterminateCheckboxProps> = React.forwardRef(
  (props: IndeterminateCheckboxProps, ref: any) => {
    const [isChecked, updateIsChecked] = React.useState(
      props.status === 'indeterminate'
        ? false
        : Boolean(props.status === 'checked')
    );

    const id = useGenerateId(props.id);

    React.useEffect(() => {
      updateIsChecked(
        props.status === 'indeterminate'
          ? false
          : Boolean(props.status === 'checked')
      );
    }, [props.status]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { checked: targetChecked } = event.target;

      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      if (props.status !== 'indeterminate') {
        updateIsChecked(targetChecked);
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

    return (
      <StyledContainer style={containerStyle}>
        <HiddenInput
          {...other}
          checked={isChecked}
          data-testid={testId}
          disabled={disabled}
          id={id}
          ref={ref}
          type="checkbox"
          onChange={handleChange}
        />
        <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
          <StyledFakeInput
            checked={isChecked}
            color={color ? color : ''}
            disabled={disabled}
            isIndeterminate={status === 'indeterminate'}
            isInverse={isInverse}
            style={inputStyle}
            theme={theme}
          >
            {status === 'indeterminate' && (
              <IndeterminateIcon
                data-testid="indeterminateIcon"
                color={color ? color : ''}
                disabled={disabled}
                theme={theme}
              />
            )}
            {isChecked && <CheckIcon size={12} />}
          </StyledFakeInput>
          {isTextVisuallyHidden ? (
            <HiddenLabelText>{labelText}</HiddenLabelText>
          ) : (
            labelText
          )}
        </StyledLabel>
      </StyledContainer>
    );
  }
);
