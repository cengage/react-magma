import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { css, jsx } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { TabsIconPosition, TabsOrientation } from '.';

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  changeHandler?: (index: number) => void;
  component?: React.ReactElement<any> | React.ReactElement<any>[];
  disabled?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconPosition?: TabsIconPosition;
  isActive?: boolean;
  index?: number;
  path?: string;
  testId?: string;
}

interface StyledTabProps {
  component?: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  icon?: any;
  iconPosition?: TabsIconPosition;
  isFullWidth?: boolean;
  isInverse?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  orientation?: TabsOrientation;
  ref?: React.Ref<any>;
  role: string;
  style?: { [key: string]: any };
  theme?: any;
}

const TabStyles = props => css`
  align-items: ${props.iconPosition !== 'left' &&
  props.orientation === 'vertical'
    ? 'flex-start'
    : 'center'};
  background: transparent;
  border: 0;
  color: ${props.isActive && !props.isInverse
    ? props.theme.colors.primary
    : props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral01};
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  display: flex;
  flex-direction: ${props.iconPosition === 'left' ? '' : 'column'};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-size: 14px;
  font-weight: 600;
  justify-content: ${props.iconPosition === 'left' ||
  props.orientation === 'vertical'
    ? 'flex-start'
    : 'center'};
  line-height: 1.5;
  height: 100%;
  opacity: ${props.disabled ? 0.4 : props.isActive ? 1 : 0.7};
  padding: 13px 20px;
  position: relative;
  pointer-events: ${props.disabled ? 'none' : ''};
  text-align: ${props.orientation === 'vertical' ? 'left' : 'center'};
  text-decoration: none;
  text-transform: uppercase;
  width: ${props.isFullWidth || props.orientation === 'vertical'
    ? '100%'
    : 'auto'};

  &:hover,
  &:focus {
    background-color: ${props.isActive
      ? ''
      : props.isInverse
      ? props.theme.colors.shade02
      : props.theme.colors.shade01};
  }

  &:focus {
    outline-offset: -2px;
    outline: ${props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.focus}
      dotted 2px;
  }
`;

const StyledTab = styled('button', { shouldForwardProp: isPropValid })<
  StyledTabProps
>`
  ${TabStyles}
`;

export const StyledCustomTab: React.FunctionComponent<StyledTabProps> = ({
  children,
  component,
  icon,
  style,
  onClick,
  ref,
  ...props
}) => {
  if (React.isValidElement(component) && React.isValidElement(component)) {
    const cloneElement = (element, newProps) =>
      jsx(element.type, {
        key: element.key,
        ref: element.ref,
        ...element.props,
        ...newProps
      });

    return (
      <>
        {cloneElement(component, {
          css: TabStyles(props),
          ...style,
          onClick,
          ref,
          children: [icon, component.props.children]
        })}
      </>
    );
  }
};

const StyledIcon = styled.span<{
  iconPosition: TabsIconPosition;
  isIconOnly?: boolean;
}>`
  display: flex;
  margin: ${props =>
    props.isIconOnly
      ? '3px 0'
      : props.iconPosition === 'left'
      ? '0 15px 0 0'
      : '0 0 5px'}};

  svg {
    height: 17px;
    width: 17px;
  }
`;

export const Tab: React.FunctionComponent<TabProps> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      ariaLabel,
      changeHandler,
      children,
      component,
      icon,
      iconPosition,
      index,
      isActive,
      path,
      testId,
      ...rest
    } = props;

    React.useEffect(() => {
      path && path === window.location.pathname && changeHandler(index);
    }, [path]);

    const theme = React.useContext(ThemeContext);

    if (component) {
      return (
        <StyledCustomTab
          {...rest}
          aria-label={ariaLabel}
          aria-selected={isActive}
          component={component}
          data-testid={testId}
          iconPosition={iconPosition}
          icon={
            icon && <StyledIcon iconPosition={iconPosition}>{icon}</StyledIcon>
          }
          isActive={isActive}
          ref={ref}
          role="tab"
          theme={theme}
        >
          {children}
        </StyledCustomTab>
      );
    }

    return (
      <StyledTab
        {...rest}
        aria-label={ariaLabel}
        aria-selected={isActive}
        data-testid={testId}
        iconPosition={iconPosition}
        isActive={isActive}
        ref={ref}
        role="tab"
        theme={theme}
      >
        {icon && (
          <StyledIcon iconPosition={iconPosition} isIconOnly={!children}>
            {icon}
          </StyledIcon>
        )}
        {children}
      </StyledTab>
    );
  }
);

Tab.displayName = 'Tab';
