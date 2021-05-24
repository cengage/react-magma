import * as React from 'react';
import styled from '../../theme/styled';
import {
  inputBaseStyles,
  InputBaseStylesProps,
  InputWrapperStylesProps,
  inputWrapperStyles,
} from '../InputBase';
import { FormField, FormFieldBaseProps } from '../FormField';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface TextareaProps
  extends FormFieldBaseProps,
    React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  isInverse?: boolean;
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

    const theme = React.useContext(ThemeContext);

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
      <FormField
        errorMessage={errorMessage}
        fieldId={id}
        helperMessage={helperMessage}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        labelStyle={labelStyle}
        labelText={labelText}
        style={containerStyle}
      >
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
      </FormField>
    );
  }
);
