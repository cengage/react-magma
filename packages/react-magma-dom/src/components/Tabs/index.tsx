import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { AngleRightIcon } from '../Icon/types/AngleRightIcon';
import { AngleLeftIcon } from '../Icon/types/AngleLeftIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTabsContext } from './TabsContainer';
import isPropValid from '@emotion/is-prop-valid';
import { Omit } from '../utils';

const StyledContainer = styled('div', { shouldForwardProp: isPropValid })<{
  orientation: TabsOrientation;
  isInverse: boolean;
  backgroundColor: string;
}>`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
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

const StyledTabsChild = styled('div', { shouldForwardProp: isPropValid })<{
  borderPosition?: TabsBorderPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
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
  top = 'top'
}

export enum TabsIconPosition {
  left = 'left',
  top = 'top'
}

export interface VerticalTabsProps {
  orientation?: TabsOrientation.vertical;
  borderPosition?: TabsBorderPosition.left;
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
  iconPosition?: 'left' | 'top';
  isFullWidth?: boolean;
  isInverse?: boolean;
  hasScrollButtons?: boolean;
  onChange?: (newActiveIndex: number) => void;
  testId?: string;
}

export const Tabs: React.FC<TabsProps & Orientation> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      alignment,
      backgroundColor,
      borderPosition,
      children,
      isFullWidth,
      isInverse,
      hasScrollButtons,
      orientation,
      onChange,
      iconPosition,
      testId,
      ...rest
    } = props;
    const { activeTabIndex, setActiveTabIndex } = useTabsContext();

    const [buttonVisiblePrev, setButtonPrevState] = React.useState(false);
    const [buttonVisibleNext, setButtonNextState] = React.useState(false);
    const arrChildren = React.Children.toArray(children);

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

    React.useEffect(() => {
      const {
        scrollLeft: scrollPositionSize,
        scrollWidth: scrollSize,
        offsetWidth: offsetBoxSize
      } = divRef.current;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);
    }, []);

    function changeHandler(
      newActiveIndex: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
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
      } = divRef.current;
      const offsetTabSize = buttonRefArray[0].current.offsetWidth;

      const currentTabIndex = Math.round(
        (Number(offsetBoxSize) + Number(scrollPositionSize)) / offsetTabSize
      );

      currentTabIndex <= arrChildren.length - 1
        ? buttonRefArray[currentTabIndex].current.scrollIntoView(scrollOptions)
        : buttonRefArray[arrChildren.length - 1].current.scrollIntoView(
            scrollOptions
          );
    }

    function handleClickPrev() {
      const {
        scrollLeft: scrollPositionSize,
        offsetWidth: offsetBoxSize
      } = divRef.current;
      const offsetTabSize = buttonRefArray[1].current.offsetWidth;

      const currentTabIndex = Math.round(
        scrollPositionSize / offsetTabSize - offsetBoxSize / offsetTabSize
      );

      currentTabIndex >= 0
        ? buttonRefArray[currentTabIndex].current.scrollIntoView(scrollOptions)
        : buttonRefArray[0].current.scrollIntoView(scrollOptions);
    }

    function handleScroll() {
      const {
        scrollLeft: scrollPositionSize,
        scrollWidth: scrollSize,
        offsetWidth: offsetBoxSize
      } = divRef.current;

      scrollSize - scrollPositionSize === offsetBoxSize
        ? setButtonNextState(false)
        : setButtonNextState(true);

      scrollPositionSize > 0
        ? setButtonPrevState(true)
        : setButtonPrevState(false);
    }

    const theme = React.useContext(ThemeContext);

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
          ref={divRef}
          onScroll={handleScroll}
          orientation={orientation}
        >
          <StyledTabs
            aria-label={rest['aria-label']}
            alignment={alignment ? alignment : TabsAlignment.left}
            orientation={orientation}
            role="tablist"
          >
            {arrChildren.map((childItem: any, index) => {
              const isActive = index === activeTabIndex;

              const child: any = React.cloneElement(childItem, {
                isActive,
                changeHandler,
                iconPosition:
                  orientation === TabsOrientation.vertical
                    ? TabsIconPosition.left
                    : iconPosition,
                index,
                isInverse,
                isFullWidth,
                orientation
              });

              return (
                <StyledTabsChild
                  borderPosition={borderPosition}
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
