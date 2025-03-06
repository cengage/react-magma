import React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

interface TabsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The index of the current active tab. You can use this for managing state of the tabs component by your custom logic.
   */
  activeIndex?: number;
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

interface TabsContainerContextInterface {
  activeTabIndex: number;
  isInverseContainer: boolean;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const TabsContainerContext =
  React.createContext<TabsContainerContextInterface>({
    activeTabIndex: 0,
    isInverseContainer: false,
    setActiveTabIndex: () => 0,
  });

const StyledTabsContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  background: none;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

export const TabsContainer = React.forwardRef<
  HTMLDivElement,
  TabsContainerProps
>((props, ref) => {
  const { activeIndex, children, testId } = props;

  React.useEffect(() => {
    if (activeIndex >= 0) {
      setActiveTabIndex(activeIndex);
    }
  }, [activeIndex]);

  const [activeTabIndex, setActiveTabIndex] = React.useState(activeIndex || 0);

  const isInverse = useIsInverse(props.isInverse);

  React.useEffect(() => {
    setIsInverseContainer(isInverse);
  }, [props.isInverse]);

  const [isInverseContainer, setIsInverseContainer] = React.useState(
    Boolean(props.isInverse)
  );

  const theme = React.useContext(ThemeContext);

  return (
    <TabsContainerContext.Provider
      value={{
        activeTabIndex,
        setActiveTabIndex,
        isInverseContainer,
      }}
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
});
