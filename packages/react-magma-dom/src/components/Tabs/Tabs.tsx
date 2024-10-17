import React from 'react';
import styled from '@emotion/styled';
import { TabsContainerContext } from './TabsContainer';
import isPropValid from '@emotion/is-prop-valid';
import { omit, Omit, getNormalizedScrollLeft } from '../../utils';
import { useDescendants } from '../../hooks/useDescendants';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { ButtonNext, ButtonPrev } from './TabsScrollButtons';
import { useTabsMeta } from './utils';
import { I18nContext } from '../../i18n';
import { TabsOrientation, TabsTextTransform } from './shared';

export enum TabsAlignment {
  center = 'center',
  left = 'left',
  right = 'right',
}

export enum TabsBorderPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}

export enum TabsIconPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}

export interface VerticalTabsProps {
  orientation?: TabsOrientation.vertical;
  borderPosition?: TabsBorderPosition.left | TabsBorderPosition.right;
}
export interface HorizontalTabsProps {
  orientation?: TabsOrientation.horizontal;
  borderPosition?: TabsBorderPosition.bottom | TabsBorderPosition.top;
}

export declare type Orientation = HorizontalTabsProps | VerticalTabsProps;

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Alignment of the tabs menu
   * @default TabsAlignment.left
   */
  alignment?: TabsAlignment;
  /**
   * The text the screen reader will announce that describes your tablist.
   */
  'aria-label'?: string;
  /**
   * Background color for the tabs menu
   */
  backgroundColor?: string;
  /**
   * The orientation of icon on Tab
   * @default TabsIconPosition.left
   */
  iconPosition?: TabsIconPosition;
  /**
   * If true, the components takes the full width of the screen
   */
  isFullWidth?: boolean;
  isInverse?: boolean;
  /**
   * The onChange handler for managing state of Tabs component by your custom logic.
   */
  onChange?: (newActiveIndex: number) => void;
  /**
   * @default TabsOrientation.horizontal
   */
  orientation?: TabsOrientation;
  /**
   * Determines whether the tab appears in all-caps
   * @default TabsTextTransform.uppercase
   */
  textTransform?: TabsTextTransform;
  /**
   * @internal
   */
  testId?: string;
}

interface TabsContextInterface {
  borderPosition?: TabsBorderPosition;
  buttonRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  changeHandler: (
    newActiveIndex: number,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
  textTransform?: TabsTextTransform;
  registerTabButton: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  changeHandler: () => {},
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal,
  textTransform: TabsTextTransform.uppercase,
  registerTabButton: (elements, element) => {},
});

