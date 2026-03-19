import * as React from 'react';

import { Announce } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

export function ClearAnnouncer({ clearAnnouncement }) {
  return (
    <VisuallyHidden>
      <Announce>{clearAnnouncement}</Announce>
    </VisuallyHidden>
  );
}
