import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { Modal, ModalProps } from '../Modal';
import { TransitionProps } from '../Transition';

export enum DrawerPosition {
  Top = 'Top',
  Bottom = 'Bottom',
  Left = 'Left',
  Right = 'Right',
}

const transitionPreset: {
  [key in DrawerPosition]: Omit<TransitionProps, 'isOpem'>;
} = {
  Top: { slideTop: true },
  Bottom: { slideBottom: true },
  Left: { slideLeft: true },
  Right: { slideRight: true },
};

/**
 * @children required
 */
export interface DrawerProps extends ModalProps {
  testId?: string;
  /**
   * Style properties for the drawer
   */
  style?: React.CSSProperties;
  /**
   * Style properties for the drawer container
   */
  containerStyle?: React.CSSProperties;
  /**
   * Set the position of the drawer
   */
  position?: DrawerPosition;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => {
    const {
      style,
      containerStyle,
      position = DrawerPosition.Left,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const drawerStyle = {
      ...theme.drawer.default,
      ...theme.drawer[DrawerPosition[position]],
    } as React.CSSProperties;
    return (
      <Modal
        containerStyle={{
          padding: '0',
          position: 'absolute',
          ...containerStyle,
        }}
        containerTransition={transitionPreset[DrawerPosition[position]]}
        style={{ ...drawerStyle, ...style }}
        {...rest}
      />
    );
  }
);
