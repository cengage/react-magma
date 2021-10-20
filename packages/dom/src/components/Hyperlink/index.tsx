import * as React from 'react';
import { ButtonStyles } from '../Button';
import styled from '@emotion/styled';
import { css, ClassNames } from '@emotion/react';
import { omit, Omit } from '../../utils';
import { BaseStyledButton, buttonStyles } from '../StyledButton';
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
  testId?: string;
  /**
   * The href value of the link
   */
  to: string;
}

const linkStyles = props => css`
  color: ${props.isInverse
    ? 'var(--colors-primaryInverse)'
    : 'var(--colors-primary)'};
  text-decoration: underline;
  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props.isInverse
        ? 'var(--colors-primaryInverse)'
        : 'var(--colors-foundation02)'};
    }
    &:focus {
      outline: 2px dotted
        ${props.isInverse
          ? 'var(--colors-focusInverse)'
          : 'var(--colors-focus)'};
      outline-offset: 3px;
    }
  }
`;

const StyledLink = styled.a<{ isInverse?: boolean }>`
  ${linkStyles}
`;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (props, ref) => {
    const { children, to, styledAs, testId, ...rest } = props;

    const other = omit(['positionTop', 'positionLeft', 'type'], rest);

    const isInverse = useIsInverse(props.isInverse);

    if (typeof children === 'function') {
      const composedStyle =
        styledAs === 'Button'
          ? buttonStyles({ ...props })
          : linkStyles({ ...props });

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
        >
          {children}
        </HyperlinkComponent>
      );
    }
  }
);
