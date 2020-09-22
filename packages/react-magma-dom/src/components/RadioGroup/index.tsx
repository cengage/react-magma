import * as React from 'react';
import { FormGroupLabel } from '../FormGroup';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { InputMessage } from '../Input/InputMessage';

import styled from '../../theme/styled';
import { omit, useGenerateId } from '../../utils';

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  isRequired?: boolean;
  isTextVisuallyHidden?: boolean;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: React.ReactNode;
  name: string;
  required?: boolean;
  testId?: string;
  value?: string;
}

export interface RadioContextInterface {
  hasError?: boolean;
  isInverse?: boolean;
  isRequired?: boolean;
  name: string;
  selectedValue?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface>({
  hasError: false,
  name: 'defaultName'
});

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (
  props: RadioGroupProps
) => {
  const id = useGenerateId(props.id);
  const [selectedValue, setSelectedValue] = React.useState<string>(props.value);

  React.useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newSelectedValue } = event.target;
    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);
    setSelectedValue(newSelectedValue);
  }

  const {
    containerStyle,
    errorMessage,
    helperMessage,
    isInverse,
    isRequired,
    isTextVisuallyHidden,
    labelledById,
    labelStyle,
    labelText,
    testId,
    name,
    children,
    ...rest
  } = props;
  const other = omit(['onBlur', 'onChange', 'onFocus', 'id'], rest);

  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

  return (
    <div
      {...other}
      aria-labelledby={labelledById ? labelledById : id}
      style={containerStyle}
      data-testid={testId}
      role="radiogroup"
    >
      <RadioContext.Provider
        value={{
          hasError: !!errorMessage,
          isInverse,
          isRequired,
          name,
          selectedValue,
          onBlur: props.onBlur,
          onChange: handleChange,
          onFocus: props.onFocus
        }}
      >
        {labelText && isTextVisuallyHidden && (
          <HiddenLabel id={id} style={labelStyle}>
            {labelText}
          </HiddenLabel>
        )}

        {labelText && !isTextVisuallyHidden && (
          <FormGroupLabel id={id} style={labelStyle}>
            {labelText}
          </FormGroupLabel>
        )}
        {children}

        <InputMessage
          id={descriptionId}
          isError={!!errorMessage}
          isInverse={isInverse}
        >
          {(errorMessage || helperMessage) && (
            <>{errorMessage ? errorMessage : helperMessage}</>
          )}
        </InputMessage>
      </RadioContext.Provider>
    </div>
  );
};
