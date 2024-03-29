import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Hyperlink } from '../Hyperlink';
import { useIsInverse } from '../../inverse';
import { ChevronRightIcon } from 'react-magma-icons';

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
   * The href value of the link. If left blank, the breadcrumb item will render as a span with aria-current="page" on it.
   */
  to?: string;
}

const StyledItem = styled('li')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const StyledSpan = styled('span')<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};

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
        <StyledSpan aria-current="page" isInverse={isInverse} theme={theme}>
          {children}
        </StyledSpan>
      )}
    </StyledItem>
  );
});
