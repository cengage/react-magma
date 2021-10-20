import * as React from 'react';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { InverseContext, useIsInverse } from '../../inverse';
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

const StyledForm = styled.form<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse ? 'var(--colors-foundation)' : 'var(--colors-neutral08)'};
  color: ${props =>
    props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral)'};
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
      testId,
      ...other
    } = props;

    const isInverse = useIsInverse(props.isInverse);

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
