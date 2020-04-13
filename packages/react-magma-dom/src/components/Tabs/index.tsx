import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { transparentize } from 'polished';

import { AngleRightIcon } from '../Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../Icon/types/AngleLeftIcon';
import { AngleUpIcon } from '../Icon/types/AngleUpIcon';
import { AngleDownIcon } from '../Icon/types/AngleDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import { TabsContainerContext } from './TabsContainer';
import isPropValid from '@emotion/is-prop-valid';
import {
  animate,
  Omit,
  debounce,
  getNormalizedScrollLeft,
  detectScrollType
} from '../../utils';
import { Tab } from './Tab';

const StyledContainer = styled('div', { shouldForwardProp: isPropValid })<{
  orientation: TabsOrientation;
  isInverse: boolean;
  backgroundColor: string;
}>`
  background-color: ${props =>
    props.backgroundColor
      ? props.backgroundColor
      : props.isInverse
      ? props.theme.colors.foundation01
      : 'transparent'};
  background: backgroundColor;
  display: flex;
  height: ${props => (props.orientation === 'vertical' ? '100%' : 'auto')};

  position: relative;
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledTabsWrapper = styled('div', { shouldForwardProp: isPropValid })<{
  orientation: TabsOrientation;
}>`
  display: flex;
  flex-grow: 1;
  overflow-x: ${props => (props.orientation === 'vertical' ? '' : 'auto')};
  overflow-y: ${props => (props.orientation === 'vertical' ? 'auto' : '')};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
`;

const StyledTabs = styled('div', { shouldForwardProp: isPropValid })<{
  alignment?: TabsAlignment;
  orientation: TabsOrientation;
}>`
  align-items: center;
  display: flex;
  flex-direction: ${props =>
    props.orientation === 'vertical' ? 'column' : 'row'};
  justify-content: ${props =>
    props.alignment === 'center'
      ? 'center'
      : props.alignment === 'right'
      ? 'flex-end'
      : ''};
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledScrollButton = styled.div<{
  buttonVisible: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
}>`
  align-items: center;
  backdrop-filter: blur(1px);
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  cursor: pointer;
  display: ${props => (props.buttonVisible ? 'flex' : 'none')};
  justify-content: center;
  position: absolute;
  z-index: 2;

  bottom: 0;
  top: 0;
  width: 50px;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      left: 0;
      height: 50px;
      right: 0;
      width: auto;
    `}
`;

const StyledButtonPrev = styled(StyledScrollButton)<{
  backgroundColor?: string;
  orientation?: TabsOrientation;
}>`
  background: ${props => `linear-gradient(
    90deg,
    ${props.backgroundColor} 0%,
    ${transparentize(0.5, props.backgroundColor)} 100%
  )`};
  left: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      background: ${`linear-gradient(
        ${props.backgroundColor} 0%,
        ${transparentize(0.5, props.backgroundColor)} 100%
      )`};

      bottom: auto;
    `}
`;

const StyledButtonNext = styled(StyledScrollButton)<{
  backgroundColor?: string;
  orientation?: TabsOrientation;
}>`
  background: ${props => `linear-gradient(
    90deg,
    ${transparentize(0.5, props.backgroundColor)} 0%,
    ${props.backgroundColor} 100%
  )`};
  right: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      background: linear-gradient(
        ${transparentize(0.5, props.backgroundColor)} 0%,
        ${props.backgroundColor} 100%
      );
      top: auto;
    `}
