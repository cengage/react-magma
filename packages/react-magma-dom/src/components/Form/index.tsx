import * as React from 'react';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext } from '../../inverse';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /**
   * React Node containing the form action buttons; will appear under the form fields
   */
  actions: React.ReactNode;
  /**
   * General description of the form
   */
  description?: string;
  /**
   * Additional form level validation message
   */
  errorMessage?: string;
  /**
   * Title of the form
   */
  header: string;
  isInverse?: boolean;
  /**
   * Handler for form submission
   */
  testId?: string;
}

const StyledForm = styled.form<{ isInverse?: boolean; theme: ThemeInterface }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  padding: ${props =>
    `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing06}`};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    const {
      actions,
      children,
      header,
      description,
      errorMessage,
      isInverse,
      testId,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledForm
          ref={ref}
          data-testid={testId}
          isInverse={isInverse}
          theme={theme}
          {...other}
        >
          <Heading level={3}>{header}</Heading>
          {description && <Paragraph>{description}</Paragraph>}
          {errorMessage && (
            <Alert variant={AlertVariant.danger}>{errorMessage}</Alert>
          )}
          <div>{children}</div>
          <FormActions>{actions}</FormActions>
        </StyledForm>
      </InverseContext.Provider>
    );
  }
);
