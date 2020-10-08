import * as React from 'react';
import { StyledButton } from '../StyledButton';

export enum ButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link',
}

export enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
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
  color?: ButtonColor;
  isFullWidth?: boolean;
  isInverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  textTransform?: ButtonTextTransform;
  type?: ButtonType;
  variant?: ButtonVariant;
}

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  ref?: any;
  theme?: any;
  type?: ButtonType;
}

export type ButtonProps = BaseButtonProps & ButtonStyles;

export const Button: React.FunctionComponent<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref: any) => {
    const {
      children,
      color,
      shape,
      size,
      textTransform,
      variant,
      ...rest
    } = props;

    return (
      <StyledButton
        {...rest}
        ref={ref}
        color={color ? color : ButtonColor.primary}
        shape={shape ? shape : ButtonShape.fill}
        size={size ? size : ButtonSize.medium}
        textTransform={
          textTransform ? textTransform : ButtonTextTransform.uppercase
        }
        variant={variant ? variant : ButtonVariant.solid}
      >
        {children}
      </StyledButton>
    );
  }
);
