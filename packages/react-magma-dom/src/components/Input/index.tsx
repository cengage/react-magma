import * as React from 'react';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';
import { useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';

export interface InputProps
  extends Omit<FormFieldContainerBaseProps, 'fieldId'>,
    InputBaseProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      iconPosition,
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
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        helperMessage={helperMessage}
        iconPosition={iconPosition}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        inputSize={inputSize}
        labelStyle={labelStyle}
        labelText={labelText}
        messageStyle={messageStyle}
      >
        <InputBase
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          hasError={!!errorMessage}
          iconPosition={iconPosition}
          id={id}
          inputSize={inputSize}
          isInverse={isInverse}
          ref={ref}
        >
          {children}
        </InputBase>
      </FormFieldContainer>
    );
  }
);