export const StyledContainer = styled('div', {
  shouldForwardProp: isPropValid,
})<{
  as?: string;
  orientation: TabsOrientation;
  isInverse: boolean;
  backgroundColor: string;
  theme: ThemeInterface;
}>`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  background: backgroundColor;
  display: flex;
  height: ${props => (props.orientation === 'vertical' ? '100%' : 'auto')};

  position: relative;
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

export const StyledTabsWrapper = styled('div', {
  shouldForwardProp: isPropValid,
})<{
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

export const StyledTabs = styled('ul', { shouldForwardProp: isPropValid })<{
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
  margin: 0;
  padding: 0;
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps & Orientation>(
  (props, ref) => {
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
      textTransform,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);

    const { activeTabIndex, setActiveTabIndex, isInverseContainer } =
      React.useContext(TabsContainerContext);

    const isInverse =
      typeof props.isInverse !== 'undefined'
        ? Boolean(props.isInverse)
        : isInverseContainer;

    const [tabsMeta, tabsHandleMethods, tabsRefs] = useTabsMeta(
      theme,
      orientation,
      backgroundColor,
      isInverse
    );

    const { vertical, background, displayScroll, scrollStart } = tabsMeta;
    const {
      handleStartScrollClick,
      handleEndScrollClick,
      handleTabsScroll,
      scroll,
    } = tabsHandleMethods;
    const { prevButtonRef, nextButtonRef, tabsWrapperRef } = tabsRefs;

    const start = vertical ? 'top' : 'left';
    const end = vertical ? 'bottom' : 'right';

    const [buttonRefArray, registerTabButton] = useDescendants();

    const childrenWrapperRef = React.useRef<HTMLUListElement>();

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

    function scrollSelectedIntoView() {
      const { tabsMeta, tabMeta } = getTabsMeta();

      if (!tabMeta || !tabsMeta) {
        return;
      }

      const prevButtonOffset = vertical
        ? Number(prevButtonRef.current.offsetHeight)
        : Number(prevButtonRef.current.offsetWidth);
      const nextButtonOffset = vertical
        ? Number(nextButtonRef.current.offsetHeight)
        : Number(nextButtonRef.current.offsetWidth);

      if (tabMeta[start] < Number(tabsMeta[start]) + prevButtonOffset) {
        // left side of button is out of view
        const nextScrollStart =
          Number(tabsMeta[scrollStart]) +
          (Number(tabMeta[start]) - Number(tabsMeta[start])) -
          prevButtonOffset;
        scroll(nextScrollStart);
      } else if (tabMeta[end] > Number(tabsMeta[end]) - nextButtonOffset) {
        // right side of button is out of view
        const nextScrollStart =
          Number(tabsMeta[scrollStart]) +
          (Number(tabMeta[end]) - Number(tabsMeta[end])) +
          nextButtonOffset;
        scroll(nextScrollStart);
      }
    }

    React.useEffect(scrollSelectedIntoView, []);

    React.useEffect(scrollSelectedIntoView, [activeTabIndex]);

    function changeHandler(
      newActiveIndex: number,
      event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void {
      if (
        (event.target as HTMLInputElement).children[0] &&
        (event.target as HTMLInputElement).children[0].hasAttribute('disabled')
      ) {
        event.preventDefault();
        return undefined;
      }

      onChange && typeof onChange === 'function' && onChange(newActiveIndex);

      newActiveIndex === activeTabIndex
        ? scrollSelectedIntoView()
        : setActiveTabIndex(newActiveIndex);
    }

    function tabIsEnabled(tabIndex) {
      return (
        buttonRefArray.current[tabIndex].current.getAttribute('disabled') ===
        null
      );
    }

    function findPreviousEnabledTabIndex(modifiedActiveTabIndex?: number) {
      const currentTabIndex = modifiedActiveTabIndex
        ? modifiedActiveTabIndex
        : activeTabIndex;
      const newActiveTabIndex = currentTabIndex > 0 ? currentTabIndex - 1 : 0;

      if (tabIsEnabled(newActiveTabIndex)) {
        return newActiveTabIndex;
      } else if (newActiveTabIndex - 1 >= 0) {
        return findPreviousEnabledTabIndex(newActiveTabIndex);
      } else {
        return activeTabIndex;
      }
    }

    function findNextEnabledTabIndex(
      lastChildIndex: number,
      modifiedActiveTabIndex?: number
    ) {
      const currentTabIndex =
        modifiedActiveTabIndex === 0 || modifiedActiveTabIndex
          ? modifiedActiveTabIndex
          : activeTabIndex;
      const newActiveTabIndex =
        currentTabIndex < lastChildIndex ? currentTabIndex + 1 : lastChildIndex;

      if (tabIsEnabled(newActiveTabIndex)) {
        return newActiveTabIndex;
      } else if (newActiveTabIndex + 1 <= lastChildIndex) {
        return findNextEnabledTabIndex(lastChildIndex, newActiveTabIndex);
      } else {
        return activeTabIndex;
      }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      const target = event.target as HTMLButtonElement;

      const role = target.getAttribute('role');
      if (role !== 'tab') {
        return;
      }

      const lastChildIndex = buttonRefArray.current.length - 1;
      let newActiveTabIndex = null;
      let previousItemKey =
        orientation !== TabsOrientation.vertical ? 'ArrowLeft' : 'ArrowUp';
      let nextItemKey =
        orientation !== TabsOrientation.vertical ? 'ArrowRight' : 'ArrowDown';

      switch (event.key) {
        case previousItemKey:
          newActiveTabIndex = findPreviousEnabledTabIndex();
          break;
        case nextItemKey:
          newActiveTabIndex = findNextEnabledTabIndex(lastChildIndex);
          break;
        case 'Home':
          newActiveTabIndex = tabIsEnabled(0)
            ? 0
            : findNextEnabledTabIndex(lastChildIndex, 0);
          break;
        case 'End':
          newActiveTabIndex = tabIsEnabled(lastChildIndex)
            ? lastChildIndex
            : findPreviousEnabledTabIndex(lastChildIndex);
          break;
        default:
          break;
      }

      if (newActiveTabIndex !== null) {
        onChange &&
          typeof onChange === 'function' &&
          onChange(newActiveTabIndex);
        setActiveTabIndex(newActiveTabIndex);
        (
          buttonRefArray.current[newActiveTabIndex].current as HTMLButtonElement
        ).focus();
        event.preventDefault();
      }
    }

    const i18n = React.useContext(I18nContext);
    const ariaLabel = `${rest['aria-label'] || ''}, ${
      orientation === TabsOrientation.vertical
        ? i18n.tabs.verticalTabsInstructions
        : i18n.tabs.horizontalTabsInstructions
    }`;

    const other = omit(['aria-label'], rest);

    return (
      <StyledContainer
        data-testid={testId}
        backgroundColor={background}
        isInverse={isInverse}
        orientation={orientation || TabsOrientation.horizontal}
        ref={ref}
        theme={theme}
        {...other}
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
          data-testid="tabsWrapper"
          onScroll={handleTabsScroll}
          orientation={orientation}
          ref={tabsWrapperRef}
        >
          <StyledTabs
            alignment={alignment ? alignment : TabsAlignment.left}
            aria-label={ariaLabel}
            aria-orientation={orientation || TabsOrientation.horizontal}
            onKeyDown={handleKeyDown}
            orientation={orientation}
            ref={childrenWrapperRef}
            role="tablist"
          >
            <TabsContext.Provider
              value={{
                borderPosition,
                buttonRefArray,
                changeHandler,
                iconPosition,
                isInverse,
                isFullWidth,
                orientation,
                textTransform: textTransform || TabsTextTransform.uppercase,
                registerTabButton,
              }}
            >
              {children}
            </TabsContext.Provider>
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
