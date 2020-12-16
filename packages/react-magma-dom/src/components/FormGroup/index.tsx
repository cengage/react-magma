import * as React from 'react';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { InputMessage } from '../Input/InputMessage';
import styled from '../../theme/styled';
import { omit, useGenerateId } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';

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
  testId?: string;
}

export interface FormGroupContextInterface {
  descriptionId?: string;
  hasError?: boolean;
  isInverse?: boolean;
}

export const FormGroupContext = React.createContext<FormGroupContextInterface>({
  hasError: false,
  isInverse: false,
});

export const FormGroupLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spaceScale.spacing02};
  width: 100%;
`;

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
      isInverse,
      isTextVisuallyHidden,
      testId,
      children,
      ...rest
    } = props;
    const other = omit(['id'], rest);

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;
    const theme = React.useContext(ThemeContext);

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
            isInverse,
          }}
        >
          {labelText && isTextVisuallyHidden && (
            <HiddenLabel id={id} style={labelStyle}>
              {labelText}
            </HiddenLabel>
          )}

          {labelText && !isTextVisuallyHidden && (
            <FormGroupLabel id={id} style={labelStyle} theme={theme}>
              {labelText}
            </FormGroupLabel>
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
        </FormGroupContext.Provider>
      </div>
    );
  }
);
