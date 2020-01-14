import React from 'react';
import styled from '@emotion/styled';
import { AngleRightIcon } from '../../components/Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../../components/Icon/types/AngleLeftIcon';
import { magma } from '../../theme/magma';
import { useTabsContext } from './TabsContainer';

const StyledTabs = styled.div<{
  ['aria-label']: TabsAriaLabel;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  height: auto;
  align-items: center;
  justify-content: space-between;
  flex-basis: 100%;
  flex-direction: ${props => (props.orientation === 'vertical' ? '' : 'row')};
`;

const StyledTabsChild = styled.div<{
  length: number;
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
}>`
  display: flex;
  flex-grow: 0;
  text-align: center;
  list-style: none;
  align-self: center;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  justify-content: center;
  flex-basis: ${props => 100 / props.length}%;
  height: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
  width: ${props =>
    props.orientation === 'vertical' ? '100%' : `${100 / props.length}%`};
  max-width: 264px;
  min-height: 50px;
  min-width: 150px;
  color: ${magma.colors.neutral01};
`;

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
  isInverse: boolean;
}>`
  position: absolute;
  background-color: ${props =>
    props.isInverse ? magma.colors.pop02 : magma.colors.primary};
  transition: ${props =>
      getTransitionSpeed(props.previousActiveTab, props.activeTabIndex)}s
    ease-in-out;
  border-radius: 8px;
  left: ${props =>
    props.orientation === 'vertical'
      ? 0
      : `${(100 / props.length) * props.activeTabIndex}%`};
  top: ${props =>
    props.orientation === 'vertical'
      ? `${(100 / props.length) * props.activeTabIndex}%`
      : props.orientation === 'horizontal' && props.borderPosition === 'top'
      ? 0
      : ''};
  height: ${props =>
    props.orientation === 'vertical' ? `${100 / props.length}%` : '4px'};
  min-height: ${props =>
    props.orientation === 'vertical' ? `${100 / props.length}%` : ''};
  min-width: ${props => (props.orientation === 'vertical' ? '4px' : '150px')};
  width: ${props =>
    props.orientation === 'vertical' ? '4px' : `${100 / props.length}%`};
  bottom: ${props =>
    props.orientation === 'horizontal' && props.borderPosition === 'top'
      ? ''
      : 0};
`;

const StyledTabsWrapper = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  centered: boolean;
}>`
  display: flex;
  overflow-y: hidden;
  height: auto;
  position: relative;
  flex-basis: 100%;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
  overflow: ${props => (props.orientation === 'vertical' ? 'hidden' : '')};
  overflow-x: ${props => (props.orientation === 'vertical' ? '' : 'auto')};
  justify-content: ${props => (props.centered ? 'center' : '')};
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

const StyledContainer = styled.div<{
  orientation: TabsOrientationVertical | TabsOrientationHorizontal;
  isInverse: boolean;
  backgroundColor: string;
}>`
  display: flex;
  overflow-x: auto;
  background-color: 'transparent';
  box-shadow: none;
  flex-basis: ${props => (props.orientation === 'horizontal' ? '100%' : '')};
  flex-direction: ${props => (props.orientation === 'horizontal' ? 'row' : '')};
`;

const StyledTabsLayer = styled.div<{
  fullWidth: boolean;
}>`
  display: flex;
  align-items: stretch;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

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

export interface ITabsProps
  extends Exclude<
    React.ButtonHTMLAttributes<HTMLDivElement>['onChange'],
    React.ButtonHTMLAttributes<HTMLDivElement>
  > {
  activeIndex?: TabsActiveIndex;
  scrollButtons?: boolean;
  ariaLabel?: TabsAriaLabel;
  onChange?: (newActiveIndex: number) => void;
  centered?: boolean;
  fullWidth?: boolean;
  testId?: string;
  isInverse?: boolean;
  backgroundColor: string;
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
                  index,
                  isInverse
                });

                return (
                  <StyledTabsChild
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
                isInverse={isInverse}
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
