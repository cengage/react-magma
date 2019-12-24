import React from 'react';
import styled from '@emotion/styled';
import { defineTheme, useTabsContext, TabsTheme } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { AngleRightIcon } from '../../components/Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../../components/Icon/types/AngleLeftIcon';
import { magma } from '../../theme/magma';

const StyledTabs = styled.div<{
  ['aria-label']: TabsAriaLabel;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>(
  {
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    position: 'relative',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ({ orientation }) =>
    orientation === 'vertical'
      ? {
          flexBasis: '100%'
        }
      : {
          flexBasis: '100%',
          flexDirection: 'row'
        }
);

const StyledTabsChild = styled.div<{
  length: number;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  theme: any;
}>(
  ({ length }) => ({
    display: 'flex',
    flexGrow: 0,
    flexBasis: `${100 / length}%`,
    textAlign: 'center',
    listStyle: 'none',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    fontSize: '14px',
    fontWeight: 600
  }),
  ({ orientation, theme, length }): any =>
    orientation === 'vertical'
      ? {
          display: 'flex',
          justifyContent: 'center',
          flexBasis: `${100 / length}%`,
          height: 'auto',
          zIndex: '0',
          position: 'relative',
          minHeight: '50px',
          color: theme.color,
          maxHeight: '60px',
          width: '100%'
        }
      : {
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          zIndex: '0',
          flexBasis: `${100 / length}%`,
          width: `${100 / length}%`,
          minWidth: '150px',
          color: theme.color,
          height: '100%'
        }
);

const getTransitionSpeed = (index: number, activeTabIndex: number) => {
  let speed = 0.3;
  let indexDifference = 0;

  index < activeTabIndex
    ? (indexDifference = (activeTabIndex - index) / 2)
    : (indexDifference = (index - activeTabIndex) / 2);

  // 4 = 4 tab components
  // For each step in 4 tab components speed will be increased
  speed -= (indexDifference / 4) * 0.05;

  if (speed < 0.2) {
    return 0.2;
  } else {
    return speed;
  }
};

const BottomLineStyled = styled.div<{
  length: number;
  previousActiveTab: number;
  activeTabIndex: number;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  borderPosition: TabsBorderPositionVertical | TabsBorderPositionHorizontal;
  theme: any;
}>(
  ({ previousActiveTab, activeTabIndex, theme }) => ({
    position: 'absolute',
    border: 'none',
    backgroundColor: theme.colorBorder,
    transition: `${getTransitionSpeed(
      previousActiveTab,
      activeTabIndex
    )}s ease-in-out`,
    zIndex: 0,
    borderRadius: '8px'
  }),
  ({ length, activeTabIndex, orientation }) =>
    orientation === 'vertical'
      ? {
          top: `${(100 / length) * activeTabIndex}%`,
          height: `${100 / length}%`,
          minHeight: `${100 / length}%`,
          width: '4px'
        }
      : {
          left: `${(100 / length) * activeTabIndex}%`,
          height: '4px',
          width: `${100 / length}%`,
          minWidth: '85px'
        },
  ({ orientation }) =>
    orientation === 'vertical'
      ? {
          left: 0
        }
      : {},
  ({ orientation, borderPosition }) =>
    orientation === 'horizontal' && borderPosition === 'top'
      ? {
          top: 0
        }
      : {
          bottom: 0
        }
);

const StyledTabsWrapper = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  centered: boolean;
}>(
  ({ orientation }) =>
    orientation === 'vertical'
      ? {
          overflow: 'hidden'
        }
      : {
          overflowX: 'auto'
        },
  {
    display: 'flex',
    overflowY: 'hidden',
    height: 'auto',
    position: 'relative',
    flexBasis: '100%',
    ['&::-webkit-scrollbar']: {
      width: '0',
      height: '0'
    },
    scrollbarWidth: 'none'
  },
  ({ centered }): any =>
    centered
      ? {
          justifyContent: 'center'
        }
      : {}
);

const StyledButtonNext = styled.div<{
  buttonVisible: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '50px',
    height: 'auto'
  },
  ({ buttonVisible }) =>
    buttonVisible
      ? {
          visibility: 'visible'
        }
      : {
          visibility: 'hidden'
        }
);

const StyledButtonPrev = styled.div<{
  buttonVisible: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '50px',
    height: 'auto'
  },
  ({ buttonVisible }) =>
    buttonVisible
      ? {
          visibility: 'visible'
        }
      : {
          visibility: 'hidden'
        }
);

const StyledContainer = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  theme: any;
  styles: { [key: string]: any };
  inverse: boolean;
  themeDefined: TabsTheme;
}>(
  ({ styles, theme, themeDefined, inverse }): any => ({
    display: 'flex',
    overflowX: 'auto',
    backgroundColor:
      themeDefined === 'blue'
        ? inverse
          ? '#08263e'
          : theme.bgColor
        : theme.bgColor || themeDefined === 'light'
        ? inverse
          ? magma.colors.neutral07
          : theme.bgColor
        : theme.bgColor,
    boxShadow: theme.boxShadow,
    border: theme.border,
    ...styles
  }),
  ({ orientation }) =>
    orientation === 'vertical'
      ? {}
      : {
          flexBasis: '100%',
          flexDirection: 'row'
        }
);

const StyledTabsLayer = styled.div<{
  fullWidth: boolean;
}>(
  {
    display: 'flex',
    alignItems: 'stretch'
  },
  ({ fullWidth }): any =>
    fullWidth
      ? {
          width: '100%'
        }
      : {
          width: 'auto'
        }
);

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
  inverse?: boolean;
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
      inverse,
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

    const divRef = React.useRef<HTMLDivElement>();

    const handleClick = (direction: 'prev' | 'next') => {
      const scrollPositionSize: number = divRef.current.scrollLeft;
      const offsetBoxSize: number = divRef.current.offsetWidth;
      const offsetTabSize: number = buttonRefArray[0].current.offsetWidth;

      const options = {
        scrollOptions: {
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        },
        prev: {
          index: 0,
          currentTabIndex: Math.round(
            scrollPositionSize / offsetTabSize - offsetBoxSize / offsetTabSize
          ),
          scrollToVisibleTab: function() {
            return options.prev.currentTabIndex >= options.prev.index;
          }
        },
        next: {
          index: arrChildren.length - 1,
          currentTabIndex: Math.round(
            offsetBoxSize + scrollPositionSize / offsetTabSize
          ),
          scrollToVisibleTab: function() {
            return options.next.currentTabIndex <= options.next.index;
          }
        }
      };

      options[direction].scrollToVisibleTab()
        ? buttonRefArray[
            options[direction].currentTabIndex
          ].current.scrollIntoView(options.scrollOptions)
        : buttonRefArray[options[direction].index].current.scrollIntoView(
            options.scrollOptions
          );
    };

    React.useEffect(() => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const scrollSize = divRef.current.scrollWidth;
      const offsetBoxSize = divRef.current.offsetWidth;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);
    }, []);

    const handleScroll = () => {
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
        themeDefined={theme}
        inverse={inverse}
        data-testid={testId}
      >
        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonPrev
            onClick={() => handleClick('prev')}
            buttonVisible={buttonVisiblePrev}
            data-testid="buttonPrev"
          >
            <AngleLeftIcon size={16} color={activeTheme.colorOfArrows} />
          </StyledButtonPrev>
        ) : null}

        <StyledTabsWrapper
          ref={divRef}
          onScroll={handleScroll}
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
            onClick={() => handleClick('next')}
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
