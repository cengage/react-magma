import * as React from 'react';
import { AlertBase, AlertVariant } from '../AlertBase';

/**
 * @children required
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text read by screen readers for the close button
   * @default "Close this message"
   */
  closeAriaLabel?: string;
  /**
   * If true, the component will be able to be dismissed and will include a close button
   * @default false
   */
  isDismissible?: boolean;
  isInverse?: boolean;
  /**
   * Action that fires when the close button is clicked (required when isDismissible is true)
   */
  onDismiss?: () => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * The variant of the alert, indicating its function in the UI
   * @default `AlertVariant.info`
   */
  variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    return <AlertBase ref={ref} {...props} />;
  }
);
