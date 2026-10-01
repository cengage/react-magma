import * as React from 'react';

import { transparentize } from 'polished';
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  IconProps,
} from 'react-magma-icons';

import { DropdownContext, DropdownDropDirection } from './Dropdown';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { resolveProps, useForkedRef, useGenerateId } from '../../utils';
import {
  Button,
  ButtonColor,
  ButtonShape,
  ButtonStyles,
  ButtonVariant,
} from '../Button';
import { ButtonGroupContext } from '../ButtonGroup';
import { getIconSize, IconButton } from '../IconButton';

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
   * Leading icon to display on the left side within the component
   */
  leadingIcon?: React.ReactElement<IconProps>;
  /**
   * Function that fires when the button is clicked
   */
  onClick?: () => void;
  /**
   * Ref for the main action button (left side).
   */
  mainButtonRef?: React.Ref<HTMLButtonElement>;
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
    mainButtonRef,
    variant = ButtonVariant.solid,
    onClick,
    leadingIcon,
    ...other
  } = resolvedProps;

  const ref = useForkedRef(forwardedRef, resolvedContext.toggleRef);
  const splitButtonRef = React.useRef<HTMLButtonElement>(null);
  const mainRef = useForkedRef(
    splitButtonRef,
    mainButtonRef ? resolvedContext.leftButtonRef : null,
    mainButtonRef ?? null
  );

  resolvedContext.dropdownButtonId.current = useGenerateId(id);

  const buttonIcon =
    resolvedContext.dropDirection === DropdownDropDirection.up ? (
      <ArrowDropUpIcon
        size={getIconSize(other.size, theme)}
        testId="caretUp"
        aria-hidden="true"
      />
    ) : (
      <ArrowDropDownIcon
        size={getIconSize(other.size, theme)}
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

  function buildDividerColor(color: ButtonColor, isInverse: boolean) {
    const resolvedColor = color ?? ButtonColor.primary;

    if (isInverse) {
      if (resolvedColor === ButtonColor.primary) {
        return theme.colors.cyan600;
      }
      if (resolvedColor === ButtonColor.secondary) {
        return theme.colors.neutral800;
      }
      if (resolvedColor === ButtonColor.subtle) {
        return transparentize(0.8, theme.colors.neutral0);
      }

      return theme.colors.neutral0;
    }

    if (resolvedColor === ButtonColor.primary) {
      return theme.colors.blue700;
    }
    if (resolvedColor === ButtonColor.danger) {
      return theme.colors.red700;
    }
    if (
      resolvedColor === ButtonColor.secondary ||
      resolvedColor === ButtonColor.subtle
    ) {
      return theme.colors.neutral300;
    }

    return theme.colors.neutral0;
  }

  const sharedButtonProps = {
    ...other,
    id: resolvedContext.dropdownButtonId.current,
    isInverse: resolvedContext.isInverse,
    onClick: handleButtonClick,
    shape: ButtonShape.leftCap,
    style: { borderRight: 0, marginRight: 0 },
    variant,
    tabIndex: 0,
    ref: mainRef,
  };

  return (
    <div ref={context.setReference}>
      {leadingIcon ? (
        <IconButton {...sharedButtonProps} icon={leadingIcon}>
          {children}
        </IconButton>
      ) : (
        <Button {...sharedButtonProps}>{children}</Button>
      )}
      <IconButton
        {...other}
        aria-controls={
          (id ?? context.dropdownButtonId.current) + '_dropdownMenuId'
        }
        aria-expanded={resolvedContext.isOpen}
        aria-label={ariaLabel || i18n.dropdown.toggleMenuAriaLabel}
        aria-haspopup="true"
        icon={buttonIcon}
        isInverse={resolvedContext.isInverse}
        onClick={handleClick}
        shape={ButtonShape.rightCap}
        style={{
          borderLeft: `1px solid ${buildDividerColor(
            resolvedProps.color,
            resolvedContext.isInverse
          )}`,
          marginLeft: 0,
        }}
        ref={ref}
        variant={variant}
      />
    </div>
  );
});
