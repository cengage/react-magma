import * as React from 'react';

import styled from '@emotion/styled';
import {
  offset,
  flip,
  autoUpdate,
  AlignedPlacement,
  shift,
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useInteractions,
  safePolygon,
} from '@floating-ui/react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef, useGenerateId } from '../../utils';

export enum TooltipPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top', //default
}

export const EnumTooltipPosition = TooltipPosition;

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
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
  const isOpen = props.open !== undefined;
  const [isVisible, setIsVisible] = React.useState<boolean>(props.open);

  const {
    children,
    content,
    containerStyle,
    id: defaultId,
    position,
    testId,
    tooltipStyle,
    ...other
  } = props;

  const { refs, floatingStyles, placement, context, elements, update } =
    useFloating({
      open: isVisible,
      onOpenChange: setIsVisible,
      //flip() - Changes the placement of the floating element to keep it in view.
      //offset() - Translates the floating element along the specified axes. (Space between the Trigger and the Content).
      //shift() - Shifts the floating element along the specified axes to keep it in view within the clipping context or viewport.
      middleware: [flip(), shift(), offset(8)],
      placement: (position ??
        TooltipPosition.top) as unknown as AlignedPlacement,
      whileElementsMounted: autoUpdate,
    });

  const hover = useHover(context, {
    enabled: !isOpen,
    handleClose: safePolygon(),
  });

  const focus = useFocus(context, {
    enabled: !isOpen,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ]);

  React.useEffect(() => {
    const referenceElement = elements.reference;
    const floatingTooltipContent = elements.floating;

    if (isVisible && referenceElement && floatingTooltipContent) {
      return autoUpdate(referenceElement, floatingTooltipContent, update);
    }
  }, [isVisible, elements, update]);

  const combinedRef = useForkedRef(ref, refs.setReference);

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(props.open);
    }
  }, [isOpen, props.open]);

  const id = useGenerateId(defaultId);
  const theme = React.useContext(ThemeContext);

  if (Array.isArray(children)) {
    throw new Error('Tooltip children can only be one element.');
  }

  const tooltipTrigger = React.cloneElement(
    children,
    getReferenceProps({
      'aria-describedby': isVisible ? id : null,
      ref: combinedRef,
      onFocus: event => {
        children.props.onFocus?.(event);
        if (!isOpen) {
          setIsVisible(true);
        }
      },
      onBlur: event => {
        children.props.onBlur?.(event);
        if (!isOpen) {
          setIsVisible(false);
        }
      },
    })
  );

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
      style={containerStyle}
    >
      {tooltipTrigger}
      {isVisible && (
        <div
          ref={refs.setFloating}
          style={combinedTooltipStyles}
          {...getFloatingProps({
            onMouseEnter: () => {
              if (!isOpen) {
                setIsVisible(true);
              }
            },
            onMouseLeave: () => {
              if (!isOpen) {
                setIsVisible(false);
              }
            },
          })}
        >
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
            data-tooltip-placement={placement ? placement : TooltipPosition.top}
          >
            {content}
          </StyledTooltip>
        </div>
      )}
    </TooltipContainer>
  );
});
