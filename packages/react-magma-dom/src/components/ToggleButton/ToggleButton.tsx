import * as React from 'react';
import styled from '../../theme/styled';
import { XOR } from '../../utils';
import { css } from '@emotion/core';
import { transparentize } from 'polished';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { Button, ButtonProps, ButtonSize } from '../Button';
import { ButtonColor } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';
import { ToggleButtonGroupContext } from '../ToggleButtonGroup/ToggleButtonGroup';

export interface ToggleButtonTextProps extends ButtonProps {
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  /**
   * @internal
   */
  isChecked?: boolean;
  isInverse?: boolean;
  /**
   * Changes the button size: 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
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
  hasLabel?: boolean;
  /**
   * Icon which displays alongside text.
   */
  icon: React.ReactElement<IconProps>;
  /**
   * @internal
   */
  isChecked?: boolean;
  isInverse?: boolean;
  /**
   * Changes the button size: 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
}

export type ToggleButtonProps = XOR<
  ToggleButtonTextProps,
  ToggleButtonIconProps
>;

//Sets the icon width for icon only Toggle Buttons.
export function setIconWidth(props: ToggleButtonIconProps) {
  if (props.size === ButtonSize.small) {
    return props.theme.spaceScale.spacing07;
  }
  if (props.size === ButtonSize.large) {
    return props.theme.spaceScale.spacing11;
  }
  return props.theme.spaceScale.spacing09;
}

//Sets the background colors for the Toggle Buttons.
export function setBackgroundColor(props) {
  //Active background color.
  if (props.selected && props.isChecked) {
    return 'none';
  }
  if (props.selected || props.isChecked) {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return transparentize(0.5, props.theme.colors.neutral300);
  }
}

export const ToggleButtonStyles = props => css`
  background: ${setBackgroundColor(props)};
  &:not(:disabled):hover {
    background: ${setBackgroundColor(props)};
  }
  &:not(:disabled):focus {
    background: ${setBackgroundColor(props)};
    outline-offset: -2px;
  }
  &:hover {
    background: ${setBackgroundColor(props)};
  }
`;

const StyledToggleButtonIcon = styled(IconButton)`
  ${ToggleButtonStyles}
  min-width: auto;
  width: ${props => (!props.hasLabel ? setIconWidth : '')};
  span {
    padding: ${props => (!props.hasLabel ? 0 : '')};
  }
`;

const StyledToggleButtonText = styled(Button)`
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
    isInverse,
    onClick,
    testId,
    value,
  } = props;

  const context = React.useContext(ToggleButtonGroupContext);

  const theme = React.useContext(ThemeContext);

  const [selected, setSelected] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!context.exclusive) {
      if (selected || props.isChecked) {
        setSelected(false);
      } else if (!selected) {
        setSelected(true);
      }
    }
    onClick && typeof onClick === 'function' && onClick(event);
  };

  return (
    <>
      {icon ? (
        <StyledToggleButtonIcon
          aria-checked={selected}
          aria-label={ariaLabel}
          color={ButtonColor.subtle}
          disabled={disabled}
          theme={theme}
          hasLabel={children ? true : false}
          icon={icon}
          id={context.descriptionId}
          isChecked={
            context.selectedValue ? context.selectedValue === value : null
          }
          isInverse={context.isInverse || isInverse}
          onClick={handleClick}
          ref={ref}
          enforced={context.enforced}
          role="switch"
          selected={selected}
          exclusive={context.exclusive}
          size={context.size || props.size}
          testId={testId}
          value={value}
        >
          <>{children}</>
        </StyledToggleButtonIcon>
      ) : (
        <StyledToggleButtonText
          aria-checked={selected}
          color={ButtonColor.subtle}
          disabled={disabled}
          theme={theme}
          id={context.descriptionId}
          isChecked={
            context.selectedValue ? context.selectedValue === value : null
          }
          isInverse={context.isInverse || isInverse}
          onClick={handleClick}
          ref={ref}
          enforced={context.enforced}
          role="switch"
          selected={selected}
          exclusive={context.exclusive}
          size={context.size || props.size}
          testId={testId}
          value={value}
        >
          {children}
        </StyledToggleButtonText>
      )}
    </>
  );
});
