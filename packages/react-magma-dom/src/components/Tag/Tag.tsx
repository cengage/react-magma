import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { CloseIcon, IconProps } from 'react-magma-icons';

import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { Omit, XOR, getNodeText } from '../../utils';

export enum TagColor {
  default = 'default', // default
  primary = 'primary',
  lowContrast = 'lowContrast',
  highContrast = 'highContrast',
  blue = 'blue',
  teal = 'teal',
  pink = 'pink',
  purple = 'purple',
}

export enum TagSize {
  medium = 'medium', // default
  small = 'small',
}

export interface BaseTagProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * @children required
   */
  children: React.ReactNode;
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

function getDataVizTagColor(props) {
  switch (props.color) {
    case TagColor.blue:
      return {
        background: props.theme.colors.dataVizBlue200,
        border: props.theme.colors.dataVizBlue700,
        text: props.theme.colors.dataVizBlue700,
        inverseBackground: props.theme.colors.dataVizBlue700,
        inverseBorder: props.theme.colors.dataVizBlue500,
        inverseBorderTransparency: 0.5,
        inverseText: props.theme.colors.dataVizBlue200,
      };
    case TagColor.teal:
      return {
        background: props.theme.colors.dataVizTeal400,
        backgroundTransparency: 0.85,
        border: props.theme.colors.dataVizTeal700,
        text: props.theme.colors.dataVizTeal700,
        inverseBackground: props.theme.colors.dataVizTeal700,
        inverseBorder: props.theme.colors.dataVizTeal500,
        inverseBorderTransparency: 0.3,
        inverseText: props.theme.colors.dataVizTeal200,
      };
    case TagColor.pink:
      return {
        background: props.theme.colors.dataVizPink200,
        border: props.theme.colors.dataVizPink700,
        text: props.theme.colors.dataVizPink700,
        inverseBackground: props.theme.colors.dataVizPink700,
        inverseBorder: props.theme.colors.dataVizPink500,
        inverseBorderTransparency: 0.3,
        inverseText: props.theme.colors.dataVizPink200,
      };
    case TagColor.purple:
      return {
        background: props.theme.colors.dataVizPurple200,
        border: props.theme.colors.dataVizPurple700,
        text: props.theme.colors.dataVizPurple700,
        inverseBackground: props.theme.colors.dataVizPurple700,
        inverseBorder: props.theme.colors.dataVizPurple500,
        inverseBorderTransparency: 0.3,
        inverseText: props.theme.colors.dataVizPurple200,
      };
    default:
      return null;
  }
}

function buildBorder(props) {
  const dataVizColor = getDataVizTagColor(props);
  const isDefaultColor = !props.color || props.color === TagColor.default;

  if (props.disabled) {
    if (props.color === TagColor.lowContrast) {
      if (props.isInverse) {
        return `1px solid ${transparentize(
          0.8,
          props.theme.colors.neutral100
        )}`;
      }

      return `1px solid ${props.theme.colors.neutral300}`;
    }

    if (isDefaultColor) {
      if (props.isInverse) {
        return `1px solid ${transparentize(0.8, props.theme.colors.neutral100)}`;
      }

      return `1px solid ${props.theme.colors.neutral300}`;
    }

    return `1px solid transparent`;
  }

  if (dataVizColor) {
    if (props.isInverse) {
      return `1px solid ${transparentize(
        dataVizColor.inverseBorderTransparency,
        dataVizColor.inverseBorder
      )}`;
    }

    return `1px solid ${transparentize(0.85, dataVizColor.border)}`;
  }

  if (props.color === TagColor.primary) {
    if (props.isInverse) {
      return `1px solid ${props.theme.colors.primary400}`;
    }

    return `1px solid ${transparentize(0.85, props.theme.colors.primary500)}`;
  }

  if (isDefaultColor) {
    if (props.isInverse) {
      return `1px solid ${transparentize(0.7, props.theme.colors.neutral100)}`;
    }

    return `1px solid ${props.theme.colors.neutral300}`;
  }

  if (props.color === TagColor.lowContrast) {
    if (props.isInverse) {
      return `1px solid ${transparentize(0.7, props.theme.colors.neutral100)}`;
    }

    return `1px solid ${props.theme.colors.neutral300}`;
  }

  return `1px solid transparent`;
}

