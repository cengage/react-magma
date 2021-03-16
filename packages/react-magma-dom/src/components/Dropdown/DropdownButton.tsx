import * as React from 'react';
import { IconButton, ButtonIconPosition } from '../IconButton';
import {
  ArrowDropUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDropDownIcon,
  IconProps,
} from 'react-magma-icons';
import { DropdownContext, DropdownDropDirection } from '.';
import { Omit, useForkedRef, useGenerateId, XOR } from '../../utils';
import { ButtonProps, ButtonSize } from '../Button';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

export interface IconOnlyDropdownButtonProps
  extends Omit<ButtonProps, 'children'> {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * The text the screen reader will announce. Required for icon-only buttons
   */
  'aria-label': string;
}

export interface IconTextDropdownButtonProps extends ButtonProps {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * Position within the button for the icon to appear
   * @default `ButtonIconPosition.right`
   */
  iconPosition?: ButtonIconPosition;
  /**
   * The content of the component
   */
  children: React.ReactChild | React.ReactChild[];
}

export type DropdownButtonProps = XOR<
  IconOnlyDropdownButtonProps,
  IconTextDropdownButtonProps
>;

function instanceOfIconOnlyDropdownButton(
  object: any
): object is IconOnlyDropdownButtonProps {
  return 'icon' in object && !('children' in object);
}

function getButtonPadding(theme: ThemeInterface, size?: ButtonSize) {
  switch (size) {
    case 'small':
      return theme.spaceScale.spacing02;
    case 'large':
      return theme.spaceScale.spacing05;
    default:
      return theme.spaceScale.spacing03;
  }
}

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>((props, forwardedRef) => {
  const context = React.useContext(DropdownContext);
  const theme = React.useContext(ThemeContext);

  context.dropdownButtonId.current = useGenerateId(props.id);

  const ref = useForkedRef(context.toggleRef, forwardedRef);

  function getButtonIcon(dropDirection: DropdownDropDirection) {
    switch (dropDirection) {
      case DropdownDropDirection.left:
        return <ArrowLeftIcon testId="caretLeft" />;
      case DropdownDropDirection.right:
        return <ArrowRightIcon testId="caretRight" />;
      case DropdownDropDirection.up:
        return <ArrowDropUpIcon testId="caretUp" />;

      default:
        return <ArrowDropDownIcon testId="caretDown" />;
    }
  }

  const buttonIcon = getButtonIcon(context.dropDirection);

  let children;
  const { icon = buttonIcon, iconPosition, ...other } = props;

  if (!instanceOfIconOnlyDropdownButton(props)) {
    children = props.children;
  }

  function handleClick(event: React.SyntheticEvent) {
    if (context.isOpen) {
      context.closeDropdown(event);
    } else {
      context.openDropdown();
    }
  }

  const iconPositionToUse = props.icon
    ? iconPosition
      ? iconPosition
      : ButtonIconPosition.left
    : context.dropDirection === DropdownDropDirection.left
    ? ButtonIconPosition.left
    : ButtonIconPosition.right;

  return (
    <IconButton
      {...other}
      aria-expanded={context.isOpen}
      aria-haspopup="true"
      icon={icon}
      iconPosition={iconPositionToUse}
      id={context.dropdownButtonId.current}
      onClick={handleClick}
      onKeyDown={context.handleButtonKeyDown}
      ref={ref}
      style={{
        paddingRight: getButtonPadding(theme, props.size),
        ...props.style,
      }}
    >
      {children}
    </IconButton>
  );
});
