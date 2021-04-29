import * as React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { MotionVariants } from '../../theme/transitions';

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
  in?: boolean;
  /**
   * If `true` the children will have the `fade` transition applied from the theme.
   * @deafult false
   */
  fade?: boolean;
  /**
   * If `true` the children will have the `slideTop` transition applied from the theme.
   * @deafult false
   */
  slideTop?: boolean;
  /**
   * If `true` the children will have the `slideBottom` transition applied from the theme.
   * @deafult false
   */
  slideBottom?: boolean;
  /**
   * If `true` the children will have the `  slideRight` transition applied from the theme.
   * @deafult false
   */
  slideRight?: boolean;
  /**
   * If `true` the children will have the `slideLeft` transition applied from the theme.
   * @deafult false
   */
  slideLeft?: boolean;
  /**
   * If `true` the children will have the `scale` transition applied from the theme.
   * @deafult false
   */
  scale?: boolean;
  /**
   * If `true` the children will have the `collapse` transition applied from the theme.
   * @deafult false
   */
  collapse?: boolean;
  /**
   * If `true` the children will have the `collapse` transition applied from the theme.
   */
  // customTransition?: MotionVariants<"enter" | "exit">;
}

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (props, ref) => {
    const theme: ThemeInterface = React.useContext(ThemeContext);

    const {
      unmountOnExit,
      in: isOpen,
      initial = 'exit',
      exit = 'exit',
      ...rest
    } = props;

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true;

    const variants = Object.keys(rest).reduce(
      (acc, key) => {
        if (theme.transitions[key]) {
          return {
            enter: { ...acc.enter, ...theme.transitions[key].enter },
            exit: { ...acc.exit, ...theme.transitions[key].exit },
          };
          // delete rest[key];
        }
        return acc;
      },
      { enter: {}, exit: {} }
    );

    console.log(variants);

    return (
      <AnimatePresence>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial={initial}
            exit={exit}
            animate={isOpen || unmountOnExit ? 'enter' : 'exit'}
            variants={variants}
            {...rest}
          />
        )}
      </AnimatePresence>
    );
  }
);
