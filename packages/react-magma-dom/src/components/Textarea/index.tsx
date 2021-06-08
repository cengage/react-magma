import * as React from 'react';
import styled from '../../theme/styled';
import {
  inputBaseStyles,
  InputBaseStylesProps,
  InputWrapperStylesProps,
  inputWrapperStyles,
} from '../InputBase';
import { HiddenLabelText } from '../Input';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface TextareaProps
  extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the input will be styled as an error state, and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
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
  /**
   * Style properties for the textarea element
   */
  textareaStyle?: React.CSSProperties;
  /**
   * Value for the textarea
   */
  value?: string | ReadonlyArray<string> | number;
}

const Container = styled.div`
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
`;

const StyledTextArea = styled.textarea<
  InputWrapperStylesProps & InputBaseStylesProps
>`
  ${inputBaseStyles};
  ${inputWrapperStyles};
  height: 4.5em;
  padding: ${props =>
    `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing03}`};
`;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      isLabelVisuallyHidden,
      labelStyle,
      labelText,
      messageStyle,
      testId,
      textareaStyle,
      ...other
    } = props;

    const { theme } = React.useContext(ThemeContext);

    const id = useGenerateId(defaultId);
    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const [value, setValue] = React.useState<
      string | ReadonlyArray<string> | number
    >(props.defaultValue || props.value || '');

    React.useEffect(() => {
      if (props.value) {
        setValue(props.value);
      }
    }, [props.value]);
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
    }

    const isInverse = useIsInverse(props.isInverse);

    return (
      <Container style={containerStyle} theme={theme}>
        <Label isInverse={isInverse} htmlFor={id} style={labelStyle}>
          {isLabelVisuallyHidden ? (
            <HiddenLabelText>{labelText}</HiddenLabelText>
          ) : (
            labelText
          )}
        </Label>
        <StyledTextArea
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          data-testid={testId}
          hasError={!!errorMessage}
          id={id}
          isInverse={isInverse}
          onChange={handleChange}
          ref={ref}
          style={textareaStyle}
          theme={theme}
          value={value}
        />

        <InputMessage
          isInverse={isInverse}
          id={descriptionId}
          hasError={!!errorMessage}
          style={messageStyle}
        >
          {(errorMessage || helperMessage) && (
            <>{errorMessage ? errorMessage : helperMessage}</>
          )}
        </InputMessage>
      </Container>
    );
  }
);
