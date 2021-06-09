import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';

import { CancelIcon, IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Omit, XOR } from '../../utils';
// import { I18nContext } from '../../i18n';

/**
 * @children required
 */

export enum TagColor {
  default = 'default',
  primary = 'primary',
  lowContrast = 'lowContrast',
  highContrast = 'highContrast',
}

export enum TagSize {
  default = 'default',
  small = 'small',
}

export interface BaseTagProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  color?: TagColor;
  disabled?: boolean;
  testId?: string;
  icon?: React.ReactElement<IconProps>;
  isClickable?: boolean;
  isInverse?: boolean;
  size?: TagSize;
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

function buildButtonBackground(props) {
  if (props.isInverse) {
    switch (props.color) {
      case 'primary':
        return `background: ${props.theme.colors.primaryInverse}; 
                color:${props.theme.colors.neutral};`;
      case 'lowContrast':
        return `background: none; 
                box-shadow:inset 0 0 0 1px ${props.theme.colors.tint04}; 
                color:${props.theme.colors.neutral08};`;
      case 'highContrast':
        return `background: ${props.theme.colors.neutral08}; 
                color:${props.theme.colors.neutral};`;
      default:
        return `background: ${props.theme.colors.neutral03}; 
                color:${props.theme.colors.neutral08};`;
    }
  }
  switch (props.color) {
    case 'primary':
      return `background: ${props.theme.colors.primary}; 
              color:${props.theme.colors.neutral08};`;
    case 'lowContrast':
      return `background: ${props.theme.colors.neutral08}; 
              box-shadow:inset 0 0 0  1px ${props.theme.colors.neutral05}`;
    case 'highContrast':
      return `background: ${props.theme.colors.neutral}; 
              color:${props.theme.colors.neutral08};`;
    default:
      return `background: ${props.theme.colors.neutral06};`;
  }
}

function buildTagPadding(props) {
  if (props.icon) {
    switch (props.size) {
      case 'small':
        return `2px`;
      default:
        return `${props.theme.spaceScale.spacing02} 6px ${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing02}`;
    }
  }
  switch (props.size) {
    case 'small':
      return `0 ${props.theme.spaceScale.spacing03}`;
    default:
      return `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing02}`;
  }
}

const TagStyling = props => css`
  border: 0;
  border-radius: ${props.theme.spaceScale.spacing05};
  ${buildButtonBackground(props)};
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  font-size: ${props.size === 'small'
    ? `${props.theme.typeScale.size01.fontSize}`
    : `${props.theme.typeScale.size02.fontSize}`};
  font-weight: ${props.size === 'small' ? `600` : `inherit`};
  opacity: ${props.disabled ? '60%' : 'inherit'};
  padding: ${buildTagPadding(props)};
  svg:last-child {
    opacity: ${props.onDelete ? '0.75' : 'inherit'};
  }
`;

const StyledButton = styled.button<{
  disabled?: boolean;
  onDelete?: boolean;
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
      size = TagSize.default,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    // const i18n = React.useContext(I18nContext);

    const leftIcon = props.icon;

    const LabelWrap = styled.span`
      padding: 0 10px;
    `;

    const StyledTag = getStyledTag(Boolean(onClick));

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
        theme={theme}
        onClick={handleClick}
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        size={size}
        {...rest}
      >
        {leftIcon}
        <LabelWrap>{children}</LabelWrap>
        {onDelete && <CancelIcon size={theme.iconSizes.small} />}
      </StyledTag>
    );
  }
);
