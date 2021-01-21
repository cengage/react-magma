import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef, useGenerateId } from '../../utils';
import { usePopper } from 'react-popper';

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

const StyledTooltip = styled.div<{
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
  line-height: ${props => props.theme.tooltip.typeScale.lineHeight};
  font-weight: ${props => props.theme.tooltip.fontWeight};
  max-width: ${props => props.theme.tooltip.maxWidth};
  min-height: 2.5em;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing04};
  z-index: ${props => props.theme.tooltip.zIndex};

  &[data-popper-placement='top'] > span:last-child {
    bottom: -${props => props.theme.tooltip.arrowSize};
  }

  &[data-popper-placement='bottom'] > span:last-child {
    top: -${props => props.theme.tooltip.arrowSize};
  }

  &[data-popper-placement='left'] > span:last-child {
    right: -${props => props.theme.tooltip.arrowSize};
  }

  &[data-popper-placement='right'] > span:last-child {
    left: -${props => props.theme.tooltip.arrowSize};
  }
`;

// Using any for the ref because it is put ont he passed in children which does not have a specific type
export const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [referenceElement, setReferenceElement] = React.useState<HTMLElement>(
    null
  );
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>(
    null
  );
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
          isInverse={!!isInverse}
          position={position ? position : TooltipPosition.top}
          ref={setPopperElement}
          role="tooltip"
          style={combinedTooltipStyles}
          theme={theme}
          {...attributes.popper}
        >
          {content}
          <ToolTipArrow
            isInverse={!!isInverse}
            ref={setArrowElement}
            style={combinedArrowStyle}
            theme={theme}
          />
        </StyledTooltip>
      )}
    </ToolTipContainer>
  );
});
