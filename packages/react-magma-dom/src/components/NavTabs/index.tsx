import * as React from 'react';
import {
  StyledContainer,
  StyledTabsWrapper,
  StyledTabs,
  TabsAlignment,
  TabsBorderPosition,
  TabsIconPosition,
  TabsOrientation
} from '../Tabs';

import { ThemeContext } from '../../theme/ThemeContext';

export interface NavTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment?: TabsAlignment;
  borderPosition?: TabsBorderPosition;
  backgroundColor?: string;
  children?: any;
  iconPosition?: TabsIconPosition;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  testId?: string;
}

interface NavTabsContextInterface {
  borderPosition?: TabsBorderPosition;
  iconPosition?: TabsIconPosition;
  isInverse?: boolean;
  isFullWidth?: boolean;
  orientation?: TabsOrientation;
}

export const NavTabsContext = React.createContext<NavTabsContextInterface>({
  borderPosition: TabsBorderPosition.bottom,
  iconPosition: TabsIconPosition.left,
  isInverse: false,
  isFullWidth: false,
  orientation: TabsOrientation.horizontal
});

export const NavTabs: React.FunctionComponent<NavTabsProps> = React.forwardRef(
  (
    {
      alignment,
      backgroundColor,
      borderPosition,
      children,
      iconPosition,
      isInverse,
      isFullWidth,
      orientation,
      testId,
      ...rest
    }: NavTabsProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

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
        <StyledTabsWrapper
          data-testid="navTabsWrapper"
          orientation={orientation}
        >
          <StyledTabs
            alignment={alignment ? alignment : TabsAlignment.left}
            orientation={orientation}
          >
            <NavTabsContext.Provider
              value={{
                borderPosition,
                iconPosition,
                isInverse,
                isFullWidth,
                orientation
              }}
            >
              {children}
            </NavTabsContext.Provider>
          </StyledTabs>
        </StyledTabsWrapper>
      </StyledContainer>
    );
  }
);
