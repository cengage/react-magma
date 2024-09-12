import styled from '@emotion/styled';
import * as React from 'react';
import { ChevronRightIcon } from 'react-magma-icons';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { Hyperlink } from '../Hyperlink';

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

const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const StyledLink = styled.a<{ isInverse?: boolean }>`
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
`;

const StyledSpan = styled.span<{ isInverse?: boolean }>`
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
          <StyledSpan isInverse={isInverse} theme={theme}>
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
