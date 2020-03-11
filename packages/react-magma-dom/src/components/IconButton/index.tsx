import * as React from 'react';
import styled from '../../theme/styled';
import { StyledButton } from '../StyledButton';
import {
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonTextTransform
} from '../Button';
import { IconProps } from '../Icon/utils';
import { omit, Omit } from '../../utils';

export enum ButtonIconPosition {
  left = 'left',
  right = 'right'
}

export interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactElement<IconProps>;
  'aria-label': string;
}

export interface IconTextButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  iconPosition?: ButtonIconPosition;
}

export type IconButtonProps = IconTextButtonProps | IconOnlyButtonProps;

export interface SpanProps {
  size?: ButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  padding-right: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

const SpanTextRight = styled.span<SpanProps>`
  padding-left: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 24;
    case 'small':
      return 14;
    default:
      return 18;
  }
}

function getIconWithTextSize(size) {
  switch (size) {
    case 'large':
      return 20;
    case 'small':
      return 12;
    default:
      return 16;
  }
}

function instanceOfIconOnly(object: any): object is IconOnlyButtonProps {
  return 'icon' in object && !('children' in object);
}

export const IconButton: React.FunctionComponent<
  IconButtonProps
> = React.forwardRef((props: IconButtonProps, ref: any) => {
  let icon;
  let iconPosition;
  let children;
  const { color, shape, size, textTransform, variant, ...rest } = props;

  if (instanceOfIconOnly(props)) {
    icon = props.icon;
  } else {
    icon = props.icon;
    iconPosition = props.iconPosition;
    children = props.children;
  }

  const other = omit(['iconPosition', 'textPosition'], rest);

  if (icon && !children) {
    return (
      <StyledButton
        {...other}
        ref={ref}
        color={color ? color : ButtonColor.primary}
        iconOnly
        shape={shape ? shape : ButtonShape.round}
        size={size ? size : ButtonSize.medium}
        variant={variant ? variant : ButtonVariant.solid}
      >
        {React.Children.only(
          React.cloneElement(icon, {
            size: icon.props.size ? icon.props.size : getIconSize(size)
          })
        )}
      </StyledButton>
    );
  }
  return (
    <StyledButton
      {...other}
      ref={ref}
      color={color ? color : ButtonColor.primary}
      shape={shape ? shape : ButtonShape.fill}
      size={size ? size : ButtonSize.medium}
      textTransform={
        textTransform ? textTransform : ButtonTextTransform.uppercase
      }
      variant={variant ? variant : ButtonVariant.solid}
    >
      {iconPosition === ButtonIconPosition.right && (
        <SpanTextLeft size={size}>{children} </SpanTextLeft>
      )}
      {React.Children.only(
        React.cloneElement(icon, {
          size: icon.props.size ? icon.props.size : getIconWithTextSize(size)
        })
      )}
      {iconPosition !== ButtonIconPosition.right && (
        <SpanTextRight size={size}>{children}</SpanTextRight>
      )}
    </StyledButton>
  );
});
