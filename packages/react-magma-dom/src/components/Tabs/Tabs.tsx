import React from 'react';
import { defineTheme } from './themes';
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
export type TabsBorderPositionVertical = 'left';
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
  fullWidth?: boolean;
  testId?: string;
}

export const Tabs: React.FC<ITabsProps & Orientation> = React.forwardRef(
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
      fullWidth,
      testId
    } = props;
    const { state, dispatch, theme } = useTabsContext();
    const [previousActiveTab, setPreviousActiveTab] = React.useState(
      state.activeTabIndex
    );
    const [buttonVisiblePrev, setButtonPrevState] = React.useState(false);
    const [buttonVisibleNext, setButtonNextState] = React.useState(false);
    const arrChildren = React.Children.toArray(children);

    const changeHandler = React.useCallback(
      (
        newActiveIndex: number,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ): void => {
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
          type: 'SET_ACTIVE_TAB_INDEX',
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

    React.useEffect(() => {
      if (arrChildren.length !== state.numberOfTabs)
        dispatch({
          type: 'SET_NUMBER_OF_TABS',
          payload: { numberOfTabs: arrChildren.length }
        });
    }, [arrChildren.length, dispatch, state.numberOfTabs]);

    //Logic for Scroll

    const buttonRefArray = arrChildren.reduce(
      (accum: any, _, index: number) => {
        accum[index] = React.createRef();
        return accum;
      },
      {}
    );

    const divRef: any = React.useRef<HTMLDivElement>();

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

    React.useEffect(() => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const scrollSize = divRef.current.scrollWidth;
      const offsetBoxSize = divRef.current.offsetWidth;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);
    }, []);

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

    const tabsThemeContext = React.useContext(ThemeContext);

    const activeTheme = defineTheme(tabsThemeContext, theme);

    return (
      <StyledContainer
        ref={ref}
        styles={styles}
        orientation={orientation || 'horizontal'}
        theme={activeTheme}
        data-testid={testId}
      >
        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonPrev
            onClick={handleClickPrev}
            buttonVisible={buttonVisiblePrev}
            data-testid="buttonPrev"
          >
            <AngleLeftIcon size={16} color={activeTheme.colorOfArrows} />
          </StyledButtonPrev>
        ) : null}

        <StyledTabsWrapper
          ref={divRef}
          onScroll={(event: React.UIEvent<HTMLDivElement>) =>
            handleScroll(event)
          }
          orientation={orientation}
          centered={centered}
        >
          <StyledTabsLayer fullWidth={fullWidth}>
            <StyledTabs
              aria-label={ariaLabel}
              orientation={orientation}
              role="tablist"
            >
              {arrChildren.map((childItem: any, index) => {
                const isActive =
                  index ===
                  (activeIndex
                    ? activeIndex
                    : (state && state.activeTabIndex) || 0);

                const child: any = React.cloneElement(childItem, {
                  isActive,
                  changeHandler,
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
                    onClick={e => changeHandler(index, e)}
                    role="tab"
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
            <AngleRightIcon size={16} color={activeTheme.colorOfArrows} />
          </StyledButtonNext>
        ) : null}
      </StyledContainer>
    );
  }
);
