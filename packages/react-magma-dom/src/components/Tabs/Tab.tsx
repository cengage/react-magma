import React, { useContext, useEffect, forwardRef } from 'react';
import { defineTheme } from './themes';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTabsContext } from './TabsContainer';
// eslint-disable-next-line no-unused-vars
import {
  StyledCustomTab,
  StyledTab,
  StyledIcon,
  IconOrientation
} from './StylesTab';

export interface ITabProps {
  disabled?: boolean;
  component?: React.ReactElement<any> | React.ReactElement<any>[];
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconOrientation?: IconOrientation;
  ariaLabel?: string;
  testId?: string;
  defaultChangeHandler?: (index: number) => void;
  index?: number;
  isActive?: boolean;
  styles?: { [key: string]: any };
  path?: string;
}

export const Tab: React.FC<ITabProps> = forwardRef(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      component,
      disabled,
      icon,
      iconOrientation,
      ariaLabel,
      testId,
      defaultChangeHandler,
      index,
      isActive,
      styles,
      path
    } = props;

    const tabsThemeContext = useContext(ThemeContext);
    const { theme } = useTabsContext();

    useEffect(() => {
      path && path === window.location.pathname && defaultChangeHandler(index);
    }, [path]);

    const handleClick = (
      _index: number,
      event: React.MouseEvent<HTMLElement>
    ) => {
      (event.target as HTMLButtonElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      return defaultChangeHandler(_index);
    };

    if (children && component && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(
        "REACT MAGMA: Don't throw children inside Tab component, do it inside your custom component instead"
      );
    }

    return component ? (
      <StyledCustomTab
        ref={ref}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleClick(index, event)
        }
        component={component}
        disabled={disabled}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-pressed={isActive}
      >
        {children}
      </StyledCustomTab>
    ) : icon ? (
      <StyledTab
        ref={ref}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleClick(index, event)
        }
        theme={defineTheme(tabsThemeContext, theme)}
        disabled={disabled}
        iconOrientation={iconOrientation}
        data-testid={testId}
        aria-label={ariaLabel}
        isActive={isActive}
        styles={styles}
        aria-pressed={isActive}
      >
        <StyledIcon iconOrientation={iconOrientation}>{icon}</StyledIcon>
        {children}
      </StyledTab>
    ) : (
      <StyledTab
        ref={ref}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleClick(index, event)
        }
        theme={defineTheme(tabsThemeContext, theme)}
        aria-label={ariaLabel}
        iconOrientation={iconOrientation}
        disabled={disabled}
        data-testid={testId}
        isActive={isActive}
        styles={styles}
        aria-pressed={isActive}
      >
        {children}
      </StyledTab>
    );
  }
);

Tab.displayName = 'Tab';
