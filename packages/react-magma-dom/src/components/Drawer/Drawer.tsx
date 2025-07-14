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

export interface DrawerProps extends Omit<ModalProps, 'size'> {
  /**
   * @children required
   */
  children: React.ReactNode;
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
  isInverse?: boolean;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => {
    const { style, containerStyle, position, ...rest } = props;
    const theme = React.useContext(ThemeContext);
    const drawerStyle = {
      ...theme.drawer.default,
      ...theme.drawer[DrawerPosition[position]],
    } as React.CSSProperties;

    return (
      <Modal
        containerStyle={{
          padding: '0',
          ...containerStyle,
        }}
        containerTransition={transitionPreset[DrawerPosition[position]]}
        style={{ ...drawerStyle, ...style }}
        {...rest}
      />
    );
  }
);
