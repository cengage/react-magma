import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { TabsIconPosition, TabsBorderPosition, TabsContext } from './Tabs';
import { TabsOrientation } from './shared';
import { useForceUpdate, useForkedRef } from '../../utils';
import { TabsContainerContext } from './TabsContainer';
export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  /**
   * If true, the component will display with the active/selected state
   * @default false
   */
  isActive?: boolean;
  isInverse?: boolean;
  testId?: string;
}

export const StyledTabsChild = styled('li', {
  shouldForwardProp: isPropValid,
})<{
  borderPosition?: TabsBorderPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
}>`
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
      props.isInverse ? 'var(--colors-pop02)' : 'var(--colors-primary)'};
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

export const TabStyles = props => css`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${props.isActive && !props.isInverse
    ? 'var(--colors-primary)'
    : props.isInverse
    ? 'var(--colors-neutral08)'
    : 'var(--colors-neutral03)'};
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  display: flex;
  flex-direction: ${getFlexDirection(props.iconPosition)};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-weight: 600;
  font-size: var(--typeScale-size02-fontSize);
  line-height: var(--typeScale-size02-lineHeight);
  height: 100%;
  justify-content: ${props.iconPosition === 'left' ? 'flex-start' : 'center'};
  opacity: ${props.disabled
    ? 0.4
    : props.isInverse && !props.isActive
    ? 0.7
    : 1};
  padding: var(--spaceScale-spacing04) var(--spaceScale-spacing05);
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
      ? 'var(--colors-shade02)'
      : 'var(--colors-shade)'};
    color: ${props.isActive
      ? props.isInverse
        ? 'var(--colors-neutral08)'
        : 'var(--colors-primary)'
      : props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral02)'};
  }

  &:focus {
    outline-offset: -2px;
    outline: ${props.isInverse
        ? 'var(--colors-focusInverse)'
        : 'var(--colors-focus)'}
      dotted 2px;
  }
`;

const StyledTab = styled('button', { shouldForwardProp: isPropValid })<{
  borderPosition?: TabsBorderPosition;
  iconPosition?: TabsIconPosition;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation: TabsOrientation;
}>`
  ${TabStyles}
`;

function getIconMargin(props) {
  if (props.isIconOnly) {
    return `0`;
  }

  switch (props.iconPosition) {
    case TabsIconPosition.left:
      return '0 var(--spaceScale-spacing03) 0 0';
    case TabsIconPosition.right:
      return '0 0 0 var(--spaceScale-spacing03)';
    case TabsIconPosition.top:
      return '0 0 var(--spaceScale-spacing02)';
    case TabsIconPosition.bottom:
      return 'var(--spaceScale-spacing02) 0 0';
    default:
      return '0 0 var(--spaceScale-spacing02)';
  }
}

export const StyledIcon = styled.span<{
  iconPosition: TabsIconPosition;
  isIconOnly?: boolean;
}>`
  display: flex;
  margin: ${props => getIconMargin(props)};

  svg {
    height: 20px;
    width: 20px;
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
        isActive={isActive}
        isFullWidth={isFullWidth}
        isInverse={isInverse}
        orientation={orientation}
        role="presentation"
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
      </StyledTabsChild>
    );
  }
);
