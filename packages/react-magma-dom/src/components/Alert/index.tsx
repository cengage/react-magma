import * as React from 'react';
import { AlertBase, AlertVariant } from '../AlertBase';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  closeAriaLabel?: string;
  isDismissible?: boolean;
  isInverse?: boolean;
  onDismiss?: () => void;
  ref?: any;
  testId?: string;
  variant?: AlertVariant;
}

export const Alert: React.FunctionComponent<AlertProps> = React.forwardRef(
  (props: AlertProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    return <AlertBase ref={ref} {...props} />;
  }
);
