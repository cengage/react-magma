import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';

import { CancelIcon, IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Omit, XOR, getNodeText } from '../../utils';
import { I18nContext } from '../../i18n';

export enum TagColor {
  primary = 'primary',
  lowContrast = 'lowContrast',
  highContrast = 'highContrast',
}

export enum TagSize {
  medium = 'medium',
  small = 'small',
}

/**
 * @children required
 */

export interface BaseTagProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Color changes between 'primary', 'low contrast', and 'high contrast' style variants between each Tag.
   */
  color?: TagColor;

  /**
   * Size toggles between a default, and a small size Tag.
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
        return `0 0 0 1px ${props.theme.colors.neutral08}40`;
      }
      return `0 0 0 1px ${props.theme.colors.neutral08}80`;
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

function buildButtonTextColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state text colors
      switch (props.color) {
        case 'primary':
          return `${props.theme.colors.neutral03}99`;
        case 'highContrast':
          return `${props.theme.colors.neutral03}99`;
        case 'lowContrast':
          return `${props.theme.colors.neutral08}40`;
        default:
          return `${props.theme.colors.neutral03}99`;
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
        return `${props.theme.colors.neutral03}99`;
      case 'highContrast':
        return `${props.theme.colors.neutral03}99`;
      case 'lowContrast':
        return `${props.theme.colors.neutral03}99`;
      default:
        return `${props.theme.colors.neutral03}99`;
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

function buildSvgOpacity(props) {
  if (props.onClick || props.onDelete) {
    if (props.disabled) {
      return '60%';
    }
    return '75%';
  }
  if (props.color === 'lowContrast' && props.disabled) {
    return '25%';
  } else if (props.disabled) {
    return '60%';
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
  display: ${props.theme.tag.display};
  align-items: ${props.theme.tag.alignItems};
  justify-content: ${props.theme.tag.justifyContent};
  font-size: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.fontSize}`
    : `${props.theme.typeScale.size02.fontSize}`};
  font-weight: ${props.size === 'small' ? `600` : `inherit`};
  letter-spacing: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.letterSpacing}`
    : `${props.theme.typeScale.size02.letterSpacing}`};
  padding: ${buildTagPadding(props)};
  svg:first-of-type {
    height: ${props.size === 'small'
      ? `${props.theme.iconSizes.xSmall}px`
      : `${props.theme.iconSizes.small}px`};
    opacity: ${props.disabled ? '60%' : 'inherit'};
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
  &:hover {
    svg {
      opacity: ${props.disabled ? '60%' : '1'};
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
