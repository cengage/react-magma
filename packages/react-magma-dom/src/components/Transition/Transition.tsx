import * as React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { MotionVariants } from '../../theme/components/transition';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface TransitionProps extends HTMLMotionProps<'div'> {
  /**
   * If `true`, the element will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean;
  /**
   * If `true`, the content will animate in
   */
  isOpen?: boolean;
  /**
   * Custom variants to be applied to the enter and exit transitions.
   * @internal
   */
  customTransition?: MotionVariants<'enter' | 'exit'>;
  fade?: boolean;
  scale?: boolean;
  slideTop: boolean;
  slideBottom?: boolean;
  slideLeft?: boolean;
  slideRight?: boolean;
  nudgeTop?: boolean;
  nudgeBottom?: boolean;
  nudgeLeft?: boolean;
  nudgeRight?: boolean;
  collapse?: boolean;
}

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (props, ref) => {
    const theme: ThemeInterface = React.useContext(ThemeContext);

    const {
      style,
      unmountOnExit,
      isOpen,
      initial = 'exit',
      exit = 'exit',
      customTransition = {
        enter: { transition: {} },
        exit: { transition: {} },
      },
      ...rest
    } = props;

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;

    const variants = Object.keys(rest).reduce(
      (acc, key) => {
        if (rest[key] && theme.transitions[key]) {
          const themeVariant = theme.transitions[key];
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
      <AnimatePresence>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial={initial}
            exit={exit}
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
