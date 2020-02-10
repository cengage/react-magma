import * as React from 'react';
import styled from '../../theme/styled';
import { BaseInputProps, BaseInput } from '../BaseInput';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { useGenerateId } from '../utils';

export interface TextareaProps extends BaseInputProps {
  errorMessage?: string;
  helperMessage?: string;
  isLabelVisuallyHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText?: string;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

export const Textarea: React.FunctionComponent<
  TextareaProps
> = React.forwardRef(
  (props: TextareaProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      children,
      containerStyle,
      errorMessage,
      helperMessage,
      id: defaultId,
      inputStyle,
      isInverse,
      labelStyle,
      labelText,
      isLabelVisuallyHidden,
      type,
      ...other
    } = props;

    const id = useGenerateId(defaultId);
    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

    const [value, setValue] = React.useState<string | string[] | number>(
      props.defaultValue || props.value
    );

    React.useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
        <BaseInput
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          aria-label={isLabelVisuallyHidden ? labelText : null}
          as="textarea"
          hasError={!!errorMessage}
          id={id}
          inputStyle={{ height: '4.5em', padding: '5px 8px 0', ...inputStyle }}
          isInverse={isInverse}
          onChange={handleChange}
          ref={ref}
          value={value ? value : ''}
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
