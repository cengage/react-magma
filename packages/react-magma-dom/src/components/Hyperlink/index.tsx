import * as React from 'react';
import { ButtonStyles } from '../Button';
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
  both = 'both'
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
  icon?: React.ReactElement<IconProps>;
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
  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? props.theme.colors.primary100
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

const SpanTextLeft = styled.span`
  padding-right: ${props => getIconPadding(props)};
`;

const SpanTextRight = styled.span`
  padding-left: ${props => getIconPadding(props)};
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
      iconPosition,
      ...rest
    } = props;

    const other = omit(['positionTop', 'positionLeft', 'type'], rest);
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(props.isInverse);

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

      if (styledAs === 'Button') {
        return (
          <LinkStyledAsButton
            {...other}
            icon={icon}
            iconPosition={iconPosition}
            ref={ref}
            data-testid={testId}
            href={to}
            isInverse={isInverse}
            theme={theme}
          >
            {iconPosition === HyperlinkIconPosition.right && (
              <SpanTextLeft theme={theme}>{children}</SpanTextLeft>
            )}
            {icon}
            {iconPosition !== HyperlinkIconPosition.right && (
              <SpanTextRight theme={theme}>{children}</SpanTextRight>
            )}
          </LinkStyledAsButton>
        );
      }
      // TODO: add aria-hidden=true to icons
      // TODO Dev sets spacing
      return (
        <HyperlinkComponent
          {...other}
          ref={ref}
          data-testid={testId}
          href={to}
          isInverse={isInverse}
          theme={theme}
          style={{display: 'flex', width: 'fit-content'}}
        >
          {iconPosition === HyperlinkIconPosition.right && (
              <SpanTextLeft theme={theme} style={{flex: '0 0 auto'}}>{children}</SpanTextLeft>
            )}
            <span style={{flex: '0 0 auto'}}>
              {icon}
              </span>
            {iconPosition === HyperlinkIconPosition.left && (
              <SpanTextRight theme={theme} style={{flex: '0 0 auto'}}>{children}</SpanTextRight>
            )}
            {iconPosition === HyperlinkIconPosition.both && (
              <><SpanTextRight theme={theme} style={{flex: '0 0 auto'}}>{children}</SpanTextRight>
              <span style={{flex: '0 0 auto'}}>
              {icon}
              </span>
              </>
            )}
        </HyperlinkComponent>
      );
    }
  }
);
