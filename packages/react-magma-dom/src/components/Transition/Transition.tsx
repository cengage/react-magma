import * as React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { MotionVariants } from '../../theme/components/transition';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface BaseTransitionProps extends HTMLMotionProps<'div'> {
  /**
   * If `true`, the element will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean;
  /**
   * If `true`, the content will animate in
   */
  isOpen?: boolean;
  /**
   * If `true` the children will have the `fade` transition applied from the theme.
   * @deafult false
   */
  fade?: boolean;
  /**
   * If `true` the children will have the `scale` transition applied from the theme.
   * @deafult false
   */
  scale?: boolean;
  /**
   * Custom variants to be applied to the enter and exit transitions.
   * @internal
   */
  customTransition?: MotionVariants<'enter' | 'exit'>;
}

interface SlideTopTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop: true;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface SlideBottonTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom: true;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface SlideRightTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight: true;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface SlideLeftTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft: true;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface CollapseTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse: true;
}

interface NudgeTopTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop: true;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface NudgeLeftTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft: true;
  nudgeRight?: never;
  collapse?: never;
}

interface NudgeRightTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight: true;
  collapse?: never;
}

interface NudgeBottomTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom: true;
  nudgeLeft?: never;
  nudgeRight?: never;
  collapse?: never;
}

interface NudgeTopLeftTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop: true;
  nudgeBottom?: never;
  nudgeLeft: true;
  nudgeRight?: never;
  collapse?: never;
}

interface NudgeBottomLeftTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom: true;
  nudgeLeft: true;
  nudgeRight?: never;
  collapse?: never;
}

interface NudgeTopRightTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop: true;
  nudgeBottom?: never;
  nudgeLeft?: never;
  nudgeRight: true;
  collapse?: never;
}

interface NudgeBottomRightTransitionProps extends BaseTransitionProps {
  fade?: boolean;
  scale?: boolean;
  slideTop?: never;
  slideBottom?: never;
  slideLeft?: never;
  slideRight?: never;
  nudgeTop?: never;
  nudgeBottom: true;
  nudgeLeft?: never;
  nudgeRight: true;
  collapse?: never;
}

export type TransitionProps = 
  | BaseTransitionProps
  | SlideTopTransitionProps
  | SlideBottonTransitionProps
  | SlideRightTransitionProps
  | SlideLeftTransitionProps
  | CollapseTransitionProps
  | NudgeTopTransitionProps
  | NudgeLeftTransitionProps
  | NudgeRightTransitionProps
  | NudgeBottomTransitionProps
  | NudgeTopLeftTransitionProps
  | NudgeBottomLeftTransitionProps
  | NudgeTopRightTransitionProps
  | NudgeBottomRightTransitionProps;

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

const doot = () => <Transition slideLeft  collapse/>