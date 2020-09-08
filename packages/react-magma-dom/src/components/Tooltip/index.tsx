import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';

export enum EnumTooltipPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top' //default
}

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  containerStyle?: React.CSSProperties;
  content: React.ReactNode;
  isInverse?: boolean;
  position?: EnumTooltipPosition;
  testId?: string;
  ref?: React.Ref<HTMLDivElement>;
  tooltipStyle?: React.CSSProperties;
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
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
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
  isInverse: boolean;
  position: EnumTooltipPosition;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  border-radius: 3px;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral01
      : props.theme.colors.neutral08};
  display: inline-block;
  padding: 7px 10px;
  position: relative;

  &:before,
  &:after {
    border-left-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral01
        : 'transparent'};
    border-right-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral01
        : 'transparent'};
    border-top-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral01};
    border-bottom-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral01};
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

export const Tooltip: React.FunctionComponent<TooltipProps> = React.forwardRef(
  (props: TooltipProps, ref: any) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    }

    function showTooltip() {
      setIsVisible(true);
    }

    function hideTooltip() {
      setIsVisible(false);
    }

    const {
      children,
      content,
      containerStyle,
      id: defaultId,
      isInverse,
      position,
      testId,
      tooltipStyle,
      ...other
    } = props;

    const id = useGenerateId(defaultId);
    const theme = React.useContext(ThemeContext);

    if (Array.isArray(children)) {
      throw new Error('Tooltip children can only be one element.');
    }

    const tooltipTrigger = React.cloneElement(children, {
      'aria-describedby': id,
      onKeyDown: handleKeyDown,
      onBlur: hideTooltip,
      onFocus: showTooltip,
      onMouseLeave: hideTooltip,
      onMouseEnter: showTooltip,
      ref: ref
    });

    return (
      <ToolTipContainer {...other} data-testid={testId} style={containerStyle}>
        {tooltipTrigger}
        <StyledTooltip
          aria-hidden={!isVisible}
          id={id}
          position={position ? position : EnumTooltipPosition.top}
          role="tooltip"
          theme={theme}
          visible={isVisible}
        >
          <StyledTooltipInner
            isInverse={isInverse}
            position={position ? position : EnumTooltipPosition.top}
            style={tooltipStyle}
            theme={theme}
          >
            {content}
          </StyledTooltipInner>
        </StyledTooltip>
      </ToolTipContainer>
    );
  }
);
