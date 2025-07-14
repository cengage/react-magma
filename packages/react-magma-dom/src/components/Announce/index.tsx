import * as React from 'react';

export interface AnnounceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * Value of the `aria-live` attribute
   * @default AnnouncePoliteness.polite
   */
  politeness?: AnnouncePoliteness;
  /**
   * @internal
   */
  testId?: string;
}

export enum AnnouncePoliteness {
  polite = 'polite', //default
  off = 'off',
  assertive = 'assertive',
}

export const Announce = React.forwardRef<HTMLDivElement, AnnounceProps>(
  (props, ref) => {
    const { children, politeness, testId, ...other } = props;

    return (
      <div
        {...other}
        aria-live={politeness || AnnouncePoliteness.polite}
        ref={ref}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);
