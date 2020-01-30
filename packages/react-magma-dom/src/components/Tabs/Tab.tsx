import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { css, jsx } from '@emotion/core';
import {
  IconOrientation,
  TabsOrientationHorizontal,
  TabsBorderPositionVertical
} from './Tabs';

export interface ITabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  changeHandler?: (index: number) => void;
  component?: React.ReactElement<any> | React.ReactElement<any>[];
  disabled?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconOrientation?: IconOrientation;
  isActive?: boolean;
  index?: number;
  path?: string;
  testId?: string;
}

interface StyledTabProps {
  component?: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  iconOrientation?: IconOrientation;
  isFullWidth?: boolean;
  isInverse?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  orientation?: TabsOrientationHorizontal | TabsBorderPositionVertical;
  ref?: React.Ref<any>;
  style?: { [key: string]: any };
  theme?: any;
}

const TabStyles = props => css`
  align-items: ${props.iconOrientation !== 'left' &&
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
  flex-direction: ${props.iconOrientation === 'left' ? '' : 'column'};
  flex-grow: 0;
  flex-shrink: ${props.isFullWidth ? '1' : '0'};
  font-size: 14px;
  font-weight: 600;
  justify-content: ${props.iconOrientation === 'left' ||
  props.orientation === 'vertical'
    ? 'flex-start'
    : 'center'};
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

const StyledTab = styled.button<StyledTabProps>`
  ${TabStyles}
`;

export const StyledCustomTab: React.FunctionComponent<StyledTabProps> = ({
  component,
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
          ref
        })}
      </>
    );
  }

  return null;
};

const StyledIcon = styled.span<{
  iconOrientation: IconOrientation;
}>`
  display: flex;
  margin-right: ${props => (props.iconOrientation === 'left' ? '10px' : '')};

  svg {
    height: 17px;
    width: 17px;
  }
`;

export const Tab: React.FunctionComponent<ITabProps> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      ariaLabel,
      changeHandler,
      children,
      component,
      icon,
      iconOrientation,
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
          iconOrientation={iconOrientation}
          isActive={isActive}
          ref={ref}
          theme={theme}
        >
          {icon && (
            <StyledIcon iconOrientation={iconOrientation}>{icon}</StyledIcon>
          )}
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
        iconOrientation={iconOrientation}
        isActive={isActive}
        ref={ref}
        theme={theme}
      >
        {icon && (
          <StyledIcon iconOrientation={iconOrientation}>{icon}</StyledIcon>
        )}
        {children}
      </StyledTab>
    );
  }
);

Tab.displayName = 'Tab';
