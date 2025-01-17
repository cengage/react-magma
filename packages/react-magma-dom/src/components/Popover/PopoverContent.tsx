import * as React from 'react';
import { Card } from '../Card';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import styled from '@emotion/styled';
import {
  isExistedActiveElements,
  PopoverContext,
  PopoverPosition,
} from './Popover';
import { useFocusLock } from '../../hooks/useFocusLock';
import { Announce } from '../Announce';
import { ThemeInterface } from '../../theme/magma';
import { PopoverHeader, PopoverFooter } from './PopoverSection';

/**
 * @children required
 */
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
  position: PopoverPosition;
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

  ::before {
    display: ${props => (props.hasPointer ? 'block' : 'none')};
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px;
  }

  &[data-popover-placement=${PopoverPosition.bottom}]::before {
    border-color: transparent transparent
      ${props =>
        props.isInverse
          ? props.theme.colors.primary400
          : props.theme.colors.neutral300}
      transparent;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPosition.top}]::before {
    border-color: ${props =>
        props.isInverse
          ? props.theme.colors.primary400
          : props.theme.colors.neutral300}
      transparent transparent transparent;
    left: 50%;
    top: 100%;
    transform: translateX(-50%) rotate(0deg);
  }

  &::after {
    display: ${props => (props.hasPointer ? 'block' : 'none')};
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px;
  }

  &[data-popover-placement=${PopoverPosition.bottom}]::after {
    border-color: transparent transparent
      ${props =>
        props.isInverse
          ? props.theme.colors.primary600
          : props.theme.colors.neutral100}
      transparent;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPosition.top}]::after {
    border-color: ${props =>
        props.isInverse
          ? props.theme.colors.primary600
          : props.theme.colors.neutral100}
      transparent transparent transparent;
    left: 50%;
    top: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
`;

const StyledAnnounce = styled(Announce)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  width: fit-content;
  padding: 1em;
`;

const StyledPopoverContent = styled.div`
  z-index: 2;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px;
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
    context.isOpen && isExistedActiveElements(context.contentRef)
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
    <StyledPopoverContent
      ref={context.setFloating}
      style={{ ...context.floatingStyles }}
    >
      <StyledCard
        {...other}
        position={context.position}
        hasDropShadow
        isInverse={context.isInverse}
        isOpen={context.isOpen}
        maxHeight={context.maxHeight}
        ref={ref}
        tabIndex={-1}
        testId={testId || 'popoverContent'}
        theme={theme}
        width={context.width}
        data-popover-placement={context.position}
        hasPointer={context.hasPointer}
      >
        <div
          aria-labelledby={context.popoverTriggerId.current}
          role="dialog"
          ref={focusTrapRef}
        >
          {!content.length ? (
            <ErrorMessage>Content must be passed</ErrorMessage>
          ) : (
            <StyledAnnounce
              style={{
                maxHeight: context.maxHeight ? context.maxHeight : '100%',
              }}
            >
              {header}
              <ScrollableContent>{content}</ScrollableContent>
              {footer}
            </StyledAnnounce>
          )}
        </div>
      </StyledCard>
    </StyledPopoverContent>
  );
});
