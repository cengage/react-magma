import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';

import { CancelIcon, IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Omit, XOR } from '../../utils';
import { I18nContext } from '../../i18n';

/**
 * @children required
 */

export enum TagColor {
  primary = 'primary',
  lowContrast = 'lowContrast',
  highContrast = 'highContrast',
}

export enum TagSize {
  medium = 'medium',
  small = 'small',
}

export interface BaseTagProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  color?: TagColor;
  size?: TagSize;
  disabled?: boolean;
  testId?: string;
  icon?: React.ReactElement<IconProps>;
  isClickable?: boolean;
  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface DeletableTagProps extends BaseTagProps {
  onDelete: () => void;
}

export interface ClickableTagProps extends BaseTagProps {
  onClick?: () => void;
}

export type TagProps = XOR<DeletableTagProps, ClickableTagProps>;

function buildBoxShadow(props) {
  if (props.color === 'lowContrast') {
    if (props.isInverse) {
      return `0 0 0 1px ${props.theme.colors.neutral08}`;
    }
    if (props.disabled) {
      return `0 0 0 1px ${props.theme.colors.neutral06}`;
    }
    return `inset 0 0 0  1px ${props.theme.colors.neutral05}`;
  }
}

function buildButtonBackground(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state background colors
      switch (props.color) {
        case 'primary':
          return `${props.theme.colors.neutral06}`;
        case 'highContrast':
          return `${props.theme.colors.neutral06}`;
        case 'lowContrast':
          return `none`;
        default:
          return `${props.theme.colors.neutral06}`;
      }
    }
    // Inverse background colors
    switch (props.color) {
      case 'primary':
        return `${props.theme.colors.primaryInverse}`;
      case 'lowContrast':
        return `none;`;
      case 'highContrast':
        return `${props.theme.colors.neutral08}`;
      default:
        return `${props.theme.colors.neutral03}`;
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state background colors
    switch (props.color) {
      case 'primary':
        return `${props.theme.colors.neutral06}`;
      case 'highContrast':
        return `${props.theme.colors.neutral06}`;
      case 'lowContrast':
        return `${props.theme.colors.neutral08}`;
      default:
        return `${props.theme.colors.neutral06}`;
    }
  }
  // Default state background colors
  switch (props.color) {
    case 'primary':
      return `${props.theme.colors.primary}`;
    case 'lowContrast':
      return `${props.theme.colors.neutral08}`;
    case 'highContrast':
      return `${props.theme.colors.neutral}`;
    default:
      return `${props.theme.colors.neutral06}`;
  }
}

function buildButtonColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state text colors
      switch (props.color) {
        case 'primary':
          return `${props.theme.colors.neutral03}`;
        case 'highContrast':
          return `${props.theme.colors.neutral03}`;
        case 'lowContrast':
          return `${props.theme.colors.neutral08}`;
        default:
          return `${props.theme.colors.neutral03}`;
      }
    }
    // Inverse text colors
    switch (props.color) {
      case 'primary':
        return `${props.theme.colors.neutral}`;
      case 'lowContrast':
        return `${props.theme.colors.neutral08}`;
      case 'highContrast':
        return `${props.theme.colors.neutral}`;
      default:
        return `${props.theme.colors.neutral08}`;
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state text colors
    switch (props.color) {
      case 'primary':
        return `${props.theme.colors.neutral03}`;
      case 'highContrast':
        return `${props.theme.colors.neutral03}`;
      case 'lowContrast':
        return `${props.theme.colors.neutral03}`;
      default:
        return `${props.theme.colors.neutral03}`;
    }
  }
  // Default state text colors
  switch (props.color) {
    case 'primary':
      return `${props.theme.colors.neutral08}`;
    case 'highContrast':
      return `${props.theme.colors.neutral08}`;
    default:
      return `${props.theme.colors.neutral}`;
  }
}

function buildTagOpacity(props) {
  if (props.disabled) {
    if (props.isInverse && props.color === 'lowContrast') {
      return `25%`;
    }
    return `60%`;
  }
}

function buildTagPadding(props) {
  if (props.icon) {
    switch (props.size) {
      case 'small':
        return `0 ${props.theme.spaceScale.spacing01}`;
      default:
        return `${props.theme.spaceScale.spacing02}`;
    }
  }
  switch (props.size) {
    case 'small':
      return `0`;
    default:
      return `${props.theme.spaceScale.spacing02}`;
  }
}

const TagStyling = props => css`
  border: ${props.theme.tag.border};
  border-radius: ${props.theme.spaceScale.spacing05};
  background: ${buildButtonBackground(props)};
  color: ${buildButtonColor(props)};
  box-shadow: ${buildBoxShadow(props)};
  display: ${props.theme.tag.display};
  align-items: ${props.theme.tag.alignItems};
  justify-content: ${props.theme.tag.justifyContent};
  font-size: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.fontSize}`
    : `${props.theme.typeScale.size02.fontSize}`};
  font-weight: ${props.size === 'small' ? `600` : `inherit`};
  opacity: ${buildTagOpacity(props)};
  padding: ${buildTagPadding(props)};
  svg:first-of-type {
    height: ${props.size === 'small'
      ? `${props.theme.iconSizes.small}px`
      : 'inherit'};
    width: ${props.size === 'small'
      ? `${props.theme.iconSizes.small}px`
      : 'inherit'};
  }
  svg:last-child {
    margin: ${props.size === 'small'
      ? `0 ${props.theme.spaceScale.spacing02} 0 -${props.theme.spaceScale.spacing02}`
      : 'inherit'};
    opacity: ${props.onClick || props.onDelete ? '75%' : 'inherit'};
    width: ${props.size === 'small'
      ? `${props.theme.spaceScale.spacing05}`
      : 'inherit'};
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const StyledButton = styled.button<{
  disabled?: boolean;
  isClickable?: boolean;
  isInverse?: boolean;
  size: string;
}>`
  ${TagStyling};
  cursor: pointer;
`;

const StyledSpan = styled.span<{
  disabled?: boolean;
  isInverse?: boolean;
  size: string;
}>`
  ${TagStyling};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'inherit')};
`;

const LabelWrap = styled.span<{
  size: string;
  icon?: any;
}>`
  padding: ${props =>
    props.size === 'small' && props.icon ? '0 8px 0 4px' : '0 8px'};
`;

function getStyledTag(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  (props, ref) => {
    const {
      children,
      color,
      onClick,
      onDelete,
      isInverse: isInverseProp,
      size = TagSize.medium,
      testId,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(isInverseProp);

    const i18n = React.useContext(I18nContext);

    const leftIcon = props.icon;

    const StyledTag = getStyledTag(Boolean(onClick || onDelete));

    function handleClick() {
      if (onClick && typeof onClick === 'function') {
        onClick();
      } else if (onDelete && typeof onDelete === 'function') {
        onDelete();
      }
    }

    return (
      <StyledTag
        color={color}
        icon={leftIcon}
        onClick={handleClick}
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        size={size}
        theme={theme}
        {...rest}
      >
        {leftIcon}
        <LabelWrap size={size} {...rest}>
          {children}
        </LabelWrap>
        {onDelete && (
          <CancelIcon
            aria-label={i18n.tag.deleteAriaLabel}
            size={theme.iconSizes.small}
          />
        )}
      </StyledTag>
    );
  }
);
