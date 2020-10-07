import * as React from 'react';
import {
  StyledContainer,
  StyledTabsWrapper,
  StyledTabs,
  TabsAlignment,
  TabsBorderPosition,
  TabsIconPosition,
  TabsOrientation
} from '../Tabs';

import { ButtonNext, ButtonPrev } from '../Tabs/TabsScrollButtons';

import {
  animate,
  debounce,
  getNormalizedScrollLeft,
  detectScrollType
} from '../../utils';

import { ThemeContext } from '../../theme/ThemeContext';

export interface NavTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment?: TabsAlignment;
  borderPosition?: TabsBorderPosition;
  backgroundColor?: string;
  children?: any;
  iconPosition?: TabsIconPosition;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  testId?: string;
}

interface NavTabsContextInterface {
  borderPosition?: TabsBorderPosition;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
}

export const NavTabsContext = React.createContext<NavTabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal
});

export const NavTabs: React.FunctionComponent<NavTabsProps> = React.forwardRef(
  (
    {
      alignment,
      backgroundColor,
      borderPosition,
      children,
      iconPosition,
      isInverse,
      isFullWidth,
      orientation,
      testId,
      ...rest
    }: NavTabsProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const isRtl = theme.direction === 'rtl';
    const vertical = orientation === TabsOrientation.vertical;
    const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
    const clientSize = vertical ? 'clientHeight' : 'clientWidth';

    const background = backgroundColor
      ? backgroundColor
      : isInverse
      ? theme.colors.foundation01
      : theme.colors.neutral08;

    const [displayScroll, setDisplayScroll] = React.useState({
      start: false,
      end: false
    });

    const tabsWrapperRef = React.useRef<HTMLDivElement>();
    const prevButtonRef = React.useRef<HTMLDivElement>();
    const nextButtonRef = React.useRef<HTMLDivElement>();

    function scroll(scrollValue) {
      animate(scrollStart, tabsWrapperRef.current, scrollValue);
    }

    function moveTabsScroll(delta) {
      let scrollValue = tabsWrapperRef.current[scrollStart];

      if (vertical) {
        scrollValue += delta;
      } else {
        scrollValue += delta * (isRtl ? -1 : 1);
        // Fix for Edge
        scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
      }
      scroll(scrollValue);
    }

    function handleStartScrollClick() {
      moveTabsScroll(-tabsWrapperRef.current[clientSize]);
    }

    function handleEndScrollClick() {
      moveTabsScroll(tabsWrapperRef.current[clientSize]);
    }

    function updateScrollButtonState() {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth
      } = tabsWrapperRef.current;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = getNormalizedScrollLeft(
          tabsWrapperRef.current,
          theme.direction
        );
        // use 1 for the potential rounding error with browser zooms.
        showStartScroll = isRtl
          ? scrollLeft < scrollWidth - clientWidth - 1
          : scrollLeft > 1;
        showEndScroll = !isRtl
          ? scrollLeft < scrollWidth - clientWidth - 1
          : scrollLeft > 1;
      }

      if (
        showStartScroll !== displayScroll.start ||
        showEndScroll !== displayScroll.end
      ) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }

    React.useEffect(() => {
      const handleResize = debounce(updateScrollButtonState, 100);

      window.addEventListener('resize', handleResize);
      return () => {
        handleResize.clear();
        window.removeEventListener('resize', handleResize);
      };
    }, [updateScrollButtonState]);

    const handleTabsScroll = React.useCallback(
      debounce(updateScrollButtonState, 100),
      [updateScrollButtonState]
    );

    React.useEffect(() => {
      return () => {
        handleTabsScroll.clear();
      };
    }, [handleTabsScroll]);

    React.useEffect(updateScrollButtonState);

    return (
      <StyledContainer
        aria-label={rest['aria-label']}
        as="nav"
        backgroundColor={backgroundColor}
        data-testid={testId}
        isInverse={isInverse}
        orientation={orientation || TabsOrientation.horizontal}
        ref={ref}
        theme={theme}
        {...rest}
      >
        <ButtonPrev
          backgroundColor={background}
          buttonVisible={displayScroll.start}
          isInverse={isInverse}
          onClick={handleStartScrollClick}
          orientation={orientation}
          ref={prevButtonRef}
          theme={theme}
        />

        <StyledTabsWrapper
          data-testid="navTabsWrapper"
          onScroll={handleTabsScroll}
          orientation={orientation}
          ref={tabsWrapperRef}
        >
          <StyledTabs
            alignment={alignment ? alignment : TabsAlignment.left}
            orientation={orientation}
          >
            <NavTabsContext.Provider
              value={{
                borderPosition,
                iconPosition,
                isInverse,
                isFullWidth,
                orientation
              }}
            >
              {children}
            </NavTabsContext.Provider>
          </StyledTabs>
        </StyledTabsWrapper>
        <ButtonNext
          backgroundColor={background}
          buttonVisible={displayScroll.end}
          isInverse={isInverse}
          onClick={handleEndScrollClick}
          orientation={orientation || TabsOrientation.horizontal}
          ref={nextButtonRef}
          theme={theme}
        />
      </StyledContainer>
    );
  }
);
