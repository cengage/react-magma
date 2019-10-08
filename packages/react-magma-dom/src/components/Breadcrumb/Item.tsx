import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { HyperLink } from '../HyperLink';
import { AngleRightIcon } from '../Icon/types/AngleRightIcon';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  inverse?: boolean;
  to?: string;
}

const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledSpan = styled.span<BreadcrumbItemProps>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral04};

  svg {
    margin: 0 10px;
  }
`;

export function renderBreadcrumbItem(props) {
  const { inverse, children, ref, to } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledItem ref={ref}>
          {to ? (
            <>
              <HyperLink to={to} inverse={inverse}>
                {children}
              </HyperLink>
              <StyledSpan inverse={inverse} theme={theme}>
                <AngleRightIcon size={10} />
              </StyledSpan>
            </>
          ) : (
            <StyledSpan aria-current="page" inverse={inverse} theme={theme}>
              {children}
            </StyledSpan>
          )}
        </StyledItem>
      )}
    </ThemeContext.Consumer>
  );
}
