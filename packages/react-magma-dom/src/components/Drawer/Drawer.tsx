import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { Modal, ModalProps } from '../Modal';

export enum DrawerPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

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
      position = DrawerPosition.left,
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
        transitionPreset={DrawerPosition[position]}
        style={{ ...drawerStyle, ...style }}
        {...rest}
      />
    );
  }
);
