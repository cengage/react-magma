import * as React from 'react';
import { AlertBase, AlertVariant } from '../AlertBase';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  closeAriaLabel?: string;
  isDismissible?: boolean;
  isInverse?: boolean;
  onDismiss?: () => void;
  testId?: string;
  variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    return <AlertBase ref={ref} {...props} />;
  }
);
