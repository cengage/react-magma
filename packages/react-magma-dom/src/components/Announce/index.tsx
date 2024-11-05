import * as React from 'react';

/**
 * @children required
 */
export interface AnnounceProps extends React.HTMLAttributes<HTMLDivElement> {
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

    const { props: childrenProps } = children as React.ReactNode & {
      props: any;
    };

    return (
      <div
        {...other}
        aria-live={politeness || AnnouncePoliteness.polite}
        ref={ref}
        data-testid={testId}
        aria-describedby={childrenProps?.describedbyId}
      >
        {children}
      </div>
    );
  }
);
