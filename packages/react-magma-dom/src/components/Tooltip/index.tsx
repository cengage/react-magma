import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef, useGenerateId } from '../../utils';
import { usePopper } from 'react-popper';
import { useIsInverse } from '../../inverse';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

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

const typedStyled = styled as CreateStyled<ThemeInterface>;

const TooltipContainer = styled.div`
  display: inline;
  pointer-events: auto;
`;

export const TooltipArrow = typedStyled.span<{
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

export const StyledTooltip = typedStyled.div<{
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

  &[data-popper-placement='top'] {
    margin-bottom: 14px;
    & > span:last-child {
      bottom: 10px;
    }
  }

  &[data-popper-placement='bottom'] {
    margin-top: 14px;
    & > span:last-child {
      top: 10px;
    }
  }

  &[data-popper-placement='left'] {
    margin-right: 14px;
    & > span:last-child {
      right: 10px;
    }
  }

  &[data-popper-placement='right'] {
    margin-left: 14px;
    & > span:last-child {
      left: 10px;
    }
  }
`;

// Using any for the ref because it is put on the passed in children which does not have a specific type
export const Tooltip = React.forwardRef<any, TooltipProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(props.open);
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
          offset: [0, 0],
        },
      },
    ],
    placement: props.position || TooltipPosition.top,
  });

  const combinedRef = useForkedRef(ref, setReferenceElement);

  React.useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        hideTooltip();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      hideTooltip();
    }
  }

  function showTooltip() {
    setIsVisible(true);
  }

  function hideTooltip() {
    setIsVisible(props.open);
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
    ...styles.popper,
    ...tooltipStyle,
  };

  const combinedArrowStyle = { ...styles.arrow, ...arrowStyle };

  const isInverse = useIsInverse(props.isInverse);

  return (
    <TooltipContainer
      {...other}
      data-testid={testId}
      onKeyDown={handleKeyDown}
      onMouseLeave={hideTooltip}
      onMouseEnter={showTooltip}
      style={containerStyle}
    >
      {tooltipTrigger}
      {isVisible && (
        <div
          ref={setPopperElement}
          style={combinedTooltipStyles}
          {...attributes.popper}
        >
          <StyledTooltip
            id={id}
            isInverse={isInverse}
            position={position ? position : TooltipPosition.top}
            theme={theme}
            role="tooltip"
            {...attributes.popper}
          >
            {content}
            <TooltipArrow
              isInverse={isInverse}
              ref={setArrowElement}
              style={combinedArrowStyle}
              theme={theme}
            />
          </StyledTooltip>
        </div>
      )}
    </TooltipContainer>
  );
});
