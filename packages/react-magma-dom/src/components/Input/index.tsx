import * as React from 'react';
import styled from '../../theme/styled';
import { BaseInput, BaseInputProps, InputSize } from '../BaseInput';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';

export interface InputProps extends BaseInputProps {
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  messageStyle?: React.CSSProperties;
  labelText?: React.ReactNode;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
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
      isLabelVisuallyHidden,
      labelStyle,
      labelText,
      messageStyle,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    return (
      <Container style={containerStyle}>
        {labelText && (
          <Label
            isInverse={isInverse}
            htmlFor={id}
            size={inputSize ? inputSize : InputSize.medium}
            style={labelStyle}
          >
            {isLabelVisuallyHidden ? (
              <HiddenLabelText>{labelText}</HiddenLabelText>
            ) : (
              labelText
            )}
          </Label>
        )}
        <BaseInput
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
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
