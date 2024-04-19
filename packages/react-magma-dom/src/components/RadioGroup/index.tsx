import * as React from 'react';
import { Label } from '../Label';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { InputMessage } from '../Input/InputMessage';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';

import { omit, useGenerateId } from '../../utils';
import styled from '@emotion/styled';

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

/**
 * @children required
 */
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action that fires when the radio group loses focus
   */
  onBlur?: (event?: React.FocusEvent) => void;
  /**
   * Action that fires when selected value of the radio group changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Action that fires when one of the radio buttons within the group receives focus
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the radio buttons will be styled to show an error state
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  /**
   * If true, label text for the radio group will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isTextVisuallyHidden?: boolean;
  /**
   * ID of the element that labels the radio group, used in the aria-labelledby attribute for the group. Alternatively, the labelText prop can be used
   */
  labelledById?: string;
  /**
   * Style properties for the label of the radio group
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content of label of the radio group; can be node or string. Alternatively, the labelledById prop can be used
   */
  labelText?: React.ReactNode;
  /**
   * Name attribute the radio group
   */
  name: string;
  /**
   * If true, the user must select one radio button for the form to be valid
   * @default false
   */
  required?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Value of the radio button that is the default selected value for the group
   */
  value?: string;
}

export interface RadioContextInterface {
  descriptionId?: string;
  hasError?: boolean;
  isInverse?: boolean;
  required?: boolean;
  name: string;
  selectedValue?: string;
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent) => void;
}

export const RadioContext = React.createContext<RadioContextInterface>({
  hasError: false,
  name: 'defaultName',
});

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const id = useGenerateId(props.id);
    const [selectedValue, setSelectedValue] = React.useState<string>(
      props.value
    );

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
      required,
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

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    return (
      <div
        {...other}
        aria-labelledby={labelledById ? labelledById : id}
        style={containerStyle}
        data-testid={testId}
        ref={ref}
        role="radiogroup"
      >
        <RadioContext.Provider
          value={{
            descriptionId,
            hasError: !!errorMessage,
            isInverse,
            required,
            name,
            selectedValue,
            onBlur: props.onBlur,
            onChange: handleChange,
            onFocus: props.onFocus,
          }}
        >
          {labelText && isTextVisuallyHidden && (
            <HiddenLabel id={id} style={labelStyle}>
              {labelText}
            </HiddenLabel>
          )}

          {labelText && !isTextVisuallyHidden && (
            <Label
              actionable={false}
              id={id}
              style={labelStyle}
              isInverse={isInverse}
              theme={theme}
            >
              {labelText}
            </Label>
          )}
          {children}

          <InputMessage
            id={descriptionId}
            hasError={!!errorMessage}
            isInverse={isInverse}
          >
            {(errorMessage || helperMessage) && (
              <>{errorMessage ? errorMessage : helperMessage}</>
            )}
          </InputMessage>
        </RadioContext.Provider>
      </div>
    );
  }
);
