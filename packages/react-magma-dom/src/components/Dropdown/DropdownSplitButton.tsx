import * as React from 'react';

import { Button, ButtonShape, ButtonStyles } from '../Button';
import { IconButton } from '../IconButton';
import { ArrowDropUpIcon, CaretDownIcon } from 'react-magma-icons';
import { DropdownContext, DropdownDropDirection } from '.';
import { I18nContext } from '../../i18n';
import { useForkedRef, useGenerateId } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';

export interface DropdownSplitButtonProps extends ButtonStyles {
  /**
   * The text the screen reader will announce. Required for icon-only buttons
   */
  'aria-label': string;
  /**
   * The content of the component. If no children are provided, the button will render in an icon only style
   */
  children?: any;
  /**
   * Icon to display within the component
   */
  id?: string;
  /**
   * If true, element is disabled
   */
  disabled?: boolean;
  /**
   * Function that fires when the button is clicked
   */
  onClick?: () => void;
}

export const DropdownSplitButton = React.forwardRef<
  HTMLButtonElement,
  DropdownSplitButtonProps
>((props, forwardedRef) => {
  const { 'aria-label': ariaLabel, children, id, onClick, ...other } = props;

  const context = React.useContext(DropdownContext);

  const theme = React.useContext(ThemeContext);

  const ref = useForkedRef(forwardedRef, context.toggleRef);

  context.dropdownButtonId.current = useGenerateId(id);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <ArrowDropUpIcon size={theme.iconSizes.medium} testId="caretUp" />
    ) : (
      <CaretDownIcon size={theme.iconSizes.medium} testId="caretDown" />
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
        ref={ref}
      />
    </>
  );
});
