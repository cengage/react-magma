import { Variant } from 'framer-motion';

export type MotionVariants<T extends string> = Record<T, Variant>;

export type TransitionInstances = {
  [key in keyof typeof transitions]?: MotionVariants<'enter' | 'exit'>;
};

export interface ThemeTransitions {
  [key: string]: MotionVariants<'enter' | 'exit'>;
}

export const transitions: ThemeTransitions = {
  fade: {
    exit: { opacity: 0 },
    enter: { opacity: 1 },
  },
  slideTop: {
    exit: {
      y: '-100%',
    },
    enter: {
      y: '0',
    },
  },
  slideBottom: {
    exit: {
      y: '100%',
    },
    enter: {
      y: '0',
    },
  },
  slideRight: {
    exit: {
      y: '100%',
    },
    enter: {
      y: '0',
    },
  },
  slideLeft: {
    exit: {
      y: '-100%',
    },
    enter: {
      y: '0',
    },
  },
  scale: {
    exit: {
      scale: 0.95,
    },
    enter: {
      scale: 1,
    },
  },
  collapse: {
    exit: {
      height: 0,
    },
    enter: {
      height: 'auto',
    },
  },
};
