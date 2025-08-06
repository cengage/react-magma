import * as React from 'react';

import styled from '@emotion/styled';
import { FloatingArrow } from '@floating-ui/react';

import { hasActiveElementsChecker, PopoverContext } from './Popover';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { useFocusLock } from '../../hooks/useFocusLock';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { Announce } from '../Announce';
import { Card } from '../Card';

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
      ? props.theme.colors.primary600
      : props.theme.colors.neutral100};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  max-height: ${props => (props.maxHeight ? props.maxHeight : '100%')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
  border: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.primary400
        : props.theme.colors.neutral300};
  width: ${props => (props.width ? props.width : '100%')};
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
      hasActiveElementsChecker(context.contentRef)
  );

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
            context.isInverse
              ? theme.colors.primary600
              : theme.colors.neutral100
          }
          stroke={
            context.isInverse
              ? theme.colors.primary400
              : theme.colors.neutral300
          }
          strokeWidth={1}
          style={{ zIndex: 996, transform: 'translateY(-15%)' }}
        />
      )}

      <StyledCard
        {...other}
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
            <ScrollableContent theme={theme}>{content}</ScrollableContent>
            {footer}
          </StyledAnnounce>
        </div>
      </StyledCard>
    </div>
  );
});
