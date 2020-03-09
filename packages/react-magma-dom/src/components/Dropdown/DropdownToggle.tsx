import * as React from 'react';
import { IconButton, ButtonIconPosition } from '../IconButton';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { CaretUpIcon } from '../Icon/types/CaretUpIcon';
import { DropdownContext, DropdownDropDirection } from '.';

export interface DropdownToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children?: any;
}

export const DropdownToggle: React.FunctionComponent<DropdownToggleProps> = ({
  children
}: DropdownToggleProps) => {
  const context = React.useContext(DropdownContext);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon size={10} />
    ) : (
      <CaretDownIcon size={10} />
    );

  return (
    <IconButton
      aria-expanded={context.isOpen}
      aria-haspopup="true"
      icon={buttonIcon}
      onClick={context.toggleDropdown}
      iconPosition={ButtonIconPosition.right}
    >
      {children}
    </IconButton>
  );
};
