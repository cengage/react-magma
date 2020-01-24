import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export type IconOrientation = 'left' | 'top';

interface StyledTabProps {
  disabled?: boolean;
  iconOrientation: IconOrientation;
  isActive?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  orientation?: any;
}

const StyledTab = styled.button<StyledTabProps>`
  align-items: ${props => (props.iconOrientation === 'left' ? '' : 'center')};
  background: transparent;
  border: 0;
  color: ${props =>
    props.isActive && !props.isInverse
      ? props.theme.colors.primary
      : props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  display: flex;
  flex-direction: ${props =>
    props.iconOrientation === 'left' ? '' : 'column'};
  font-size: inherit;
  justify-content: center;
  height: 100%;
  margin: ${props => (props.disabled ? 'auto' : '')};
  opacity: ${props => (props.isActive ? 1 : props.disabled ? 0.4 : '70%')};
  padding: 10px 20px;
  position: relative;
  pointer-events: ${props => (props.disabled ? 'none' : '')};
  text-align: ${props =>
    props.orientation === 'vertical' ? 'left' : 'center'};
  text-transform: uppercase;
  width: ${props =>
    props.isFullWidth || props.orientation === 'vertical' ? '100%' : 'auto'};

  &:hover,
  &:focus {
    background-color: ${props =>
      props.isActive
        ? ''
        : props.isInverse
        ? props.theme.colors.shade02
        : props.theme.colors.shade01};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.isActive && !props.isInverse
        ? props.theme.colors.primary
        : props.theme.colors.neutral01};
  }

  &:focus {
    outline-offset: -2px;
    outline: ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.focus}
      dotted 2px;
  }

  &:active {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.primary};
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
    return (
      <>
        {React.cloneElement(component, {
          style: disabled
            ? {
                alignItems: 'center',
                background: 'transparent',
                border: 0,
                color: 'inherit',
                display: 'flex',
                cursor: 'auto',
                height: '100%',
                margin: 'auto',
                justifyContent: 'center',
                padding: '10px 20px',
                position: 'relative',
                pointerEvents: 'none',
                opacity: 0.4
              }
            : {
                alignItems: 'center',
                background: 'transparent',
                border: '0',
                display: 'flex',
                color: 'inherit',
                cursor: 'pointer',
                height: '100%',
                justifyContent: 'center',
                padding: '10px 20px',
                textDecoration: 'none',
                width: '100%'
              },
          ...style,
          onClick,
          ref
        })}
      </>
    );
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
  isFullWidth?: boolean;
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
      isFullWidth,
      ...rest
    } = props;

    React.useEffect(() => {
      path && path === window.location.pathname && changeHandler(index);
    }, [path]);

    const theme = React.useContext(ThemeContext);

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
            theme={theme}
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
            isFullWidth={isFullWidth}
            theme={theme}
          >
            {children}
          </StyledTab>
        );
      }
    }
  }
);

Tab.displayName = 'Tab';
