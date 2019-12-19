import * as React from 'react';

export interface AnnounceProps extends React.HTMLAttributes<HTMLDivElement> {
  politeness?: AnnouncePoliteness;
  ref?: any;
  testId?: string;
}

export enum AnnouncePoliteness {
  polite = 'polite', //default
  off = 'off',
  assertive = 'assertive'
}

export const Announce: React.FunctionComponent<
  AnnounceProps
> = React.forwardRef(
  ({ children, politeness, testId }: AnnounceProps, ref: any) => {
    return (
      <div
        aria-live={politeness ? politeness : AnnouncePoliteness.polite}
        ref={ref}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);
