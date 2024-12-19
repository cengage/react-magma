import * as React from 'react';
import { css } from '@emotion/core';
import { transparentize } from 'polished';

import { CancelIcon, IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Omit, XOR, getNodeText } from '../../utils';
import { I18nContext } from '../../i18n';
import styled from '@emotion/styled';

export enum TagColor {
  default = 'default', // default
  primary = 'primary',
  lowContrast = 'lowContrast',
  highContrast = 'highContrast',
}

export enum TagSize {
  medium = 'medium', // default
  small = 'small',
}

/**
 * @children required
 */

export interface BaseTagProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Color changes between 'primary', 'low contrast', and 'high contrast' style variants between each Tag.
   * @default TagColor.default
   */
  color?: TagColor;

  /**
   * Size toggles between a default, and a small size Tag.
   * @default TagSize.medium
   */
  size?: TagSize;

  /**
   * Gets the active Tag label for use with the aria-label attribute inline for accessibility.
   */
  labelText?: React.ReactNode;

  /**
   * Disabled Tag state.
   */
  disabled?: boolean;

  testId?: string;

  /**
   * Allows passing a Magma icon to the Tag.
   */
  icon?: React.ReactElement<IconProps>;

  /**
   * Passes a clickable state to the Tag.
   */
  isClickable?: boolean;

  /**
   * Allows for Inverse styling of each Tag.
   */
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
      if (props.disabled) {
        return `0 0 0 1px ${transparentize(
          0.8,
          props.theme.colors.neutral100
        )}`;
      }
      return `0 0 0 1px ${transparentize(0.5, props.theme.colors.neutral100)}`;
    }
    if (props.disabled) {
      return `0 0 0 1px ${props.theme.colors.neutral300}`;
    }
    return `inset 0 0 0  1px ${props.theme.colors.neutral400}`;
  }
}

function buildButtonBackground(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state background colors
      switch (props.color) {
        case 'primary' || 'highContrast':
          return transparentize(0.7, props.theme.colors.neutral100);
        case 'lowContrast':
          return `none`;
        default:
          return transparentize(0.7, props.theme.colors.neutral100);
      }
    }
    // Inverse background colors
    switch (props.color) {
      case 'primary':
        return props.theme.colors.tertiary500;
      case 'lowContrast':
        return `none;`;
      case 'highContrast':
        return props.theme.colors.neutral100;
      default:
        return props.theme.colors.neutral500;
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state background colors
    switch (props.color) {
      case 'primary' || 'highContrast':
        return transparentize(0.4, props.theme.colors.neutral300);
      case 'lowContrast':
        return props.theme.colors.neutral100;
      default:
        return transparentize(0.4, props.theme.colors.neutral300);
    }
  }
  // Default state background colors
  switch (props.color) {
    case 'primary':
      return props.theme.colors.primary;
    case 'lowContrast':
      return props.theme.colors.neutral100;
    case 'highContrast':
      return props.theme.colors.neutral700;
    default:
      return props.theme.colors.neutral300;
  }
}

function buildButtonTextColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state text colors
      switch (props.color) {
        case 'primary' || 'highContrast':
          return transparentize(0.6, props.theme.colors.neutral100);

        case 'lowContrast':
          return transparentize(0.7, props.theme.colors.neutral100);

        default:
          return transparentize(0.6, props.theme.colors.neutral100);
      }
    }
    // Inverse text colors
    switch (props.color) {
      case 'primary':
        return props.theme.colors.primary600;
      case 'lowContrast':
        return props.theme.colors.tertiary500;
      case 'highContrast':
        return props.theme.colors.neutral700;
      default:
        return props.theme.colors.neutral100;
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state text colors
    return transparentize(0.4, props.theme.colors.neutral500);
  }
  // Default state text colors
  switch (props.color) {
    case 'primary':
      return props.theme.colors.neutral100;
    case 'highContrast':
      return props.theme.colors.neutral100;
    case 'lowContrast':
      return props.theme.colors.neutral700;
    default:
      return props.theme.colors.neutral700;
  }
}

