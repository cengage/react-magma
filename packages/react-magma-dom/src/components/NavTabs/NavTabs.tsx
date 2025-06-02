import * as React from 'react';

import {
  StyledContainer,
  StyledTabsWrapper,
  StyledTabs,
  TabsAlignment,
  TabsBorderPosition,
  TabsIconPosition,
  TabsProps,
  Orientation,
  TabsContainerContext,
} from '../Tabs';
import { NavTabProps, NavTab } from './NavTab';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { getNormalizedScrollLeft, Omit } from '../../utils';
import { TabsOrientation, TabsTextTransform } from '../Tabs/shared';
import { ButtonNext, ButtonPrev } from '../Tabs/TabsScrollButtons';
import { useTabsMeta } from '../Tabs/utils';

export type NavTabsProps = Omit<TabsProps, 'onChange'>;

interface NavTabsContextInterface {
  borderPosition?: TabsBorderPosition;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
  textTransform?: TabsTextTransform;
}

export const NavTabsContext = React.createContext<NavTabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal,
  textTransform: TabsTextTransform.uppercase,
});

export const NavTabs = React.forwardRef<
  HTMLDivElement,
  NavTabsProps & Orientation
>((props, ref) => {
  const {
    alignment,
    backgroundColor,
    borderPosition,
    children,
    iconPosition,
    isFullWidth,
    orientation,
    textTransform,
    testId,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);

  const isInverse = useIsInverse(props.isInverse);

  const background = backgroundColor ? backgroundColor : 'transparent';

  const [tabsMeta, tabsHandleMethods, tabsRefs] = useTabsMeta(
    theme,
    orientation,
    backgroundColor,
    isInverse
  );

  const { displayScroll, scrollStart } = tabsMeta;
  const { activeTabIndex } = React.useContext(TabsContainerContext);
  const {
    handleStartScrollClick,
    handleEndScrollClick,
    handleTabsScroll,
    scroll,
  } = tabsHandleMethods;
  const { prevButtonRef, nextButtonRef, tabsWrapperRef } = tabsRefs;

  const navTabChildren = React.Children.toArray(children);
  const childrenWrapperRef = React.useRef<HTMLUListElement>();

  const hasChildFocus = navTabChildren.some(child => {
    if (React.isValidElement(child)) {
      return Object.keys(child.props).includes('isFocused');
    }
  });

  const navTabsChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child) && child.type === NavTab) {
      const item = child as React.ReactElement<
        React.PropsWithChildren<NavTabProps>
      >;

      if (!hasChildFocus && i === 0) {
        return React.cloneElement(item, { isFocused: true });
      }

      return item;
    }

    return child;
  });

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
        right: rect.right,
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

  const scrollInitialActiveIndexIntoView = () => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    const start = orientation === TabsOrientation.vertical ? 'top' : 'left';
    const end = orientation === TabsOrientation.vertical ? 'bottom' : 'right';

    const tabCenter = (tabMeta[start] + tabMeta[end]) / 2;
    const containerCenter = (tabsMeta[start] + tabsMeta[end]) / 2;

    const scrollDelta = tabCenter - containerCenter;

    const nextScrollStart = Number(tabsMeta[scrollStart]) + scrollDelta;

    scroll(nextScrollStart);
  };

  React.useEffect(scrollInitialActiveIndexIntoView, []);

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
        orientation={orientation || TabsOrientation.horizontal}
        ref={prevButtonRef}
        theme={theme}
      />

      <StyledTabsWrapper
        data-testid="navTabsWrapper"
        onScroll={handleTabsScroll}
        orientation={orientation || TabsOrientation.horizontal}
        ref={tabsWrapperRef}
      >
        <StyledTabs
          alignment={alignment ? alignment : TabsAlignment.left}
          orientation={orientation}
          ref={childrenWrapperRef}
        >
          <NavTabsContext.Provider
            value={{
              borderPosition,
              iconPosition,
              isInverse: isInverse,
              isFullWidth,
              orientation,
              textTransform: textTransform || TabsTextTransform.uppercase,
            }}
          >
            {navTabsChildren}
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
});
