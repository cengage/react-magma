import * as React from 'react';
import styled from '../../theme/styled';
import { CharacterCounter } from '../CharacterCounter';
import { InputIconPosition, InputSize } from '../InputBase';
import { InputMessage } from '../Input/InputMessage';
import { Label, LabelPosition } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * Internal use only: Wrapper for all field components
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
   * Position within the component for the icon to appear
   * @default InputIconPosition.right
   */
  iconPosition?: InputIconPosition;
  /**
   * Total number of characters in an input.
   */
  inputLength?: number;
  /**
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  isInverse?: boolean;
  /**
   * Position within the component for the label to appear
   * @default LabelPosition.top
   */
  labelPosition?: LabelPosition;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content for label; can be a node or a string
   */
  labelText?: React.ReactNode;
  /**
   * If the labelPosition value is 'left' then Input labels have a specified width in percentage, otherwise no width is set.
   */
  labelWidth?: number;
  /**
   * Enables the Character Counter and sets the maximum amount of characters allowed within the Input.
   */
  maxLength?: number;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;
  /**
   * @internal
   */
  testId?: string;
}

const StyledFormFieldContainer = styled.div<{
  isInverse?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: number;
  inputSize?: InputSize;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  display: ${props =>
    props.labelPosition === LabelPosition.left ? 'flex' : ''};
  label {
    flex-basis: ${props =>
      props.labelWidth && props.labelPosition === LabelPosition.left
        ? `${props.labelWidth}%`
        : ''};
    margin-top: ${props => (props.inputSize === 'large' ? '19px' : '')};
  }
`;

// Input and helper text <div> wrapper based on labelPosition.
const StyledInputWrapper = styled.div`
  flex: 1 1 auto;
`;

// If the labelPosition is set to 'left' then a <div> wraps the Input, errorMessage, helperMessage, and CharacterCounter for proper styling alignment.
function InputPositionWrapper(props) {
  if (props.labelPosition === LabelPosition.left) {
    return <StyledInputWrapper>{props.children}</StyledInputWrapper>;
  }
  return props.children;
}

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
    inputLength,
    isInverse: isInverseProp,
    isLabelVisuallyHidden,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    maxLength,
    messageStyle,
    testId,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  const descriptionId =
    errorMessage || helperMessage || maxLength ? `${fieldId}__desc` : null;

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledFormFieldContainer
        {...rest}
        data-testid={testId}
        isInverse={isInverse}
        inputSize={inputSize}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
        ref={ref}
        style={containerStyle}
        theme={theme}
      >
        {labelText && (
          <Label
            actionable={actionable}
            htmlFor={fieldId}
            iconPosition={iconPosition}
            labelPosition={labelPosition}
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
        <InputPositionWrapper
          labelPosition={labelPosition}
          labelWidth={labelWidth}
        >
          {children}
          {typeof maxLength === 'number' && (
            <CharacterCounter
              id={descriptionId}
              inputLength={inputLength}
              isInverse={isInverse}
              maxLength={maxLength}
              testId={testId && `${testId}-character-counter`}
            />
          )}

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
        </InputPositionWrapper>
      </StyledFormFieldContainer>
    </InverseContext.Provider>
  );
});
