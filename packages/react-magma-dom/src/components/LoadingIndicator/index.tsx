import * as React from 'react';
import { Spinner } from '../Spinner';
import styled from '@emotion/styled';

export interface LoadingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: any;
}

const StyledLoadingIndicator = styled.div`
  max-width: 230px;
  text-align: center;
`;

const Message = styled.div`
  margin-top: 15px;
`;

export const LoadingIndicator: React.FunctionComponent<
  LoadingIndicatorProps
> = React.forwardRef(({  }: LoadingIndicatorProps, ref: any) => {
  return (
    <StyledLoadingIndicator ref={ref}>
      <Spinner size={50} />
      <Message>Loading...</Message>
    </StyledLoadingIndicator>
  );
});
