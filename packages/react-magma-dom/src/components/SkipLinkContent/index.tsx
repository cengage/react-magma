import * as React from 'react';

import { TARGET_ID } from '../SkipLink';

export interface SkipLinkContentProps {
  children?: React.ReactChild | React.ReactChild[];
}

export const SkipLinkContent: React.FunctionComponent<SkipLinkContentProps> = ({
  children
}: SkipLinkContentProps) => (
  <div id={TARGET_ID} tabIndex={-1}>
    {children}
  </div>
);
