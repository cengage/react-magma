import * as React from 'react';
import { FormGroupLabel } from '../FormGroup';
import { HiddenStyles } from '../UtilityStyles';
import styled from '../../theme/styled';
import { omit, useGenerateId } from '../utils';

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  containerStyle?: React.CSSProperties;
  isTextVisuallyHidden?: boolean;
  labelledById?: string;
  labelStyle?: React.CSSProperties;
  labelText?: string;
  name: string;
  testId?: string;
  value?: string;
}

export interface RadioContextInterface {
  name: string;
  selectedValue?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const RadioContext = React.createContext<RadioContextInterface>({
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
    labelledById,
    labelStyle,
    labelText,
    isTextVisuallyHidden,
    testId,
    name,
    children,
    ...rest
  } = props;
  const other = omit(['onBlur', 'onChange', 'onFocus', 'id'], rest);

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
          name,
          selectedValue,
          onBlur: props.onBlur,
          onChange: handleChange,
          onFocus: props.onFocus
        }}
      >
        {isTextVisuallyHidden ? (
          <HiddenLabel id={id} style={labelStyle}>
            {labelText}
          </HiddenLabel>
        ) : (
          <FormGroupLabel id={id} style={labelStyle}>
            {labelText}
          </FormGroupLabel>
        )}
        {children}
      </RadioContext.Provider>
    </div>
  );
};
