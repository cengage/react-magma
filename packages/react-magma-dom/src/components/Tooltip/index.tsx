import * as React from 'react';

import styled from '@emotion/styled';
import {
  offset,
  flip,
  autoUpdate,
  AlignedPlacement,
  arrow,
  shift,
  useFloating,
  FloatingArrow,
} from '@floating-ui/react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef, useGenerateId, removePxStyleStrings } from '../../utils';

export enum TooltipPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top', //default
}

export const EnumTooltipPosition = TooltipPosition;

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
  content: any;
  isInverse?: boolean;
  /**
   * Override the default opening of the tooltip on hover/focus to remain open
   */
  open?: boolean;
  /**
   * Position the tooltip appears in relation to its trigger
   * @default TooltipPosition.top
   */
  position?: TooltipPosition;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Style properties for the inner tooltip content
   */
  tooltipStyle?: React.CSSProperties;
}

export interface ITooltipState {
  id?: string;
  isVisible?: boolean;
}

const TooltipContainer = styled.div`
  display: inline;
  pointer-events: auto;
`;

export const TooltipArrow = styled.span<{
  position?: any;
  isInverse?: boolean;
}>`
  &&,
  &&:before {
    display: block;
    height: ${props => props.theme.tooltip.arrowSizeDoubled};
    position: absolute;
    width: ${props => props.theme.tooltip.arrowSizeDoubled};
    z-index: -1;
  }

  &&::before {
    content: '';
    transform: rotate(45deg);
    background: ${props =>
      props.isInverse
        ? props.theme.tooltip.inverse.backgroundColor
        : props.theme.tooltip.backgroundColor};
  }
`;

export const StyledTooltip = styled.div<{
  isInverse?: boolean;
  isVisible?: boolean;
  position: TooltipPosition;
  visible?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.backgroundColor
      : props.theme.tooltip.backgroundColor};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.textColor
      : props.theme.tooltip.textColor};
  font-size: ${props => props.theme.tooltip.typeScale.fontSize};
  font-family: ${props => props.theme.bodyFont};
  letter-spacing: ${props => props.theme.tooltip.typeScale.letterSpacing};
  line-height: ${props => props.theme.tooltip.typeScale.lineHeight};
  font-weight: ${props => props.theme.tooltip.fontWeight};
  max-width: ${props => props.theme.tooltip.maxWidth};
  min-height: 2.5em;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing04};
  z-index: ${props => props.theme.tooltip.zIndex};
`;

// Using any for the ref because it is put on the passed in children which does not have a specific type
export const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(props.open);
  const arrowElement = React.useRef(null);

  const {
    arrowStyle,
    children,
    content,
    containerStyle,
    id: defaultId,
    position,
    testId,
    tooltipStyle,
    ...other
  } = props;

  const isArrowVisible = React.useMemo(() => {
    if (arrowElement.current) {
      const computedStyle = window.getComputedStyle(arrowElement.current);
      const isHidden =
        computedStyle.display === 'none' ||
        computedStyle.visibility === 'hidden' ||
        parseFloat(computedStyle.opacity) === 0;

      return !isHidden;
    }
  }, [arrowElement]);

  const { refs, floatingStyles, placement, context } = useFloating({
    //flip() - Changes the placement of the floating element to keep it in view.
    //offset() - Translates the floating element along the specified axes. (Space between the Trigger and the Content).
    //shift() - Shifts the floating element along the specified axes to keep it in view within the clipping context or viewport.
    //arrow() - Positions an arrow element pointing at the reference element, ensuring proper alignment.
    middleware: [
      flip(),
      shift(),
      offset(isArrowVisible ? 14 : 0),
      ...(isArrowVisible ? [arrow({ element: arrowElement })] : []),
    ],
    placement: (props.position ??
      TooltipPosition.top) as unknown as AlignedPlacement,
    whileElementsMounted: autoUpdate,
  });

  const combinedRef = useForkedRef(ref, refs.setReference);

  const hideTooltip = React.useCallback(() => {
    setIsVisible(props.open);
  }, [props.open]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideTooltip();
      }
    },
    [hideTooltip]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  function showTooltip() {
    setIsVisible(true);
  }

  const id = useGenerateId(defaultId);
  const theme = React.useContext(ThemeContext);

  if (Array.isArray(children)) {
    throw new Error('Tooltip children can only be one element.');
  }

  const tooltipTrigger = React.cloneElement(children, {
    'aria-describedby': isVisible ? id : null,
    onBlur: hideTooltip,
    onFocus: showTooltip,
    ref: combinedRef,
  });

  const combinedTooltipStyles = {
    zIndex: theme.tooltip.zIndex,
    ...floatingStyles,
    ...tooltipStyle,
  };

  const isInverse = useIsInverse(props.isInverse);

  return (
    <TooltipContainer
      {...other}
      data-testid={testId ?? 'tooltip'}
      onKeyDown={handleKeyDown}
      onMouseLeave={hideTooltip}
      onMouseEnter={showTooltip}
      style={containerStyle}
    >
      {tooltipTrigger}
      {isVisible && (
        <div ref={refs.setFloating} style={combinedTooltipStyles}>
          <FloatingArrow
            ref={arrowElement}
            data-testid={testId ? `${testId}-arrow` : 'tooltip-arrow'}
            context={context}
            style={{ ...arrowStyle, zIndex: 2 }}
            width={removePxStyleStrings([theme.tooltip.arrowSizeDoubled])}
            height={removePxStyleStrings([theme.tooltip.arrowSizeDoubled]) / 2}
            fill={
              isInverse
                ? theme.tooltip.inverse.backgroundColor
                : theme.tooltip.backgroundColor
            }
          />
          <StyledTooltip
            id={id}
            isInverse={isInverse}
            position={
              (placement
                ? (placement as unknown)
                : TooltipPosition.top) as TooltipPosition
            }
            theme={theme}
            role="tooltip"
            data-tooltip-placement={placement ?? TooltipPosition.top}
          >
            {content}
          </StyledTooltip>
        </div>
      )}
    </TooltipContainer>
  );
});
