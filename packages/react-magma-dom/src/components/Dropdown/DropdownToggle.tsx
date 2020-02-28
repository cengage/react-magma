import * as React from 'react';
import { IconButton, ButtonIconPosition } from '../IconButton';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { CaretUpIcon } from '../Icon/types/CaretUpIcon';

export enum DropdownDropDirection {
  down = 'down', //default
  up = 'up'
}

export interface DropdownToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children?: any;
  dropDirection?: DropdownDropDirection;
}

export const DropdownToggle: React.FunctionComponent<DropdownToggleProps> = ({
  children,
  dropDirection,
  onClick
}: DropdownToggleProps) => {
  const buttonIcon =
    dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon />
    ) : (
      <CaretDownIcon />
    );

  return (
    <IconButton
      aria-haspopup="true"
      icon={buttonIcon}
      onClick={onClick}
      iconPosition={ButtonIconPosition.right}
    >
      {children}
    </IconButton>
  );
};
