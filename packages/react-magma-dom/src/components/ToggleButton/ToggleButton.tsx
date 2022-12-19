import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { transparentize } from 'polished';
import { XOR } from '../../utils';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { Button, ButtonProps, ButtonSize } from '../Button';
import { ButtonColor } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';
import { ToggleButtonGroupContext } from './ToggleButtonGroup';

export interface ToggleButtonTextProps
  extends Omit<ButtonProps, 'isChecked' | 'isDefault'> {
  /**
   * Enables a specified button to be active.
   */
  defaultChecked?: boolean;
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  /**
   * Icon which displays alongside text.
   */
  icon?: React.ReactElement<IconProps>;
  isChecked?: boolean;
  isDefault?: boolean;
  isInverse?: boolean;
  /**
   * Restricts deselection of a button within a single selection group.
   */
  requiredSelect?: boolean;
  /**
   * Sets a single selection group.
   */
  singleSelect?: boolean;
  /**
   * Changes the button size throughout the group between 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface ToggleButtonIconProps
  extends Omit<
    ButtonProps,
    'children' | 'isChecked' | 'isDefault' | 'hasLabel'
  > {
  /**
   * Sets the aria-label which is required for icon only buttons.
   */
  'aria-label': string;
  /**
   * Enables a specified button to be active.
   */
  defaultChecked?: boolean;
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  hasLabel?: boolean;
  /**
   * Sets a single selection group.
   */
  singleSelect?: boolean;
  /**
   * Icon which displays alongside text.
   */
  icon: React.ReactElement<IconProps>;
  isChecked?: boolean;
  isDefault?: boolean;
  isInverse?: boolean;
  /**
   * Restricts deselection of a button within a single selection group.
   */
  requiredSelect: boolean;
  /**
   * Changes the button size throughout the group between 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
}

export type ToggleButtonProps = XOR<
  ToggleButtonTextProps,
  ToggleButtonIconProps
>;

//Sets the icon width for icon only Toggle Buttons.
export function setIconWidth(props: ToggleButtonProps) {
  if (props.size === ButtonSize.small) {
    return props.theme.spaceScale.spacing07;
  }
  if (props.size === ButtonSize.medium) {
    return props.theme.spaceScale.spacing09;
  }
  if (props.size === ButtonSize.large) {
    return props.theme.spaceScale.spacing11;
  }
  return props.theme.spaceScale.spacing09;
}

//Sets the background colors for the Toggle Buttons.
export function setBackgroundColor(props: ToggleButtonProps) {
  if (
    (props.isChecked && props.defaultChecked) ||
    (!props.isChecked && props.isDefault)
  ) {
    return '';
  }
  if (props.isChecked || props.defaultChecked || props.isDefault) {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return transparentize(0.5, props.theme.colors.neutral300);
  }
}

//Background colors for the different button states.
export const ToggleButtonStyles = props => css`
  background: ${setBackgroundColor(props)};
  &:not(:disabled):hover {
    background: ${setBackgroundColor(props)};
  }
  &:not(:disabled):focus {
    background: ${setBackgroundColor(props)};
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
    defaultChecked,
    disabled,
    icon,
    testId,
  } = props;
  const { isDefault, isInverse, requiredSelect, singleSelect } =
    React.useContext(ToggleButtonGroupContext);

  const context = React.useContext(ToggleButtonGroupContext);

  const theme = React.useContext(ThemeContext);

  const [isChecked, setChecked] = React.useState(false);

  const handleClick = () => {
    if (isChecked) {
      setChecked(false);
    } else if (!isChecked) {
      setChecked(true);
    }
  };

  return (
    <>
      {icon ? (
        <StyledToggleButtonIcon
          aria-checked={isChecked}
          aria-label={ariaLabel}
          aria-pressed={isChecked}
          color={ButtonColor.subtle}
          defaultChecked={defaultChecked}
          disabled={disabled}
          theme={theme}
          hasLabel={children ? true : null}
          icon={icon}
          isChecked={singleSelect ? null : isChecked}
          isDefault={isDefault}
          isInverse={isInverse}
          onClick={handleClick}
          ref={ref}
          requiredSelect={requiredSelect}
          role="switch"
          singleSelect={singleSelect}
          size={context.size || props.size}
          testId={testId}
        >
          <>{children}</>
        </StyledToggleButtonIcon>
      ) : (
        <StyledToggleButtonText
          aria-checked={isChecked}
          aria-pressed={isChecked}
          color={ButtonColor.subtle}
          defaultChecked={defaultChecked}
          disabled={disabled}
          theme={theme}
          isChecked={singleSelect ? null : isChecked}
          isDefault={isDefault}
          isInverse={isInverse}
          onClick={handleClick}
          ref={ref}
          requiredSelect={requiredSelect}
          role="switch"
          singleSelect={singleSelect}
          size={context.size || props.size}
          testId={testId}
        >
          {children}
        </StyledToggleButtonText>
      )}
    </>
  );
});
