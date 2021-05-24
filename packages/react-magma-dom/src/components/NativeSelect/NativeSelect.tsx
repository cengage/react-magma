import * as React from 'react';
import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import { FormField, FormFieldBaseProps } from '../FormField';
import { SelectTriggerButton } from '../Select/SelectTriggerButton';

import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface NativeSelectProps
  extends FormFieldBaseProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  containerStyle?: React.CSSProperties;

  testId?: string;
  optionLabel?: string;
}
const StyledNativeSelect = styled.select`
  ${inputBaseStyles};
  background: inherit;
`;

export const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      disabled,
      errorMessage,
      id: defaultId,
      helperMessage,
      isInverse: isInverseProp,
      labelStyle,
      labelText,
      messageStyle,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const id = useGenerateId(defaultId);

    return (
      <FormField
        data-testid={testId}
        errorMessage={errorMessage}
        fieldId={id}
        labelStyle={labelStyle}
        labelText={labelText}
        isInverse={isInverse}
        helperMessage={helperMessage}
        messageStyle={messageStyle}
        ref={ref}
        style={containerStyle}
      >
        <SelectTriggerButton
          disabled={disabled}
          hasError={!!errorMessage}
          isInverse={isInverse}
          toggleButtonProps={''}
        >
          <StyledNativeSelect
            {...other}
            disabled={disabled}
            id={id}
            isInverse={isInverse}
            theme={theme}
          >
            {children}
          </StyledNativeSelect>
        </SelectTriggerButton>
      </FormField>
    );
  }
);
