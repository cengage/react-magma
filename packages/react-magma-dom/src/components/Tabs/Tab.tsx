import React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { TabsOrientation, TabsTextTransform } from './shared';
import { TabsIconPosition, TabsBorderPosition, TabsContext } from './Tabs';
import { TabsContainerContext } from './TabsContainer';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { resolveProps, useForkedRef } from '../../utils';

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  isInverse?: boolean;
  /**
   * If true, the tab will have no styles and will render the children directly.
   * @internal
   */
  unstyled?: boolean;
  /**
   * Determines whether the tab appears in all-caps
   * @default TabsTextTransform.none
   */
  textTransform?: TabsTextTransform;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export const StyledTabsChild = styled('li', {
  shouldForwardProp: isPropValid,
})<{
  borderPosition?: TabsBorderPosition;
  disabled?: boolean;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
  theme: ThemeInterface;
  unstyled?: boolean;
}>`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  white-space: normal;

  ${props =>
    !props.unstyled &&
    css`
      cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
      flex-grow: 0;
      flex-shrink: ${props.isFullWidth ? '1' : '0'};
      height: ${props.orientation === 'vertical' ? 'auto' : '100%'};
      max-width: ${props.isFullWidth ? '100%' : '250px'};
      width: ${props.isFullWidth || props.orientation === 'vertical'
        ? '100%'
        : 'auto'};
      &:after {
        background: ${props.isActive
          ? props.theme.colors.brand.sunriseOrange
          : props.isInverse
            ? props.theme.colors.neutral600
            : props.theme.colors.neutral500};
        border-radius: 0;
        content: '';
        display: block;
        height: 2px;
        opacity: ${props.isActive ? '1' : '0'};
        position: absolute;
        transition: ${props.isActive ? '0.4s all' : 'none'};
        width: auto;
        bottom: ${props.borderPosition === 'top' ? 'auto' : '0'};
        left: ${props.isActive ? '0' : '50%'};
        right: ${props.isActive ? '0' : '50%'};
        top: ${props.borderPosition === 'top' ? '0' : 'auto'};
        z-index: 1;
        ${props.orientation === 'vertical' &&
        css`
          height: auto;
          bottom: ${props.isActive ? '0' : '50%'};
          left: ${props.borderPosition === 'right' ? 'auto' : '0'};
          right: ${props.borderPosition === 'right' ? '0' : 'auto'};
          top: ${props.isActive ? '0' : '50%'};
          width: 2px;
        `}
      }

      ${!props.disabled &&
      !props.isActive &&
      css`
        &:hover:after {
          opacity: 1;
          ${props.orientation === 'vertical'
            ? css`
                bottom: 0;
                top: 0;
              `
            : css`
                left: 0;
                right: 0;
              `}
        }
      `}
    `}
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

function buildTabStylesColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      return props.theme.colors.neutral600;
    }
    if (props.isActive) {
      return props.theme.colors.neutral0;
    }

    return props.theme.colors.neutral500;
  }

  if (props.disabled) {
    return props.theme.colors.neutral500;
  }
  if (props.isActive) {
    return props.theme.colors.brand.navy;
  }

  return props.theme.colors.neutral700;
}

export const TabStyles = props => css`
  align-items: center;
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: ${buildTabStylesColor(props)};
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  display: flex;
  flex-direction: ${getFlexDirection(props.iconPosition)};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-weight: ${props.isActive ? 600 : 400};
  font-size: ${props.theme.typeScale.size02.fontSize};
  font-family: ${props.theme.bodyFont};
  letter-spacing: ${props.theme.typeScale.size02.letterSpacing};
  line-height: ${props.theme.typeScale.size02.lineHeight};
  height: ${props.hasStackedIcon ? 'auto' : '40px'};
  justify-content: ${props.iconPosition === 'left' ? 'flex-start' : 'center'};
  padding: ${props.hasStackedIcon
    ? `${props.theme.spaceScale.spacing04} ${
        props.orientation === TabsOrientation.vertical
          ? props.theme.spaceScale.spacing05
          : props.theme.spaceScale.spacing03
      }`
    : `0 ${
        props.orientation === TabsOrientation.vertical
          ? props.theme.spaceScale.spacing05
          : props.theme.spaceScale.spacing03
      }`};
  position: relative;
  pointer-events: ${props.disabled ? 'none' : ''};
  text-align: center;
  text-decoration: none;
  text-transform: ${props.textTransform};
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

  &:hover {
    background-color: ${props.isActive
      ? ''
      : props.isInverse
        ? props.theme.colors.neutral900
        : props.theme.colors.neutral150};
    color: ${props.isActive
      ? props.isInverse
        ? props.theme.colors.neutral0
        : props.theme.colors.brand.navy
      : props.isInverse
        ? props.theme.colors.neutral0
        : props.theme.colors.brand.navy};
  }

  &:focus {
    background-color: ${props.isActive
      ? ''
      : props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral900)
        : transparentize(0.95, props.theme.colors.neutral900)};
    color: ${props.isActive
      ? props.isInverse
        ? props.theme.colors.neutral0
        : props.theme.colors.brand.navy
      : props.isInverse
        ? props.theme.colors.neutral0
        : props.theme.colors.neutral700};
    outline-offset: -2px;
    outline: 2px solid
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
  }
