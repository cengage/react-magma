import * as React from 'react';
import styled, { CreateStyled } from '@emotion/styled';
import { CardProps } from '../Card';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface CardBodyProps
  extends React.LabelHTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  testId?: string;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledCardBody = typedStyled.div<CardProps>`
  padding: ${props => props.theme.spaceScale.spacing05};
  text-align: ${props => props.align};
  font-family: ${props => props.theme.bodyFont};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    padding: ${props => props.theme.spaceScale.spacing06};
  }
`;

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { children, testId, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledCardBody {...other} data-testid={testId} ref={ref} theme={theme}>
        {children}
      </StyledCardBody>
    );
  }
);
