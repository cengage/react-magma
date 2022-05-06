import * as React from 'react';
import { StyledButton } from '../StyledButton';
import { useIsInverse } from '../../inverse';

export enum ButtonVariant {
  solid = 'solid', //default
  link = 'link',
}

export enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  danger = 'danger',
  marketing = 'marketing',
}

export enum ButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round', // default for icon only buttons
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small',
}

export enum ButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none',
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export interface ButtonStyles {
  /**
   * The color of the button, indicating its function in the UI
   * @default ButtonColor.primary
   */
  color?: ButtonColor;
  /**
   *  Set the button to display full-width.
   * @default false
   */
  isFullWidth?: boolean;
  isInverse?: boolean;
  /**
   * Defines the border radius
   * @default ButtonShape.fill
   */
  shape?: ButtonShape;
  /**
   *  Set the button to a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * The relative size of the button
   * @default ButtonSize.medium
   */
  size?: ButtonSize;
  /**
   * Determines whether the button appears in all-caps
   * @default ButtonTextTransform.uppercase
   */
  textTransform?: ButtonTextTransform;
  /**
   * The variant of the button
   * @default ButtonVariant.solid
   */
  variant?: ButtonVariant;
}

/**
 * @children required
 */
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /**
   * @internal
   */
  theme?: any;
  /**
   * The type attribute of the button
   * ButtonType.button
   */
  type?: ButtonType;
}

export type ButtonProps = BaseButtonProps & ButtonStyles;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const isInverse = useIsInverse(props.isInverse);

    return (
      <StyledButton {...rest} isInverse={isInverse} ref={ref}>
        {children}
      </StyledButton>
    );
  }
);
