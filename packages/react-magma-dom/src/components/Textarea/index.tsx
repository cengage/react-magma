import * as React from 'react';
import { useState } from 'react';
import styled from '../../theme/styled';
import {
  inputBaseStyles,
  InputBaseStylesProps,
  InputWrapperStylesProps,
  inputWrapperStyles,
} from '../InputBase';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId, Omit } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface TextareaProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize' | 'fieldId'>,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  isInverse?: boolean;
  /**
   * A number value which gives Character Counter the maximum length of allowable characters in an Textarea.
   */
  maxCount?: number;
  /**
   * @internal
   */
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
  padding: ${props => props.theme.spaceScale.spacing03};
`;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      containerStyle,
      errorMessage,
      hasCharacterCounter = true,
      helperMessage,
      id: defaultId,
      isLabelVisuallyHidden,
      labelPosition,
      labelStyle,
      labelText,
      labelWidth,
      maxCount,
      maxLength,
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

    const [characterLength, setCharacterLength] = useState(
      props.value?.toString().length
    );

    React.useEffect(() => {
      setValue(props.value);
      setCharacterLength(props.value?.toString().length);
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
      setCharacterLength(event.target.value.length);
    }

    const isInverse = useIsInverse(props.isInverse);

    return (
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        hasCharacterCounter={hasCharacterCounter}
        helperMessage={helperMessage}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        inputLength={characterLength}
        labelStyle={labelStyle}
        labelText={labelText}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
        maxCount={maxCount}
        maxLength={maxLength}
      >
        <StyledTextArea
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          data-testid={testId}
          hasError={
            !!errorMessage ||
            (characterLength > maxCount && hasCharacterCounter) ||
            characterLength > maxLength
          }
          id={id}
          maxLength={
            hasCharacterCounter && maxLength ? props.maxCount : maxLength
          }
          isInverse={isInverse}
          onChange={handleChange}
          ref={ref}
          style={textareaStyle}
          theme={theme}
          value={value}
          width="100%"
        />
      </FormFieldContainer>
    );
  }
);
