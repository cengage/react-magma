import * as React from 'react';

import { Button, ButtonShape, ButtonStyles } from '../Button';
import { IconButton, IconButtonProps } from '../IconButton';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { CaretUpIcon } from '../Icon/types/CaretUpIcon';
import { DropdownContext, DropdownDropDirection } from '.';

export interface DropdownSplitToggleProps extends ButtonStyles {
  ariaLabel?: string;
  children?: any;
  icon?: React.ReactElement<IconButtonProps>;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const DropdownSplitToggle: React.FunctionComponent<
  DropdownSplitToggleProps
> = ({ children, icon, onClick, ...other }: DropdownSplitToggleProps) => {
  const context = React.useContext(DropdownContext);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon size={10} testId="caretUp" />
    ) : (
      <CaretDownIcon size={10} testId="caretDown" />
    );

  return (
    <>
      <Button
        {...other}
        onClick={onClick}
        shape={ButtonShape.leftCap}
        style={{ borderRight: 0, marginRight: 0 }}
      >
        {children}
      </Button>
      <IconButton
        {...other}
        aria-expanded={context.isOpen}
        aria-label="Toggle menu"
        aria-haspopup="true"
        icon={buttonIcon}
        onClick={context.toggleDropdown}
        shape={ButtonShape.rightCap}
        style={{ marginLeft: 0 }}
        ref={context.toggleRef}
      />
    </>
  );
};
