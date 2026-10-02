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
  tangerine = 'tangerine',
  indigo = 'indigo',
  violet = 'violet',
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
        background: props.theme.colors.blue100,
        text: props.theme.colors.blue600,
        inverseBackground: props.theme.colors.blue900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.blue400,
      };
    case TagColor.teal:
      return {
        background: props.theme.colors.teal100,
        text: props.theme.colors.teal600,
        inverseBackground: props.theme.colors.teal900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.teal400,
      };
    case TagColor.pink:
      return {
        background: props.theme.colors.red100,
        text: props.theme.colors.red600,
        inverseBackground: props.theme.colors.red900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.red400,
      };
    case TagColor.purple:
      return {
        background: props.theme.colors.purple100,
        text: props.theme.colors.purple600,
        inverseBackground: props.theme.colors.purple900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.purple400,
      };
    case TagColor.tangerine:
      return {
        background: props.theme.colors.tangerine100,
        text: props.theme.colors.tangerine700,
        inverseBackground: props.theme.colors.tangerine900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.tangerine400,
      };
    case TagColor.indigo:
      return {
        background: props.theme.colors.indigo100,
        text: props.theme.colors.indigo600,
        inverseBackground: props.theme.colors.indigo900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.indigo400,
      };
    case TagColor.violet:
      return {
        background: props.theme.colors.violet100,
        text: props.theme.colors.violet600,
        inverseBackground: props.theme.colors.violet900,
        inverseBackgroundTransparency: 0,
        inverseText: props.theme.colors.violet400,
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
      return `1px solid ${
        props.isInverse
          ? props.theme.colors.neutral800
          : props.theme.colors.neutral300
      }`;
    }

    return 'none';
  }

  if (dataVizColor) {
    return 'none';
  }

  if (props.color === TagColor.primary) {
    return `1px solid transparent`;
  }

  if (isDefaultColor) {
    return 'none';
  }

  if (props.color === TagColor.lowContrast) {
    if (props.isInverse) {
      return `1px solid ${props.theme.colors.neutral800}`;
    }

    return `1px solid ${props.theme.colors.neutral300}`;
  }

  return `1px solid transparent`;
}

function buildButtonBackground(props) {
  const dataVizColor = getDataVizTagColor(props);

  if (props.disabled) {
    if (props.isInverse) {
      return props.color === TagColor.lowContrast
        ? 'none'
        : transparentize(0.5, props.theme.colors.neutral900);
    }

    return props.color === TagColor.lowContrast
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral200;
  }

  if (props.isInverse) {
    // Inverse background colors
    if (dataVizColor) {
      const transparency = dataVizColor.inverseBackgroundTransparency;

      return transparency === 0
        ? dataVizColor.inverseBackground
        : transparentize(transparency, dataVizColor.inverseBackground);
    }

    switch (props.color) {
      case 'primary':
        return props.theme.colors.brand.sunriseOrange;
      case 'lowContrast':
        return `none;`;
      case 'highContrast':
        return props.theme.colors.brand.skyBlue;
      default:
        return props.theme.colors.neutral800;
    }
  }
  // Default state background colors
  if (dataVizColor) {
    return dataVizColor.background;
  }

  switch (props.color) {
    case 'primary':
      return props.theme.colors.brand.sunriseOrange;
    case 'lowContrast':
      return props.theme.colors.neutral0;
    case 'highContrast':
      return props.theme.colors.brand.navy;
    default:
      return props.theme.colors.neutral200;
  }
}

function buildButtonTextColor(props) {
  const dataVizColor = getDataVizTagColor(props);

  if (props.disabled) {
    return props.isInverse
      ? props.theme.colors.neutral600
      : props.theme.colors.neutral500;
  }

  if (props.isInverse) {
    // Inverse text colors
    if (dataVizColor) {
      return dataVizColor.inverseText;
    }

    switch (props.color) {
      case 'primary':
        return props.theme.colors.brand.navy;
      case 'lowContrast':
        return props.theme.colors.neutral0;
      case 'highContrast':
        return props.theme.colors.brand.navy;
      default:
        return props.theme.colors.neutral0;
    }
  }
  // Default state text colors
  if (dataVizColor) {
    return dataVizColor.text;
  }

  switch (props.color) {
    case 'primary':
      return props.theme.colors.brand.navy;
    case 'highContrast':
      return props.theme.colors.neutral0;
    case 'lowContrast':
      return props.theme.colors.brand.navy;
    default:
      return props.theme.colors.brand.navy;
  }
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
    opacity: inherit;
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

    const isInteractive = Boolean(onClick || onDelete);
    const StyledTag = getStyledTag(isInteractive);

    function handleClick() {
      if (onClick && typeof onClick === 'function') {
        onClick();
      } else if (onDelete && typeof onDelete === 'function') {
        onDelete();
      }
    }

    return (
      <StyledTag
        {...(isInteractive && {
          'aria-label': onDelete ? deleteAriaLabel : nodeLabel,
        })}
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
