import * as React from 'react';

import { useIsInverse } from '../../inverse';
import { resolveProps } from '../../utils';
import { ButtonGroupContext } from '../ButtonGroup';
import { StyledButton } from '../StyledButton';

export enum ButtonVariant {
  solid = 'solid', //default
  link = 'link',
}

export enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  danger = 'danger',
  success = 'success',
  marketing = 'marketing',
  subtle = 'subtle',
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
   * Set the button to display full-width.
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
  /**
   * @internal
   */
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
    const contextProps = React.useContext(ButtonGroupContext);
    const resolvedProps = resolveProps(contextProps, props);
    const { color, shape, size, testId, textTransform, variant, ...rest } =
      resolvedProps;
    const isInverse = useIsInverse(resolvedProps.isInverse);

    return (
      <StyledButton
        {...rest}
        ref={ref}
        color={color || ButtonColor.primary}
        isInverse={isInverse}
        shape={shape || ButtonShape.fill}
        size={size || ButtonSize.medium}
        testId={testId}
        textTransform={textTransform || ButtonTextTransform.uppercase}
        variant={variant || ButtonVariant.solid}
      >
        {resolvedProps.children}
      </StyledButton>
    );
  }
);
