import * as React from 'react';
import styled from '../../theme/styled';
import { InputBase, InputBaseProps, InputSize } from '../InputBase';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { useGenerateId, Omit } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';

export interface InputProps extends Omit<InputBaseProps, 'hasError'> {
  /**
   * Content of the error message. If a value is provided, the input will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message.
   */
  helperMessage?: React.ReactNode;
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
}

const Container = styled.div`
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
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
      isLabelVisuallyHidden,
      labelStyle,
      labelText,
      messageStyle,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    return (
      <Container theme={theme} style={containerStyle}>
        {labelText && (
          <Label
            isInverse={isInverse}
            htmlFor={id}
            size={inputSize || InputSize.medium}
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
          inputSize={inputSize || InputSize.medium}
          isInverse={isInverse}
          ref={ref}
        >
          {children}
        </InputBase>
        <InputMessage
          hasError={!!errorMessage}
          isInverse={isInverse}
          id={descriptionId}
          inputSize={inputSize || InputSize.medium}
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
