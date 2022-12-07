import * as React from 'react';
import styled from '@emotion/styled';
import { TabsContainerContext } from './TabsContainer';

interface TabPanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const StyledContainer = styled.div`
  flex-grow: 1;
`;

export const TabPanelsContainer = React.forwardRef<
  HTMLDivElement,
  TabPanelContainerProps
>((props, ref) => {
  const { children, testId, ...rest } = props;

  const { isInverseContainer } = React.useContext(TabsContainerContext);

  return (
    <StyledContainer ref={ref} data-testid={testId} {...rest}>
      {React.Children.map(children, (child: React.ReactElement<any>, index) => {
        const isInverse =
          typeof child.props.isInverse !== 'undefined'
            ? child.props.isInverse
            : typeof props.isInverse !== 'undefined'
            ? props.isInverse
            : isInverseContainer;

        return React.cloneElement(child, { index, isInverse, key: index });
      })}
      {children}
    </StyledContainer>
  );
});
