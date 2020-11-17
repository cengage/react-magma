import * as React from 'react';
import styled from '../../theme/styled';
import { CardProps } from '../Card';

/**
 * @children required
 */
export interface CardBodyProps
  extends React.LabelHTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { children, testId, ...other } = props;
    return (
      <StyledCardBody {...other} data-testid={testId} ref={ref}>
        {children}
      </StyledCardBody>
    );
  }
);
