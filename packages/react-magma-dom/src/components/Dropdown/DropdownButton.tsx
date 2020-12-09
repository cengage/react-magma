import * as React from 'react';

import { IconButton, ButtonIconPosition } from '../IconButton';
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  IconProps,
} from 'react-magma-icons';
import { DropdownContext, DropdownDropDirection } from '.';
import { Omit, useForkedRef, useGenerateId, XOR } from '../../utils';
import { ButtonProps } from '../Button';

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

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>((props, forwardedRef) => {
  const context = React.useContext(DropdownContext);

  context.dropdownButtonId.current = useGenerateId(props.id);

  const ref = useForkedRef(context.toggleRef, forwardedRef);

  function getButtonIcon(dropDirection: DropdownDropDirection) {
    switch (dropDirection) {
      case DropdownDropDirection.left:
        return <CaretLeftIcon size={10} testId="caretLeft" />;
      case DropdownDropDirection.right:
        return <CaretRightIcon size={10} testId="caretRight" />;
      case DropdownDropDirection.up:
        return <CaretUpIcon size={10} testId="caretUp" />;

      default:
        return <CaretDownIcon size={10} testId="caretDown" />;
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
    >
      {children}
    </IconButton>
  );
});
