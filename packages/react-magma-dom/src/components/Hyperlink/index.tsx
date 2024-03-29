import * as React from 'react';
import { ButtonStyles } from '../Button';
import styled from '@emotion/styled';
import { css, ClassNames } from '@emotion/core';
import { omit, Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { BaseStyledButton, buttonStyles } from '../StyledButton';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface HyperlinkProps
  extends ButtonStyles,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
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
}

const linkStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.tertiary
    : props.theme.colors.primary};
  text-decoration: underline;
  font-family: ${props.theme.bodyFont};
  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? props.theme.colors.primary100
        : props.theme.colors.primary400};
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

const StyledLink = styled('a')<{ isInverse?: boolean; theme: ThemeInterface }>`
  ${linkStyles}
`;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (props, ref) => {
    const { children, to, styledAs, testId, ...rest } = props;

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

      return (
        <HyperlinkComponent
          {...other}
          ref={ref}
          data-testid={testId}
          href={to}
          isInverse={isInverse}
          theme={theme}
        >
          {children}
        </HyperlinkComponent>
      );
    }
  }
);