function buildSvgOpacity(props) {
  if (props.isInverse) {
    if (props.color === 'lowContrast' && props.disabled) {
      return '30%';
    }
    if (props.onClick || props.onDelete) {
      if (props.disabled) {
        return '40%';
      }
      return '75%';
    }
  }
  if (props.onClick || props.onDelete) {
    if (props.disabled) {
      return '60%';
    }
    return '75%';
  }
  if (props.color === 'lowContrast' && props.disabled) {
    return '30%';
  } else if (props.disabled) {
    return '40%';
  }
  return '1';
}

function buildTagPadding(props) {
  if (props.icon) {
    switch (props.size) {
      case 'small':
        return `0 ${props.theme.spaceScale.spacing02}`;
      default:
        return `${props.theme.spaceScale.spacing02} 6px`;
    }
  }
  switch (props.size) {
    case 'small':
      return `0 ${props.theme.spaceScale.spacing02}`;
    default:
      return `${props.theme.spaceScale.spacing02} 6px`;
  }
}

function buildLabelPadding(props) {
  if (props.icon) {
    switch (props.size) {
      case 'small':
        return `0 ${props.theme.spaceScale.spacing02}`;
      default:
        return `0 ${props.theme.spaceScale.spacing03}`;
    }
  }
  switch (props.size) {
    case 'small':
      return `0 ${props.theme.spaceScale.spacing02}`;
    default:
      return `0 ${props.theme.spaceScale.spacing03}`;
  }
}

const TagStyling = props => css`
  border: ${props.theme.tag.border};
  border-radius: ${props.theme.spaceScale.spacing05};
  background: ${buildButtonBackground(props)};
  color: ${buildButtonTextColor(props)};
  box-shadow: ${buildBoxShadow(props)};
  font-family: ${props.theme.bodyFont};
  display: ${props.theme.tag.display};
  align-items: ${props.theme.tag.alignItems};
  justify-content: ${props.theme.tag.justifyContent};
  font-size: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.fontSize}`
    : `${props.theme.typeScale.size02.fontSize}`};
  font-weight: ${props.size === 'small' ? `500` : `inherit`};
  letter-spacing: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.letterSpacing}`
    : `${props.theme.typeScale.size02.letterSpacing}`};
  min-width: ${props.size === 'small'
    ? props.theme.spaceScale.spacing10
    : props.theme.spaceScale.spacing12};
  padding: ${buildTagPadding(props)};
  svg:first-of-type {
    opacity: ${props.disabled ? buildSvgOpacity(props) : 'inherit'};
    height: ${props.size === 'small'
      ? `${props.theme.iconSizes.xSmall}px`
      : `${props.theme.iconSizes.small}px`};
    width: ${props.size === 'small'
      ? `${props.theme.iconSizes.xSmall}px`
      : `${props.theme.iconSizes.small}px`};
  }
  svg:last-child {
    opacity: ${buildSvgOpacity(props)};
    width: ${props.size === 'small'
      ? `${props.theme.iconSizes.xSmall}px`
      : `${props.theme.iconSizes.small}px`};
  }
`;

const StyledButton = styled.button<{
  disabled?: boolean;
  isClickable?: boolean;
  isInverse?: boolean;
  size: string;
  theme: ThemeInterface;
}>`
  ${TagStyling};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &:focus {
    outline-offset: 2px;
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
  }
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
  padding: ${buildLabelPadding};
`;

function getStyledTag(isClickable: boolean) {
  return isClickable ? StyledButton : StyledSpan;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  (props, ref) => {
    const {
      children,
      color,
      labelText = children,
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

    const deleteAriaLabel = i18n.tag.deleteAriaLabel.replace(
      /\{labelText\}/g,
      getNodeText(labelText)
    );

    const { icon } = props;

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
        icon={icon}
        onClick={handleClick}
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        size={size}
        theme={theme}
        {...rest}
      >
        {icon}
        <LabelWrap size={size} {...rest} theme={theme}>
          {children}
        </LabelWrap>
        {onDelete && (
          <CancelIcon
            aria-label={deleteAriaLabel}
            size={theme.iconSizes.small}
          />
        )}
      </StyledTag>
    );
  }
);
