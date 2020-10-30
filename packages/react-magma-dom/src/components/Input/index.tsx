import * as React from 'react';
import styled from '../../theme/styled';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';

export interface InputProps extends Omit<InputBaseProps, 'hasError'> {
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText?: React.ReactNode;
  messageStyle?: React.CSSProperties;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
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
        <InputBase
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
        </InputBase>
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
