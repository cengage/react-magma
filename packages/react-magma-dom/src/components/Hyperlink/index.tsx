import * as React from 'react';
import { ButtonStyles } from '../Button';
import styled from '@emotion/styled';
import { css, ClassNames } from '@emotion/core';
import { omit, Omit } from '../../utils';
import { ThemeContext } from '../../theme/ThemeContext';
import { BaseStyledButton, buttonStyles } from '../StyledButton';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface HyperlinkProps
  extends ButtonStyles,
    Omit<React.HTMLAttributes<HTMLAnchorElement>, 'color'> {
  children: React.ReactNode;
  /**
   * How the hyperlink is styled (can look like either a plain link or a button)
   */
  styledAs?: 'Button' | 'Link';
  testId?: string;
  /**
   * The href value of the link
   */
  to: string;
}

const linkStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.primary};
  text-decoration: underline;

  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? props.theme.colors.neutral07
        : props.theme.colors.foundation02};
    }

    &:focus {
      outline: 2px dotted
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 3px;
    }
  }
`;

const StyledLink = styled.a<{ isInverse?: boolean; theme: ThemeInterface }>`
  ${linkStyles}
`;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (props, ref) => {
    const { children, to, styledAs, testId, ...rest } = props;

    const other = omit(['textTransform', 'positionTop', 'positionLeft'], rest);
    const theme = React.useContext(ThemeContext);

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
          theme={theme}
        >
          {children}
        </HyperlinkComponent>
      );
    }
  }
);
