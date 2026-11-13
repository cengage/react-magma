import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { CheckIcon, IconProps } from 'react-magma-icons';

import { SegmentedControlContext } from './SegmentedControlContext';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { XOR } from '../../utils';
import { ButtonSize } from '../Button';
import { MenuItemStyles } from '../Dropdown/DropdownMenuItem';
import { getIconSize } from '../IconButton';
import { Tooltip } from '../Tooltip';

interface SegmentedControlItemBaseProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'children'
  > {
  /**
   * Disables this item
   * @default false
   */
  disabled?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Value reported to the SegmentedControl when this item is selected
   */
  value: string;
}

export interface SegmentedControlTextItemProps
  extends SegmentedControlItemBaseProps {
  /**
   * Text label of the item
   */
  children: React.ReactNode;
  /**
   * Icon shown before the label
   */
  leadingIcon?: React.ReactElement<IconProps>;
  /**
   * Icon shown after the label
   */
  trailingIcon?: React.ReactElement<IconProps>;
}

export interface SegmentedControlIconItemProps
  extends SegmentedControlItemBaseProps {
  /**
   * The text the screen reader will announce. Required for icon-only items
   */
  'aria-label': string;
  /**
   * Shows the aria-label in a tooltip on hover and focus
   * @default false
   */
  hasTooltip?: boolean;
  /**
   * Icon shown instead of a text label
   */
  icon: React.ReactElement<IconProps>;
}

export type SegmentedControlItemProps = XOR<
  SegmentedControlTextItemProps,
  SegmentedControlIconItemProps
>;

interface StyleProps {
  disabled?: boolean;
  iconOnly?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  isSelected?: boolean;
  isSliding?: boolean;
  size?: ButtonSize;
  theme: ThemeInterface;
}

function buildFontStyles(props: StyleProps) {
  const { typeScale } = props.theme;

  switch (props.size) {
    case ButtonSize.small:
      return css`
        font-size: ${typeScale.size01.fontSize};
        letter-spacing: ${typeScale.size01.letterSpacing};
        line-height: ${typeScale.size01.lineHeight};
      `;
    case ButtonSize.large:
      return css`
        font-size: ${typeScale.size05.fontSize};
        letter-spacing: 0;
        line-height: ${typeScale.size05.lineHeight};
      `;
    default:
      return css`
        font-size: ${typeScale.size03.fontSize};
        letter-spacing: 0;
        line-height: ${typeScale.size03.lineHeight};
      `;
  }
}

function buildPadding(props: StyleProps) {
  const { spaceScale } = props.theme;

  if (props.iconOnly) {
    switch (props.size) {
      case ButtonSize.small:
        return spaceScale.spacing01;
      case ButtonSize.large:
        return spaceScale.spacing04;
      default:
        return `calc(${spaceScale.spacing02} + ${spaceScale.spacing01})`;
    }
  }

  switch (props.size) {
    case ButtonSize.small:
      return `${spaceScale.spacing01} ${spaceScale.spacing03}`;
    case ButtonSize.large:
      return `${spaceScale.spacing03} ${spaceScale.spacing05}`;
    default:
      return `${spaceScale.spacing02} ${spaceScale.spacing04}`;
  }
}

function buildGap(props: StyleProps) {
  const { spaceScale } = props.theme;

  switch (props.size) {
    case ButtonSize.small:
      return spaceScale.spacing02;
    case ButtonSize.large:
      return spaceScale.spacing04;
    default:
      return spaceScale.spacing03;
  }
}

function buildBackground(props: StyleProps) {
  // While sliding, the control's indicator paints the selected background
  if (!props.isSelected || props.isSliding) {
    return 'transparent';
  }

  return props.isInverse
    ? props.theme.colors.neutral700
    : props.theme.colors.neutral0;
}

function buildColor(props: StyleProps) {
  if (props.disabled) {
    if (props.isInverse) {
      return props.isSelected
        ? props.theme.colors.neutral500
        : props.theme.colors.neutral600;
    }

    return props.isSelected
      ? props.theme.colors.neutral600
      : props.theme.colors.neutral500;
  }

  return props.isInverse
    ? props.theme.colors.neutral0
    : props.theme.colors.primary;
}

function buildCursor(props: StyleProps) {
  if (props.disabled) {
    return 'not-allowed';
  }

  return props.isSelected ? 'default' : 'pointer';
}

// Drop shadow under the selected item, shared with the sliding indicator
export function buildSelectedShadow(theme: ThemeInterface) {
  return `0 2px 6px 0 ${transparentize(0.9, theme.colors.neutral1200)}`;
}

