import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
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

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

const HiddenLegend = styled.legend`
  ${HiddenStyles};
`;

export const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
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
      <StyledFieldset
        {...other}
        // Only use aria-labelledby when labelledById is explicitly provided
        // (for external labeling). When labelText is provided, the legend
        // element provides the accessible name, so aria-labelledby is not needed.
        aria-labelledby={labelledById}
        data-testid={testId}
        ref={ref}
        style={containerStyle}
      >
        <FormGroupContext.Provider
          value={{
            descriptionId,
            hasError: !!errorMessage,
          }}
        >
          {labelText && isTextVisuallyHidden && (
            <HiddenLegend id={id} style={labelStyle}>
              {labelText}
            </HiddenLegend>
          )}

          {labelText && !isTextVisuallyHidden && (
            <Label
              as="legend"
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
      </StyledFieldset>
    );
  }
);
