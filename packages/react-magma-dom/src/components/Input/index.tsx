import * as React from 'react';
import styled from '../../theme/styled';
import { BaseInput, BaseInputProps, InputSize } from '../BaseInput';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { useGenerateId } from '../utils';

export interface InputProps extends BaseInputProps {
  errorMessage?: string;
  helperMessage?: string;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText?: string;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

export const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      inputSize,
      isInverse,
      labelStyle,
      labelText,
      isLabelVisuallyHidden,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    return (
      <Container style={containerStyle}>
        {!isLabelVisuallyHidden && (
          <Label
            isInverse={isInverse}
            htmlFor={id}
            size={inputSize ? inputSize : InputSize.medium}
            style={labelStyle}
          >
            {labelText}
          </Label>
        )}
        <BaseInput
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          aria-label={isLabelVisuallyHidden ? labelText : null}
          hasError={!!errorMessage}
          id={id}
          inputSize={inputSize ? inputSize : InputSize.medium}
          isInverse={isInverse}
          ref={ref}
        >
          {children}
        </BaseInput>

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
