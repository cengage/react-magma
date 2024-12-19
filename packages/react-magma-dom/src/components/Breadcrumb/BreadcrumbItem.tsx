import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { Hyperlink } from '../Hyperlink';
import { useIsInverse } from '../../inverse';
import { ChevronRightIcon } from 'react-magma-icons';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * @internal
   */
  testId?: string;
  /**
   * The URL for the link. If not provided, the breadcrumb item will display as a non-clickable element with aria-current="page".
   */
  to?: string;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledItem = typedStyled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const StyledLink = typedStyled.a<{ isInverse?: boolean }>`
  align-items: center;
  display: flex;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  text-decoration: none;
  cursor: default;
  &:hover,
  &:focus {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
  }
  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 2px;
  }
`;

const StyledSpan = typedStyled.span<{ isInverse?: boolean }>`
  align-items: center;
  display: flex;

  svg {
    margin: 0 ${props => props.theme.spaceScale.spacing02};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.tertiary500
        : props.theme.colors.neutral500};
  }
`;

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>((props, ref) => {
  const { children, to, testId, ...other } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse();

  return (
    <StyledItem {...other} data-testid={testId} ref={ref}>
      {to ? (
        <>
          <Hyperlink to={to} isInverse={isInverse}>
            {children}
          </Hyperlink>
          <StyledSpan isInverse={isInverse} theme={theme} aria-hidden="true">
            <ChevronRightIcon size={theme.iconSizes.small} />
          </StyledSpan>
        </>
      ) : (
        <>
          <StyledLink
            href=""
            aria-current="page"
            isInverse={isInverse}
            theme={theme}
            onClick={e => e.preventDefault()}
          >
            {children}
          </StyledLink>
        </>
      )}
    </StyledItem>
  );
});
