import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { omit, Omit, resolveProps, XOR } from '../../utils';
import {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant,
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
  /**
   * Position within the button for the icon to appear
   * @default ButtonIconPosition.right
   */
  iconPosition?: ButtonIconPosition;
  /**
   * Leading icon to display on the left side of the button
   */
  leadingIcon?: React.ReactElement<IconProps>;
  /**
   * The content of the component
   */
  children: React.ReactChild | React.ReactChild[];
}

export type IconButtonProps = XOR<IconOnlyButtonProps, IconTextButtonProps>;

export interface SpanProps {
  hasIconLeading?: boolean;
  size?: ButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  ${props => {
    const padding = getIconPadding(props);

    return `
      padding-left: ${props.hasIconLeading ? padding : 0};
      padding-right: ${padding};
    `;
  }}
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

export function getIconSize(size, theme) {
  switch (size) {
    case 'large':
      return theme.iconSizes.medium;
    case 'small':
      return theme.iconSizes.xSmall;
    default:
      return theme.iconSizes.small;
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
    let leadingIcon;

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
      leadingIcon = resolvedProps.leadingIcon;
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
          <>
            {leadingIcon &&
              React.Children.only(
                React.cloneElement(leadingIcon, {
                  size: leadingIcon.props.size || getIconSize(size, theme),
                  'data-testid': `${testId}-leading-icon`,
                  'aria-hidden': 'true',
                })
              )}
            <SpanTextLeft
              hasIconLeading={!!leadingIcon}
              size={size}
              theme={theme}
            >
              {children}
            </SpanTextLeft>
          </>
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
