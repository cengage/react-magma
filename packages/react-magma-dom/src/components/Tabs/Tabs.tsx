import React from 'react';
import styled from '@emotion/styled';
import { AngleRightIcon } from '../../components/Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../../components/Icon/types/AngleLeftIcon';
import { magma } from '../../theme/magma';
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
  centered?: boolean;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  align-items: center;
  display: flex;
  flex-direction: ${props =>
    props.orientation === 'vertical' ? 'column' : 'row'};
  justify-content: ${props => (props.centered ? 'center' : '')};
  width: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
`;

const StyledTabsChild = styled.div<{
  borderPosition?: TabsBorderPositionHorizontal | TabsBorderPositionVertical;
  fullWidth?: boolean;
  isActive?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  flex-grow: 0;
  flex-shrink: ${props => (props.fullWidth ? '1' : '0')};
  height: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
  font-size: 14px;
  font-weight: 600;
  max-width: ${props => (props.fullWidth ? '100%' : '250px')};
  position: relative;
  text-transform: uppercase;
  white-space: normal;
  width: ${props =>
    props.fullWidth || props.orientation === 'vertical' ? '100%' : 'auto'};

  &:after {
    background: ${props => (props.isActive ? magma.colors.primary : '')};
    border-radius: 2px;
    bottom: ${props => (props.borderPosition === 'top' ? 'auto' : '0')};
    content: '';
    display: block;
    height: ${props => (props.orientation === 'vertical' ? 'auto' : '4px')};
    left: 0;
    position: absolute;
    right: ${props => (props.orientation === 'vertical' ? 'auto' : '0')};
    top: ${props =>
      props.orientation === 'vertical' || props.borderPosition === 'top'
        ? '0'
        : 'auto'};
    width: ${props => (props.orientation === 'vertical' ? '4px' : 'auto')};
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
  centered?: boolean;
  fullWidth?: boolean;
  isInverse?: boolean;
  scrollButtons?: boolean;
  onChange?: (newActiveIndex: number) => void;
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
      centered,
      fullWidth,
      isInverse,
      testId,
      backgroundColor,
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

    return (
      <StyledContainer
        ref={ref}
        orientation={orientation || 'horizontal'}
        isInverse={isInverse}
        data-testid={testId}
        backgroundColor={backgroundColor}
        {...rest}
      >
        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonPrev
            onClick={handleClickPrev}
            buttonVisible={buttonVisiblePrev}
            data-testid="buttonPrev"
          >
            <AngleLeftIcon
              size={16}
              color={
                isInverse ? magma.colors.neutral08 : magma.colors.neutral02
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
            centered={centered}
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
                index,
                isInverse
              });

              return (
                <StyledTabsChild
                  borderPosition={borderPosition}
                  fullWidth={fullWidth}
                  isActive={isActive}
                  key={index}
                  ref={buttonRefArray[index]}
                  orientation={orientation}
                  onClick={e => changeHandler(index, e)}
                  role="tab"
                >
                  {child}
                </StyledTabsChild>
              );
            })}
          </StyledTabs>
        </StyledTabsWrapper>

        {scrollButtons && orientation === 'horizontal' ? (
          <StyledButtonNext
            onClick={handleClickNext}
            buttonVisible={buttonVisibleNext}
            data-testid="buttonNext"
          >
            <AngleRightIcon
              size={16}
              color={
                isInverse ? magma.colors.neutral08 : magma.colors.neutral02
              }
            />
          </StyledButtonNext>
        ) : null}
      </StyledContainer>
    );
  }
);
