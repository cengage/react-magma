import * as React from 'react';
import styled from '../../theme/styled';
import { CardProps } from '../Card';

const StyledCardBody = styled.div<CardProps>`
  padding: 20px;
  text-align: ${props => props.align};
`;

export const CardBody = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const { children, testId, ...other } = props;
    return (
      <StyledCardBody {...other} data-testid={testId} ref={ref}>
        {children}
      </StyledCardBody>
    );
  }
);
