import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { IconProps } from 'react-magma-icons';

import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { XOR } from '../../utils';
import { Button, ButtonColor, ButtonProps, ButtonSize } from '../Button';
import { IconButton } from '../IconButton';
import {
  ToggleButtonGroupContext,
  ToggleButtonGroupRole,
} from '../ToggleButtonGroup';

export interface ToggleButtonTextProps extends ButtonProps {
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  /**
   * Sets an active button state for a single button.
   */
  isChecked?: boolean;
  isInverse?: boolean;
  /**
   * Changes the button size: 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
  /**
   * Value of the button element
   */
  value: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface ToggleButtonIconProps extends ButtonProps {
  /**
   * Sets the aria-label which is required for icon only buttons.
   */
  'aria-label'?: string;
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  /**
   * Icon which displays alongside text.
   */
  icon: React.ReactElement<IconProps>;
  /**
   * Sets an active button state for a single button.
   */
  isChecked?: boolean;
  isInverse?: boolean;
  /**
   * Changes the button size: 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
  /**
   * Value of the button element
   */
  value: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export type ToggleButtonProps = XOR<
  ToggleButtonTextProps,
  ToggleButtonIconProps
>;

export enum ToggleButtonRole {
  radio = 'radio',
  switch = 'switch',
  tab = 'tab',
}

export function getToggleButtonRole(
  groupRole?: ToggleButtonGroupRole,
  exclusive?: boolean
): ToggleButtonRole {
  if (groupRole === ToggleButtonGroupRole.tablist) {
    return ToggleButtonRole.tab;
  }
  if (groupRole === ToggleButtonGroupRole.radiogroup) {
    return ToggleButtonRole.radio;
  }

  return exclusive ? ToggleButtonRole.radio : ToggleButtonRole.switch;
}

//Sets the icon width for icon only Toggle Buttons
export function setIconWidth(props: ToggleButtonIconProps) {
  if (props.size === ButtonSize.small) {
    return props.theme.spaceScale.spacing07;
  }
  if (props.size === ButtonSize.large) {
    return props.theme.spaceScale.spacing11;
  }

  return props.theme.spaceScale.spacing09;
}

//Sets the background color for the Toggle Button
export function setBackgroundColor(props) {
  if (props.isInverse) {
    return setInverseBackgroundColor(props);
  }

  if (props.disabled) {
    return transparentize(
      props.isSelected ? 0.25 : 0.5,
      props.theme.colors.neutral200
    );
  }

  if (props.isSelected) {
    return props.theme.colors.neutral700;
  }

  return transparentize(0.5, props.theme.colors.neutral200);
}

function setColor(props) {
  if (props.disabled) {
    return props.isInverse
      ? props.theme.colors.neutral600
      : props.theme.colors.neutral500;
  }

  if (props.isInverse) {
    return props.isSelected ? props.theme.colors.neutral0 : undefined;
  }

  return props.isSelected
    ? props.theme.colors.neutral0
    : props.theme.colors.neutral700;
}

function setDisabledColor(props) {
  return props.isInverse
    ? props.theme.colors.neutral600
    : props.theme.colors.neutral500;
}

function setDisabledBackgroundColor(props) {
  if (!props.isInverse) {
    return transparentize(
      props.isSelected ? 0.25 : 0.5,
      props.theme.colors.neutral200
    );
  }

  return transparentize(0.5, props.theme.colors.neutral900);
}

function setBorder(props) {
  return '1px solid transparent';
}

function setInverseBackgroundColor(props, interaction = 'default') {
  if (props.disabled) {
    return transparentize(0.5, props.theme.colors.neutral900);
  }

  if (props.isSelected) {
    if (interaction === 'active') {
      return props.theme.colors.neutral900;
    }

    return interaction === 'hover' || interaction === 'focus'
      ? props.theme.colors.neutral800
      : props.theme.colors.neutral700;
  }

  return interaction === 'hover' || interaction === 'active'
    ? props.theme.colors.neutral900
    : transparentize(0.5, props.theme.colors.neutral900);
}

export const ToggleButtonStyles = props => css`
  border-radius: ${props.theme.borderRadius};

  ${props.isSelected &&
  css`
    background: ${setBackgroundColor(props)};
    border: ${setBorder(props)};
    color: ${setColor(props)};

    &:disabled {
      background: ${setDisabledBackgroundColor(props)};
      color: ${setDisabledColor(props)};
    }

    &:not(:disabled):focus {
      background: ${props.isInverse
        ? setInverseBackgroundColor(props, 'focus')
        : props.theme.colors.neutral800};
      color: ${setColor(props)};
      outline-offset: 2px;
    }

    &:not(:disabled):hover {
      background: ${props.isInverse
        ? setInverseBackgroundColor(props, 'hover')
        : props.theme.colors.neutral800};
      color: ${setColor(props)};
    }

    &:not(:disabled):active {
      background: ${props.isInverse
        ? setInverseBackgroundColor(props, 'active')
        : props.theme.colors.neutral900};
      color: ${setColor(props)};
    }
  `}
`;

const StyledToggleButtonIcon = styled(IconButton)<any>`
  ${ToggleButtonStyles}
  min-width: auto;
  width: ${props => (!props.hasLabel ? setIconWidth : '')};
  span {
    padding: ${props => (!props.hasLabel ? 0 : '')};
  }
`;

const StyledToggleButtonText = styled(Button)<any>`
  ${ToggleButtonStyles}
`;

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    children,
    disabled,
    icon,
    isChecked = false,
    isInverse,
    onClick,
    testId,
    value,
    ...other
  } = props;

