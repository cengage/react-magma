import * as React from 'react';

import {
  IconButton,
  IconTextButtonProps,
  ButtonIconPosition
} from '../IconButton';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { CaretUpIcon } from '../Icon/types/CaretUpIcon';
import { DropdownContext, DropdownDropDirection } from '.';

export const DropdownToggle: React.FunctionComponent<IconTextButtonProps> = ({
  children,
  icon,
  ...other
}: IconTextButtonProps) => {
  const context = React.useContext(DropdownContext);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon size={10} testId="caretUp" />
    ) : (
      <CaretDownIcon size={10} testId="caretDown" />
    );

  function handleClick() {
    if (context.isOpen) {
      context.closeDropdown();
    } else {
      context.openDropdown();
    }
  }

  return (
    <IconButton
      {...other}
      aria-expanded={context.isOpen}
      aria-haspopup="true"
      icon={icon ? icon : buttonIcon}
      iconPosition={ButtonIconPosition.right}
      onClick={handleClick}
      ref={context.toggleRef}
    >
      {children}
    </IconButton>
  );
};
