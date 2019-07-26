import * as React from 'react';

import { TARGET_ID } from '../SkipLink';

export interface SkipLinkContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SkipLinkContent: React.FunctionComponent<SkipLinkContentProps> = ({
  children
}: SkipLinkContentProps) => (
  <div id={TARGET_ID} tabIndex={-1} style={{ outline: 0 }}>
    {children}
  </div>
);
