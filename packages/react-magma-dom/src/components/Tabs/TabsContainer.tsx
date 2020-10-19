import React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

const StyledTabsContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse ? props.theme.colors.foundation02 : 'none'};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

interface TabsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex?: number;
  isInverse?: boolean;
  testId?: string;
}

interface TabsContainerContextInterface {
  activeTabIndex: number;
  isInverseContainer: boolean;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const TabsContainerContext = React.createContext<
  TabsContainerContextInterface
>({
  activeTabIndex: 0,
  isInverseContainer: false,
  setActiveTabIndex: () => 0,
});

export const TabsContainer: React.FunctionComponent<TabsContainerProps> = React.forwardRef(
  (props, ref: React.Ref<any>) => {
    const { activeIndex, children, testId } = props;

    React.useEffect(() => {
      if (activeIndex >= 0) {
        setActiveTabIndex(activeIndex);
      }
    }, [activeIndex]);

    const [activeTabIndex, setActiveTabIndex] = React.useState(
      activeIndex || 0
    );

    React.useEffect(() => {
      setIsInverseContainer(Boolean(props.isInverse));
    }, [props.isInverse]);

    const [isInverseContainer, setIsInverseContainer] = React.useState(
      Boolean(props.isInverse)
    );

    const theme = React.useContext(ThemeContext);

    return (
      <TabsContainerContext.Provider
        value={{ activeTabIndex, setActiveTabIndex, isInverseContainer }}
      >
        <StyledTabsContainer
          ref={ref}
          data-testid={testId}
          theme={theme}
          {...props}
        >
          {children}
        </StyledTabsContainer>
      </TabsContainerContext.Provider>
    );
  }
);
