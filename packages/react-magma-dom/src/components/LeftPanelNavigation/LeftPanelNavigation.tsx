import * as React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { ExpandLessIcon, ExpandMoreIcon, IconProps } from 'react-magma-icons';

import { InverseContext, useIsInverse } from '../../inverse';
import { Colors, ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { collectTextFromReactNode, useGenerateId } from '../../utils';
import { Badge, BadgeColor } from '../Badge';
import { ButtonColor, ButtonShape, ButtonType, ButtonVariant } from '../Button';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownDropDirection,
  DropdownHeader,
  DropdownMenuItem,
  DropdownMenuNavItem,
  useDropdownContext,
} from '../Dropdown';
import { IconButton } from '../IconButton';
import { Tooltip, TooltipPosition } from '../Tooltip';

export type LeftPanelNavigationIconColor = keyof Omit<Colors, 'aiColors'>;

export interface LeftPanelNavigationBadge {
  /**
   * Color variant of the badge.
   * @default BadgeColor.primary
   */
  color?: BadgeColor;
  /**
   * Text label displayed inside the badge.
   */
  label: React.ReactNode;
  /**
   * @internal
   */
  testId?: string;
}

export interface LeftPanelNavigationGroup {
  id: string;
  items: LeftPanelNavigationItem[];
  label: React.ReactNode;
  testId?: string;
}

export interface LeftPanelNavigationItem {
  /**
   * Badge displayed on the right side of the item.
   */
  badge?: LeftPanelNavigationBadge;
  /**
   * Custom link component, such as a router Link.
   */
  component?: React.ElementType;
  /**
   * Adds a divider before the top-level item.
   */
  dividerBefore?: boolean;
  /**
   * Link href. If a custom link component is used, `to` is generally preferred.
   */
  href?: string;
  icon?: React.ReactElement<IconProps>;
  /**
   * Color token for the item's icon. Overrides the `iconColor` prop.
   */
  iconColor?: LeftPanelNavigationIconColor;
  id: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
  items?: LeftPanelNavigationItem[];
  groups?: LeftPanelNavigationGroup[];
  label: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    item: LeftPanelNavigationItem
  ) => void;
  opensInNewTab?: boolean;
  testId?: string;
  /**
   * Custom content displayed in the collapsed item tooltip. Defaults to `label`.
   */
  tooltipContent?: React.ReactNode;
  /**
   * Link destination for router-style link components.
   */
  to?: string;
}

export interface LeftPanelNavigationFooterRenderProps {
  isCollapsed: boolean;
  isInverse: boolean;
}

export interface LeftPanelNavigationProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'height' | 'onChange' | 'width'
  > {
  /**
   * Allows multiple top-level sections to be expanded at once.
   * @default true
   */
  allowMultipleExpanded?: boolean;
  /**
   * Sets the current item by id.
   */
  activeItemId?: string;
  /**
   * Accessible label for the collapse button.
   * @default 'close sidebar'
   */
  collapseButtonLabel?: string;
  /**
   * Top-level sections expanded initially.
   */
  defaultExpandedIds?: string[];
  /**
   * If true, the navigation is collapsed initially.
   * @default false
   */
  defaultIsCollapsed?: boolean;
  /**
   * Accessible label for the expand button.
   * @default 'open sidebar'
   */
  expandButtonLabel?: string;
  /**
   * Controlled top-level expanded section ids.
   */
  expandedIds?: string[];
  /**
   * Optional content displayed at the bottom of the navigation panel.
   */
  footer?:
    | React.ReactNode
    | ((props: LeftPanelNavigationFooterRenderProps) => React.ReactNode);
  /**
   * If true, adds a right border to the navigation container.
   * @default false
   */
  hasRightBorder?: boolean;
  /**
   * Height of the navigation. If a number is provided, value will be in pixels.
   */
  height?: number | string;
  /**
   * Color token for icons in the navigation.
   */
  iconColor?: LeftPanelNavigationIconColor;
  /**
   * If true, adds a button to collapse the navigation to an icon-only view.
   * @default false
   */
  isCollapsible?: boolean;
  /**
   * Controlled collapsed state.
   */
  isCollapsed?: boolean;
  isInverse?: boolean;
  /**
   * Top-level navigation items.
   */
  items: LeftPanelNavigationItem[];
  /**
   * Custom link component, such as a router Link.
   */
  linkComponent?: React.ElementType;
  /**
   * Optional logo displayed above the navigation items.
   */
  logo?: React.ReactNode;
  /**
   * Width of the optional logo. If a number is provided, value will be in pixels.
   */
  logoWidth?: number | string;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  onExpandedChange?: (expandedIds: string[]) => void;
  onItemClick?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: LeftPanelNavigationItem
  ) => void;
  testId?: string;
  /**
   * Optional content displayed above the navigation items within the scrollable area.
   */
  topContent?:
    | React.ReactNode
    | ((props: LeftPanelNavigationFooterRenderProps) => React.ReactNode);
  /**
   * Width of the expanded navigation. If a number is provided, value will be in pixels.
   * @default 280
   */
  width?: number | string;
}

