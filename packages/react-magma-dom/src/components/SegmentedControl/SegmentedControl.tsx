import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { SegmentedControlContext } from './SegmentedControlContext';
import {
  SegmentedControlDropdown,
  SegmentedControlOption,
} from './SegmentedControlDropdown';
import {
  buildSelectedShadow,
  SegmentedControlItem,
  SegmentedControlItemProps,
} from './SegmentedControlItem';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { ButtonSize } from '../Button';

const MAX_ITEMS = 7;
const SLIDE_DURATION = 400;
// Ease-out: moves quickly, then settles gently into place
const SLIDE_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

// useLayoutEffect warns during server rendering (e.g. the Gatsby docs build)
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export interface SegmentedControlProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /**
   * Viewport width in pixels below which the control renders as a Dropdown
   * menu button. When not set, the control never switches.
   */
  breakpoint?: number;
  /**
   * SegmentedControlItem elements (2 to 7), directly or in arrays/fragments.
   * Each item must have a unique string value.
   */
  children: React.ReactNode;
  /**
   * Value of the item selected on first render, when the component is uncontrolled
   */
  defaultValue?: string;
  /**
   * Disables every item in the control
   * @default false
   */
  disabled?: boolean;
  /**
   * Slides the selected background between items on mouse selection.
   * Respects the user's reduced-motion setting.
   * @default true
   */
  isAnimated?: boolean;
  /**
   * Stretches the control to the width of its container and distributes items evenly
   * @default false
   */
  isFullWidth?: boolean;
  isInverse?: boolean;
  /**
   * Called with the live button click event and the requested item value.
   * Controlled selection changes only when the parent updates value.
   */
  onChange?: (event: React.SyntheticEvent, value: string) => void;
  /**
   * Height of the control, matching the Button sizes
   * @default ButtonSize.medium
   */
  size?: ButtonSize;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Value of the selected item, when the component is controlled
   */
  value?: string;
}

const StyledSegmentedControl = styled.div<{
  isDropdown?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  isSliding?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? transparentize(0.5, props.theme.colors.neutral900)
      : props.theme.colors.neutral200};
  border: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral900
        : props.theme.colors.neutral300};
  border-radius: ${props => props.theme.borderRadius};
  box-sizing: border-box;
  display: ${props => (props.isFullWidth ? 'flex' : 'inline-flex')};
  gap: ${props => props.theme.spaceScale.spacing02};
  /* The 1px border sits inside the 4px padding, as in the design */
  padding: calc(${props => props.theme.spaceScale.spacing02} - 1px);
  /* Positioned only while the indicator slides. At rest it must not become the
     containing block of item tooltips, which would squeeze them to its width. */
  position: ${props => (props.isSliding ? 'relative' : 'static')};
  vertical-align: middle;

  ${props =>
    props.isFullWidth &&
    css`
      width: 100%;
    `}

  ${props =>
    props.isDropdown &&
    css`
      background: none;
      border: 0;
      gap: 0;
      padding: 0;
    `}
`;

const StyledIndicator = styled.span<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral700
      : props.theme.colors.neutral0};
  border-radius: ${props => props.theme.borderRadiusExtraSmall};
  box-shadow: ${props => buildSelectedShadow(props.theme)};
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
`;

interface Position {
  height: number;
  width: number;
  x: number;
  y: number;
}

// Position of an element relative to the control's padding box
function getPosition(container: HTMLElement, element: Element): Position {
  if (!container || !element) {
    return null;
  }

  const containerRect = container.getBoundingClientRect();
  const rect = element.getBoundingClientRect();

  return {
    height: rect.height,
    width: rect.width,
    x: rect.left - containerRect.left - container.clientLeft,
    y: rect.top - containerRect.top - container.clientTop,
  };
}

function toKeyframe({ height, width, x, y }: Position): Keyframe {
  return {
    height: `${height}px`,
    transform: `translate(${x}px, ${y}px)`,
    width: `${width}px`,
  };
}

function positionsMatch(a: Position, b: Position) {
  return (
    Math.abs(a.x - b.x) < 0.5 &&
    Math.abs(a.y - b.y) < 0.5 &&
    Math.abs(a.width - b.width) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5
  );
}

