import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/themeContext';
import { TooltipCore } from 'react-magma-core';

export enum EnumTooltipPosition {
  bottom = 'bottom', //default
  left = 'left',
  right = 'right',
  top = 'top'
}

export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  inverse?: boolean;
  position?: EnumTooltipPosition;
  trigger: React.ReactElement;
}

export interface ITooltipState {
  id?: string;
  isVisible?: boolean;
}

const ToolTipContainer = styled.div`
  display: inline;
  position: relative;
`;

const StyledTooltip = styled.div<{
  position: EnumTooltipPosition;
  visible?: boolean;
}>`
  display: ${props => (props.visible ? 'block' : 'none')};
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  text-align: center;
  width: 300px;
  z-index: 999;

  ${props =>
    props.position === 'bottom' &&
    css`
      top: 100%;
      margin-top: 10px;
      left: 50%;
      transform: translateX(-50%);
    `}

  ${props =>
    props.position === 'left' &&
    css`
      right: 100%;
      margin-right: 10px;
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'right' &&
    css`
      left: 100%;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'top' &&
    css`
      bottom: 100%;
      margin-bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    `}
`;

const StyledTooltipInner = styled.div<{
  inverse: boolean;
  position: EnumTooltipPosition;
}>`
  background: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
  border-radius: 3px;
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral02
      : props.theme.colors.neutral08};
  display: inline-block;
  padding: 3px 5px;
  position: relative;

  &:before,
  &:after {
    border-left-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.inverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral02
        : 'transparent'};
    border-right-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.inverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral02
        : 'transparent'};
    border-top-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.inverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral02};
    border-bottom-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.inverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral02};
    border-style: solid;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
  }

  ${props =>
    (props.position === 'left' || props.position === 'right') &&
    css`
      position: absolute;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'bottom' &&
    css`
      &:after {
        border-width: 0 5px 5px 5px;
        bottom: auto;
        top: -5px;
      }

      &:before {
        bottom: auto;
        border-width: 0 7px 7px 7px;
        top: -7px;
      }
    `}

  ${props =>
    props.position === 'left' &&
    css`
      right: 0;

      &:before,
      &:after {
        left: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        right: -5px;
        border-width: 5px 0 5px 5px;
      }

      &:before {
        right: -7px;
        border-width: 7px 0 7px 7px;
      }
    `}

  ${props =>
    props.position === 'right' &&
    css`
      left: 0;

      &:before,
      &:after {
        right: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        left: -5px;
        border-width: 5px 5px 5px 0;
      }

      &:before {
        left: -7px;
        border-width: 7px 7px 7px 0;
      }
    `}

  ${props =>
    props.position === 'top' &&
    css`
      &:after {
        bottom: -5px;
        top: auto;
        border-width: 5px 5px 0 5px;
      }

      &:before {
        bottom: -7px;
        top: auto;
        border-width: 7px 7px 0 7px;
      }
    `}
`;

export const Tooltip: React.FunctionComponent<ITooltipProps> = React.forwardRef(
  (props: ITooltipProps, ref: any) => {
    return (
      <TooltipCore id={props.id}>
        {({ id, hideTooltip, showTooltip, onKeyDown, isVisible }) => {
          const { content, inverse, position, trigger } = props;

          return (
            <ToolTipContainer>
              {React.cloneElement(trigger, {
                'aria-describedby': id,
                onKeyDown,
                onBlur: hideTooltip,
                onFocus: showTooltip,
                onMouseLeave: hideTooltip,
                onMouseEnter: showTooltip,
                ref
              })}
              <ThemeContext.Consumer>
                {theme => (
                  <StyledTooltip
                    id={id}
                    position={position ? position : EnumTooltipPosition.top}
                    role="tooltip"
                    visible={isVisible}
                  >
                    <StyledTooltipInner
                      inverse={inverse}
                      position={position ? position : EnumTooltipPosition.top}
                      theme={theme}
                    >
                      {content}
                    </StyledTooltipInner>
                  </StyledTooltip>
                )}
              </ThemeContext.Consumer>
            </ToolTipContainer>
          );
        }}
      </TooltipCore>
    );
  }
);
