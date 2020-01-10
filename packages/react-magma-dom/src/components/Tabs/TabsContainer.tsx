import React from 'react';
import styled from '@emotion/styled';

const StyledTabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

interface ITabsContainer extends React.ButtonHTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export type State = {
  activeTabIndex?: number;
  numberOfTabs?: number;
};

interface Action {
  type: string;
  payload: {
    activeTabIndex?: number;
    numberOfTabs?: number;
  };
}

export const TabsContext = React.createContext({} as {
  state: State;
  dispatch: React.Dispatch<Action>;
});

const initialState = {
  activeTabIndex: 0,
  numberOfTabs: 0
};

function tabReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB_INDEX':
      return {
        ...state,
        activeTabIndex: action.payload.activeTabIndex
      };
    case 'SET_NUMBER_OF_TABS':
      return {
        ...state,
        numberOfTabs: action.payload.numberOfTabs
      };
    default:
      return initialState;
  }
}

export const TabsContainer: React.FunctionComponent<
  ITabsContainer
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { children, testId } = props;

  const [stateWithoutMemo, dispatch] = React.useReducer(
    tabReducer,
    initialState
  );

  const state = React.useMemo(() => {
    return stateWithoutMemo;
  }, [stateWithoutMemo]);

  return (
    <TabsContext.Provider value={{ state, dispatch }}>
      <StyledTabsContainer ref={ref} data-testid={testId} {...props}>
        {children}
      </StyledTabsContainer>
    </TabsContext.Provider>
  );
});

TabsContainer.displayName = 'TabsContainer';

export const useTabsContext = () => React.useContext(TabsContext);
