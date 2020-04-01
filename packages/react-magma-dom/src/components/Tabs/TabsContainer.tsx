import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledTabsContainer = styled.div<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse ? props.theme.colors.foundation02 : 'none'};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

interface TabsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex?: number;
  isInverse?: boolean;
  testId?: string;
}

interface TabContextInterface {
  activeTabIndex: number;
  isInverseContainer: boolean;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const TabsContext = React.createContext<TabContextInterface>({
  activeTabIndex: 0,
  isInverseContainer: false,
  setActiveTabIndex: () => 0
});

export const TabsContainer: React.FunctionComponent<
  TabsContainerProps
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { activeIndex, children, testId } = props;

  React.useEffect(() => {
    if (activeIndex >= 0) {
      setActiveTabIndex(activeIndex);
    }
  }, [activeIndex]);

  const [activeTabIndex, setActiveTabIndex] = React.useState(activeIndex || 0);

  React.useEffect(() => {
    setIsInverseContainer(Boolean(props.isInverse));
  }, [props.isInverse]);

  const [isInverseContainer, setIsInverseContainer] = React.useState(
    Boolean(props.isInverse)
  );

  const theme = React.useContext(ThemeContext);

  return (
    <TabsContext.Provider
      value={{ activeTabIndex, isInverseContainer, setActiveTabIndex }}
    >
      <StyledTabsContainer
        ref={ref}
        data-testid={testId}
        isInverse={isInverseContainer}
        theme={theme}
        {...props}
      >
        {children}
      </StyledTabsContainer>
    </TabsContext.Provider>
  );
});

export const useTabsContext = () => React.useContext(TabsContext);
