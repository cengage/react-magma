import * as React from 'react';
import { Alert } from '../Alert';
import { AlertVariant } from '../AlertBase';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

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
        <div>
          <Heading level={3}>{title}</Heading>
          {description && <Paragraph>{description}</Paragraph>}
          {errorMessage && (
            <Alert variant={AlertVariant.danger}>{errorMessage}</Alert>
          )}
        </div>
        <div>{children}</div>
        <div>{actions}</div>
      </>
    );

    return (
      <form ref={ref} data-testid={testId} {...other}>
        {content}
      </form>
    );
  }
);
