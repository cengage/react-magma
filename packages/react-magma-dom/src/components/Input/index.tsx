import * as React from 'react';
import { FormField, FormFieldBaseProps } from '../FormField';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface InputProps extends FormFieldBaseProps, InputBaseProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      inputSize = InputSize.medium,
      isLabelVisuallyHidden,
      labelStyle,
      labelText,
      messageStyle,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const isInverse = useIsInverse(props.isInverse);

    return (
      <FormField
        errorMessage={errorMessage}
        fieldId={id}
        helperMessage={helperMessage}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        inputSize={inputSize}
        labelStyle={labelStyle}
        labelText={labelText}
        style={containerStyle}
      >
        <InputBase
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          hasError={!!errorMessage}
          id={id}
          inputSize={inputSize}
          isInverse={isInverse}
          ref={ref}
        >
          {children}
        </InputBase>
      </FormField>
    );
  }
);
