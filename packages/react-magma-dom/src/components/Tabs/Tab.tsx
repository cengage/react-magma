import React from 'react';
import { defineTheme, useTabsContext } from './TabsContainer';
import { ThemeContext } from '../../theme/ThemeContext';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';

export type IconOrientation = 'left' | 'top';

const StyledTab = styled.button<{
  disabled?: boolean;
  iconOrientation: IconOrientation;
  theme: any;
  isActive: boolean;
  styles: { [key: string]: any };
}>(
  ({ styles }) => ({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '50px',
    minWidth: '150px',
    fontSize: 'inherit',
    width: '100%',
    height: '100%',
    padding: '10px',
    border: 0,
    background: 'transparent',
    textTransform: 'uppercase',
    color: 'inherit',
    ...styles,
    ['&:focus']: {
      outlineOffset: '-2px',
      outline: `${magma.colors.focus} dotted 2px`
    }
  }),
  ({ disabled, theme }) =>
    disabled
      ? {
          position: 'absolute',
          bottom: 0,
          top: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          cursor: 'auto',
          margin: 'auto',
          opacity: 0.4
        }
      : {
          cursor: 'pointer',
          opacity: theme.opacity
        },
  ({ iconOrientation }) =>
    iconOrientation === 'left'
      ? {}
      : {
          flexDirection: 'column',
          alignItems: 'center'
        },
  ({ isActive, theme }) =>
    isActive
      ? {
          color: theme.activeColor,
          opacity: 1,
          ['&:active']: {
            color: theme.activeColor
          }
        }
      : {
          ['&:hover']: {
            backgroundColor: theme.bgHoverColor,
            color: theme.hoverColor,
            opacity: theme.hoverOpacity
          }
        }
);

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

export const StyledIcon = styled.div<{
  iconOrientation: string;
}>(({ iconOrientation }) =>
  iconOrientation && iconOrientation === 'left'
    ? {
        marginRight: '10px'
      }
    : {}
);

export interface ITabProps {
  disabled?: boolean;
  component?: React.ReactElement<any> | React.ReactElement<any>[];
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconOrientation?: IconOrientation;
  ariaLabel?: string;
  testId?: string;
  changeHandler?: (index: number) => void;
  index?: number;
  isActive?: boolean;
  styles?: { [key: string]: any };
  path?: string;
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
      styles,
      path
    } = props;

    const tabsThemeContext = React.useContext(ThemeContext);
    const { theme } = useTabsContext();

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
        >
          {children}
        </StyledCustomTab>
      );
    } else {
      if (icon) {
        return (
          <StyledTab
            ref={ref}
            theme={defineTheme(tabsThemeContext, theme)}
            disabled={disabled}
            iconOrientation={iconOrientation}
            data-testid={testId}
            aria-label={ariaLabel}
            isActive={isActive}
            styles={styles}
            aria-selected={isActive}
          >
            <StyledIcon iconOrientation={iconOrientation}>{icon}</StyledIcon>
            {children}
          </StyledTab>
        );
      } else {
        return (
          <StyledTab
            ref={ref}
            theme={defineTheme(tabsThemeContext, theme)}
            aria-label={ariaLabel}
            iconOrientation={iconOrientation}
            disabled={disabled}
            data-testid={testId}
            isActive={isActive}
            styles={styles}
            aria-selected={isActive}
          >
            {children}
          </StyledTab>
        );
      }
    }
  }
);

Tab.displayName = 'Tab';
