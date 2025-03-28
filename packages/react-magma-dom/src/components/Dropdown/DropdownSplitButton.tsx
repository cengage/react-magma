import * as React from 'react';

import { ArrowDropDownIcon, ArrowDropUpIcon } from 'react-magma-icons';

import {
  Button,
  ButtonColor,
  ButtonShape,
  ButtonStyles,
  ButtonVariant,
} from '../Button';
import { IconButton } from '../IconButton';
import { DropdownContext, DropdownDropDirection } from './Dropdown';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { resolveProps, useForkedRef, useGenerateId } from '../../utils';
import { ButtonGroupContext } from '../ButtonGroup';

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
  const context = React.useContext(DropdownContext);
  const buttonGroupContext = React.useContext(ButtonGroupContext);
  const theme = React.useContext(ThemeContext);

  const resolvedContext = resolveProps(buttonGroupContext, context);
  const resolvedProps = resolveProps(props, resolvedContext);

  const {
    'aria-label': ariaLabel,
    children,
    id,
    variant = ButtonVariant.solid,
    onClick,
    ...other
  } = resolvedProps;

  const ref = useForkedRef(forwardedRef, resolvedContext.toggleRef);
  const splitButtonRef = React.useRef<HTMLButtonElement>(null);

  resolvedContext.dropdownButtonId.current = useGenerateId(id);

  const buttonIcon =
    resolvedContext.dropDirection === DropdownDropDirection.up ? (
      <ArrowDropUpIcon
        size={theme.iconSizes.medium}
        testId="caretUp"
        aria-hidden="true"
      />
    ) : (
      <ArrowDropDownIcon
        size={theme.iconSizes.medium}
        testId="caretDown"
        aria-hidden="true"
      />
    );

  function handleClick(event: React.SyntheticEvent) {
    if (resolvedContext.isOpen) {
      resolvedContext.closeDropdown(event);
    } else {
      resolvedContext.openDropdown();
    }
  }

  function handleButtonClick(event: React.SyntheticEvent) {
    onClick?.();

    if (resolvedContext.isOpen) {
      resolvedContext.closeDropdown(event);
      splitButtonRef.current?.focus();
    }
  }

  const i18n = React.useContext(I18nContext);

  function buildIconButtonStyles(props) {
    if (
      props.color === ButtonColor.secondary ||
      props.color === ButtonColor.subtle
    ) {
      return '0';
    }
    return theme.spaceScale.spacing01;
  }

  return (
    <div ref={context.setReference}>
      <Button
        {...other}
        id={resolvedContext.dropdownButtonId.current}
        isInverse={resolvedContext.isInverse}
        onClick={handleButtonClick}
        shape={ButtonShape.leftCap}
        style={{ borderRight: 0, marginRight: 0 }}
        variant={variant}
        tabIndex={0}
        ref={splitButtonRef}
      >
        {children}
      </Button>
      <IconButton
        {...other}
        aria-expanded={resolvedContext.isOpen}
        aria-label={ariaLabel || i18n.dropdown.toggleMenuAriaLabel}
        aria-haspopup="true"
        icon={buttonIcon}
        isInverse={resolvedContext.isInverse}
        onClick={handleClick}
        shape={ButtonShape.rightCap}
        style={{
          marginLeft: buildIconButtonStyles(resolvedProps),
        }}
        ref={ref}
        variant={variant}
      />
    </div>
  );
});
