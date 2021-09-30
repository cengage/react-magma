import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { CancelIcon, IconProps } from 'react-magma-icons';
import { useIsInverse } from '../../inverse';
import { Omit, XOR, getNodeText } from '../../utils';
import { I18nContext } from '../../i18n';

const tagStyles = {
  border: '0',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
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
        return '0 0 0 1px #FFFFFF40';
      }
      return '0 0 0 1px #FFFFFF80';
    }
    if (props.disabled) {
      return '0 0 0 1px var(--colors-neutral06)';
    }
    return 'inset 0 0 0  1px var(--colors-neutral05)';
  }
}

function buildButtonBackground(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state background colors
      switch (props.color) {
        case 'lowContrast':
          return 'none';
        default:
          return 'var(--colors-neutral06)';
      }
    }
    // Inverse background colors
    switch (props.color) {
      case 'primary':
        return 'var(--colors-primaryInverse)';
      case 'lowContrast':
        return 'none';
      case 'highContrast':
        return 'var(--colors-neutral08)';
      default:
        return 'var(--colors-neutral03)';
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state background colors
    switch (props.color) {
      case 'lowContrast':
        return 'var(--colors-neutral08)';
      default:
        return 'var(--colors-neutral06)';
    }
  }
  // Default state background colors
  switch (props.color) {
    case 'primary':
      return 'var(--colors-primary)';
    case 'lowContrast':
      return 'var(--colors-neutral08)';
    case 'highContrast':
      return 'var(--colors-neutral)';
    default:
      return 'var(--colors-neutral06)';
  }
}

function buildButtonTextColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state text colors
      switch (props.color) {
        case 'lowContrast':
          return '#FFFFFF40';
        default:
          return '#70707099';
      }
    }
    // Inverse text colors
    switch (props.color) {
      case 'primary':
      case 'highContrast':
        return 'var(--colors-neutral)';
      default:
        return 'var(--colors-neutral08)';
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state text colors
    return '#70707099';
  }
  // Default state text colors
  switch (props.color) {
    case 'primary':
    case 'highContrast':
      return 'var(--colors-neutral08)';
    default:
      return 'var(--colors-neutral)';
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
        return '0 var(--spaceScale-spacing01)';
      default:
        return 'var(--spaceScale-spacing02)';
    }
  }
  switch (props.size) {
    case 'small':
      return `0`;
    default:
      return 'var(--spaceScale-spacing02)';
  }
}

const TagStyling = props => css`
  ${tagStyles}
  border-radius: var(--spaceScale-spacing05);
  background: ${buildButtonBackground(props)};
  color: ${buildButtonTextColor(props)};
  box-shadow: ${buildBoxShadow(props)};
  font-size: ${props.size === 'small'
    ? 'var(--typeScale-size01-fontSize)'
    : 'var(--typeScale-size02-fontSize)'};
  font-weight: ${props.size === 'small' ? `600` : `inherit`};
  padding: ${buildTagPadding(props)};
  svg:first-of-type {
    height: ${props.size === 'small'
      ? '20px'
      : 'inherit'};
    opacity: ${props.disabled ? '60%' : 'inherit'};
    width: ${props.size === 'small'
      ? '20px'
      : 'inherit'};
  }
  svg:last-child {
    margin: ${props.size === 'small'
      ? '0 var(--spaceScale-spacing02) 0 -var(--spaceScale-spacing02)'
      : 'inherit'};
    opacity: ${buildSvgOpacity(props)};
    width: ${props.size === 'small'
      ? 'var(--spaceScale-spacing05)'
      : 'inherit'};
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
      labelText = children,
      onClick,
      onDelete,
      isInverse: isInverseProp,
      size = TagSize.medium,
      testId,
      ...rest
    } = props;

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
        {...rest}
      >
        {icon}
        <LabelWrap size={size} {...rest}>
          {children}
        </LabelWrap>
        {onDelete && (
          <CancelIcon
            aria-label={deleteAriaLabel}
            size={20}
          />
        )}
      </StyledTag>
    );
  }
);
