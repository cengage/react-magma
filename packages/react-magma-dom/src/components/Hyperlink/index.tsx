import * as React from 'react';
import { ButtonSize, ButtonStyles } from '../Button';
import styled from '@emotion/styled';
import { css, ClassNames } from '@emotion/core';
import { omit, Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { BaseStyledButton, buttonStyles } from '../StyledButton';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { IconProps } from 'react-magma-icons';

export enum HyperlinkIconPosition {
  left = 'left',
  right = 'right',
  both = 'both',
}

export interface HyperlinkProps
  extends ButtonStyles,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * How the hyperlink is styled (can look like either a plain link or a button)
   */
  styledAs?: 'Button' | 'Link';
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * The href value of the link
   */
  to: string;
  hasUnderline?: boolean;
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps> | Array<React.ReactElement<IconProps>>;
  /**
   * Position within the link for the icon to appear
   * @default HyperlinkIconPosition.right
   */
  iconPosition?: HyperlinkIconPosition;
}

const linkStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.tertiary
    : props.theme.colors.primary};
  text-decoration: ${props.hasUnderline ? 'underline' : 'none'};
  font-family: ${props.theme.bodyFont};
  display: inline-flex;
  align-items: center;
  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.primary700};
      text-decoration: underline;
    }
    &:focus {
      outline: 2px solid
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 2px;
    }
  }
`;

const StyledLink = styled.a<{ isInverse?: boolean; theme: ThemeInterface }>`
  ${linkStyles}
`;

function getIconPadding(props) {
  switch (props.size) {
    case 'large':
      return props.theme.spaceScale.spacing05;
    case 'small':
      return props.theme.spaceScale.spacing02;
    default:
      return props.theme.spaceScale.spacing03;
  }
}

const IconWrapper = styled.span<{
  size?: ButtonSize;
  position?: HyperlinkIconPosition;
}>`
  align-self: center;
  display: inline-flex;
  padding-left: ${props =>
    (props.position === HyperlinkIconPosition.right ||
      props.position === HyperlinkIconPosition.both) &&
    getIconPadding(props)};
  padding-right: ${props =>
    (props.position === HyperlinkIconPosition.left ||
      props.position === HyperlinkIconPosition.both) &&
    getIconPadding(props)};
`;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (props, ref) => {
    const {
      children,
      to,
      styledAs,
      testId,
      hasUnderline = true,
      icon,
      iconPosition = null,
      ...rest
    } = props;

    const other = omit(['positionTop', 'positionLeft', 'type'], rest);
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(props.isInverse);

    const hasMultiIcons = icon && icon instanceof Array && icon?.length > 0;

    if (typeof children === 'function') {
      const composedStyle =
        styledAs === 'Button'
          ? buttonStyles({ ...props, theme })
          : linkStyles({ ...props, theme });

      return (
        <ClassNames>
          {({ css: composedCss }) => {
            const className = composedCss(composedStyle);
            return (children as (props: object) => React.ReactNode)({
              to,
              className,
              isInverse,
            });
          }}
        </ClassNames>
      );
    } else {
      const LinkStyledAsButton = BaseStyledButton.withComponent('a');
      const HyperlinkComponent =
        styledAs === 'Button' ? LinkStyledAsButton : StyledLink;

      if (icon && iconPosition !== null) {
        return (
          <HyperlinkComponent
            {...other}
            data-testid={testId}
            hasUnderline={hasUnderline}
            icon={icon}
            iconPosition={iconPosition}
            href={to}
            isInverse={isInverse}
            ref={ref}
            theme={theme}
          >
            {iconPosition === HyperlinkIconPosition.right && <>{children}</>}
            <IconWrapper
              theme={theme}
              size={props.size}
              position={
                iconPosition === HyperlinkIconPosition.both
                  ? HyperlinkIconPosition.left
                  : iconPosition
              }
            >
              {hasMultiIcons ? icon[0] : icon}
            </IconWrapper>
            {iconPosition === HyperlinkIconPosition.left && <>{children}</>}

            {iconPosition === HyperlinkIconPosition.both && hasMultiIcons && (
              <>
                {children}
                <IconWrapper
                  theme={theme}
                  size={props.size}
                  position={
                    iconPosition === HyperlinkIconPosition.both
                      ? HyperlinkIconPosition.right
                      : iconPosition
                  }
                >
                  {icon[1]}
                </IconWrapper>
              </>
            )}
          </HyperlinkComponent>
        );
      } else {
        return (
          <HyperlinkComponent
            {...other}
            data-testid={testId}
            hasUnderline={hasUnderline}
            href={to}
            isInverse={isInverse}
            ref={ref}
            theme={theme}
          >
            {children}
          </HyperlinkComponent>
        );
      }
    }
  }
);