function getItemDestination(item: LeftPanelNavigationItem) {
  return item.to || item.href;
}

function hasChildren(item: LeftPanelNavigationItem) {
  return Boolean(item.items?.length || item.groups?.length);
}

function isCurrentItem(item: LeftPanelNavigationItem, activeItemId?: string) {
  return Boolean(item.isCurrent || activeItemId === item.id);
}

function getItemHasCurrentDescendant(
  item: LeftPanelNavigationItem,
  activeItemId?: string
) {
  if (isCurrentItem(item, activeItemId)) {
    return true;
  }

  if (
    item.items?.some(child => getItemHasCurrentDescendant(child, activeItemId))
  ) {
    return true;
  }

  return Boolean(
    item.groups?.some(group =>
      group.items.some(child =>
        getItemHasCurrentDescendant(child, activeItemId)
      )
    )
  );
}

function getDefaultExpandedIds(
  items: LeftPanelNavigationItem[],
  activeItemId?: string
) {
  return items
    .filter(
      item =>
        hasChildren(item) && getItemHasCurrentDescendant(item, activeItemId)
    )
    .map(item => item.id);
}

function getNormalizedIds(ids: string[]) {
  return Array.from(new Set(ids));
}

function getSafeId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function convertNavigationStyleValue(
  value?: number | string,
  defaultValue = 'initial'
) {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return /^-?\d+(\.\d+)?$/.test(value.trim()) ? `${value}px` : value;
}

