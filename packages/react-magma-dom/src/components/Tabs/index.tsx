import React from 'react';
import styled from '@emotion/styled';
import { AngleRightIcon } from '../Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../Icon/types/AngleLeftIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import { TabsContainerContext } from './TabsContainer';
import isPropValid from '@emotion/is-prop-valid';
import { Omit } from '../../utils';
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
  display: flex;
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledTabsWrapper = styled('div', { shouldForwardProp: isPropValid })<{
  orientation: TabsOrientation;
}>`
  display: flex;
  flex-grow: 1;
  overflow-y: hidden;
  overflow: ${props => (props.orientation === 'vertical' ? 'hidden' : '')};
  overflow-x: ${props => (props.orientation === 'vertical' ? '' : 'auto')};
  position: relative;

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

const StyledButtonNext = styled.div<{
  buttonVisible: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: auto;
  visibility: ${props => (props.buttonVisible ? 'visible' : 'hidden')};
`;

const StyledButtonPrev = styled.div<{
  buttonVisible: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: auto;
  visibility: ${props => (props.buttonVisible ? 'visible' : 'hidden')};
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
  hasScrollButtons?: boolean;
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
      hasScrollButtons,
      orientation,
      onChange,
      iconPosition,
      testId,
      ...rest
    } = props;

    const { setActiveTabIndex, isInverseContainer } = React.useContext(
      TabsContainerContext
    );

    const [buttonVisiblePrev, setButtonPrevState] = React.useState(false);
    const [buttonVisibleNext, setButtonNextState] = React.useState(false);

    const buttonRefArray = React.useRef([]);

    const childrenLength = React.Children.toArray(children).length;

    if (buttonRefArray.current.length !== childrenLength) {
      buttonRefArray.current = Array(childrenLength)
        .fill(null)
        .map((_, i) => buttonRefArray.current[i] || React.createRef());
    }

    const tabsWrapperRef = React.useRef<HTMLDivElement>();

    const scrollOptions = {
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    };

    React.useEffect(() => {
      const {
        scrollLeft: scrollPositionSize,
        scrollWidth: scrollSize,
        offsetWidth: offsetBoxSize
      } = tabsWrapperRef.current;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);
    }, []);

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

      (event.target as HTMLButtonElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }

    function handleClickNext() {
      const {
        scrollLeft: scrollPositionSize,
        offsetWidth: offsetBoxSize
      } = tabsWrapperRef.current;
      const offsetTabSize = buttonRefArray.current[0].current.offsetWidth;

      const currentTabIndex = Math.round(
        (Number(offsetBoxSize) + Number(scrollPositionSize)) / offsetTabSize
      );

      currentTabIndex <= buttonRefArray.current.length - 1
        ? buttonRefArray.current[currentTabIndex].current.scrollIntoView(
            scrollOptions
          )
        : buttonRefArray.current[
            buttonRefArray.current.length - 1
          ].current.scrollIntoView(scrollOptions);
    }

    function handleClickPrev() {
      const {
        scrollLeft: scrollPositionSize,
        offsetWidth: offsetBoxSize
      } = tabsWrapperRef.current;
      const offsetTabSize = buttonRefArray.current[1].current.offsetWidth;

      const currentTabIndex = Math.round(
        scrollPositionSize / offsetTabSize - offsetBoxSize / offsetTabSize
      );

      currentTabIndex >= 0
        ? buttonRefArray.current[currentTabIndex].current.scrollIntoView(
            scrollOptions
          )
        : buttonRefArray.current[0].current.scrollIntoView(scrollOptions);
    }

    function handleScroll() {
      const {
        scrollLeft: scrollPositionSize,
        scrollWidth: scrollSize,
        offsetWidth: offsetBoxSize
      } = tabsWrapperRef.current;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);

      scrollPositionSize > 0
        ? setButtonPrevState(true)
        : setButtonPrevState(false);
    }

    const theme = React.useContext(ThemeContext);

    const isInverse =
      typeof props.isInverse !== 'undefined'
        ? Boolean(props.isInverse)
        : isInverseContainer;

    return (
      <StyledContainer
        ref={ref}
        orientation={orientation || TabsOrientation.horizontal}
        isInverse={isInverse}
        data-testid={testId}
        backgroundColor={backgroundColor}
        theme={theme}
        {...rest}
      >
        {hasScrollButtons && orientation !== TabsOrientation.vertical ? (
          <StyledButtonPrev
            onClick={handleClickPrev}
            buttonVisible={buttonVisiblePrev}
            data-testid="buttonPrev"
          >
            <AngleLeftIcon
              size={16}
              color={
                isInverse ? theme.colors.neutral08 : theme.colors.neutral02
              }
            />
          </StyledButtonPrev>
        ) : null}

        <StyledTabsWrapper
          data-testid="tabsWrapper"
          ref={tabsWrapperRef}
          onScroll={handleScroll}
          orientation={orientation}
        >
          <StyledTabs
            aria-label={rest['aria-label']}
            alignment={alignment ? alignment : TabsAlignment.left}
            orientation={orientation}
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
                    } else if (baseChild.props.children) {
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
                    }
                  }
                )}
              </TabsContext.Provider>
            )}
          </StyledTabs>
        </StyledTabsWrapper>

        {hasScrollButtons && orientation !== 'vertical' ? (
          <StyledButtonNext
            onClick={handleClickNext}
            buttonVisible={buttonVisibleNext}
            data-testid="buttonNext"
          >
            <AngleRightIcon
              size={16}
              color={
                isInverse ? theme.colors.neutral08 : theme.colors.neutral02
              }
            />
          </StyledButtonNext>
        ) : null}
      </StyledContainer>
    );
  }
);
