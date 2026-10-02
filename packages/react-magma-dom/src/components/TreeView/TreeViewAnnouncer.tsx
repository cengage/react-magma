import * as React from 'react';

import { Announce, AnnouncePoliteness } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TreeViewAnnouncerHandle {
  announce: (message: string) => void;
}

export interface TreeViewAnnouncerProps {
  testId?: string;
}

// How long the tree waits before publishing a message to its live region. Long
// enough for the expansion's DOM mutation to have been processed, short enough
// that the message still reads as a response to the action.
export const ANNOUNCE_DELAY_MS = 150;

// The tree's single live region. It owns the message state and is driven
// imperatively, so an announcement re-renders only this element — a re-render
// while a screen reader is reading the region cuts the announcement short.
//
// `aria-atomic` is required: consecutive messages share most of their wording,
// and without it only the differing fragment is read.
//
// The message is published a moment after the action: expanding a branch
// mutates a whole subtree, which interrupts the screen reader on WebKit.
//
// The region is assertive so that a run of quick actions replaces the pending
// message instead of queueing behind it.
export const TreeViewAnnouncer = React.forwardRef<
  TreeViewAnnouncerHandle,
  TreeViewAnnouncerProps
>(({ testId }, ref) => {
  const [message, setMessage] = React.useState('');
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  React.useImperativeHandle(
    ref,
    () => ({
      announce: (nextMessage: string) => {
        // A newer message replaces one that has not been published yet, so a
        // burst of actions never queues up announcements the user has already
        // moved past.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => setMessage(nextMessage),
          ANNOUNCE_DELAY_MS
        );
      },
    }),
    []
  );

  return (
    <VisuallyHidden>
      <Announce
        aria-atomic="true"
        politeness={AnnouncePoliteness.assertive}
        testId={testId}
      >
        {message}
      </Announce>
    </VisuallyHidden>
  );
});
