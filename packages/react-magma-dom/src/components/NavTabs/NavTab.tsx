import * as React from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';

import { NavTabsContext } from './NavTabs';
import {
  StyledTabsChild,
  StyledIcon,
  TabStyles,
  TabsIconPosition,
} from '../Tabs';
import { TabsOrientation } from '../Tabs/shared';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, useForkedRef, XOR } from '../../utils';

/**
 * @children required
 */
export interface BaseNavTabProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * @internal
   */
  css?: any; // Adding css prop to fix emotion error
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  /**
   * If true, the component will display with the active/selected state
   */
  isActive?: boolean;
  /**
   * If true, sets a focus on the specified NavTab
   */
  isFocused?: boolean;
  isInverse?: boolean;
  /**
   * Determines if the tabs are displayed vertically or horizontally
   * @default TabsOrientation.horizontal
   */
  orientation?: TabsOrientation;
  /**
   * @internal
   */
  testId?: string;
  to?: string;
  /**
   * @internal
   */
  theme?: any;
}

export interface NavTabChildrenProps extends BaseNavTabProps {
  children: JSX.Element | string;
  /**
   * The href value of the tab link
   */
  to: string;
}

export interface NavTabComponentProps extends BaseNavTabProps {
  /**
   * The prop for custom component instead of `a` in NavTab.
   */
  component: React.ReactNode;
  /**
   * The orientation of icon on NavTab
   */
  iconPosition?: TabsIconPosition;
  /**
   * If true, the tab will take up the full width of its container
   * @default false
   */
  isFullWidth?: boolean;
}

export type NavTabProps = XOR<NavTabChildrenProps, NavTabComponentProps>;

function instanceOfNavComponentTab(
  object: any
): object is NavTabComponentProps {
  return 'component' in object && !('children' in object);
}

function instanceOfNavChildrenTab(object: any): object is NavTabChildrenProps {
  return !('component' in object) && 'children' in object;
}

const StyledTab = styled.a<{
  borderPosition?: any;
  iconPosition?: TabsIconPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
  theme: any;
}>`
  ${TabStyles}
`;

export const StyledCustomTab = React.forwardRef<any, NavTabComponentProps>(
  (props, ref) => {
    const { children, component, icon, style, onClick, ...rest } = props;

    if (React.isValidElement(component) && React.isValidElement(component)) {
      const cloneElement = (element, newProps) => {
        return jsx(element.type, {
          key: element.key,
          ref: element.ref,
          ...element.props,
          ...newProps,
        });
      };

      const other = omit(
        ['iconPosition', 'isInverse', 'isActive', 'isFullWidth'],
        rest
      );

      return cloneElement(component, {
        ...other,
        css: TabStyles(props),
        ...style,
        onClick,
        ref,
        children: (
          <>
            {icon}
            {component.props.children}
          </>
        ),
      });
    }
  }
);

// Using any type because we do not know the element type of a custom tab
export const NavTab = React.forwardRef<any, NavTabProps>(
  (props, forwardRef) => {
    let children;
    let component;
    const { isActive, icon, isFocused, testId, to, ...other } = props;
    const theme = React.useContext(ThemeContext);

    if (instanceOfNavComponentTab(props)) {
      component = props.component;
    } else if (instanceOfNavChildrenTab(props)) {
      children = props.children;
    }

    const isIconOnly = !children;

    const {
      orientation,
      borderPosition,
      iconPosition,
      isInverse,
      isFullWidth,
    } = React.useContext(NavTabsContext);

    const tabIconPosition = iconPosition
      ? iconPosition
      : orientation === 'vertical'
      ? TabsIconPosition.left
      : TabsIconPosition.top;

    const styledTabRef = React.useRef<HTMLAnchorElement>();

    const ref = useForkedRef(forwardRef, styledTabRef);

    // Sets focus on NavTab for accessibility
    React.useEffect(() => {
      if (isFocused) {
        styledTabRef.current?.focus();
      }
    }, []);

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
        {component ? (
          <StyledCustomTab
            {...other}
            component={component}
            data-testid={testId}
            iconPosition={tabIconPosition}
            icon={
              icon && (
                <StyledIcon theme={theme} iconPosition={tabIconPosition}>
                  {icon}
                </StyledIcon>
              )
            }
            isActive={isActive}
            isInverse={isInverse}
            isFullWidth={isFullWidth}
            orientation={orientation}
            ref={ref}
            theme={theme}
          />
        ) : (
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
              <StyledIcon
                theme={theme}
                iconPosition={tabIconPosition}
                isIconOnly={isIconOnly}
              >
                {icon}
              </StyledIcon>
            )}
            {children}
          </StyledTab>
        )}
      </StyledTabsChild>
    );
  }
);
