import * as React from 'react';
import { Card } from '../Card';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import styled from '@emotion/styled';
import { PopoverContext, PopoverPositioning } from './Popover';
import { useFocusLock } from '../../hooks/useFocusLock';
import { Announce } from '../Announce';
import { ThemeInterface } from '../../theme/magma';
import { PopoverHeader } from './PopoverHeader';
import { PopoverFooter } from './PopoverFooter';

/**
 * @children required
 */
export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  children: React.ReactChild | React.ReactChild[];
}

const StyledCard = styled(Card)<{
  positioning: PopoverPositioning;
  isInverse?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
  theme?: ThemeInterface;
  withoutPointer?: boolean;
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
  /* padding: ${props => props.theme.spaceScale.spacing05}; */
  transition: opacity 0.3s;
  white-space: nowrap;
  border: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.primary400
        : props.theme.colors.neutral300};
  width: ${props => (props.width ? props.width : '100%')};

  ::before {
    display: ${props => props.withoutPointer ? 'none' : 'block'};
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px;
  }

  &[data-popover-placement=${PopoverPositioning.bottom}]::before {
    border-color: transparent transparent
      ${props => props.theme.colors.neutral300} transparent;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.top}]::before {
    border-color: ${props => props.theme.colors.neutral300} transparent
      transparent transparent;
    left: 50%;
    top: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.left}]::before {
    border-color: transparent transparent transparent
      ${props => props.theme.colors.neutral300};
    left: 100%;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.right}]::before {
    border-color: transparent ${props => props.theme.colors.neutral300}
      transparent transparent;
    right: 100%;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
  }

  &::after {
    display: ${props => props.withoutPointer ? 'none' : 'block'};
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px;
  }

  &[data-popover-placement=${PopoverPositioning.bottom}]::after {
    border-color: transparent transparent
      ${props => props.theme.colors.neutral100} transparent;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.top}]::after {
    border-color: ${props => props.theme.colors.neutral100} transparent
      transparent transparent;
    left: 50%;
    top: 100%;
    transform: translateX(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.left}]::after {
    border-color: transparent transparent transparent
      ${props => props.theme.colors.neutral100};
    left: 100%;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
  }
  &[data-popover-placement=${PopoverPositioning.right}]::after {
    border-color: transparent ${props => props.theme.colors.neutral100}
      transparent transparent;
    right: 100%;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
  }
`;

const StyledAnnounce = styled(Announce)<{ maxHeight?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* display: grid; */
  /* grid-template-rows: 1fr auto 1fr; */
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  /* align-items: center; */
  max-height: ${props => (props.maxHeight ? props.maxHeight : '100%')};
`;

const StyledPopoverContent = styled.div`
  z-index: 2;
`;

const PopoverChildrenContent = styled.div``;

const ScrollableContent = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  overflow-y: auto;
  padding: 16px;
  height: inherit;
`;

function isExistedActiveElements(ref) {
  return Array.from(
    ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
    ) || []
  ).filter((element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    return (
      element instanceof HTMLElement &&
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !element.hasAttribute('disabled')
    );
  }).length > 0;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>((props, forwardedRef) => {
  const { children, testId, ...other } = props;
  const context = React.useContext(PopoverContext);
  const theme = React.useContext(ThemeContext);
  const ref = useForkedRef(forwardedRef, context.contentRef);

  const focusTrapRef = useFocusLock(context.isOpen && isExistedActiveElements(context.contentRef));

  const styledChildren = React.Children.toArray(children).map(item =>
    React.cloneElement(item as React.ReactElement, {
      theme,
      isInverse: context.isInverse,
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
        positioning={context.positioning}
        hasDropShadow
        isInverse={context.isInverse}
        isOpen={context.isOpen}
        maxHeight={context.maxHeight}
        ref={ref}
        tabIndex={-1}
        testId={testId || 'popoverContent'}
        theme={theme}
        width={context.width}
        data-popover-placement={context.positioning}
        withoutPointer={context.withoutPointer}
      >
        <PopoverChildrenContent
          aria-labelledby={context.popoverTriggerId.current}
          role="dialog"
          ref={focusTrapRef}
        >
          <StyledAnnounce maxHeight={context.maxHeight}>
            {!content.length ? (
              'Content must be passed'
            ) : (
              <>
                {header}
                <ScrollableContent>{content}</ScrollableContent>
                {footer}
              </>
            )}
          </StyledAnnounce>
        </PopoverChildrenContent>
      </StyledCard>
    </StyledPopoverContent>
  );
});
