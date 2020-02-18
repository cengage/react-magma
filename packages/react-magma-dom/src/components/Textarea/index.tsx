import * as React from 'react';
import styled from '../../theme/styled';
import { baseInputStyles } from '../BaseInput';

import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../utils';

export interface TextareaProps
  extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  containerStyle?: React.CSSProperties;
  errorMessage?: string;
  hasError?: boolean;
  helperMessage?: string;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText?: string;
  testId?: string;
  textareaStyle?: React.CSSProperties;
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
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      isLabelVisuallyHidden,
      isInverse,
      labelStyle,
      labelText,
      testId,
      textareaStyle,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const id = useGenerateId(defaultId);
    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const [value, setValue] = React.useState<{} | string[] | number>(
      props.defaultValue || props.children || ''
    );

    React.useEffect(() => {
      if (props.children) {
        setValue(props.children);
      }
    }, [props.children]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
    }

    return (
      <Container style={containerStyle}>
        {!isLabelVisuallyHidden && (
          <Label isInverse={isInverse} htmlFor={id} style={labelStyle}>
            {labelText}
          </Label>
        )}
        <StyledTextArea
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          aria-label={isLabelVisuallyHidden ? labelText : null}
          data-testid={testId}
          hasError={!!errorMessage}
          id={id}
          isInverse={isInverse}
          onChange={handleChange}
          ref={ref}
          style={textareaStyle}
          theme={theme}
        >
          {value}
        </StyledTextArea>

        <InputMessage
          isInverse={isInverse}
          id={descriptionId}
          isError={!!errorMessage}
        >
          {(errorMessage || helperMessage) && (
            <>{errorMessage ? errorMessage : helperMessage}</>
          )}
        </InputMessage>
      </Container>
    );
  }
);
