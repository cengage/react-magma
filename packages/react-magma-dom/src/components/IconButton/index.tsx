import * as React from 'react';
import styled from '../../theme/styled';
import { StyledButton } from '../StyledButton';
import {
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonTextTransform,
} from '../Button';
import { IconProps } from 'react-magma-icons';
import { omit, Omit, XOR } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';

export enum ButtonIconPosition {
  left = 'left',
  right = 'right',
}

export interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  /**
   * Icon to display within the component
   */
  icon: React.ReactElement<IconProps>;
  /**
   * The text the screen reader will announce. Required for icon-only buttons
   */
  'aria-label': string;
}

export interface IconTextButtonProps extends ButtonProps {
  /**
   * Icon to display within the component
   */
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  /**
   * Position within the button for the icon to appear
   * @default ButtonIconPosition.right
   */
  iconPosition?: ButtonIconPosition;
}

export type IconButtonProps = XOR<IconOnlyButtonProps, IconTextButtonProps>;

export interface SpanProps {
  size?: ButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  padding-right: ${props => getIconPadding(props)};
`;

const SpanTextRight = styled.span<SpanProps>`
  padding-left: ${props => getIconPadding(props)};
`;

function getIconPadding(props) {
  switch (props.size) {
    case 'large':
      return props.theme.spaceScale.spacing05;
    case 'small':
      return props.theme.spaceScale.spacing02;
    default:
      return props.theme.spaceScale.spacing03;
  }
}

function getIconSize(size, theme) {
  switch (size) {
    case 'large':
      return theme.iconSizes.large;
    case 'small':
      return theme.iconSizes.small;
    default:
      return theme.iconSizes.medium;
  }
}

export function instanceOfIconOnly(object: any): object is IconOnlyButtonProps {
  return 'icon' in object && !('children' in object);
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    let icon;
    let iconPosition;
    let children;
    const {
      color,
      shape,
      size,
      testId,
      textTransform,
      variant,
      ...rest
    } = props;

    const { theme } = React.useContext(ThemeContext);

    if (instanceOfIconOnly(props)) {
      icon = props.icon;
    } else {
      icon = props.icon;
      iconPosition = props.iconPosition;
      children = props.children;
    }

    const other = omit(['iconPosition', 'textPosition'], rest);

    const isInverse = useIsInverse(props.isInverse);

    if (icon && !children) {
      return (
        <StyledButton
          {...other}
          ref={ref}
          color={color ? color : ButtonColor.primary}
          iconOnly
          testId={testId}
          isInverse={isInverse}
          shape={shape ? shape : ButtonShape.round}
          size={size ? size : ButtonSize.medium}
          variant={variant ? variant : ButtonVariant.solid}
        >
          {React.Children.only(
            React.cloneElement(icon, {
              size: icon.props.size
                ? icon.props.size
                : getIconSize(size, theme),
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
        isInverse={isInverse}
        shape={shape ? shape : ButtonShape.fill}
        size={size ? size : ButtonSize.medium}
        testId={testId}
        textTransform={
          textTransform ? textTransform : ButtonTextTransform.uppercase
        }
        variant={variant ? variant : ButtonVariant.solid}
      >
        {iconPosition === ButtonIconPosition.right && (
          <SpanTextLeft size={size} theme={theme}>
            {children}
          </SpanTextLeft>
        )}
        {React.Children.only(
          React.cloneElement(icon, {
            size: icon.props.size ? icon.props.size : getIconSize(size, theme),
            'data-testid': `${testId}-icon`,
          })
        )}
        {iconPosition !== ButtonIconPosition.right && (
          <SpanTextRight size={size} theme={theme}>
            {children}
          </SpanTextRight>
        )}
      </StyledButton>
    );
  }
);