  const context = React.useContext(ToggleButtonGroupContext);
  const theme = React.useContext(ThemeContext);

  const isDefaultChecked =
    (context.selectedValues &&
      value &&
      context.selectedValues?.includes(value.toString())) ||
    isChecked;

  const [isSelected, setIsSelected] = React.useState(isDefaultChecked);

  React.useEffect(() => {
    setIsSelected(isDefaultChecked);
  }, [isChecked]);

  const inverseCheck = context.isInverse || isInverse;
  const roleCheck = getToggleButtonRole(context.role, context.exclusive);
  const usesAriaSelected = roleCheck === ToggleButtonRole.tab;

  const handleClick = (event: any) => {
    if (
      context.enforced &&
      context.selectedValues.length === 1 &&
      context.selectedValues.includes(value.toString())
    ) {
      setIsSelected(isSelected);
    } else {
      // flip the value of isSelected
      setIsSelected(!isSelected);
    }

    onClick && typeof onClick === 'function' && onClick(event);
    context.onChange &&
      typeof context.onChange === 'function' &&
      context.onChange(event);
  };

  const handleClickExclusive = (event: any) => {
    if (context.selectedValues.includes(value.toString())) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }

    onClick && typeof onClick === 'function' && onClick(event);
    context.onChange &&
      typeof context.onChange === 'function' &&
      context.onChange(event);
  };

  const sharedToggleButtonProps = {
    ...other,
    ...(usesAriaSelected
      ? { 'aria-selected': isSelected }
      : { 'aria-checked': isSelected }),
    color: ButtonColor.secondary,
    disabled: disabled,
    theme: theme,
    isInverse: inverseCheck,
    onClick: context.exclusive ? handleClickExclusive : handleClick,
    ref: ref,
    enforced: context.enforced,
    role: roleCheck,
    isSelected: isSelected,
    exclusive: context.exclusive,
    size: props.size || context.size,
    testId: testId,
    value: value,
  };

  return (
    <>
      {icon ? (
        <StyledToggleButtonIcon
          {...sharedToggleButtonProps}
          aria-label={ariaLabel}
          hasLabel={children ? true : false}
          icon={icon}
        >
          <>{children}</>
        </StyledToggleButtonIcon>
      ) : (
        <StyledToggleButtonText {...sharedToggleButtonProps}>
          {children}
        </StyledToggleButtonText>
      )}
    </>
  );
});
