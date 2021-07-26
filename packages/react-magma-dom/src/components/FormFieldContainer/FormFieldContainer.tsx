import * as React from 'react';
import styled from '@emotion/styled';
import { InputSize } from '../InputBase';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface FormFieldContainerProps
  extends FormFieldContainerBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

export interface FormFieldContainerBaseProps {
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
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  testId?: string;
  isInverse?: boolean;
}

const StyledFormFieldContainer = styled.div<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
`;

export const FormFieldContainer = React.forwardRef<
  HTMLDivElement,
  FormFieldContainerProps
>((props, ref) => {
  const {
    children,
    containerStyle,
    errorMessage,
    fieldId,
    helperMessage,
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
          <Label htmlFor={fieldId} size={inputSize} style={labelStyle}>
            {isLabelVisuallyHidden ? (
              <VisuallyHidden>{labelText}</VisuallyHidden>
            ) : (
              labelText
            )}
          </Label>
        )}
        {children}
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
      </StyledFormFieldContainer>
    </InverseContext.Provider>
  );
});
