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
  in?: boolean;
  /**
   * If `true` the children will have the `fade` transition applied from the theme.
   * @deafult false
   */
  fade?: boolean;
  /**
   * Custom styles to apply to the transition component div.
   */
  style?: React.CSSProperties;
  /**
   * If `true` the children will have the `scale` transition applied from the theme.
   * @deafult false
   */
  scale?: boolean;
  /**
   * If `true` the children will have the `collapse` transition applied from the theme.
   * @internal
   */
  customTransition?: MotionVariants<"enter" | "exit">;
}

interface SlideTopTransitionProps extends BaseTransitionProps {
  slideTop: boolean;
}

interface SlideBottonTransitionProps extends BaseTransitionProps {
  slideBottom: boolean;
}

interface SlideRightTransitionProps extends BaseTransitionProps {
  slideRight: boolean;
}

interface SlideLeftTransitionProps extends BaseTransitionProps {
  slideLeft: boolean;
}
interface CollapseTransitionProps extends BaseTransitionProps {
  collapse?: boolean;
}

interface NudgeTopTransitionProps extends BaseTransitionProps {
  nudgeTop: boolean;
}

interface NudgeLeftTransitionProps extends BaseTransitionProps {
  nudgeLeft: boolean;
}

interface NudgeRightTransitionProps extends BaseTransitionProps {
  nudgeRight: boolean;
}

interface NudgeBottomTransitionProps extends BaseTransitionProps {
  nudgeBottom: boolean;
}

interface NudgeTopLeftTransitionProps extends BaseTransitionProps {
  nudgeTop: boolean;
  nudgeLeft: boolean;
}

interface NudgeBottomLeftTransitionProps extends BaseTransitionProps {
  nudgeBottom: boolean;
  nudgeLeft: boolean;
}

interface NudgeTopRightTransitionProps extends BaseTransitionProps {
  nudgeTop: boolean;
  nudgeRight: boolean;
}

interface NudgeBottomRightTransitionProps extends BaseTransitionProps {
  nudgeBottom: boolean;
  nudgeRight: boolean;
}

export type TransitionProps = BaseTransitionProps |
  SlideTopTransitionProps |
  SlideBottonTransitionProps |
  SlideRightTransitionProps |
  SlideLeftTransitionProps |
  CollapseTransitionProps |
  NudgeTopTransitionProps |
  NudgeLeftTransitionProps |
  NudgeRightTransitionProps |
  NudgeBottomTransitionProps |
  NudgeTopLeftTransitionProps |
  NudgeBottomLeftTransitionProps |
  NudgeTopRightTransitionProps |
  NudgeBottomRightTransitionProps

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (props, ref) => {
    const theme: ThemeInterface = React.useContext(ThemeContext);

    const {
      style,
      unmountOnExit,
      in: isOpen,
      initial = 'exit',
      exit = 'exit',
      customTransition={ enter: {transition:{}}, exit: {transition:{}} },
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
              ...themeVariant.baseStyle
            },
            motion: {
              ...acc,
              enter: { 
                ...acc.motion.enter,
                ...themeVariant.motion.enter,
                transition: {
                  ...('transition' in acc.motion.enter ? acc.motion.enter.transition : {}),
                  ...('transition' in themeVariant.motion.enter ? themeVariant.motion.enter.transition : {}),
                }
              },
              exit: { 
                ...acc.motion.exit, 
                ...themeVariant.motion.exit, 
                transition: {
                  ...('transition' in acc.motion.exit ? acc.motion.exit.transition : {}),
                  ...('transition' in themeVariant.motion.exit ? themeVariant.motion.exit.transition : {}),
                } 
              },
            }
          };
        }
        return acc;
      },
      {motion: customTransition, baseStyle:{}}
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
            style={{...variants.baseStyle, ...style}}
            {...rest}
          />
        )}
      </AnimatePresence>
    );
  }
);
