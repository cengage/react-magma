import * as React from 'react';

import {
  AnimatePresence,
  motion,
  HTMLMotionProps,
  useReducedMotion,
} from 'framer-motion';

import { drawerTransitions } from '../../theme/components/drawerTransition';
import { reducedMotionTransitions } from '../../theme/components/reducedMotionTransition';
import { MotionVariants } from '../../theme/components/transition';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TransitionProps extends HTMLMotionProps<'div'> {
  /**
   * @children optional
   */
  children?: React.ReactNode | undefined;
  /**
   * If `true`, the element will unmount when `in={false}` and animation is done
   * @default false
   */
  unmountOnExit?: boolean;
  /**
   * If `true`, the content will animate in
   * @default false
   */
  isOpen?: boolean;
  /**
   * Custom variants to be applied to the enter and exit transitions.
   * @internal
   */
  customTransition?: MotionVariants<'enter' | 'exit'>;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Should children fade in/out
   * @default false
   */
  fade?: boolean;
  /**
   * Should children scale in/out
   * @default false
   */
  scale?: boolean;
  /**
   * Should children slide in/out from the top of the screen
   * @default false
   */
  slideTop?: boolean;
  /**
   * Should children slide in/out from the bottom of the screen
   * @default false
   */
  slideBottom?: boolean;
  /**
   * Should children slide in/out from the left of the screen
   * @default false
   */
  slideLeft?: boolean;
  /**
   * Should children slide in/out from the right of the screen
   * @default false
   */
  slideRight?: boolean;
  /**
   * Should the children get nudged in 50px from the top
   * @default false
   */
  nudgeTop?: boolean;
  /**
   * Should the children get nudged in 50px from the bottom
   * @default false
   */
  nudgeBottom?: boolean;
  /**
   * Should the children get nudged in 50px from the left
   * @default false
   */
  nudgeLeft?: boolean;
  /**
   * Should the children get nudged in 50px from the right
   * @default false
   */
  nudgeRight?: boolean;
  /**
   * Should children collapse in/out
   * @default false
   */
  collapse?: boolean;
  /**
   * Should children rotate 45 degrees
   * @default false
   */
  rotate45?: boolean;
  /**
   * Should children rotate 90 degrees
   * @default false
   */
  rotate90?: boolean;
  /**
   * Should children rotate 180 degrees
   * @default false
   */
  rotate180?: boolean;
  /**
   * Shows the drawer transition animation
   * @internal
   */
  hasDrawerAnimation?: boolean;
}

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (props, ref) => {
    const theme: ThemeInterface = React.useContext(ThemeContext);

    const {
      style,
      unmountOnExit,
      hasDrawerAnimation,
      isOpen,
      testId,
      initial = 'exit',
      exit = 'exit',
      customTransition = {
        enter: { transition: {} },
        exit: { transition: {} },
      },
      ...rest
    } = props;

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;
    const shouldReduceMotion = useReducedMotion();
    const transitionsArr = shouldReduceMotion
      ? reducedMotionTransitions
      : hasDrawerAnimation
        ? drawerTransitions
        : theme.transitions;

    const variants = Object.keys(rest).reduce(
      (acc, key) => {
        if (rest[key] && transitionsArr[key]) {
          const themeVariant = transitionsArr[key];

          rest[key] = undefined;

          return {
            baseStyle: {
              ...acc.baseStyle,
              ...themeVariant.baseStyle,
            },
            motion: {
              ...acc,
              enter: {
                ...acc.motion.enter,
                ...themeVariant.motion.enter,
                transition: {
                  ...('transition' in acc.motion.enter
                    ? acc.motion.enter.transition
                    : {}),
                  ...('transition' in themeVariant.motion.enter
                    ? themeVariant.motion.enter.transition
                    : {}),
                },
              },
              exit: {
                ...acc.motion.exit,
                ...themeVariant.motion.exit,
                transition: {
                  ...('transition' in acc.motion.exit
                    ? acc.motion.exit.transition
                    : {}),
                  ...('transition' in themeVariant.motion.exit
                    ? themeVariant.motion.exit.transition
                    : {}),
                },
              },
            },
          };
        }

        return acc;
      },
      { motion: customTransition, baseStyle: {} }
    );

    return (
      <AnimatePresence initial={false}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial={initial}
            exit={exit}
            data-testid={testId}
            animate={isOpen || unmountOnExit ? 'enter' : 'exit'}
            variants={variants.motion}
            style={{ ...variants.baseStyle, ...style }}
            {...rest}
          />
        )}
      </AnimatePresence>
    );
  }
);