function buildButtonBackground(props) {
  const dataVizColor = getDataVizTagColor(props);

  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state background colors
      switch (props.color) {
        case 'primary':
        case 'highContrast':
          return transparentize(0.7, props.theme.colors.neutral100);
        case 'lowContrast':
          return `none`;
        default:
          return transparentize(0.7, props.theme.colors.neutral100);
      }
    }
    // Inverse background colors
    if (dataVizColor) {
      return transparentize(0.5, dataVizColor.inverseBackground);
    }

    switch (props.color) {
      case 'primary':
        return transparentize(0.2, props.theme.colors.primary500);
      case 'lowContrast':
        return `none;`;
      case 'highContrast':
        return props.theme.colors.neutral100;
      default:
        return transparentize(0.5, props.theme.colors.neutral900);
    }
  } else if (props.disabled && !props.isInverse) {
    // Disabled state background colors
    switch (props.color) {
      case 'primary':
      case 'highContrast':
        return transparentize(0.4, props.theme.colors.neutral300);
      case 'lowContrast':
        return props.theme.colors.neutral100;
      default:
        return transparentize(0.4, props.theme.colors.neutral300);
    }
  }
  // Default state background colors
  if (dataVizColor) {
    return transparentize(
      dataVizColor.backgroundTransparency || 0.6,
      dataVizColor.background
    );
  }

  switch (props.color) {
    case 'primary':
      return props.theme.colors.primary100;
    case 'lowContrast':
      return props.theme.colors.neutral100;
    case 'highContrast':
      return props.theme.colors.neutral700;
    default:
      return transparentize(0.6, props.theme.colors.neutral300);
  }
}

function buildButtonTextColor(props) {
  const dataVizColor = getDataVizTagColor(props);

  if (props.isInverse) {
    if (props.disabled) {
      // Disabled inverse state text colors
      switch (props.color) {
        case 'primary':
        case 'highContrast':
          return transparentize(0.6, props.theme.colors.neutral100);

        case 'lowContrast':
          return transparentize(0.7, props.theme.colors.neutral100);

        default:
          return transparentize(0.6, props.theme.colors.neutral100);
      }
    }
    // Inverse text colors
    if (dataVizColor) {
      return dataVizColor.inverseText;
    }

    switch (props.color) {
      case 'primary':
        return props.theme.colors.primary100;
      case 'lowContrast':
        return props.theme.colors.neutral100;
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
  if (dataVizColor) {
    return dataVizColor.text;
  }

  switch (props.color) {
    case 'primary':
      return props.theme.colors.primary500;
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
  switch (props.size) {
    case 'small':
      return `0 ${props.theme.spaceScale.spacing02}`;
    default:
      return `${props.theme.spaceScale.spacing02} 6px`;
  }
}

function buildLabelPadding(props) {
  switch (props.size) {
    case 'small':
      return `0 ${props.theme.spaceScale.spacing02}`;
    default:
      return `0 ${props.theme.spaceScale.spacing03}`;
  }
}

const TagStyling = props => css`
  border: ${buildBorder(props)};
  border-radius: ${props.theme.spaceScale.spacing05};
  box-sizing: border-box;
  background: ${buildButtonBackground(props)};
  color: ${buildButtonTextColor(props)};
  font-family: ${props.theme.bodyFont};
  display: ${props.theme.tag.display};
  align-items: ${props.theme.tag.alignItems};
  justify-content: ${props.theme.tag.justifyContent};
  font-size: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.fontSize}`
    : `${props.theme.typeScale.size02.fontSize}`};
  font-weight: 500;
  letter-spacing: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.letterSpacing}`
    : `${props.theme.typeScale.size02.letterSpacing}`};
  height: ${props.size === 'small'
    ? props.theme.spaceScale.spacing06
    : props.theme.spaceScale.spacing08};
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
    color: currentColor;
    opacity: inherit;
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

    const nodeLabel = getNodeText(labelText);

    const deleteAriaLabel = i18n.tag.deleteAriaLabel.replace(
      /\{labelText\}/g,
      nodeLabel
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
        aria-label={onDelete ? deleteAriaLabel : nodeLabel}
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
        <LabelWrap size={size} theme={theme}>
          {children}
        </LabelWrap>
        {onDelete && <CloseIcon size={theme.iconSizes.small} />}
      </StyledTag>
    );
  }
);
