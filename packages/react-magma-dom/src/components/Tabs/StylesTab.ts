import React from 'react';
import styled from '@emotion/styled';

export type IconOrientation = 'left' | 'top';

export const StyledTab = styled.button<{
  disabled?: boolean;
  iconOrientation: IconOrientation;
  theme: any;
  isActive: boolean;
  styles: { [key: string]: any };
}>(
  ({ styles, theme }) => ({
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
      outline: `${theme.focusColor} dotted 2px`
    }
  }),
  ({ disabled }) =>
    disabled
      ? {
          position: 'absolute',
          bottom: 0,
          top: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          cursor: 'auto',
          margin: 'auto',
          opacity: 0.5,
          tabIndex: -1
        }
      : {
          cursor: 'pointer'
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
          color: theme.activeColor
        }
      : {
          ['&:hover']: {
            backgroundColor: theme.bgHoverColor,
            color: theme.hoverColor
          },
          ['&:active']: {
            color: theme.activeColor
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

export const StyledCustomTab: React.FC<IStyledCustomTabProps> = ({
  component,
  disabled,
  style,
  onClick,
  ref
}) => {
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
            opacity: 0.5,
            tabIndex: -1,
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
            ['&:hover']: {
              backgroundColor: 'green',
              color: 'red'
            },
            ['&:active']: {
              color: 'red'
            },
            padding: '10px',
            boxSizing: 'border-box',
            tabIndex: 1
          },
      ...style,
      onClick,
      ref
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(
      'REACT MAGMA: invalid children or custom component was given to Tab component'
    );
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
