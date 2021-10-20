import * as React from 'react';
import styled from '@emotion/styled';
import { useForkedRef, useGenerateId } from '../../utils';
import { usePopper } from 'react-popper';
import { useIsInverse } from '../../inverse';

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
  content: React.ReactNode;
  isInverse?: boolean;
  /**
   * Position the tooltip appears in relation to its trigger
   */
  position?: TooltipPosition;
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

const ToolTipContainer = styled.div`
  display: inline;
`;

const ToolTipArrow = styled.span<{ position?: any; isInverse?: boolean }>`
  &&,
  &&:before {
    display: block;
    height: var(--tooltip-arrowSizeDoubled);
    position: absolute;
    width: var(--tooltip-arrowSizeDoubled);
    z-index: -1;
  }

  &&::before {
    content: '';
    transform: rotate(45deg);
    background: ${props =>
      props.isInverse
        ? 'var(--tooltip-inverse-backgroundColor)'
        : 'var(--tooltip-backgroundColor)'};
  }
`;

const StyledTooltip = styled.div<{
  isInverse?: boolean;
  isVisible?: boolean;
  position: TooltipPosition;
  visible?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? 'var(--tooltip-inverse-backgroundColor)'
      : 'var(--tooltip-backgroundColor)'};
  border-radius: var(--borderRadius);
  color: ${props =>
    props.isInverse
      ? 'var(--tooltip-inverse-textColor)'
      : 'var(--tooltip-textColor)'};
  font-size: var(--tooltip-typeScale-fontSize);
  line-height: var(--tooltip-typeScale-lineHeight);
  font-weight: var(--tooltip-fontWeight);
  max-width: var(--tooltip-maxWidth);
  min-height: 2.5em;
  padding: var(--spaceScale-spacing03) var(--spaceScale-spacing04);
  z-index: var(--tooltip-zIndex);

  &[data-popper-placement='top'] > span:last-child {
    bottom: calc(var(--tooltip-arrowSize) * -1);
  }

  &[data-popper-placement='bottom'] > span:last-child {
    top: calc(var(--tooltip-arrowSize) * -1);
  }

  &[data-popper-placement='left'] > span:last-child {
    right: calc(var(--tooltip-arrowSize) * -1);
  }

  &[data-popper-placement='right'] > span:last-child {
    left: calc(var(--tooltip-arrowSize) * -1);
  }
`;

// Using any for the ref because it is put ont he passed in children which does not have a specific type
export const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLSpanElement>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
    placement: props.position || TooltipPosition.top,
  });

  const combinedRef = useForkedRef(ref, setReferenceElement);

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
    position,
    testId,
    tooltipStyle,
    ...other
  } = props;

  const id = useGenerateId(defaultId);

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
    ...styles.popper,
    ...tooltipStyle,
  };
  const combinedArrowStyle = { ...styles.arrow, ...arrowStyle };

  const isInverse = useIsInverse(props.isInverse);

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
      {isVisible && (
        <StyledTooltip
          id={id}
          isInverse={isInverse}
          position={position ? position : TooltipPosition.top}
          ref={setPopperElement}
          role="tooltip"
          style={combinedTooltipStyles}
          {...attributes.popper}
        >
          {content}
          <ToolTipArrow
            isInverse={isInverse}
            ref={setArrowElement}
            style={combinedArrowStyle}
          />
        </StyledTooltip>
      )}
    </ToolTipContainer>
  );
});
