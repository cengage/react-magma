import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';

export enum EnumTooltipPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top', //default
}

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Style properties for the arrow element
   */
  arrowStyle?: React.CSSProperties;
  /**
   * The element that triggers the tooltip when it is hovered or focused. Must be a react element (not a string) and should be a focusable element to meet a11y requirements
   */
  children: React.ReactElement;
  /**
   * Style properties for the component container element which includes both the tooltip trigger and the tooltip popover content
   */
  containerStyle?: React.CSSProperties;
  /**
   * The content of the tooltip
   */
  content: React.ReactNode;
  isInverse?: boolean;
  /**
   * Position the tooltip appears in relation to its trigger
   */
  position?: EnumTooltipPosition;
  testId?: string;
  /**
   * Style properties for the outer container of the tooltip popover content
   */
  tooltipPopoverStyle?: React.CSSProperties;
  /**
   * Style properties for the inner tooltip content
   */
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
  isInverse?: boolean;
  position: EnumTooltipPosition;
  visible?: boolean;
}>`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  text-align: center;
  width: ${props => props.theme.tooltip.maxWidth};
  z-index: ${props => props.theme.tooltip.zIndex};

  ${props =>
    props.position === 'bottom' &&
    css`
      top: 100%;
      padding-top: ${props.theme.spaceScale.spacing04};
      left: 50%;
      transform: translateX(-50%);
    `}

  ${props =>
    props.position === 'left' &&
    css`
      right: 100%;
      padding-right: ${props.theme.spaceScale.spacing04};
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'right' &&
    css`
      left: 100%;
      padding-left: ${props.theme.spaceScale.spacing04};
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'top' &&
    css`
      bottom: 100%;
      padding-bottom: ${props.theme.spaceScale.spacing04};
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
      : props.theme.colors.neutral};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral
      : props.theme.colors.neutral08};
  display: inline-block;
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  font-weight: 600;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing04};
  position: relative;

  ${props =>
    (props.position === 'left' || props.position === 'right') &&
    css`
      position: absolute;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'left' &&
    css`
      right: 0;
    `}

  ${props =>
    props.position === 'right' &&
    css`
      left: 0;
    `}
`;

const ToolTipArrow = styled.span<{ position?: any; isInverse?: boolean }>`
  display: block;
  height: 0;
  position: absolute;
  width: 0;

  ${props =>
    props.position === 'top' &&
    css`
      border-left: ${props.theme.tooltip.arrowSize} solid transparent;
      border-right: ${props.theme.tooltip.arrowSize} solid transparent;
      border-top: ${props.theme.tooltip.arrowSize} solid
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
      bottom: -${props.theme.tooltip.arrowSize};
      left: 50%;
      transform: translateX(-50%);
    `}

  ${props =>
    props.position === 'bottom' &&
    css`
      border-left: ${props.theme.tooltip.arrowSize} solid transparent;
      border-right: ${props.theme.tooltip.arrowSize} solid transparent;
      border-bottom: ${props.theme.tooltip.arrowSize} solid
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
      top: -${props.theme.tooltip.arrowSize};
      left: 50%;
      transform: translateX(-50%);
    `}

  ${props =>
    props.position === 'left' &&
    css`
      border-top: ${props.theme.tooltip.arrowSize} solid transparent;
      border-bottom: ${props.theme.tooltip.arrowSize} solid transparent;
      border-left: ${props.theme.tooltip.arrowSize} solid
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
      right: -${props.theme.tooltip.arrowSize};
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.position === 'right' &&
    css`
      border-top: ${props.theme.tooltip.arrowSize} solid transparent;
      border-bottom: ${props.theme.tooltip.arrowSize} solid transparent;
      border-right: ${props.theme.tooltip.arrowSize} solid
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
      left: -${props.theme.tooltip.arrowSize};
      top: 50%;
      transform: translateY(-50%);
    `}
`;

// Using any for the ref because it is put ont he passed in children which does not have a specific type
export const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

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
    arrowStyle,
    children,
    content,
    containerStyle,
    id: defaultId,
    isInverse,
    position,
    testId,
    tooltipPopoverStyle,
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
    onBlur: hideTooltip,
    onFocus: showTooltip,
    ref,
  });

  return (
    <ToolTipContainer
      {...other}
      data-testid={testId}
      onKeyDown={handleKeyDown}
      onMouseLeave={hideTooltip}
      onMouseEnter={showTooltip}
      style={containerStyle}
    >
      {tooltipTrigger}
      <StyledTooltip
        aria-hidden={!isVisible}
        id={id}
        isInverse={!!isInverse}
        position={position ? position : EnumTooltipPosition.top}
        role="tooltip"
        style={tooltipPopoverStyle}
        theme={theme}
        visible={isVisible}
      >
        <StyledTooltipInner
          isInverse={!!isInverse}
          position={position ? position : EnumTooltipPosition.top}
          style={tooltipStyle}
          theme={theme}
        >
          {content}
          <ToolTipArrow
            isInverse={!!isInverse}
            position={position ? position : EnumTooltipPosition.top}
            style={arrowStyle}
            theme={theme}
          />
        </StyledTooltipInner>
      </StyledTooltip>
    </ToolTipContainer>
  );
});
