import * as React from 'react';

import { TARGET_ID } from '../SkipLink';

export interface SkipLinkContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export const SkipLinkContent: React.FunctionComponent<SkipLinkContentProps> = props => {
  const { children, testId } = props;
  return (
    <div
      data-testid={testId}
      id={TARGET_ID}
      tabIndex={-1}
      style={{ outline: 0 }}
    >
      {children}
    </div>
  );
};
