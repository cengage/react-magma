import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef,
  useContext,
  forwardRef
} from 'react';
import { defineTheme } from './themes';
import { Global, css } from '@emotion/core';
import { useTabsContext } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { AngleRightIcon } from '../../components/Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../../components/Icon/types/AngleLeftIcon';
import {
  StyledTabs,
  StyledTabsChild,
  BottomLineStyled,
  StyledTabsWrapper,
  StyledButtonNext,
  StyledButtonPrev,
  StyledContainer,
  StyledTabsLayer
} from './StylesTabs';

export type TabsActiveIndex = number;
export type TabsVariant = 'scrollable';
export type TabsAriaLabel = string;
export type TabsOrientationVertical = 'vertical';
export type TabsOrientationHorizontal = 'horizontal';
export type TabsBorderPositionVertical = 'left' | 'right';
export type TabsBorderPositionHorizontal = 'top' | 'bottom';

export interface IVertical {
  orientation?: TabsOrientationVertical;
  borderPosition?: TabsBorderPositionVertical;
}
export interface IHorizontal {
  orientation?: TabsOrientationHorizontal;
  borderPosition?: TabsBorderPositionHorizontal;
}

declare type Orientation = IHorizontal | IVertical;

export interface ITabsProps {
  activeIndex?: TabsActiveIndex;
  scrollButtons?: boolean;
  ariaLabel?: TabsAriaLabel;
  onChange?: (newActiveIndex: number) => void;
  styles?: { [key: string]: any };
  centered?: boolean;
  testId?: string;
}

export const Tabs: React.FC<ITabsProps & Orientation> = forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      activeIndex,
      scrollButtons,
      ariaLabel,
      orientation,
      borderPosition,
      onChange,
      styles,
      centered,
      testId
    } = props;
    // {state} and {dispatch} from the TabsContainer context
    const { state, dispatch, theme } = useTabsContext();
    const [previousActiveTab, setPreviousActiveTab] = useState(
      state.activeTabIndex
    );
    const [buttonVisiblePrev, setButtonPrevState] = useState(false);
    const [buttonVisibleNext, setButtonNextState] = useState(false);
    const arrChildren = React.Children.toArray(children);

    // eslint-disable-next-line no-unused-vars
    const defaultChangeHandler = useCallback(
      (
        newActiveIndex: number,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ): void => {
        if (
          (!state || !dispatch) &&
          (!activeIndex || !onChange) &&
          process.env.NODE_ENV !== 'production'
        ) {
          // eslint-disable-next-line no-console
          console.log(
            "REACT MAGMA: Tabs component didn't get props from TabsContainer context properly."
          );
          return undefined;
        }

        if (
          (event.target as HTMLInputElement).children[0] &&
          (event.target as HTMLInputElement).children[0].hasAttribute(
            'disabled'
          )
        ) {
          event.preventDefault();
          return undefined;
        }

        setPreviousActiveTab(state.activeTabIndex);

        if (onChange) {
          onChange(newActiveIndex);
        }

        dispatch({
          type: 'setActiveTabIndex',
          payload: { activeTabIndex: newActiveIndex }
        });

        (event.target as HTMLButtonElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      },
      [activeIndex, dispatch, onChange, state]
    );

    useEffect(() => {
      if (arrChildren.length !== state.numberOfTabs)
        dispatch({
          type: 'setNumberOfTabs',
          payload: { numberOfTabs: arrChildren.length }
        });
    }, [arrChildren.length, dispatch, state.numberOfTabs]);

    //Logic for Scroll

    const buttonRefArray = arrChildren.reduce(
      (accum: any, currentValue: any, index: number) => {
        accum[index] = createRef();
        return accum;
      },
      {}
    );

    const divRef: any = useRef<HTMLDivElement>();

    const handleClickNext = () => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const offsetBoxSize = divRef.current.offsetWidth;
      const offsetTabSize = buttonRefArray[0].current.offsetWidth;

      const currentTabIndex = Math.round(
        (Number(offsetBoxSize) + Number(scrollPositionSize)) / offsetTabSize
      );

      currentTabIndex <= arrChildren.length - 1
        ? buttonRefArray[currentTabIndex].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          })
        : buttonRefArray[arrChildren.length - 1].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
    };

    const handleClickPrev = () => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const offsetBoxSize = divRef.current.offsetWidth;
      const offsetTabSize = buttonRefArray[1].current.offsetWidth;

      const currentTabIndex = Math.round(
        scrollPositionSize / offsetTabSize - offsetBoxSize / offsetTabSize
      );

      currentTabIndex >= 0
        ? buttonRefArray[currentTabIndex].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          })
        : buttonRefArray[0].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
    };

    useEffect(() => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const scrollSize = divRef.current.scrollWidth;
      const offsetBoxSize = divRef.current.offsetWidth;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);
    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const scrollSize = divRef.current.scrollWidth;
      const offsetBoxSize = divRef.current.offsetWidth;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);

      scrollPositionSize > 0
        ? setButtonPrevState(true)
        : setButtonPrevState(false);
    };

    const tabsThemeContext = useContext(ThemeContext);

    const activeTheme = defineTheme(tabsThemeContext, theme);

    return (
      <StyledContainer
        ref={ref}
        styles={styles}
        orientation={orientation || 'horizontal'}
        theme={activeTheme}
        data-testid={testId}
      >
        <Global
          styles={css`
            button {
              border: 0;
              background: transparent;
              text-transform: uppercase;
            }
            * {
              color: inherit;
            }
            a {
              text-decoration: none;
            }
            body,
            html {
              height: 100%;
            }
          `}
        />
        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonPrev
            onClick={handleClickPrev}
            buttonVisible={buttonVisiblePrev}
            data-testid="buttonPrev"
          >
            <AngleLeftIcon size={20} color={activeTheme.colorOfArrows} />
          </StyledButtonPrev>
        ) : null}

        <StyledTabsWrapper
          ref={divRef}
          onScroll={(event: React.UIEvent<HTMLDivElement>) =>
            handleScroll(event)
          }
          orientation={orientation}
        >
          <StyledTabsLayer centered={centered}>
            <StyledTabs aria-label={ariaLabel} orientation={orientation}>
              {arrChildren.map((childItem: any, index) => {
                const isActive =
                  index ===
                  (activeIndex
                    ? activeIndex
                    : (state && state.activeTabIndex) || 0);

                const child: any = React.cloneElement(childItem, {
                  isActive,
                  defaultChangeHandler,
                  index
                });

                return (
                  <StyledTabsChild
                    theme={activeTheme}
                    key={index}
                    ref={buttonRefArray[index]}
                    isActive={isActive}
                    length={arrChildren.length}
                    orientation={orientation}
                    onClick={e => defaultChangeHandler(index, e)}
                  >
                    {child}
                  </StyledTabsChild>
                );
              })}

              <BottomLineStyled
                theme={activeTheme}
                length={arrChildren.length}
                previousActiveTab={previousActiveTab}
                activeTabIndex={
                  activeIndex
                    ? activeIndex
                    : (state && state.activeTabIndex) || 0
                }
                orientation={orientation}
                borderPosition={borderPosition}
                data-testid="bottom-line"
              />
            </StyledTabs>
          </StyledTabsLayer>
        </StyledTabsWrapper>

        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonNext
            onClick={handleClickNext}
            buttonVisible={buttonVisibleNext}
            data-testid="buttonNext"
          >
            <AngleRightIcon size={20} color={activeTheme.colorOfArrows} />
          </StyledButtonNext>
        ) : null}
      </StyledContainer>
    );
  }
);
