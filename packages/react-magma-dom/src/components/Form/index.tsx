import * as React from 'react';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
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
  title: string;
  /**
   * Handler for form submission
   */
  testId?: string;
}

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    const {
      title,
      description,
      errorMessage,
      actions,
      children,
      testId,
      ...other
    } = props;

    const content = (
      <>
        <Heading level={3}>{title}</Heading>
        {description && <Paragraph>{description}</Paragraph>}
        {errorMessage && (
          <Alert variant={AlertVariant.danger}>{errorMessage}</Alert>
        )}
        <div>{children}</div>
        <ActionsContainer>{actions}</ActionsContainer>
      </>
    );

    return (
      <form ref={ref} data-testid={testId} {...other}>
        {content}
      </form>
    );
  }
);
