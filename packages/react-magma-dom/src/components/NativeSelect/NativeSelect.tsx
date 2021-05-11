import * as React from 'react';
import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import { InputProps } from '../Input';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { SelectTriggerButton } from '../Select/SelectTriggerButton';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { I18nContext } from '../../i18n';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface NativeSelectProps extends InputProps {
  disabled?: boolean;
  hasError?: boolean;
  helperMessage?: React.ReactNode;
  testId?: string;
  isInverse?: boolean;
  optionLabel?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}
const StyledNativeInput = styled.select`
  ${inputBaseStyles};
  background: inherit;
`;

const StyledNativeSelectWrapper = styled.div<{
  isInverse: boolean;
}>``;

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
      labelText,
      messageStyle,
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const i18n = React.useContext(I18nContext);
    const id = useGenerateId(defaultId);

    return (
      <StyledNativeSelectWrapper
        data-testid={props.testId}
        isInverse={isInverse}
        ref={ref}
        style={containerStyle}
        theme={theme}
      >
        <Label htmlFor={id} isInverse={isInverse}>
          {labelText}
        </Label>

        <SelectTriggerButton toggleButtonProps={''} disabled={disabled}>
          <StyledNativeInput
            aria-label={i18n.select.placeholder}
            disabled={disabled}
            isInverse={isInverse}
            theme={theme}
          >
            {children}
          </StyledNativeInput>
        </SelectTriggerButton>
        {(errorMessage || helperMessage) && (
          <InputMessage
            isInverse={isInverse}
            hasError={!!errorMessage}
            style={messageStyle}
          >
            <>{errorMessage ? errorMessage : helperMessage}</>
          </InputMessage>
        )}
      </StyledNativeSelectWrapper>
    );
  }
);
