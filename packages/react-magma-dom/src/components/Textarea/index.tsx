import * as React from 'react';
import styled from '../../theme/styled';
import { baseInputStyles } from '../BaseInput';
import { HiddenLabelText } from '../Input';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';

export interface TextareaProps
  extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  hasError?: boolean;
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText?: React.ReactNode;
  messageStyle?: React.CSSProperties;
  testId?: string;
  textareaStyle?: React.CSSProperties;
  value?: string | string[] | number;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const StyledTextArea = styled.textarea<TextareaProps>`
  ${baseInputStyles};
  height: 4.5em;
  padding: 5px 8px 0;
`;

export const Textarea: React.FunctionComponent<
  TextareaProps
> = React.forwardRef(
  (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const {
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      isLabelVisuallyHidden,
      isInverse,
      labelStyle,
      labelText,
      messageStyle,
      testId,
      textareaStyle,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const id = useGenerateId(defaultId);
    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const [value, setValue] = React.useState<string | string[] | number>(
      props.defaultValue || props.value || ''
    );

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

    return (
      <Container style={containerStyle}>
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
          isError={!!errorMessage}
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
