import * as React from 'react';
import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { SelectTriggerButton } from '../Select/SelectTriggerButton';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/ThemeInterface';
import { useIsInverse } from '../../inverse';
import { I18nContext } from '../../i18n';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the input will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Content of the helper message.
   */
  helperMessage?: React.ReactNode;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content for label; can be a node or a string
   */
  labelText?: React.ReactNode;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;

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
      ...other
    } = props;
    const { theme } = React.useContext(ThemeContext);
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

        <SelectTriggerButton
          disabled={disabled}
          hasError={!!errorMessage}
          isInverse={isInverse}
          toggleButtonProps={''}
        >
          <StyledNativeInput
            {...other}
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