const StyledItem = styled.button<StyleProps>`
  align-items: center;
  background: ${buildBackground};
  border: 0;
  border-radius: ${props => props.theme.borderRadiusExtraSmall};
  box-shadow: ${props =>
    props.isSelected && !props.disabled && !props.isSliding
      ? buildSelectedShadow(props.theme)
      : 'none'};
  color: ${buildColor};
  cursor: ${buildCursor};
  display: inline-flex;
  font-family: ${props => props.theme.bodyFont};
  font-weight: 500;
  gap: ${buildGap};
  justify-content: center;
  margin: 0;
  padding: ${buildPadding};
  position: relative;
  text-align: center;
  white-space: nowrap;
  ${buildFontStyles}

  ${props =>
    props.isFullWidth &&
    css`
      flex: 1 1 0;
      min-width: 0;
    `}

  svg {
    display: block;
    flex-shrink: 0;
  }

  ${props =>
    !props.isSelected &&
    !props.disabled &&
    css`
      &:hover {
        background: ${props.isInverse
          ? props.theme.colors.neutral1100
          : props.theme.colors.neutral300};
      }

      &:active {
        background: ${props.isInverse
          ? props.theme.colors.neutral1150
          : props.theme.colors.neutral400};
      }
    `}

  /* Windows High Contrast removes backgrounds and shadows, so mark the selection with an outline */
  @media (forced-colors: active) {
    &[aria-checked='true'] {
      outline: 2px solid Highlight;
      outline-offset: -2px;
    }
  }

  /* Matches the Button focus outline */
  &:not(:disabled):focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 2px;
    z-index: 1;
  }
`;

// Truncates long labels when items share a fixed width
const StyledLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledMenuItem = styled.button<StyleProps>`
  ${MenuItemStyles}
  background: transparent;
  border: 0;
  gap: ${props => props.theme.spaceScale.spacing03};
  text-align: left;
  white-space: normal;
  width: 100%;

  svg {
    flex-shrink: 0;
  }
`;

// break-word (not anywhere) keeps words whole; only an over-long single word breaks
const MenuLabel = styled.span`
  min-width: 0;
  overflow-wrap: break-word;
`;

const SelectedIndicator = styled.span<{
  isSelected: boolean;
  theme: ThemeInterface;
}>`
  color: ${props => props.theme.colors.neutral600};
  display: inline-flex;
  flex-shrink: 0;
  margin-left: auto;
  padding-left: ${props => props.theme.spaceScale.spacing05};
  visibility: ${props => (props.isSelected ? 'visible' : 'hidden')};
`;

export const SegmentedControlItem = React.forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>((props, ref) => {
  const {
    children,
    disabled: disabledProp,
    hasTooltip,
    icon,
    leadingIcon,
    onClick,
    trailingIcon,
    testId,
    value,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(SegmentedControlContext);

  const size = context.size || ButtonSize.medium;
  const disabled = Boolean(context.disabled || disabledProp);
  const isSelected = context.selectedValue === value;
  const iconOnly = Boolean(icon);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (typeof onClick === 'function') {
      onClick(event);
    }
    if (!event.defaultPrevented) {
      context.onSelect?.(event, value);
    }
  }

  function renderIcon(iconElement?: React.ReactElement<IconProps>) {
    return (
      iconElement &&
      React.cloneElement(iconElement, {
        'aria-hidden': true,
        size: iconElement.props.size || getIconSize(size, theme),
      } as IconProps)
    );
  }

  if (context.isDropdown) {
    return (
      <StyledMenuItem
        {...other}
        aria-checked={isSelected}
        aria-disabled={disabled || undefined}
        data-testid={testId}
        disabled={disabled}
        isInverse={context.isInverse}
        onClick={handleClick}
        ref={ref}
        role="menuitemradio"
        tabIndex={-1}
        theme={theme}
        type="button"
        value={value}
      >
        {renderIcon(icon || leadingIcon)}
        <MenuLabel>{iconOnly ? other['aria-label'] : children}</MenuLabel>
        {renderIcon(trailingIcon)}
        <SelectedIndicator isSelected={isSelected} theme={theme}>
          <CheckIcon
            aria-hidden="true"
            size={theme.iconSizes.medium}
            testId={isSelected ? 'selectedOptionCheck' : undefined}
          />
        </SelectedIndicator>
      </StyledMenuItem>
    );
  }

  const showTooltip = iconOnly && hasTooltip;

  const item = (
    <StyledItem
      {...other}
      aria-checked={isSelected}
      data-testid={testId}
      disabled={disabled}
      iconOnly={iconOnly}
      isSliding={context.isSliding}
      isFullWidth={context.isFullWidth}
      isInverse={context.isInverse}
      isSelected={isSelected}
      onClick={handleClick}
      // Tooltip replaces its trigger's ref, so it forwards this one instead
      ref={showTooltip ? undefined : ref}
      role="radio"
      size={size}
      tabIndex={context.tabbableValue === value ? 0 : -1}
      theme={theme}
      type="button"
      value={value}
    >
      {iconOnly ? (
        renderIcon(icon)
      ) : (
        <>
          {renderIcon(leadingIcon)}
          <StyledLabel>{children}</StyledLabel>
          {renderIcon(trailingIcon)}
        </>
      )}
    </StyledItem>
  );

  if (!showTooltip) {
    return item;
  }

  return (
    <Tooltip
      containerStyle={{
        display: context.isFullWidth ? 'flex' : 'inline-flex',
        flex: context.isFullWidth ? '1 1 0' : undefined,
        minWidth: 0,
      }}
      content={other['aria-label']}
      isInverse={context.isInverse}
      ref={ref}
      // Natural width, so the tooltip doesn't reflow when the control's layout
      // changes during the slide; still capped to the viewport
      tooltipStyle={{
        maxWidth: `calc(100vw - ${theme.spaceScale.spacing05})`,
        width: 'max-content',
      }}
    >
      {item}
    </Tooltip>
  );
});
