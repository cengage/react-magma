import * as React from 'react';

import { Button, ButtonShape, ButtonStyles } from '../Button';
import { IconButton, IconButtonProps } from '../IconButton';
import { CaretDownIcon, CaretUpIcon } from 'react-magma-icons';
import { DropdownContext, DropdownDropDirection } from '.';
import { I18nContext } from '../../i18n';
import { useGenerateId } from '../../utils';

export interface DropdownSplitButtonProps extends ButtonStyles {
  'aria-label': string;
  children?: any;
  icon?: React.ReactElement<IconButtonProps>;
  id?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const DropdownSplitButton: React.FunctionComponent<DropdownSplitButtonProps> = ({
  'aria-label': ariaLabel,
  children,
  icon,
  id,
  onClick,
  ...other
}: DropdownSplitButtonProps) => {
  const context = React.useContext(DropdownContext);

  context.dropdownButtonId.current = useGenerateId(id);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon size={10} testId="caretUp" />
    ) : (
      <CaretDownIcon size={10} testId="caretDown" />
    );

  function handleClick(event: React.SyntheticEvent) {
    if (context.isOpen) {
      context.closeDropdown(event);
    } else {
      context.openDropdown();
    }
  }

  const i18n = React.useContext(I18nContext);

  return (
    <>
      <Button
        {...other}
        id={context.dropdownButtonId.current}
        onClick={onClick}
        shape={ButtonShape.leftCap}
        style={{ borderRight: 0, marginRight: 0 }}
      >
        {children}
      </Button>
      <IconButton
        {...other}
        aria-expanded={context.isOpen}
        aria-label={ariaLabel ? ariaLabel : i18n.dropdown.toggleMenuAriaLabel}
        aria-haspopup="true"
        icon={buttonIcon}
        onClick={handleClick}
        shape={ButtonShape.rightCap}
        style={{ marginLeft: 0 }}
        ref={context.toggleRef}
      />
    </>
  );
};
