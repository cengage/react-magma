import * as React from 'react';
import styled from '../../theme/styled';
import { InputIconPosition, InputSize } from '../InputBase';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * Interal use only: Wrapper for all field components
 * @children required
 */
export interface FormFieldContainerProps
  extends FormFieldContainerBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

export interface FormFieldContainerBaseProps {
  /**
   * Is the wrapped input hidden with display:none? This would make the input look like an actionable item, so FormFieldContainer uses a span in lieu of a label.
   */
  actionable?: boolean;
  /**
   * Style properties for the outer container
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the field will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * ID of the form field.  Also used in the descrption ID.
   */
  fieldId: string;
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
  /**
   * Position within the component for the icon to appear
   * @default InputIconPosition.right
   */
  iconPosition?: InputIconPosition;
  /**
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * @internal
   */
  testId?: string;
  isInverse?: boolean;
}

const StyledFormFieldContainer = styled.div<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
`;

export const FormFieldContainer = React.forwardRef<
  HTMLDivElement,
  FormFieldContainerProps
>((props, ref) => {
  const {
    actionable = true,
    children,
    containerStyle,
    errorMessage,
    fieldId,
    helperMessage,
    iconPosition,
    inputSize,
    isInverse: isInverseProp,
    isLabelVisuallyHidden,
    labelStyle,
    labelText,
    messageStyle,
    testId,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  const descriptionId =
    errorMessage || helperMessage ? `${fieldId}__desc` : null;

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledFormFieldContainer
        {...rest}
        data-testid={props.testId}
        isInverse={isInverse}
        ref={ref}
        style={containerStyle}
        theme={theme}
      >
        {labelText && (
          <Label
            actionable={actionable}
            htmlFor={fieldId}
            iconPosition={iconPosition}
            size={inputSize}
            style={labelStyle}
          >
            {isLabelVisuallyHidden ? (
              <VisuallyHidden>{labelText}</VisuallyHidden>
            ) : (
              labelText
            )}
          </Label>
        )}
        {children}
        {(errorMessage || helperMessage) && (
          <InputMessage
            hasError={!!errorMessage}
            id={descriptionId}
            isInverse={isInverse}
            style={messageStyle}
          >
            {(errorMessage || helperMessage) && (
              <>{errorMessage ? errorMessage : helperMessage}</>
            )}
          </InputMessage>
        )}
      </StyledFormFieldContainer>
    </InverseContext.Provider>
  );
});
