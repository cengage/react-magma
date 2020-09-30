import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { css, jsx } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import {
  TabsIconPosition,
  TabsOrientation,
  TabsBorderPosition,
  TabsContext,
} from '.';
import { Omit, XOR } from '../../utils';
import { TabsContainerContext } from './TabsContainer';
import { ThemeInterface } from '../../theme/magma';

export interface BaseTabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  disabled?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconPosition?: TabsIconPosition;
  index?: number;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  ref?: any;
  testId?: string;
  theme?: any;
}

interface TabChildrenProps extends BaseTabProps {
  children: JSX.Element | string;
}

interface TabComponentProps extends BaseTabProps {
  component: React.ReactNode;
}

export type TabProps = XOR<TabChildrenProps, TabComponentProps>;

const StyledTabsChild = styled('div', { shouldForwardProp: isPropValid })<{
  borderPosition?: TabsBorderPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
  theme: ThemeInterface;
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
        left: ${props.borderPosition === 'right' ? 'auto' : '0'};
        right: ${props.borderPosition === 'right' ? '0' : 'auto'};
        top: ${props.isActive ? '0' : '50%'};

        width: 4px;
      `}
  }
`;

function getFlexDirection(position: TabsIconPosition) {
  switch (position) {
    case TabsIconPosition.left:
      return 'row';
    case TabsIconPosition.right:
      return 'row-reverse';
    case TabsIconPosition.top:
      return 'column';
    case TabsIconPosition.bottom:
      return 'column-reverse';
    default:
      return 'column';
  }
}

const TabStyles = props => css`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${props.isActive && !props.isInverse
    ? props.theme.colors.primary
    : props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral03};
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  display: flex;
  flex-direction: ${getFlexDirection(props.iconPosition)};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  height: 100%;
  justify-content: ${props.iconPosition === 'left' ? 'flex-start' : 'center'};
  opacity: ${props.disabled ? 0.4 : props.isInverse ? 0.7 : 1};
  padding: 13px 20px;
  position: relative;
  pointer-events: ${props.disabled ? 'none' : ''};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: ${props.isFullWidth ? '100%' : 'auto'};

  ${props.orientation === 'vertical' &&
  css`
    align-items: flex-start;
    justify-content: ${props.iconPosition === 'left'
      ? 'flex-start'
      : 'flex-end'};
    text-align: left;
    width: 100%;

    align-items: center;
  `}

  &:hover,
  &:focus {
    background-color: ${props.isActive
      ? ''
      : props.isInverse
      ? props.theme.colors.shade02
      : props.theme.colors.shade01};
    color: ${props.isActive
      ? ''
      : props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
    opacity: ${props.disabled ? 0.4 : 1};
  }

  &:focus {
    outline-offset: -2px;
    outline: ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus}
      dotted 2px;
  }
`;

const StyledTab = styled('button', { shouldForwardProp: isPropValid })<
  BaseTabProps
>`
  ${TabStyles}
`;

export const StyledCustomTab: React.FunctionComponent<TabComponentProps> = ({
  children,
  component,
  icon,
  index,
  style,
  onClick,
  ref,
  ...props
}) => {
  if (React.isValidElement(component) && React.isValidElement(component)) {
    const cloneElement = (element, newProps) => {
      return jsx(element.type, {
        key: element.key,
        ref: element.ref,
        ...element.props,
        ...newProps,
      });
    };

    return cloneElement(component, {
      ...props,
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
};

function getIconMargin(props) {
  if (props.isIconOnly) {
    return '3px 0';
  }

  switch (props.iconPosition) {
    case TabsIconPosition.left:
      return '0 15px 0 0';
    case TabsIconPosition.right:
      return '0 0 0 15px';
    case TabsIconPosition.top:
      return '0 0 5px';
    case TabsIconPosition.bottom:
      return '5px 0 0';
    default:
      return '0 0 5px';
  }
}

const StyledIcon = styled.span<{
  iconPosition: TabsIconPosition;
  isIconOnly?: boolean;
}>`
  display: flex;
  margin: ${props => getIconMargin(props)};

  svg {
    height: 17px;
    width: 17px;
  }
`;

function instanceOfComponentTab(object: any): object is TabComponentProps {
  return 'component' in object && !('children' in object);
}

function instanceOfChildrenTab(object: any): object is TabChildrenProps {
  return !('component' in object) && 'children' in object;
}

export const Tab: React.FunctionComponent<TabProps> = React.forwardRef(
  (
    props: Omit<React.PropsWithChildren<TabProps>, 'children'>,
    ref: React.Ref<any>
  ) => {
    let component;
    let children;
    const { icon, index, testId, ...rest } = props;
    const { activeTabIndex } = React.useContext(TabsContainerContext);
    const isActive = index === activeTabIndex;

    const {
      changeHandler,
      orientation,
      borderPosition,
      iconPosition,
      isInverse,
      isFullWidth,
    } = React.useContext(TabsContext);

    if (instanceOfComponentTab(props)) {
      component = props.component;
    } else if (instanceOfChildrenTab(props)) {
      children = props.children;
    }

    const theme = React.useContext(ThemeContext);
    const isIconOnly = !children;

    const tabIconPosition = iconPosition
      ? iconPosition
      : orientation === 'vertical'
      ? TabsIconPosition.left
      : TabsIconPosition.top;

    return (
      <StyledTabsChild
        aria-selected={isActive}
        borderPosition={borderPosition}
        data-testid="tabContainer"
        isActive={isActive}
        isFullWidth={isFullWidth}
        isInverse={isInverse}
        ref={ref}
        orientation={orientation}
        onClick={e => changeHandler(index, e)}
        role="tab"
        theme={theme}
      >
        {component ? (
          <StyledCustomTab
            {...rest}
            component={component}
            data-testid={testId}
            iconPosition={tabIconPosition}
            icon={
              icon && (
                <StyledIcon iconPosition={tabIconPosition}>{icon}</StyledIcon>
              )
            }
            index={index}
            isActive={isActive}
            isInverse={isInverse}
            isFullWidth={isFullWidth}
            orientation={orientation}
            theme={theme}
          />
        ) : (
          <StyledTab
            {...rest}
            data-testid={testId}
            iconPosition={tabIconPosition}
            isActive={isActive}
            isInverse={isInverse}
            isFullWidth={isFullWidth}
            orientation={orientation}
            theme={theme}
          >
            {icon && (
              <StyledIcon
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
