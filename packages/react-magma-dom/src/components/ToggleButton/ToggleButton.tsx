import * as React from 'react';
import { XOR } from '../../utils';
import { css } from '@emotion/react';
import { transparentize } from 'polished';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { Button, ButtonProps, ButtonSize, ButtonColor } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';
import { ToggleButtonGroupContext } from '../ToggleButtonGroup/ToggleButtonGroup';
import styled from '@emotion/styled';

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
  if (props.isSelected) {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return transparentize(0.5, props.theme.colors.neutral300);
  }
}

export const ToggleButtonStyles = props => css`
  background: ${setBackgroundColor(props)};
  &:not(:disabled):focus {
    background: ${setBackgroundColor(props)};
    outline-offset: -2px;
  }
  &:hover {
    background: ${setBackgroundColor(props)};
  }
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
  const roleCheck = context.exclusive ? 'radio' : 'switch';

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

  return (
    <>
      {icon ? (
        <StyledToggleButtonIcon
          aria-checked={isSelected}
          aria-label={ariaLabel}
          color={ButtonColor.subtle}
          disabled={disabled}
          theme={theme}
          hasLabel={children ? true : false}
          icon={icon}
          id={context.descriptionId}
          isInverse={inverseCheck}
          onClick={context.exclusive ? handleClickExclusive : handleClick}
          ref={ref}
          enforced={context.enforced}
          role={roleCheck}
          isSelected={isSelected}
          exclusive={context.exclusive}
          size={props.size || context.size}
          testId={testId}
          value={value}
        >
          <>{children}</>
        </StyledToggleButtonIcon>
      ) : (
        <StyledToggleButtonText
          aria-checked={isSelected}
          color={ButtonColor.subtle}
          disabled={disabled}
          theme={theme}
          id={context.descriptionId}
          isInverse={inverseCheck}
          onClick={context.exclusive ? handleClickExclusive : handleClick}
          ref={ref}
          enforced={context.enforced}
          role={roleCheck}
          isSelected={isSelected}
          exclusive={context.exclusive}
          size={props.size || context.size}
          testId={testId}
          value={value}
        >
          {children}
        </StyledToggleButtonText>
      )}
    </>
  );
});