`;

const StyledTab = styled('button', { shouldForwardProp: isPropValid })<{
  borderPosition?: TabsBorderPosition;
  hasStackedIcon?: boolean;
  iconPosition?: TabsIconPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
  textTransform: TabsTextTransform;
  theme: ThemeInterface;
  unstyled?: boolean;
}>`
  ${props => (props.unstyled ? '' : TabStyles)}
`;

function getIconMargin(props) {
  if (props.isIconOnly) {
    return `0`;
  }

  switch (props.iconPosition) {
    case TabsIconPosition.left:
      return `0 ${props.theme.spaceScale.spacing03} 0 0`;
    case TabsIconPosition.right:
      return `0 0 0 ${props.theme.spaceScale.spacing03}`;
    case TabsIconPosition.top:
      return `0 0 ${props.theme.spaceScale.spacing02}`;
    case TabsIconPosition.bottom:
      return `${props.theme.spaceScale.spacing02} 0 0`;
    default:
      return `0 0 ${props.theme.spaceScale.spacing02}`;
  }
}

export const StyledIcon = styled.span<{
  iconPosition: TabsIconPosition;
  isIconOnly?: boolean;
  theme: ThemeInterface;
}>`
  display: flex;
  margin: ${props => getIconMargin(props)};

  svg {
    height: ${props => props.theme.iconSizes.small}px;
    width: ${props => props.theme.iconSizes.small}px;
  }
`;

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (props, forwardedRef) => {
    const contextProps = React.useContext(TabsContext);
    const resolvedProps = resolveProps(contextProps, props);
    const { children, icon, disabled, testId, unstyled, ...rest } =
      resolvedProps;
    const { activeTabIndex, instanceId } =
      React.useContext(TabsContainerContext);
    const { buttonRefArray, registerTabButton } = React.useContext(TabsContext);
    const ownRef = React.useRef<HTMLDivElement>();
    const forceUpdate = useForceUpdate();

    const index = buttonRefArray.current.findIndex(({ current: item }) => {
      if (!item || !ownRef.current) return false;

      return item === ownRef.current;
    });

    const isActive = index === activeTabIndex;

    const ref = useForkedRef(forwardedRef, ownRef);

    const {
      changeHandler,
      orientation,
      borderPosition,
      iconPosition,
      isInverse,
      isFullWidth,
      textTransform,
    } = resolvedProps;

    const handleClick = (index, e) => {
      changeHandler(index, e);

      props.onClick && typeof props.onClick === 'function' && props.onClick(e);
    };

    React.useEffect(() => {
      registerTabButton(buttonRefArray, ownRef);

      forceUpdate();
    }, [buttonRefArray, forceUpdate, registerTabButton]);

    const theme = React.useContext(ThemeContext);
    const isIconOnly = !children;

    let tabIconPosition = iconPosition;

    if (!tabIconPosition) {
      tabIconPosition =
        orientation === 'vertical'
          ? TabsIconPosition.left
          : TabsIconPosition.top;
    }

    const hasStackedIcon =
      Boolean(icon) &&
      (tabIconPosition === TabsIconPosition.top ||
        tabIconPosition === TabsIconPosition.bottom);

    const tabId = `tab-${instanceId}-${index}`;
    const panelId = `tabpanel-${instanceId}-${index}`;

    if (unstyled) {
      const child = React.Children.only(children) as React.ReactElement;

      const {
        // props to remove from rest
        borderPosition: _borderPosition,
        buttonRefArray: _buttonRefArray,
        changeHandler: _changeHandler,
        iconPosition: _iconPosition,
        isFullWidth: _isFullWidth,
        isInverse: _isInverse,
        orientation: _orientation,
        registerTabButton: _registerTabButton,
        textTransform: _textTransform,
        ...clonedElProps
      } = rest;

      return (
        <StyledTabsChild
          borderPosition={borderPosition}
          data-testid="tabContainer"
          disabled={disabled}
          isActive={isActive}
          isFullWidth={isFullWidth}
          isInverse={isInverse}
          orientation={orientation}
          role="presentation"
          theme={theme}
          unstyled
        >
          {React.cloneElement(child, {
            ...clonedElProps,
            'aria-controls': panelId,
            'aria-selected': isActive,
            disabled,
            id: tabId,
            onClick: e => handleClick(index, e),
            ref,
            role: 'tab',
            tabIndex: isActive ? 0 : -1,
          })}
        </StyledTabsChild>
      );
    }

    return (
      <StyledTabsChild
        borderPosition={borderPosition}
        data-testid="tabContainer"
        disabled={disabled}
        isActive={isActive}
        isFullWidth={isFullWidth}
        isInverse={isInverse}
        orientation={orientation}
        role="presentation"
        theme={theme}
      >
        <StyledTab
          {...rest}
          aria-controls={rest['aria-controls'] ?? panelId}
          aria-selected={isActive}
          data-testid={testId}
          disabled={disabled}
          hasStackedIcon={hasStackedIcon}
          iconPosition={tabIconPosition}
          id={tabId}
          isActive={isActive}
          isInverse={isInverse}
          isFullWidth={isFullWidth}
          onClick={e => handleClick(index, e)}
          orientation={orientation}
          ref={ref}
          role="tab"
          tabIndex={isActive ? 0 : -1}
          theme={theme}
          textTransform={textTransform}
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
      </StyledTabsChild>
    );
  }
);
