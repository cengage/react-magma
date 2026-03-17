import * as React from 'react';

import { I18nContext } from '../../i18n';
import { Announce } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

export function ItemListAnnouncer({ isOpen, labelText }) {
  const i18n = React.useContext(I18nContext);

  const announceMessage = isOpen
    ? i18n.select.expandedAnnounce.replace(/\{labelText\}/g, labelText)
    : i18n.select.collapsedAnnounce.replace(/\{labelText\}/g, labelText);

  if (!announceMessage) {
    return null;
  }

  return (
    <VisuallyHidden>
      <Announce>{announceMessage}</Announce>
    </VisuallyHidden>
  );
}
