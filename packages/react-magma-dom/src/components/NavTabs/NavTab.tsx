import * as React from 'react';
import styled from '@emotion/styled';

import { NavTabsContext } from './';
import { StyledTabsChild, StyledIcon, TabStyles } from '../Tabs/Tab';
import { TabsBorderPosition, TabsIconPosition, TabsOrientation } from '../Tabs';
import { ThemeContext } from '../../theme/ThemeContext';

export interface NavTabProps extends React.HTMLAttributes<HTMLAnchorElement> {
  borderPosition?: TabsBorderPosition;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconPosition?: TabsIconPosition;
  index?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  ref?: any;
  testId?: string;
  theme?: any;
  to: string;
}

const StyledTab = styled.a`
  ${TabStyles}
`;

export const NavTab: React.FunctionComponent<NavTabProps> = React.forwardRef(
  (
    { isActive, children, icon, testId, to, ...other }: NavTabProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);
    const isIconOnly = !children;

    const {
      orientation,
      borderPosition,
      iconPosition,
      isInverse,
      isFullWidth
    } = React.useContext(NavTabsContext);

    const tabIconPosition = iconPosition
      ? iconPosition
      : orientation === 'vertical'
      ? TabsIconPosition.left
      : TabsIconPosition.top;

    return (
      <StyledTabsChild
        borderPosition={borderPosition}
        data-testid="tabContainer"
        isActive={isActive}
        isFullWidth={isFullWidth}
        isInverse={isInverse}
        orientation={orientation}
        theme={theme}
      >
        <StyledTab
          {...other}
          ref={ref}
          data-testid={testId}
          href={to}
          isActive={isActive}
          isFullWidth={isFullWidth}
          iconPosition={tabIconPosition}
          isInverse={isInverse}
          orientation={orientation}
          theme={theme}
        >
          {icon && (
            <StyledIcon iconPosition={tabIconPosition} isIconOnly={isIconOnly}>
              {icon}
            </StyledIcon>
          )}
          {children}
        </StyledTab>
      </StyledTabsChild>
    );
  }
);
