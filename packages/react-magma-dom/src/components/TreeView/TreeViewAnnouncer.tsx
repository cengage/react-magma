import * as React from 'react';

import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Announce, AnnouncePoliteness } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TreeViewAnnouncerHandle {
  announce: (message: string) => void;
}

export interface TreeViewAnnouncerProps {
  testId?: string;
}

// Long enough for the expansion's DOM mutation to be processed, short enough
// that the message still reads as a response to the action.
export const ANNOUNCE_DELAY_MS = 150;

// The tree's single live region, driven imperatively so that announcing
// re-renders this element alone: a re-render mid-announcement cuts it short.
// Without aria-atomic only the fragment differing from the previous message is
// read. Assertive on macOS, where VoiceOver drops a polite message
// mid-interaction; elsewhere polite, so it queues behind the screen reader's
// own announcement rather than preceding it.
export const TreeViewAnnouncer = React.forwardRef<
  TreeViewAnnouncerHandle,
  TreeViewAnnouncerProps
>(({ testId }, ref) => {
  const [message, setMessage] = React.useState('');
  const { isMacOS } = useDeviceDetect();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  React.useImperativeHandle(
    ref,
    () => ({
      announce: (nextMessage: string) => {
        // A newer message replaces one not yet published, so a burst of
        // actions never queues announcements the user has moved past.
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
        politeness={
          isMacOS ? AnnouncePoliteness.assertive : AnnouncePoliteness.polite
        }
        testId={testId}
      >
        {message}
      </Announce>
    </VisuallyHidden>
  );
});
