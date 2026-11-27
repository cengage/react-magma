import * as React from 'react';

import { useGenerateId } from '..';
import { Environment, NativeMultipleSelectionOptions } from './types';

/**
 * Downshift 9.5 shares one status debounce across hooks. A multi component's
 * selectItem(null) cleanup can therefore cancel its chip message with ''.
 * Coordinate only the dual-native case; callbacks still run in upstream effects.
 */
export function useMultiStatusMessages<MenuState, Item>(
  menu: ((state: MenuState) => string) | undefined,
  multiple: NativeMultipleSelectionOptions<Item>['getA11yStatusMessage'],
  environment?: Environment
) {
  const id = useGenerateId();
  const enabled = !!menu && !!multiple;
  const ownerDocument =
    environment?.document ??
    (typeof document === 'undefined' ? undefined : document);
  const pending = React.useRef<{ source: 'menu' | 'multiple'; text: string }>();
  const region = React.useRef<HTMLDivElement>();
  const publishTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const clearTimer = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (!enabled || !ownerDocument) {
      return;
    }
    const element = ownerDocument.createElement('div');

    element.id = `${id}-multi-status`;
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('aria-atomic', 'true');
    Object.assign(element.style, {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
    });
    ownerDocument.body.appendChild(element);
    region.current = element;

    return () => {
      clearTimeout(publishTimer.current);
      clearTimeout(clearTimer.current);
      pending.current = undefined;
      region.current = undefined;
      element.remove();
    };
  }, [enabled, ownerDocument, id]);

  function queue(source: 'menu' | 'multiple', text: string) {
    // Silence replaces this hook's pending message, never the other hook's.
    // A later meaningful menu action can supersede a pending chip message.
    if (text || pending.current?.source === source) {
      pending.current = { source, text };
    }
    clearTimeout(publishTimer.current);
    clearTimeout(clearTimer.current);
    publishTimer.current = setTimeout(() => {
      if (region.current) {
        region.current.textContent = pending.current?.text ?? '';
      }
      pending.current = undefined;
      clearTimer.current = setTimeout(() => {
        if (region.current) {
          region.current.textContent = '';
        }
      }, 500);
    }, 200);

    return '';
  }

  const menuStatus: typeof menu = enabled
    ? state => queue('menu', menu(state))
    : menu;
  const multipleStatus: typeof multiple = enabled
    ? state => queue('multiple', multiple(state))
    : multiple;

  return { menuStatus, multipleStatus };
}
