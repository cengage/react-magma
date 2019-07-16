import * as React from 'react';

export interface AnnounceProps extends React.HTMLAttributes<HTMLDivElement> {
  politeness?: EnumAnnouncePoliteness;
  ref?: any;
}

export enum EnumAnnouncePoliteness {
  polite = 'polite', //default
  off = 'off',
  assertive = 'assertive'
}

export const Announce: React.FunctionComponent<
  AnnounceProps
> = React.forwardRef(({ children, politeness }: AnnounceProps, ref: any) => {
  return (
    <div
      aria-live={politeness ? politeness : EnumAnnouncePoliteness.polite}
      ref={ref}
    >
      {children}
    </div>
  );
});
