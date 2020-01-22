import React from 'react';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';

export type IconOrientation = 'left' | 'top';

interface StyledTabProps {
  disabled?: boolean;
  fullWidth?: boolean;
  iconOrientation: IconOrientation;
  isActive?: boolean;
  isInverse?: boolean;
  orientation?: any;
}

const StyledTab = styled.button<StyledTabProps>`
  align-items: ${props => (props.iconOrientation === 'left' ? '' : 'center')};
  background: transparent;
  border: 0;
  bottom: ${props => (props.disabled ? 0 : '')};
  color: ${props =>
    props.isActive && !props.isInverse
      ? magma.colors.primary
      : props.isInverse
      ? magma.colors.neutral08
      : magma.colors.neutral01};
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  display: flex;
  flex-direction: ${props =>
    props.iconOrientation === 'left' ? '' : 'column'};
  font-size: inherit;
  justify-content: center;
  height: 100%;
  margin: ${props => (props.disabled ? 'auto' : '')};
  min-width: 0;
  opacity: ${props => (props.isActive ? 1 : props.disabled ? 0.4 : '70%')};
  overflow: ${props => (props.disabled ? 'hidden' : '')};
  padding: 10px 20px;
  position: relative;
  pointer-events: ${props => (props.disabled ? 'none' : '')};
  text-transform: uppercase;
  top: ${props => (props.disabled ? 0 : '')};
  width: ${props =>
    props.fullWidth || props.orientation === 'vertical' ? '100%' : 'auto'};

  &:hover,
  &:focus {
    background-color: ${props =>
      props.isActive
        ? ''
        : props.isInverse
        ? magma.colors.shade02
        : magma.colors.shade01};
    color: ${props =>
      props.isInverse
        ? magma.colors.neutral08
        : props.isActive && !props.isInverse
        ? magma.colors.primary
        : magma.colors.neutral01};
  }

  &:focus {
    outline-offset: -2px;
    outline: ${props =>
        props.isInverse ? magma.colors.neutral08 : magma.colors.focus}
      dotted 2px;
  }

  &:active {
    color: ${props => (props.isActive ? magma.colors.primary : '')};
  }
`;

export interface IStyledCustomTabProps {
  component: React.ReactNode;
  disabled?: boolean;
  style?: { [key: string]: any };
  onClick?: any;
  ref: React.Ref<any>;
}

export const StyledCustomTab: React.FunctionComponent<
  IStyledCustomTabProps
> = ({ component, disabled, style, onClick, ref }) => {
  if (React.isValidElement(component) && React.isValidElement(component)) {
    return React.cloneElement(component, {
      style: disabled
        ? {
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            top: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            cursor: 'auto',
            minHeight: '50px',
            height: '100%',
            margin: 'auto',
            justifyContent: 'center',
            opacity: 0.4,
            padding: '10px',
            boxSizing: 'border-box'
          }
        : {
            display: 'flex',
            color: 'inherit',
            fontSize: 'inherit',
            justifyContent: 'center',
            cursor: 'pointer',
            minWidth: '150px',
            minHeight: '50px',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            padding: '10px',
            boxSizing: 'border-box'
          },
      ...style,
      onClick,
      ref
    });
  }

  return null;
};

const StyledIcon = styled.div<{
  iconOrientation: IconOrientation;
}>`
  margin-right: ${props => (props.iconOrientation === 'left' ? '10px' : '')};
`;

export interface ITabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  component?: React.ReactElement<any> | React.ReactElement<any>[];
  fullWidth?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconOrientation?: IconOrientation;
  ariaLabel?: string;
  testId?: string;
  changeHandler?: (index: number) => void;
  index?: number;
  isActive?: boolean;
  path?: string;
  isInverse?: boolean;
}

export const Tab: React.FunctionComponent<ITabProps> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      component,
      disabled,
      icon,
      iconOrientation,
      ariaLabel,
      testId,
      changeHandler,
      index,
      isActive,
      path,
      isInverse,
      fullWidth,
      ...rest
    } = props;

    React.useEffect(() => {
      path && path === window.location.pathname && changeHandler(index);
    }, [path]);

    if (component) {
      return (
        <StyledCustomTab
          ref={ref}
          component={component}
          disabled={disabled}
          data-testid={testId}
          aria-label={ariaLabel}
          aria-selected={isActive}
          {...rest}
        >
          {children}
        </StyledCustomTab>
      );
    } else {
      if (icon) {
        return (
          <StyledTab
            isInverse={isInverse}
            ref={ref}
            disabled={disabled}
            iconOrientation={iconOrientation}
            data-testid={testId}
            aria-label={ariaLabel}
            isActive={isActive}
            aria-selected={isActive}
          >
            <StyledIcon iconOrientation={iconOrientation}>{icon}</StyledIcon>
            {children}
          </StyledTab>
        );
      } else {
        return (
          <StyledTab
            isInverse={isInverse}
            ref={ref}
            aria-label={ariaLabel}
            iconOrientation={iconOrientation}
            disabled={disabled}
            data-testid={testId}
            isActive={isActive}
            aria-selected={isActive}
            fullWidth={fullWidth}
          >
            {children}
          </StyledTab>
        );
      }
    }
  }
);

Tab.displayName = 'Tab';
