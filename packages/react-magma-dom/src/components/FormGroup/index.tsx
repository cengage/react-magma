import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';

/**
 * @children required
 */
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the form fields will be styled to show an error state
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  /**
   * If true, label text for the form group will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isTextVisuallyHidden?: boolean;
  /**
   * ID of the element that labels the form group, used in the aria-labelledby attribute for the group. Alternatively, the labelText prop can be used
   */
  labelledById?: string;
  /**
   * Style properties for the label of the form group
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content of label for form group; can be a node or a string. Alternatively, the labelledById prop can be used
   */
  labelText?: React.ReactNode;
  /**
   * @internal
   */
  testId?: string;
}

export interface FormGroupContextInterface {
  descriptionId?: string;
  hasError?: boolean;
}

export const FormGroupContext = React.createContext<FormGroupContextInterface>({
  hasError: false,
});

const HiddenLabel = styled.label`
  ${HiddenStyles};
`;

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (props, ref) => {
    const id = useGenerateId(props.id);

    const {
      containerStyle,
      errorMessage,
      helperMessage,
      labelledById,
      labelStyle,
      labelText,
      isTextVisuallyHidden,
      testId,
      children,
      ...rest
    } = props;
    const other = omit(['id'], rest);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(props.isInverse);

    return (
      <div
        {...other}
        aria-labelledby={labelledById ? labelledById : id}
        data-testid={testId}
        ref={ref}
        role="group"
        style={containerStyle}
      >
        <FormGroupContext.Provider
          value={{
            descriptionId,
            hasError: !!errorMessage,
          }}
        >
          {labelText && isTextVisuallyHidden && (
            <HiddenLabel id={id} style={labelStyle}>
              {labelText}
            </HiddenLabel>
          )}

          {labelText && !isTextVisuallyHidden && (
            <Label
              id={id}
              isInverse={isInverse}
              style={labelStyle}
              theme={theme}
            >
              {labelText}
            </Label>
          )}
          {children}

          {(errorMessage || helperMessage) && (
            <InputMessage
              id={descriptionId}
              hasError={!!errorMessage}
              isInverse={isInverse}
            >
              {errorMessage ? errorMessage : helperMessage}
            </InputMessage>
          )}
        </FormGroupContext.Provider>
      </div>
    );
  }
);
