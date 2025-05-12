import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, Omit, resolveProps, XOR } from '../../utils';
import {
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonTextTransform,
} from '../Button';
import { ButtonGroupContext } from '../ButtonGroup';
import { StyledButton } from '../StyledButton';

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

    const contextProps = React.useContext(ButtonGroupContext);
    const theme = React.useContext(ThemeContext);
    const resolvedProps = resolveProps(contextProps, props);
    const { color, shape, size, testId, textTransform, variant, ...rest } =
      resolvedProps;

    if (instanceOfIconOnly(resolvedProps)) {
      icon = resolvedProps.icon;
    } else {
      icon = resolvedProps.icon;
      iconPosition = resolvedProps.iconPosition;
      children = resolvedProps.children;
    }

    const other = omit(['iconPosition', 'textPosition'], rest);

    const isInverse = useIsInverse(resolvedProps.isInverse);

    if (icon && !children) {
      return (
        <StyledButton
          {...other}
          ref={ref}
          color={color || ButtonColor.primary}
          iconOnly
          testId={testId}
          isInverse={isInverse}
          shape={shape || ButtonShape.round}
          size={size || ButtonSize.medium}
          variant={variant || ButtonVariant.solid}
        >
          {React.Children.only(
            React.cloneElement(icon, {
              size: icon.props.size
                ? icon.props.size
                : getIconSize(size, theme),
              'aria-hidden': 'true',
            })
          )}
        </StyledButton>
      );
    }
    return (
      <StyledButton
        {...other}
        ref={ref}
        color={color || ButtonColor.primary}
        isInverse={isInverse}
        shape={shape || ButtonShape.fill}
        size={size || ButtonSize.medium}
        testId={testId}
        textTransform={textTransform || ButtonTextTransform.uppercase}
        variant={variant || ButtonVariant.solid}
      >
        {iconPosition === ButtonIconPosition.right && (
          <SpanTextLeft size={size} theme={theme}>
            {children}
          </SpanTextLeft>
        )}
        {React.Children.only(
          React.cloneElement(icon, {
            size: icon.props.size || getIconSize(size, theme),
            'data-testid': `${testId}-icon`,
            'aria-hidden': 'true',
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