function LeftPanelOpenIcon(props: IconProps) {
  const { size = 20, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-hidden="true"
      focusable="false"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M500-592v224q0 14 12 19t22-5l98-98q12-12 12-28t-12-28l-98-98q-10-10-22-5t-12 19ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LeftPanelCloseIcon(props: IconProps) {
  const { size = 20, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-hidden="true"
      focusable="false"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M660-368v-224q0-14-12-19t-22 5l-98 98q-12 12-12 28t12 28l98 98q10 10 22 5t12-19ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"
        fill="currentColor"
      />
    </svg>
  );
}

const StyledNav = styled.nav<{
  hasRightBorder?: boolean;
  isCollapsed?: boolean;
  isInverse?: boolean;
  navigationHeight: string;
  navigationWidth: string;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary700
      : props.theme.colors.neutral100};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  border-right: ${props =>
    props.hasRightBorder
      ? `1px solid ${
          props.isInverse
            ? props.theme.colors.borderInverse
            : props.theme.colors.border
        }`
      : '0'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.bodyFont};
  height: ${props => props.navigationHeight};
  overflow-x: ${props => (props.isCollapsed ? 'visible' : 'hidden')};
  overflow-y: visible;
  padding-bottom: ${props => props.theme.spaceScale.spacing03};
  padding-top: ${props => props.theme.spaceScale.spacing03};
  position: relative;
  transition: width 100ms ease-in-out;
  width: ${props =>
    props.isCollapsed
      ? `calc(${props.theme.spaceScale.spacing09} + ${props.theme.spaceScale.spacing03} + ${props.theme.spaceScale.spacing03})`
      : props.navigationWidth};
`;

const ListContainer = styled.div<{
  isCollapsed?: boolean;
  navigationHeight: string;
  theme: ThemeInterface;
}>`
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: ${props => (props.isCollapsed ? 'visible' : 'hidden')};
  overflow-y: ${props =>
    props.navigationHeight !== 'auto' && !props.isCollapsed
      ? 'auto'
      : 'visible'};
`;

const TopContentContainer = styled.div`
  flex: 0 0 auto;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TopLevelListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavigationHeader = styled.div<{
  hasLogo?: boolean;
  isCollapsed?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing03};
  justify-content: ${props =>
    props.hasLogo
      ? 'space-between'
      : props.isCollapsed
        ? 'flex-start'
        : 'flex-end'};
  margin: 0 ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing03};
  min-height: ${props => props.theme.spaceScale.spacing09};
  padding: 0;
`;

const LogoContainer = styled.div<{
  logoWidth: string;
  theme: ThemeInterface;
}>`
  align-items: center;
  display: flex;
  flex: 0 1 auto;
  margin-left: ${props => props.theme.spaceScale.spacing03};
  width: ${props => props.logoWidth};

  img,
  svg {
    display: block;
    height: auto;
    max-width: 100%;
  }
`;

const CollapseButton = styled(IconButton)`
  && {
    flex: 0 0 auto;
  }
`;

const FooterContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary700
      : props.theme.colors.neutral100};
  border-top: 1px solid
    ${props =>
      props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral100)
        : props.theme.colors.border};
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  min-width: 0;
  padding: ${props => props.theme.spaceScale.spacing03};
  position: absolute;
  right: 0;
  z-index: 5;
`;

const Divider = styled.hr<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  border: 0;
  border-top: 1px solid
    ${props =>
      props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
  display: block;
  height: 0;
  margin: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing05};
  padding: 0;
`;

const topLevelItemStyles = props => `
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${props.theme.borderRadius};
  box-sizing: border-box;
  color: ${props.isInverse ? props.theme.colors.neutral100 : props.theme.colors.neutral700};
  cursor: pointer;
  display: flex;
  font-family: ${props.theme.bodyFont};
  font-size: ${props.theme.typeScale.size02.fontSize};
  font-weight: 500;
  gap: 0;
  height: ${props.theme.spaceScale.spacing09};
  justify-content: space-between;
  line-height: ${props.theme.typeScale.size02.lineHeight};
  margin-left: ${props.theme.spaceScale.spacing03};
  margin-right: ${props.theme.spaceScale.spacing03};
  min-height: ${props.theme.spaceScale.spacing09};
  padding: 0;
  text-align: left;
  text-decoration: none;
  transition:
    background-color 150ms ease-in-out,
    color 150ms ease-in-out;
  width: calc(100% - ${props.theme.spaceScale.spacing05});

  &:hover {
    background: ${
      props.isInverse
        ? transparentize(0.75, props.theme.colors.neutral900)
        : props.theme.colors.neutral200
    };
    color: ${props.isInverse ? props.theme.colors.neutral100 : props.theme.colors.neutral700};
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid ${
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus
    };
    outline-offset: -2px;
    position: relative;
    z-index: 4;
  }

  &[disabled],
  &[aria-disabled='true'] {
    color: ${
      props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : transparentize(0.4, props.theme.colors.neutral500)
    };
    cursor: not-allowed;
  }

  &[aria-current='page'],
  &[data-current='true'],
  &[aria-current='page']:hover,
  &[data-current='true']:hover {
    background: ${
      props.isInverse
        ? props.theme.colors.primary500
        : props.theme.colors.primary100
    };
    color: ${props.isInverse ? props.theme.colors.neutral100 : props.theme.colors.primary500};
  }

  &[aria-current='page'] [aria-hidden='true'],
  &[data-current='true'] [aria-hidden='true'] {
    color: inherit;
  }
`;

const TopLevelButton = styled.button<{
  isCollapsed?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  ${topLevelItemStyles}
`;

const TopLevelLink = styled('a', {
  shouldForwardProp: isPropValid,
})<{
  isCollapsed?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  ${topLevelItemStyles}
`;

const TopLevelDropdown = styled(Dropdown)<{
  theme: ThemeInterface;
}>`
  display: block;

  > div:first-of-type {
    width: 100%;
  }
`;

const TopLevelDropdownButton = styled(DropdownButton, {
  shouldForwardProp: prop => prop !== 'iconColor',
})<{
  iconColor?: LeftPanelNavigationIconColor;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  && {
    ${topLevelItemStyles}
    justify-content: center;
  }

  svg {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.iconColor
          ? props.theme.colors[props.iconColor]
          : 'inherit'};
    height: ${props => props.theme.iconSizes.small}px;
    width: ${props => props.theme.iconSizes.small}px;
  }
`;

const ItemContent = styled.span<{
  hasIcon?: boolean;
  isCollapsed?: boolean;
  isTopLevel?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  display: inline-flex;
  flex: 1 1 auto;
  gap: ${props => (props.isTopLevel ? 0 : props.theme.spaceScale.spacing03)};
  justify-content: flex-start;
  min-width: 0;
  overflow: hidden;
`;

const ItemLabel = styled.span<{
  hasIcon?: boolean;
  isCollapsed?: boolean;
  isTopLevel?: boolean;
  theme: ThemeInterface;
}>`
  display: inline-block;
  max-width: ${props => (props.isTopLevel && props.isCollapsed ? 0 : '20rem')};
  opacity: ${props => (props.isTopLevel && props.isCollapsed ? 0 : 1)};
  overflow-wrap: anywhere;
  overflow: hidden;
  padding-left: ${props =>
    props.isTopLevel && !props.hasIcon ? props.theme.spaceScale.spacing03 : 0};
  text-overflow: ellipsis;
  transition:
    opacity 75ms ease-in-out,
    max-width 0ms linear
      ${props => (props.isTopLevel && props.isCollapsed ? '75ms' : '0ms')};
  white-space: nowrap;
`;

const IconWrapper = styled.span<{
  iconColor?: LeftPanelNavigationIconColor;
  isInverse?: boolean;
  isTopLevel?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.iconColor
        ? props.theme.colors[props.iconColor]
        : 'inherit'};
  display: inline-flex;
  flex: 0 0 auto;
  height: ${props =>
    props.isTopLevel
      ? props.theme.spaceScale.spacing09
      : `${props.theme.iconSizes.small}px`};
  justify-content: center;
  line-height: 0;
  width: ${props =>
    props.isTopLevel
      ? props.theme.spaceScale.spacing09
      : `${props.theme.iconSizes.small}px`};

  svg {
    height: ${props => props.theme.iconSizes.small}px;
    width: ${props => props.theme.iconSizes.small}px;
  }

`;

const ChevronWrapper = styled.span<{
  theme: ThemeInterface;
}>`
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  height: ${props => props.theme.iconSizes.small}px;
  justify-content: center;
  line-height: 0;
  width: ${props => props.theme.iconSizes.small}px;

  svg {
    height: ${props => props.theme.iconSizes.small}px;
    width: ${props => props.theme.iconSizes.small}px;
  }
`;

const ItemActions = styled.span<{
  isCollapsed?: boolean;
  hasEndPadding?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: ${props => props.theme.spaceScale.spacing03};
  margin-left: ${props =>
    props.isCollapsed ? 0 : props.theme.spaceScale.spacing03};
  max-width: ${props => (props.isCollapsed ? 0 : '10rem')};
  opacity: ${props => (props.isCollapsed ? 0 : 1)};
  overflow: hidden;
  padding-right: ${props =>
    props.hasEndPadding && !props.isCollapsed
      ? props.theme.spaceScale.spacing03
      : 0};
  transition:
    opacity 75ms ease-in-out,
    max-width 0ms linear ${props => (props.isCollapsed ? '75ms' : '0ms')},
    margin-left 0ms linear ${props => (props.isCollapsed ? '75ms' : '0ms')},
    padding-right 0ms linear ${props => (props.isCollapsed ? '75ms' : '0ms')};
`;

const NavigationBadge = styled(Badge)`
  && {
    flex: 0 0 auto;
    margin: 0;
  }
`;

const Panel = styled.div<{
  theme: ThemeInterface;
}>`
  padding-bottom: ${props => props.theme.spaceScale.spacing03};
`;

const guideLineLeft = '26px';

const GuidedList = styled(List)<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  position: relative;

  &::before {
    background: ${props =>
      props.isInverse
        ? transparentize(0.75, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
    bottom: 0;
    content: '';
    left: ${guideLineLeft};
    position: absolute;
    top: 0;
    width: 1px;
    z-index: 2;
  }
`;

const NestedListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const GroupedList = styled(List)<{
  theme: ThemeInterface;
}>`
  margin-top: calc(${props => props.theme.spaceScale.spacing03} * -1);
`;

const GroupListItem = styled.li<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;

  &::before {
    background: ${props =>
      props.isInverse
        ? transparentize(0.75, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
    bottom: 0;
    content: '';
    left: ${guideLineLeft};
    position: absolute;
    top: 25px;
    width: 1px;
    z-index: 2;
  }

  &::after {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.neutral700
        : props.theme.colors.neutral100};
    border: 1px solid
      ${props =>
        props.isInverse
          ? transparentize(0.65, props.theme.colors.neutral100)
          : props.theme.colors.neutral300};
    border-radius: 50%;
    content: '';
    height: 9px;
    left: ${guideLineLeft};
    position: absolute;
    top: 20px;
    transform: translate(-50%, -50%);
    width: 9px;
    z-index: 4;
  }
`;

const GroupLabel = styled.p<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral300
      : props.theme.colors.neutral500};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  font-weight: 500;
  letter-spacing: ${props => props.theme.typeScale.size01.letterSpacing};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  margin: ${props => props.theme.spaceScale.spacing03} 0 0;
  padding: 12px ${props => props.theme.spaceScale.spacing05} 12px
    calc(${guideLineLeft} + ${props => props.theme.spaceScale.spacing05});
  position: relative;
  text-transform: uppercase;
  z-index: 3;
`;

const NestedLink = styled('a', {
  shouldForwardProp: isPropValid,
})<{
  isCollapsed?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  box-sizing: border-box;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  gap: ${props => props.theme.spaceScale.spacing03};
  justify-content: space-between;
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-left: ${guideLineLeft};
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing05};
  position: relative;
  text-decoration: none;
  width: calc(100% - ${guideLineLeft});

  &:hover {
    background: ${props =>
      props.isInverse
        ? transparentize(0.75, props.theme.colors.neutral900)
        : props.theme.colors.neutral200};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
    text-decoration: none;
  }

  &:focus {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: -2px;
    z-index: 4;
  }

  &[aria-current='page'],
  &[data-current='true'],
  &[aria-current='page']:hover,
  &[data-current='true']:hover {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary500
        : props.theme.colors.primary100};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.primary500};
  }

  &[aria-current='page'] [aria-hidden='true'],
  &[data-current='true'] [aria-hidden='true'] {
    color: inherit;
  }

  &[aria-current='page']::before,
  &[data-current='true']::before {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary200
        : props.theme.colors.primary500};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 2px;
    z-index: 3;
  }

  &[aria-disabled='true'] {
    color: ${props =>
      props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : transparentize(0.4, props.theme.colors.neutral500)};
    cursor: not-allowed;
  }
`;

function renderIcon(
  icon: React.ReactElement<IconProps>,
  theme: ThemeInterface,
  iconColor?: LeftPanelNavigationIconColor,
  isTopLevel = false,
  isInverse = false
) {
  return (
    <IconWrapper
      aria-hidden="true"
      iconColor={iconColor}
      isInverse={isInverse}
      isTopLevel={isTopLevel}
      theme={theme}
    >
      {icon}
    </IconWrapper>
  );
}

function renderItemBadge(badge: LeftPanelNavigationBadge, isInverse?: boolean) {
  return (
    <NavigationBadge
      color={badge.color || BadgeColor.primary}
      isInverse={isInverse}
      testId={badge.testId}
    >
      {badge.label}
    </NavigationBadge>
  );
}

function getLinkDestinationProps(
  item: LeftPanelNavigationItem,
  LinkComponent: React.ElementType
) {
  const destination = getItemDestination(item);

  if (!destination || item.isDisabled) {
    return {};
  }

  if (item.href || LinkComponent === 'a') {
    return { href: destination };
  }

  return { to: destination };
}

interface CollapsedSubmenuNavItemProps {
  activeItemId?: string;
  item: LeftPanelNavigationItem;
  onNavigate: (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: LeftPanelNavigationItem
  ) => void;
}

function CollapsedSubmenuNavItem(props: CollapsedSubmenuNavItemProps) {
  const { activeItemId, item, onNavigate } = props;
  const dropdownContext = useDropdownContext();

  if (item.isDisabled) {
    return <DropdownMenuItem disabled>{item.label}</DropdownMenuItem>;
  }

  return (
    <DropdownMenuNavItem
      aria-current={isCurrentItem(item, activeItemId) ? 'page' : undefined}
      icon={item.icon}
      onClick={event => {
        onNavigate(event, item);
        dropdownContext.closeDropdown?.(event);
      }}
      rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
      target={item.opensInNewTab ? '_blank' : undefined}
      to={getItemDestination(item) || '#'}
    >
      {item.label}
    </DropdownMenuNavItem>
  );
}

const collapsedTooltipContainerStyle: React.CSSProperties = {
  display: 'block',
};

const openContentDelay = 110;

export const LeftPanelNavigation = React.forwardRef<
  HTMLElement,
  LeftPanelNavigationProps
>((props, ref) => {
  const {
    allowMultipleExpanded = true,
    activeItemId,
    collapseButtonLabel = 'close sidebar',
    defaultExpandedIds,
    defaultIsCollapsed = false,
    expandButtonLabel = 'open sidebar',
    expandedIds,
    footer,
    hasRightBorder,
    height,
    iconColor,
    isCollapsed: isCollapsedProp,
    isCollapsible,
    isInverse: isInverseProp,
    items,
    linkComponent,
    logo,
    logoWidth,
    onCollapsedChange,
    onExpandedChange,
    onItemClick,
    testId,
    topContent,
    width,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);
  const canCollapse = Boolean(isCollapsible);
  const logoWidthString = convertNavigationStyleValue(logoWidth, 'auto');
  const navigationHeightString = convertNavigationStyleValue(height, 'auto');
  const navigationWidthString = convertNavigationStyleValue(width, '280px');
  const navId = useGenerateId(rest.id);
  const isControlled = expandedIds !== undefined;
  const isCollapsedControlled = isCollapsedProp !== undefined;
  const [uncontrolledIsCollapsed, setUncontrolledIsCollapsed] =
    React.useState(defaultIsCollapsed);
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = React.useState<
    string[]
  >(() => defaultExpandedIds ?? getDefaultExpandedIds(items, activeItemId));

  const currentIsCollapsed = canCollapse
    ? (isCollapsedProp ?? uncontrolledIsCollapsed)
    : false;
  const [isExpandedContentVisible, setIsExpandedContentVisible] =
    React.useState(!currentIsCollapsed);
  const [isCollapsedDropdownReady, setIsCollapsedDropdownReady] =
    React.useState(currentIsCollapsed);
  const currentExpandedIds = expandedIds ?? uncontrolledExpandedIds;
  const shouldUseCollapsedTopLevelContent =
    currentIsCollapsed || !isExpandedContentVisible;
  const footerContent =
    typeof footer === 'function'
      ? footer({ isCollapsed: currentIsCollapsed, isInverse })
      : footer;
  const topContentNode =
    typeof topContent === 'function'
      ? topContent({ isCollapsed: currentIsCollapsed, isInverse })
      : topContent;

  React.useEffect(() => {
    if (currentIsCollapsed) {
      setIsExpandedContentVisible(false);
      setIsCollapsedDropdownReady(false);

      const timeoutId = window.setTimeout(() => {
        setIsCollapsedDropdownReady(true);
      }, openContentDelay);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    setIsCollapsedDropdownReady(false);

    const timeoutId = window.setTimeout(() => {
      setIsExpandedContentVisible(true);
    }, openContentDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentIsCollapsed]);

  React.useEffect(() => {
    if (isControlled || defaultExpandedIds) {
      return;
    }

    const activeExpandedIds = getDefaultExpandedIds(items, activeItemId);

    if (activeExpandedIds.length) {
      setUncontrolledExpandedIds(currentIds =>
        getNormalizedIds([...currentIds, ...activeExpandedIds])
      );
    }
  }, [activeItemId, defaultExpandedIds, isControlled, items]);

  function updateExpandedIds(itemId: string) {
    const isExpanded = currentExpandedIds.includes(itemId);
    let nextExpandedIds: string[];

    if (isExpanded) {
      nextExpandedIds = currentExpandedIds.filter(id => id !== itemId);
    } else if (allowMultipleExpanded) {
      nextExpandedIds = getNormalizedIds([...currentExpandedIds, itemId]);
    } else {
      nextExpandedIds = [itemId];
    }

    if (!isControlled) {
      setUncontrolledExpandedIds(nextExpandedIds);
    }

    onExpandedChange?.(nextExpandedIds);
  }

  function updateCollapsed(nextIsCollapsed: boolean) {
    if (!canCollapse) {
      return;
    }

    if (!isCollapsedControlled) {
      setUncontrolledIsCollapsed(nextIsCollapsed);
    }

    onCollapsedChange?.(nextIsCollapsed);
  }

  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    item: LeftPanelNavigationItem
  ) {
    if (item.isDisabled) {
      event.preventDefault();
      return;
    }

    item.onClick?.(event, item);
    onItemClick?.(event, item);
  }

  function renderCollapseToggle() {
    if (!canCollapse) {
      return null;
    }

    const buttonLabel = currentIsCollapsed
      ? expandButtonLabel
      : collapseButtonLabel;

    const collapseButton = (
      <CollapseButton
        aria-label={buttonLabel}
        color={ButtonColor.subtle}
        icon={
          currentIsCollapsed ? <LeftPanelOpenIcon /> : <LeftPanelCloseIcon />
        }
        isInverse={isInverse}
        onClick={() => updateCollapsed(!currentIsCollapsed)}
        shape={ButtonShape.fill}
        type={ButtonType.button}
        variant={ButtonVariant.link}
      />
    );

    return (
      <Tooltip
        containerStyle={collapsedTooltipContainerStyle}
        content={buttonLabel}
        position={TooltipPosition.right}
      >
        {collapseButton}
      </Tooltip>
    );
  }

  function renderCollapsedTooltip(
    item: LeftPanelNavigationItem,
    element: React.ReactElement
  ) {
    return (
      <Tooltip
        containerStyle={collapsedTooltipContainerStyle}
        content={item.tooltipContent ?? item.label}
        open={currentIsCollapsed ? undefined : false}
        position={TooltipPosition.right}
      >
        {element}
      </Tooltip>
    );
  }

  function renderItemContent(
    item: LeftPanelNavigationItem,
    isTopLevel = false
  ) {
    const shouldUseIconOnlyLayout =
      shouldUseCollapsedTopLevelContent && isTopLevel;
    const hasIcon = Boolean(item.icon);

    return (
      <ItemContent
        hasIcon={hasIcon}
        isCollapsed={shouldUseIconOnlyLayout}
        isTopLevel={isTopLevel}
        theme={theme}
      >
        {item.icon &&
          renderIcon(
            item.icon,
            theme,
            item.iconColor || iconColor,
            isTopLevel,
            isInverse
          )}
        <ItemLabel
          hasIcon={hasIcon}
          isCollapsed={shouldUseIconOnlyLayout}
          isTopLevel={isTopLevel}
          theme={theme}
        >
          {item.label}
        </ItemLabel>
      </ItemContent>
    );
  }

  function renderLink(item: LeftPanelNavigationItem, isTopLevel = false) {
    const current = isCurrentItem(item, activeItemId);
    const shouldUseIconOnlyLayout =
      shouldUseCollapsedTopLevelContent && isTopLevel;
    const ItemLink = isTopLevel ? TopLevelLink : NestedLink;
    const LinkComponent = item.component || linkComponent || 'a';
    const destinationProps = getLinkDestinationProps(item, LinkComponent);

    const link = (
      <ItemLink
        {...(destinationProps as any)}
        aria-current={current ? 'page' : undefined}
        aria-disabled={item.isDisabled || undefined}
        as={LinkComponent as any}
        data-current={current ? 'true' : undefined}
        data-testid={item.testId}
        isCollapsed={shouldUseIconOnlyLayout}
        isInverse={isInverse}
        onClick={event => handleLinkClick(event, item)}
        rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
        tabIndex={item.isDisabled ? -1 : undefined}
        target={item.opensInNewTab ? '_blank' : undefined}
        theme={theme}
      >
        {renderItemContent(item, isTopLevel)}
        {item.badge && (
          <ItemActions
            aria-hidden={shouldUseIconOnlyLayout || undefined}
            isCollapsed={shouldUseIconOnlyLayout}
            theme={theme}
          >
            {renderItemBadge(item.badge, isInverse)}
          </ItemActions>
        )}
      </ItemLink>
    );

    if (!isTopLevel) {
      return link;
    }

    return renderCollapsedTooltip(item, link);
  }

  function renderNestedItems(itemsToRender: LeftPanelNavigationItem[]) {
    return (
      <GuidedList isInverse={isInverse} theme={theme}>
        {itemsToRender.map(item => (
          <NestedListItem key={item.id}>{renderLink(item)}</NestedListItem>
        ))}
      </GuidedList>
    );
  }

  function renderGroups(groups: LeftPanelNavigationGroup[]) {
    return (
      <GroupedList theme={theme}>
        {groups.map(group => (
          <GroupListItem
            data-testid={group.testId}
            isInverse={isInverse}
            key={group.id}
            theme={theme}
          >
            <GroupLabel isInverse={isInverse} theme={theme}>
              {group.label}
            </GroupLabel>
            <List>
              {group.items.map(item => (
                <NestedListItem key={item.id}>
                  {renderLink(item)}
                </NestedListItem>
              ))}
            </List>
          </GroupListItem>
        ))}
      </GroupedList>
    );
  }

  function renderCollapsedSubmenuNavItem(item: LeftPanelNavigationItem) {
    return (
      <CollapsedSubmenuNavItem
        activeItemId={activeItemId}
        item={item}
        key={item.id}
        onNavigate={handleLinkClick}
      />
    );
  }

  function renderCollapsedSubmenuContent(item: LeftPanelNavigationItem) {
    return (
      <>
        {item.items?.map(child => renderCollapsedSubmenuNavItem(child))}
        {item.groups?.map(group => (
          <React.Fragment key={group.id}>
            <DropdownHeader>{group.label}</DropdownHeader>
            {group.items.map(child => renderCollapsedSubmenuNavItem(child))}
          </React.Fragment>
        ))}
      </>
    );
  }

  function renderCollapsedTopLevelDropdown(
    item: LeftPanelNavigationItem,
    buttonId: string
  ) {
    const buttonLabel = collectTextFromReactNode(item.label) || 'Open submenu';

    return (
      <TopLevelDropdown
        dropDirection={DropdownDropDirection.right}
        isInverse={isInverse}
        theme={theme}
        width={250}
      >
        {renderCollapsedTooltip(
          item,
          <TopLevelDropdownButton
            aria-label={buttonLabel}
            color={ButtonColor.subtle}
            icon={item.icon || <ExpandMoreIcon />}
            iconColor={item.iconColor || iconColor}
            id={buttonId}
            isInverse={isInverse}
            shape={ButtonShape.fill}
            theme={theme}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        )}
        <DropdownContent id={buttonId}>
          {renderCollapsedSubmenuContent(item)}
        </DropdownContent>
      </TopLevelDropdown>
    );
  }

  function renderTopLevelItem(item: LeftPanelNavigationItem) {
    const isExpandable = hasChildren(item);
    const isExpanded = currentExpandedIds.includes(item.id);
    const safeItemId = getSafeId(item.id);
    const buttonId = `${navId}-${safeItemId}-button`;
    const panelId = `${navId}-${safeItemId}-panel`;

    if (shouldUseCollapsedTopLevelContent && !item.icon) {
      return null;
    }

    if (!isExpandable) {
      return renderLink(item, true);
    }

    if (currentIsCollapsed && isCollapsedDropdownReady) {
      return renderCollapsedTopLevelDropdown(item, buttonId);
    }

    const topLevelButton = (
      <TopLevelButton
        aria-controls={currentIsCollapsed ? undefined : panelId}
        aria-expanded={currentIsCollapsed ? undefined : isExpanded}
        data-testid={item.testId}
        disabled={item.isDisabled}
        id={buttonId}
        isCollapsed={shouldUseCollapsedTopLevelContent}
        isInverse={isInverse}
        onClick={event => {
          item.onClick?.(event, item);

          if (currentIsCollapsed) {
            updateCollapsed(false);

            if (!isExpanded) {
              updateExpandedIds(item.id);
            }

            return;
          }

          updateExpandedIds(item.id);
        }}
        theme={theme}
        type="button"
      >
        {renderItemContent(item, true)}
        <ItemActions
          aria-hidden={shouldUseCollapsedTopLevelContent || undefined}
          hasEndPadding
          isCollapsed={shouldUseCollapsedTopLevelContent}
          theme={theme}
        >
          {item.badge && renderItemBadge(item.badge, isInverse)}
          <ChevronWrapper aria-hidden="true" theme={theme}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ChevronWrapper>
        </ItemActions>
      </TopLevelButton>
    );

    return (
      <>
        {renderCollapsedTooltip(item, topLevelButton)}
        {isExpanded && !shouldUseCollapsedTopLevelContent && (
          <Panel
            aria-labelledby={buttonId}
            id={panelId}
            role="region"
            theme={theme}
          >
            {item.items?.length ? renderNestedItems(item.items) : null}
            {item.groups?.length ? renderGroups(item.groups) : null}
          </Panel>
        )}
      </>
    );
  }

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledNav
        {...rest}
        aria-label={rest['aria-label'] || 'Left panel navigation'}
        data-testid={testId}
        hasRightBorder={hasRightBorder}
        isCollapsed={currentIsCollapsed}
        isInverse={isInverse}
        navigationHeight={navigationHeightString}
        navigationWidth={navigationWidthString}
        ref={ref}
        theme={theme}
      >
        {((logo && !currentIsCollapsed) || canCollapse) && (
          <NavigationHeader
            hasLogo={Boolean(logo && !currentIsCollapsed)}
            isCollapsed={currentIsCollapsed}
            theme={theme}
          >
            {logo && !currentIsCollapsed && (
              <LogoContainer logoWidth={logoWidthString} theme={theme}>
                {logo}
              </LogoContainer>
            )}
            {renderCollapseToggle()}
          </NavigationHeader>
        )}
        <ListContainer
          data-testid={testId ? `${testId}-items` : undefined}
          isCollapsed={currentIsCollapsed}
          navigationHeight={navigationHeightString}
          theme={theme}
        >
          {topContentNode && (
            <TopContentContainer>{topContentNode}</TopContentContainer>
          )}
          <List>
            {items.map(item => (
              <TopLevelListItem key={item.id}>
                {item.dividerBefore && (
                  <Divider isInverse={isInverse} theme={theme} />
                )}
                {renderTopLevelItem(item)}
              </TopLevelListItem>
            ))}
          </List>
        </ListContainer>
        {footerContent && (
          <FooterContainer isInverse={isInverse} theme={theme}>
            {footerContent}
          </FooterContainer>
        )}
      </StyledNav>
    </InverseContext.Provider>
  );
});