`;

export enum TabsAlignment {
  center = 'center',
  left = 'left',
  right = 'right'
}

export enum TabsOrientation {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export enum TabsBorderPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum TabsIconPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top'
}

export interface VerticalTabsProps {
  orientation?: TabsOrientation.vertical;
  borderPosition?: TabsBorderPosition.left | TabsBorderPosition.right;
}
export interface HorizontalTabsProps {
  orientation?: TabsOrientation.horizontal;
  borderPosition?: TabsBorderPosition.bottom | TabsBorderPosition.top;
}

declare type Orientation = HorizontalTabsProps | VerticalTabsProps;

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  alignment?: TabsAlignment;
  backgroundColor?: string;
  iconPosition?: TabsIconPosition;
  isFullWidth?: boolean;
  isInverse?: boolean;
  onChange?: (newActiveIndex: number) => void;
  testId?: string;
}

interface TabsContextInterface {
  borderPosition?: TabsBorderPosition;
  changeHandler: (
    newActiveIndex: number,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  changeHandler: (index, event) => {},
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal
});

export const Tabs: React.FC<TabsProps & Orientation> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      alignment,
      backgroundColor,
      borderPosition,
      children,
      isFullWidth,
      orientation,
      onChange,
      iconPosition,
      testId,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);

    const isRtl = theme.direction === 'rtl';
    const vertical = orientation === TabsOrientation.vertical;
    const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
    const start = vertical ? 'top' : 'left';
    const end = vertical ? 'bottom' : 'right';
    const clientSize = vertical ? 'clientHeight' : 'clientWidth';

    const {
      activeTabIndex,
      setActiveTabIndex,
      isInverseContainer
    } = React.useContext(TabsContainerContext);

    const isInverse =
      typeof props.isInverse !== 'undefined'
        ? Boolean(props.isInverse)
        : isInverseContainer;

    const background = backgroundColor
      ? backgroundColor
      : isInverse
      ? theme.colors.foundation01
      : theme.colors.neutral08;

    const [displayScroll, setDisplayScroll] = React.useState({
      start: false,
      end: false
    });
    const [scrollerStyle, setScrollerStyle] = React.useState({
      overflow: 'hidden',
      marginBottom: null
    });

    const buttonRefArray = React.useRef([]);

    const childrenLength = React.Children.toArray(children).length;

    if (buttonRefArray.current.length !== childrenLength) {
      buttonRefArray.current = Array(childrenLength)
        .fill(null)
        .map((_, i) => buttonRefArray.current[i] || React.createRef());
    }

    const tabsWrapperRef = React.useRef<HTMLDivElement>();
    const childrenWrapperRef = React.useRef<HTMLDivElement>();

    function getTabsMeta() {
      const tabsNode = tabsWrapperRef.current;
      let tabsMeta;
      if (tabsNode) {
        const rect = tabsNode.getBoundingClientRect();
        tabsMeta = {
          clientWidth: tabsNode.clientWidth,
          scrollLeft: tabsNode.scrollLeft,
          scrollTop: tabsNode.scrollTop,
          scrollLeftNormalized: getNormalizedScrollLeft(
            tabsNode,
            theme.direction
          ),
          scrollWidth: tabsNode.scrollWidth,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
        };
      }

      let tabMeta;
      if (tabsNode) {
        const childrenArray = childrenWrapperRef.current.children;
        if (childrenArray.length > 0) {
          const tab = childrenArray[activeTabIndex];
          tabMeta = tab ? (tab as any).getBoundingClientRect() : null;
        }
      }
      return { tabsMeta, tabMeta };
    }

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

    function handleTabsWrapperSizeChange(scrollbarHeight) {
      setScrollerStyle({
        overflow: null,
        marginBottom: -scrollbarHeight
      });
    }

    function scrollSelectedIntoView() {
      const { tabsMeta, tabMeta } = getTabsMeta();

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta[start] < tabsMeta[start]) {
        // left side of button is out of view
        const nextScrollStart =
          Number(tabsMeta[scrollStart]) +
          (Number(tabMeta[start]) - Number(tabsMeta[start]));
        scroll(nextScrollStart);
      } else if (tabMeta[end] > tabsMeta[end]) {
        // right side of button is out of view
        const nextScrollStart =
          Number(tabsMeta[scrollStart]) +
          (Number(tabMeta[end]) - Number(tabsMeta[end]));
        scroll(nextScrollStart);
      }
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
      const handleResize = debounce(() => {
        updateScrollButtonState();
      }, 100);

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

    React.useEffect(scrollSelectedIntoView, []);

    React.useEffect(scrollSelectedIntoView, [activeTabIndex]);

    function findAndAddIndexToTab(baseChild, fn) {
      return React.Children.map(baseChild, (child: React.ReactChild, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.props.children) {
          child = React.cloneElement(child, {
            children: findAndAddIndexToTab(child.props.children, fn),
            key: index
          });
        }

        return fn(child);
      });
    }

    function changeHandler(
      newActiveIndex: number,
      event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
      if (
        (event.target as HTMLInputElement).children[0] &&
        (event.target as HTMLInputElement).children[0].hasAttribute('disabled')
      ) {
        event.preventDefault();
        return undefined;
      }

      onChange && typeof onChange === 'function' && onChange(newActiveIndex);
      setActiveTabIndex(newActiveIndex);
    }

    return (
      <StyledContainer
        ref={ref}
        orientation={orientation || TabsOrientation.horizontal}
        isInverse={isInverse}
        data-testid={testId}
        backgroundColor={background}
        theme={theme}
        {...rest}
      >
        <StyledButtonPrev
          backgroundColor={background}
          buttonVisible={displayScroll.start}
          data-testid="buttonPrev"
          isInverse={isInverse}
          onClick={handleStartScrollClick}
          orientation={orientation || TabsOrientation.horizontal}
          theme={theme}
        >
          {orientation === TabsOrientation.vertical ? (
            <AngleUpIcon size={16} />
          ) : (
            <AngleLeftIcon size={16} />
          )}
        </StyledButtonPrev>
        <StyledTabsWrapper
          data-testid="tabsWrapper"
          onScroll={handleTabsScroll}
          onChange={handleTabsWrapperSizeChange}
          orientation={orientation}
          ref={tabsWrapperRef}
          style={scrollerStyle}
        >
          <StyledTabs
            aria-label={rest['aria-label']}
            alignment={alignment ? alignment : TabsAlignment.left}
            orientation={orientation}
            ref={childrenWrapperRef}
            role="tablist"
          >
            {buttonRefArray.current.length && (
              <TabsContext.Provider
                value={{
                  borderPosition,
                  changeHandler,
                  iconPosition,
                  isInverse,
                  isFullWidth,
                  orientation
                }}
              >
                {React.Children.map(
                  props.children,
                  (baseChild: any, baseIndex) => {
                    if (baseChild.type === Tab) {
                      const index = baseChild.props.index || baseIndex;
                      return React.cloneElement(baseChild, {
                        index,
                        key: index,
                        ref: buttonRefArray.current[index]
                      });
                    } else if (baseChild.props && baseChild.props.children) {
                      return findAndAddIndexToTab(baseChild, newChild => {
                        if (newChild.type === Tab) {
                          const index = baseChild.props.index || baseIndex;
                          return React.cloneElement(newChild, {
                            index,
                            key: index,
                            ref: buttonRefArray.current[index]
                          });
                        }

                        return newChild;
                      });
                    } else {
                      if (process.env.NODE_ENV !== 'production') {
                        console.error(
                          'React-Magma: you should pass in a Tab or another component/element that wraps a Tab'
                        );
                      }
                      return baseChild;
                    }
                  }
                )}
              </TabsContext.Provider>
            )}
          </StyledTabs>
        </StyledTabsWrapper>
        <StyledButtonNext
          backgroundColor={background}
          buttonVisible={displayScroll.end}
          data-testid="buttonNext"
          isInverse={isInverse}
          onClick={handleEndScrollClick}
          orientation={orientation || TabsOrientation.horizontal}
          theme={theme}
        >
          {orientation === TabsOrientation.vertical ? (
            <AngleDownIcon size={16} />
          ) : (
            <AngleRightIcon size={16} />
          )}
        </StyledButtonNext>
      </StyledContainer>
    );
  }
);
