// eslint-disable-next-line no-unused-vars
import React, {
  useContext,
  createContext,
  useReducer,
  Dispatch,
  useMemo,
  forwardRef
} from 'react';
import { StyledTabsContainer } from './StylesTabsContainer';

export type TabsTheme = 'dark' | 'light' | 'blue' | 'darkBlue' | 'grey';

interface ITabsContainer {
  theme?: TabsTheme;
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

export const TabsContext = createContext({} as {
  theme: TabsTheme;
  state: State;
  dispatch: Dispatch<Action>;
});

const initialState = {
  activeTabIndex: 0,
  numberOfTabs: 0
};

function tabReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setActiveTabIndex':
      return {
        ...state,
        activeTabIndex: action.payload.activeTabIndex
      };
    case 'setNumberOfTabs':
      return {
        ...state,
        numberOfTabs: action.payload.numberOfTabs
      };
    default:
      return initialState;
  }
}

export const TabsContainer: React.FC<ITabsContainer> = forwardRef(
  (props, ref: React.Ref<any>) => {
    const { children, theme, testId } = props;

    const [stateWithoutMemo, dispatch] = useReducer(tabReducer, initialState);

    const state = useMemo(() => {
      return stateWithoutMemo;
    }, [stateWithoutMemo]);

    return (
      <TabsContext.Provider value={{ theme, state, dispatch }}>
        <StyledTabsContainer ref={ref} data-testid={testId}>
          {children}
        </StyledTabsContainer>
      </TabsContext.Provider>
    );
  }
);

TabsContainer.displayName = 'TabsContainer';

export const useTabsContext = () => useContext(TabsContext);
