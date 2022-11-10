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
} from '../Tabs';
import { TabsOrientation } from '../Tabs/shared';
import { Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonNext, ButtonPrev } from '../Tabs/TabsScrollButtons';
import { useTabsMeta } from '../Tabs/utils';
import { useIsInverse } from '../../inverse';

export interface NavTabsProps extends Omit<TabsProps, 'onChange'> {}

interface NavTabsContextInterface {
  borderPosition?: TabsBorderPosition;
  firstRef?: boolean;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
}

export const NavTabsContext = React.createContext<NavTabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  firstRef: false,
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal,
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

  const { displayScroll } = tabsMeta;
  const { handleStartScrollClick, handleEndScrollClick, handleTabsScroll } =
    tabsHandleMethods;
  const { prevButtonRef, nextButtonRef, tabsWrapperRef } = tabsRefs;

  let firstRef = false;

  React.Children.forEach(children, (child: any, i) => {
    if (child.type.displayName === 'NavTab' && i === 0) {
      firstRef = true;
    }
  });

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
        >
          <NavTabsContext.Provider
            value={{
              borderPosition,
              firstRef,
              iconPosition,
              isInverse: isInverse,
              isFullWidth,
              orientation,
            }}
          >
            {children}
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
