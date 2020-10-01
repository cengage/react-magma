import * as React from 'react';

import { IconButton, ButtonIconPosition } from '../IconButton';
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  IconProps
} from 'react-magma-icons';
import { DropdownContext, DropdownDropDirection } from '.';
import { Omit, useGenerateId, XOR } from '../../utils';
import { ButtonProps } from '../Button';

export interface IconOnlyDropdownButtonProps
  extends Omit<ButtonProps, 'children'> {
  icon?: React.ReactElement<IconProps>;
  'aria-label': string;
}

export interface IconTextDropdownButtonProps extends ButtonProps {
  icon?: React.ReactElement<IconProps>;
  iconPosition?: ButtonIconPosition;
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

export const DropdownButton: React.FunctionComponent<DropdownButtonProps> = (
  props: DropdownButtonProps
) => {
  const context = React.useContext(DropdownContext);

  context.dropdownButtonId.current = useGenerateId(props.id);

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
      ref={context.toggleRef}
    >
      {children}
    </IconButton>
  );
};
