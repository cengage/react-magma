import * as React from 'react';

import { ThemeContext } from '../../theme/ThemeContext';
import { Modal, ModalProps } from '../Modal';
import { TransitionProps } from '../Transition';

export enum DrawerPosition {
  top = 'top', // default
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

const transitionPreset: {
  [key in DrawerPosition]: Omit<TransitionProps, 'isOpen'>;
} = {
  top: { slideTop: true },
  bottom: { slideBottom: true },
  left: { slideLeft: true },
  right: { slideRight: true },
};

/**
 * @children required
 */
export interface DrawerProps extends Omit<ModalProps, 'size'> {
  /**
   * @internal
   */
  testId?: string;
  /**
   * Style properties for the drawer
   */
  drawerStyle?: React.CSSProperties;
  /**
   * Style properties for the drawer container
   */
  containerStyle?: React.CSSProperties;
  /**
   * Set the position of the drawer
   * @default DrawerPosition.top
   */
  position?: DrawerPosition;
  /**
   * Shows a background overlay when the drawer is open.
   * @default true
   */
  showBackgroundOverlay?: boolean;
  /**
   * If true, enables sliding animations for the drawer
   * @default false
   */
  isAnimated?: boolean;
  isInverse?: boolean;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, _ref) => {
    const {
      style,
      containerStyle,
      position,
      isAnimated = false,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const drawerStyle = {
      ...theme.drawer.default,
      ...theme.drawer[DrawerPosition[position]],
    } as React.CSSProperties;

    let containerTransition: Omit<TransitionProps, 'isOpen'> | undefined;
    if (isAnimated) {
      containerTransition = position
        ? transitionPreset[DrawerPosition[position]]
        : transitionPreset[DrawerPosition[DrawerPosition.top]];
    }

    return (
      <Modal
        containerStyle={{
          padding: '0',
          ...containerStyle,
        }}
        containerTransition={containerTransition}
        hasDrawerAnimation={isAnimated}
        style={{ ...drawerStyle, ...style }}
        {...rest}
      />
    );
  }
);
