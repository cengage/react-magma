import * as React from 'react';
import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { SelectTriggerButton } from '../Select/SelectTriggerButton';

import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface NativeSelectProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize'>,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * @internal
   */
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
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        labelStyle={labelStyle}
        labelText={labelText}
        isInverse={isInverse}
        helperMessage={helperMessage}
        messageStyle={messageStyle}
        ref={ref}
      >
        <SelectTriggerButton
          disabled={disabled}
          hasError={!!errorMessage}
          isInverse={isInverse}
          toggleButtonProps={''}
        >
          <StyledNativeSelect
            {...other}
            data-testid={testId}
            disabled={disabled}
            id={id}
            isInverse={isInverse}
            theme={theme}
          >
            {children}
          </StyledNativeSelect>
        </SelectTriggerButton>
      </FormFieldContainer>
    );
  }
);
