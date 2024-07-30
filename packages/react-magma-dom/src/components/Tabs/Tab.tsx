import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { TabsIconPosition, TabsBorderPosition, TabsContext } from './Tabs';
import { TabsOrientation } from './shared';
import { useForkedRef } from '../../utils';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { TabsContainerContext } from './TabsContainer';
import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: any;
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
}>`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  flex-grow: 0;
  flex-shrink: ${props => (props.isFullWidth ? '1' : '0')};
  height: ${props => (props.orientation === 'vertical' ? 'auto' : '100%')};
  list-style: none;
  margin: 0;
  max-width: ${props => (props.isFullWidth ? '100%' : '250px')};
  padding: 0;
  position: relative;
  white-space: normal;
  width: ${props =>
    props.isFullWidth || props.orientation === 'vertical' ? '100%' : 'auto'};

  &:after {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.tertiary
        : props.theme.colors.primary};
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

function buildTabStylesColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    if (props.isActive) {
      return props.theme.colors.neutral100;
    }
    return transparentize(0.3, props.theme.colors.neutral100);
  }

  if (props.disabled) {
    return transparentize(0.6, props.theme.colors.neutral500);
  }
  if (props.isActive) {
    return props.theme.colors.primary;
  }
  return props.theme.colors.neutral500;
}

export const TabStyles = props => css`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${buildTabStylesColor(props)};
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  display: flex;
  flex-direction: ${getFlexDirection(props.iconPosition)};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-weight: 500;
  font-size: ${props.theme.typeScale.size02.fontSize};
  font-family: ${props.theme.bodyFont};
  letter-spacing: ${props.theme.typeScale.size02.letterSpacing};
  line-height: ${props.theme.typeScale.size02.lineHeight};
  height: 100%;
  justify-content: ${props.iconPosition === 'left' ? 'flex-start' : 'center'};
  padding: ${props.theme.spaceScale.spacing04}
    ${props.theme.spaceScale.spacing05};
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
      ? transparentize(0.7, props.theme.colors.neutral900)
      : transparentize(0.95, props.theme.colors.neutral900)};
    color: ${props.isActive
      ? props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.primary
      : props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  }

  &:focus {
    outline-offset: -2px;
    outline: 2px solid
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
  }
`;

const StyledTab = styled('button', { shouldForwardProp: isPropValid })<{
  borderPosition?: TabsBorderPosition;
  iconPosition?: TabsIconPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
  theme: ThemeInterface;
}>`
  ${TabStyles}
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
    const { children, icon, disabled, testId, ...rest } = props;
    const { activeTabIndex } = React.useContext(TabsContainerContext);
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
    } = React.useContext(TabsContext);

    const handleClick = (index, e) => {
      changeHandler(index, e);

      props.onClick && typeof props.onClick === 'function' && props.onClick(e);
    };

    React.useEffect(() => {
      registerTabButton(buttonRefArray, ownRef);

      forceUpdate();
    }, []);

    const theme = React.useContext(ThemeContext);
    const isIconOnly = !children;

    const tabIconPosition = iconPosition
      ? iconPosition
      : orientation === 'vertical'
      ? TabsIconPosition.left
      : TabsIconPosition.top;

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
          aria-selected={isActive}
          data-testid={testId}
          disabled={disabled}
          iconPosition={tabIconPosition}
          isActive={isActive}
          isInverse={isInverse}
          isFullWidth={isFullWidth}
          onClick={e => handleClick(index, e)}
          orientation={orientation}
          ref={ref}
          role="tab"
          tabIndex={isActive ? 0 : -1}
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
      </StyledTabsChild>
    );
  }
);
