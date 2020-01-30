import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { AngleRightIcon } from '../../components/Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../../components/Icon/types/AngleLeftIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTabsContext } from './TabsContainer';

const StyledContainer = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  isInverse: boolean;
  backgroundColor: string;
}>`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  display: flex;
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledTabsWrapper = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
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

const StyledTabs = styled.div<{
  isCentered?: boolean;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  align-items: center;
  display: flex;
  flex-direction: ${props =>
    props.orientation === 'vertical' ? 'column' : 'row'};
  justify-content: ${props => (props.isCentered ? 'center' : '')};
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledTabsChild = styled.div<{
  borderPosition?: TabsBorderPositionHorizontal | TabsBorderPositionVertical;
  iconOrientation: IconOrientation;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  flex-grow: 0;
  flex-shrink: ${props => (props.isFullWidth ? '1' : '0')};
  height: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
  max-width: ${props => (props.isFullWidth ? '100%' : '250px')};
  position: relative;
  white-space: normal;
  width: ${props =>
    props.isFullWidth || props.orientation === 'vertical' ? '100%' : 'auto'};

  &:after {
    background: ${props =>
      props.isInverse ? props.theme.colors.pop02 : props.theme.colors.primary};
    border-radius: 2px;
    content: '';
    display: block;
    height: 4px;
    opacity: ${props => (props.isActive ? '1' : '0')};
    position: absolute;
    transition: 0.4s all;
    width: auto;

    bottom: ${props => (props.borderPosition === 'top' ? 'auto' : '0')};
    left: ${props => (props.isActive ? '0' : '50%')};
    right: ${props => (props.isActive ? '0' : '50%')};
    top: ${props => (props.borderPosition === 'top' ? '0' : 'auto')};

    ${props =>
      props.orientation === 'vertical' &&
      css`
        height: auto;
        bottom: ${props.isActive ? '0' : '50%'};
        left: 0;
        right: auto;
        top: ${props.isActive ? '0' : '50%'};
        width: 4px;
      `}
  }
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

export type TabsActiveIndex = number;
export type TabsVariant = 'scrollable';
export type TabsOrientationVertical = 'vertical';
export type TabsOrientationHorizontal = 'horizontal';
export type TabsBorderPositionVertical = 'left';
export type TabsBorderPositionHorizontal = 'top' | 'bottom';
export type IconOrientation = 'left' | 'top';

export interface IVertical {
  orientation?: TabsOrientationVertical;
  borderPosition?: TabsBorderPositionVertical;
}
export interface IHorizontal {
  orientation?: TabsOrientationHorizontal;
  borderPosition?: TabsBorderPositionHorizontal;
}

declare type Orientation = IHorizontal | IVertical;

export interface ITabsProps
  extends Exclude<
    React.ButtonHTMLAttributes<HTMLDivElement>['onChange'],
    React.ButtonHTMLAttributes<HTMLDivElement>
  > {
  activeIndex?: TabsActiveIndex;
  ariaLabel?: string;
  backgroundColor: string;
  iconOrientation?: IconOrientation;
  isCentered?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  hasScrollButtons?: boolean;
  onChange?: (newActiveIndex: number) => void;
  testId?: string;
}

export const Tabs: React.FC<ITabsProps & Orientation> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      activeIndex,
      ariaLabel,
      backgroundColor,
      borderPosition,
      children,
      isCentered,
      isFullWidth,
      isInverse,
      hasScrollButtons,
      orientation,
      onChange,
      iconOrientation,
      testId,
      ...rest
    } = props;
    const { state, dispatch } = useTabsContext();

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

    //Logic for Scroll

    const buttonRefArray = arrChildren.reduce(
      (accum: any, _, index: number) => {
        accum[index] = React.createRef();
        return accum;
      },
      {}
    );

    const divRef = React.useRef<HTMLDivElement>();

    const scrollOptions = {
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    };

    const handleClickNext = () => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const offsetBoxSize = divRef.current.offsetWidth;
      const offsetTabSize = buttonRefArray[0].current.offsetWidth;

      const currentTabIndex = Math.round(
        (Number(offsetBoxSize) + Number(scrollPositionSize)) / offsetTabSize
      );

      currentTabIndex <= arrChildren.length - 1
        ? buttonRefArray[currentTabIndex].current.scrollIntoView(scrollOptions)
        : buttonRefArray[arrChildren.length - 1].current.scrollIntoView(
            scrollOptions
          );
    };

    const handleClickPrev = () => {
      const scrollPositionSize = divRef.current.scrollLeft;
      const offsetBoxSize = divRef.current.offsetWidth;
      const offsetTabSize = buttonRefArray[1].current.offsetWidth;

      const currentTabIndex = Math.round(
        scrollPositionSize / offsetTabSize - offsetBoxSize / offsetTabSize
      );

      currentTabIndex >= 0
        ? buttonRefArray[currentTabIndex].current.scrollIntoView(scrollOptions)
        : buttonRefArray[0].current.scrollIntoView(scrollOptions);
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

    const theme = React.useContext(ThemeContext);

    return (
      <StyledContainer
        ref={ref}
        orientation={orientation || 'horizontal'}
        isInverse={isInverse}
        data-testid={testId}
        backgroundColor={backgroundColor}
        theme={theme}
        {...rest}
      >
        {hasScrollButtons && orientation !== 'vertical' ? (
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
          ref={divRef}
          onScroll={handleScroll}
          orientation={orientation}
        >
          <StyledTabs
            aria-label={ariaLabel}
            isCentered={isCentered}
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
                iconOrientation,
                index,
                isInverse,
                isFullWidth,
                orientation
              });

              return (
                <StyledTabsChild
                  borderPosition={borderPosition}
                  iconOrientation={iconOrientation}
                  isActive={isActive}
                  isFullWidth={isFullWidth}
                  isInverse={isInverse}
                  key={index}
                  ref={buttonRefArray[index]}
                  orientation={orientation}
                  onClick={e => changeHandler(index, e)}
                  role="tab"
                  theme={theme}
                >
                  {child}
                </StyledTabsChild>
              );
            })}
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
