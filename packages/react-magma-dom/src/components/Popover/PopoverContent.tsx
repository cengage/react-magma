import * as React from 'react';

import styled from '@emotion/styled';
import { FloatingArrow } from '@floating-ui/react';

import { PopoverContext } from './Popover';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { useFocusLock } from '../../hooks/useFocusLock';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { hasActiveElementsInside, useForkedRef } from '../../utils';
import { Announce } from '../Announce';
import { Card, CardBorderRadius, CardCornerTreatment } from '../Card';

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  testId?: string;
  /**
   * @children required
   */
  children: React.ReactChild | React.ReactChild[];
}

const StyledCard = styled(Card)<{
  isInverse?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
  theme?: ThemeInterface;
  hasPointer?: boolean;
}>`
  position: relative;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral1100
      : props.theme.colors.neutral0};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  max-height: ${props => (props.maxHeight ? props.maxHeight : '100%')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
  border: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral800
        : props.theme.colors.neutral200};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.brand.navy};
  width: ${props => (props.width ? props.width : '100%')};
  max-width: ${props => (props.width ? props.width : '300px')};
`;

const StyledAnnounce = styled(Announce)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing05};
  height: inherit;
  white-space: normal;
`;

// Matches Chrome's arrow key scroll step
const SCROLL_STEP = 40;

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>((props, forwardedRef) => {
  const { children, testId, ...other } = props;
  const context = React.useContext(PopoverContext);
  const theme = React.useContext(ThemeContext);
  const ref = useForkedRef(forwardedRef, context.contentRef);

  const focusTrapRef = useFocusLock(
    context.focusTrap &&
      context.isOpen &&
      hasActiveElementsInside(context.contentRef)
  );

  const scrollableContentRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);

  // Scrollable content without interactive elements gets tabindex="0" so keyboard users can scroll with arrow keys.
  // Non-scrollable content doesn't need tabindex - it would only add an extra Tab stop.
  React.useEffect(() => {
    const element = scrollableContentRef.current;

    if (
      !context.isOpen ||
      !element ||
      hasActiveElementsInside(scrollableContentRef)
    ) {
      setIsScrollable(false);

      return;
    }

    const checkScrollability = () => {
      setIsScrollable(element.scrollHeight > element.clientHeight);
    };

    checkScrollability();

    let resizeObserver: ResizeObserver | null = null;

    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(element);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [context.isOpen, children]);

  // Safari doesn't scroll a focused overflow container with the keyboard,
  // so scroll it manually (and prevent the native scroll in other browsers)
  function handleScrollableContentKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    const element = event.currentTarget;

    if (
      !isScrollable ||
      event.target !== element ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const scrollTopByKey = {
      ArrowDown: element.scrollTop + SCROLL_STEP,
      ArrowUp: element.scrollTop - SCROLL_STEP,
      PageDown: element.scrollTop + element.clientHeight,
      PageUp: element.scrollTop - element.clientHeight,
      Home: 0,
      End: element.scrollHeight,
    };

    if (event.key in scrollTopByKey) {
      event.preventDefault();
      element.scrollTop = scrollTopByKey[event.key];
    }
  }

  const styledChildren = React.Children.toArray(children).map(item =>
    React.cloneElement(item as React.ReactElement, {
      theme,
    })
  );
  const header = styledChildren.find(
    child =>
      (child as React.ReactElement).type &&
      (child as React.ReactElement).type === PopoverHeader
  );
  const footer = styledChildren.filter(
    child =>
      !(child as React.ReactElement).type ||
      (child as React.ReactElement).type === PopoverFooter
  );
  const content = styledChildren.filter(
    child =>
      !(child as React.ReactElement).type ||
      ((child as React.ReactElement).type !== PopoverHeader &&
        (child as React.ReactElement).type !== PopoverFooter)
  );

  return (
    <div
      ref={el =>
        context.isOpen && context.setFloating && context.setFloating(el)
      }
      // z-index 996 is used to make the content appear above docs elements (code blocks)
      // and below the Modal component (z-index 997)
      style={{ ...context.floatingStyles, zIndex: 996 }}
    >
      {context.isOpen && context.hasPointer && (
        <FloatingArrow
          ref={context.arrowRef}
          context={context.arrowContext}
          data-testid="popoverArrow"
          data-popover-placement={context.position}
          width={10}
          height={6}
          fill={
            context.isInverse ? theme.colors.neutral1100 : theme.colors.neutral0
          }
          stroke={
            context.isInverse
              ? theme.colors.neutral800
              : theme.colors.neutral200
          }
          strokeWidth={1}
          style={{ zIndex: 996, transform: 'translateY(-15%)' }}
        />
      )}

      <StyledCard
        {...other}
        borderRadius={CardBorderRadius.small}
        cornerTreatment={CardCornerTreatment.all}
        hasDropShadow
        isInverse={context.isInverse}
        isOpen={context.isOpen}
        maxHeight={context.maxHeight}
        ref={ref}
        tabIndex={-1}
        testId={testId || 'popoverContent'}
        theme={theme}
        width={context.width}
        hasPointer={context.hasPointer}
      >
        <div
          aria-labelledby={context.popoverTriggerId.current}
          role="dialog"
          ref={focusTrapRef}
        >
          <StyledAnnounce
            style={{
              maxHeight: context.maxHeight ? context.maxHeight : '100%',
            }}
            id={context.popoverContentId.current}
          >
            {header}
            <ScrollableContent
              onKeyDown={handleScrollableContentKeyDown}
              ref={scrollableContentRef}
              tabIndex={isScrollable ? 0 : undefined}
              theme={theme}
            >
              {content}
            </ScrollableContent>
            {footer}
          </StyledAnnounce>
        </div>
      </StyledCard>
    </div>
  );
});
