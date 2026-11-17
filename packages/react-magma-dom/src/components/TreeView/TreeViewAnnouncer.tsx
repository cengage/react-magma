import * as React from 'react';

import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Announce, AnnouncePoliteness } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TreeViewAnnouncerHandle {
  announce: (message: string, itemId?: string) => void;
}

export interface TreeViewAnnouncerProps {
  branchIds: string[];
  testId?: string;
}

// Long enough for the expansion's DOM mutation to be processed, short enough
// that the message still reads as a response to the action.
export const ANNOUNCE_DELAY_MS = 150;

// Live regions are driven here so announcing re-renders this element alone:
// a tree re-render mid-announcement cuts it short.
// Without aria-atomic only the fragment differing from the previous message is
// read. Assertive on macOS, where VoiceOver drops a polite message
// mid-interaction; elsewhere polite, so it queues behind the screen reader's
// own announcement rather than preceding it.
export const TreeViewAnnouncer = React.forwardRef<
  TreeViewAnnouncerHandle,
  TreeViewAnnouncerProps
>(({ branchIds, testId }, ref) => {
  const [message, setMessage] = React.useState('');
  const [itemMessages, setItemMessages] = React.useState(
    () => new Map<string, string>()
  );
  const [isMounted, setIsMounted] = React.useState(false);
  const { isMacOS, isWindows } = useDeviceDetect();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const itemTimeoutsRef = React.useRef(
    new Map<string, ReturnType<typeof setTimeout>>()
  );

  React.useEffect(() => {
    const itemTimeouts = itemTimeoutsRef.current;

    if (isWindows) {
      setIsMounted(true);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      itemTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isWindows]);

  React.useImperativeHandle(
    ref,
    () => ({
      announce: (nextMessage: string, itemId?: string) => {
        if (isWindows && itemId) {
          clearTimeout(itemTimeoutsRef.current.get(itemId));
          if (itemMessages.get(itemId) === nextMessage) {
            setItemMessages(messages => new Map(messages).set(itemId, ''));
          }
          itemTimeoutsRef.current.set(
            itemId,
            setTimeout(
              () =>
                setItemMessages(messages =>
                  new Map(messages).set(itemId, nextMessage)
                ),
              ANNOUNCE_DELAY_MS
            )
          );

          return;
        }

        // A newer message replaces one not yet published, so a burst of
        // actions never queues announcements the user has moved past.
        clearTimeout(timeoutRef.current);
        if (isWindows && nextMessage === message) {
          setMessage('');
        }
        timeoutRef.current = setTimeout(
          () => setMessage(nextMessage),
          ANNOUNCE_DELAY_MS
        );
      },
    }),
    [isWindows, itemMessages, message]
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
      {isMounted &&
        isWindows &&
        branchIds.map(itemId => (
          <Announce
            aria-atomic="true"
            key={itemId}
            politeness={AnnouncePoliteness.polite}
            testId={testId ? `${testId}-${itemId}` : undefined}
          >
            {itemMessages.get(itemId) ?? ''}
          </Announce>
        ))}
    </VisuallyHidden>
  );
});