function canAnimate() {
  return (
    typeof Element !== 'undefined' &&
    typeof Element.prototype.animate === 'function' &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
}

function getOptions(children: React.ReactNode): SegmentedControlOption[] {
  const options: SegmentedControlOption[] = [];

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (child.type === React.Fragment) {
      options.push(...getOptions(child.props.children));

      return;
    }

    if (child.type !== SegmentedControlItem) {
      return;
    }

    const element = child as React.ReactElement<SegmentedControlItemProps>;
    const props = element.props;

    if (typeof props.value === 'string') {
      options.push({
        disabled: Boolean(props.disabled),
        element,
        icon: props.icon || props.leadingIcon,
        label: props.children ?? props['aria-label'],
        value: props.value,
      });
    }
  });

  return options;
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>((props, ref) => {
  const {
    breakpoint,
    children,
    defaultValue,
    disabled,
    isAnimated = true,
    isFullWidth,
    isInverse: isInverseProp,
    onBlurCapture,
    onChange,
    onFocusCapture,
    onKeyDown,
    size = ButtonSize.medium,
    testId,
    value,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);
  const matchesBreakpoint = useMediaQuery(
    breakpoint ? `(max-width: ${breakpoint - 1}px)` : 'not all'
  );

  const [hasMounted, setHasMounted] = React.useState(false);
  const isDropdown = hasMounted && matchesBreakpoint;
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );

  React.useEffect(() => setHasMounted(true), []);

  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const isControlled = typeof value !== 'undefined';
  const selectedValue = isControlled ? value : uncontrolledValue;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const combinedRef = useForkedRef(ref, containerRef);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  // Where the next slide starts, recorded when an item is clicked
  const pendingSlideRef = React.useRef<{ from: Position; value: string }>(null);
  const previousValueRef = React.useRef(selectedValue);
  const hasFocusWithinRef = React.useRef(false);
  // The indicator only exists while it slides. At rest the selected item paints
  // its own background, so contrast checkers can read the text's background.
  const [slide, setSlide] = React.useState<{
    from: Position;
    to: Position;
    value: string;
  }>(null);

  const options = getOptions(children);
  const enabledOptions = disabled
    ? []
    : options.filter(option => !option.disabled);
  const tabbableValue = enabledOptions.some(
    option => option.value === selectedValue
  )
    ? selectedValue
    : enabledOptions[0]?.value;

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && options.length > MAX_ITEMS) {
      console.warn(
        `SegmentedControl supports at most ${MAX_ITEMS} items; received ${options.length}.`
      );
    }
  }, [options.length]);

  // Reconcile before paint. A slide belongs to one accepted value and geometry.
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const previousValue = previousValueRef.current;
    const pending = pendingSlideRef.current;

    previousValueRef.current = selectedValue;

    if (!slide && !pending) {
      return;
    }

    const selected = container?.querySelector<HTMLButtonElement>(
      '[role="radio"][aria-checked="true"]:not(:disabled)'
    );
    const to = getPosition(container, selected);
    const animationAllowed =
      isAnimated &&
      !disabled &&
      !isDropdown &&
      !prefersReducedMotion &&
      canAnimate();

    if (!animationAllowed || !to) {
      pendingSlideRef.current = null;
      if (slide) setSlide(null);

      return;
    }

    if (selectedValue !== previousValue) {
      pendingSlideRef.current = null;
      setSlide(
        pending?.value === selectedValue && pending.from
          ? { from: pending.from, to, value: selectedValue }
          : null
      );
    } else if (
      slide &&
      (slide.value !== selectedValue || !positionsMatch(slide.to, to))
    ) {
      setSlide(null);
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (!slide || !indicatorRef.current) {
      return;
    }

    let active = true;
    const container = containerRef.current;
    const animation = indicatorRef.current.animate(
      [toKeyframe(slide.from), toKeyframe(slide.to)],
      { duration: SLIDE_DURATION, easing: SLIDE_EASING }
    );
    const finish = () => {
      if (active) setSlide(current => (current === slide ? null : current));
    };
    const checkGeometry = () => {
      const selected = container.querySelector(
        '[role="radio"][aria-checked="true"]:not(:disabled)'
      );
      const position = getPosition(container, selected);

      if (!position || !positionsMatch(slide.to, position)) finish();
    };
    // The package builder's older DOM typings omit these browser APIs.
    const { ResizeObserver: Observer } = window as Window & {
      ResizeObserver?: new (callback: () => void) => {
        disconnect(): void;
        observe(target: Element): void;
      };
    };
    const fonts = (document as Document & { fonts?: EventTarget }).fonts;
    const observer = Observer ? new Observer(checkGeometry) : null;

    observer?.observe(container);
    container
      .querySelectorAll('[role="radio"]')
      .forEach(item => observer?.observe(item));
    window.addEventListener('resize', checkGeometry);
    fonts?.addEventListener('loadingdone', checkGeometry);
    // Hidden tabs may never deliver the animation's finish event.
    const timeout = setTimeout(finish, SLIDE_DURATION + 200);

    animation.onfinish = finish;

    return () => {
      active = false;
      clearTimeout(timeout);
      animation.onfinish = null;
      animation.cancel();
      observer?.disconnect();
      window.removeEventListener('resize', checkGeometry);
      fonts?.removeEventListener('loadingdone', checkGeometry);
    };
  }, [slide]);

  // Keep the user's place when a focused item is replaced, removed or disabled.
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const active = document.activeElement as HTMLButtonElement;

    if (
      !hasFocusWithinRef.current ||
      (container.contains(active) && !active.disabled)
    ) {
      return;
    }

    const menuIsOpen = Boolean(
      container.querySelector('[aria-expanded="true"]')
    );
    const menuTarget =
      menuIsOpen &&
      container.querySelector<HTMLElement>(
        '[role="menuitemradio"][aria-checked="true"]:not(:disabled)'
      );
    const target = isDropdown
      ? menuTarget ||
        (menuIsOpen &&
          container.querySelector<HTMLElement>(
            '[role="menuitemradio"]:not(:disabled)'
          )) ||
        container.querySelector<HTMLElement>(
          '[data-segmented-trigger]:not(:disabled)'
        )
      : container.querySelector<HTMLElement>(
          '[role="radio"][tabindex="0"]:not(:disabled)'
        );

    (target || container).focus();
  });

  function handleFocusCapture(event: React.FocusEvent<HTMLDivElement>) {
    hasFocusWithinRef.current = true;
    onFocusCapture?.(event);
  }

  function handleBlurCapture(event: React.FocusEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    hasFocusWithinRef.current = event.relatedTarget
      ? event.currentTarget.contains(event.relatedTarget as Node)
      : !target.isConnected || target.matches(':disabled');
    onBlurCapture?.(event);
  }

  function handleSelect(event: React.SyntheticEvent, newValue: string) {
    pendingSlideRef.current = null;

    if (disabled || event.defaultPrevented) {
      return;
    }

    if (newValue === selectedValue) {
      setSlide(null);

      return;
    }

    // Native keyboard activation and arrow-triggered clicks have detail 0.
    const isMouse = (event.nativeEvent as UIEvent).detail > 0;
    const container = containerRef.current;

    if (
      isAnimated &&
      !isDropdown &&
      isMouse &&
      !prefersReducedMotion &&
      canAnimate()
    ) {
      pendingSlideRef.current = {
        from: getPosition(
          container,
          indicatorRef.current ||
            container.querySelector('[role="radio"][aria-checked="true"]')
        ),
        value: newValue,
      };
    } else {
      setSlide(null);
    }

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    if (typeof onChange === 'function') {
      onChange(event, newValue);
    }
  }

  // Arrow keys, Home and End move focus and selection, per the radio group pattern
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }

    // Lets consumers cancel the built-in arrow key handling
    if (event.defaultPrevented) {
      return;
    }

    const radios = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        isDropdown
          ? '[role="menuitemradio"]:not(:disabled)'
          : '[role="radio"]:not(:disabled)'
      )
    );
    const currentIndex = radios.indexOf(
      document.activeElement as HTMLButtonElement
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number;

    if (isDropdown && ['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % radios.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = radios.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    radios[nextIndex].focus();
    if (!isDropdown) radios[nextIndex].click();
  }

  return (
    <StyledSegmentedControl
      aria-disabled={disabled || undefined}
      data-testid={testId}
      isDropdown={isDropdown}
      isFullWidth={isFullWidth}
      isInverse={isInverse}
      isSliding={Boolean(slide)}
      onBlurCapture={handleBlurCapture}
      onFocusCapture={handleFocusCapture}
      onKeyDown={handleKeyDown}
      ref={combinedRef}
      role={isDropdown ? 'group' : 'radiogroup'}
      tabIndex={-1}
      theme={theme}
      {...other}
    >
      {slide && (
        <StyledIndicator
          aria-hidden="true"
          isInverse={isInverse}
          ref={indicatorRef}
          style={toKeyframe(slide.to) as React.CSSProperties}
          theme={theme}
        />
      )}
      <SegmentedControlContext.Provider
        value={{
          disabled,
          isFullWidth,
          isInverse,
          isSliding: Boolean(slide),
          onSelect: handleSelect,
          selectedValue,
          size,
          tabbableValue,
        }}
      >
        {isDropdown ? (
          <SegmentedControlDropdown
            aria-label={other['aria-label']}
            aria-labelledby={other['aria-labelledby']}
            disabled={disabled}
            isFullWidth={isFullWidth}
            isInverse={isInverse}
            options={options}
            selectedValue={selectedValue}
            size={size}
          />
        ) : (
          children
        )}
      </SegmentedControlContext.Provider>
    </StyledSegmentedControl>
  );
});
