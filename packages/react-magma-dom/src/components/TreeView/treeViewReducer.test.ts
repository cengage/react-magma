import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewItemInterface } from './TreeViewContext';
import {
  treeViewReducer,
  TreeViewState,
  TreeViewAction,
} from './treeViewReducer';

describe('treeViewReducer', () => {
  const mockItems: TreeViewItemInterface[] = [
    {
      itemId: 'item1',
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
      isDisabled: false,
      hasOwnTreeItems: false,
    },
    {
      itemId: 'item2',
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
      isDisabled: false,
      hasOwnTreeItems: true,
    },
    {
      itemId: 'item2-child',
      parentId: 'item2',
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
      isDisabled: false,
      hasOwnTreeItems: false,
    },
  ];

  const initialState: TreeViewState = {
    items: mockItems,
    expandedSet: new Set<string>(),
    itemsNeedUpdate: null,
  };

  describe('SELECT_ITEM', () => {
    it('should select an item in single select mode', () => {
      const action: TreeViewAction = {
        type: 'SELECT_ITEM',
        payload: {
          itemId: 'item1',
          selectable: 'single',
          checkChildren: false,
          checkParents: false,
          isTopLevelSelectable: true,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.items).not.toBe(initialState.items);
      const selectedItem = newState.items.find(item => item.itemId === 'item1');
      expect(selectedItem?.checkedStatus).toBe(
        IndeterminateCheckboxStatus.checked
      );
    });

    it('should not update state if item is disabled', () => {
      const stateWithDisabledItem: TreeViewState = {
        ...initialState,
        items: [
          {
            ...mockItems[0],
            isDisabled: true,
          },
          ...mockItems.slice(1),
        ],
      };

      const action: TreeViewAction = {
        type: 'SELECT_ITEM',
        payload: {
          itemId: 'item1',
          selectable: 'single',
          checkChildren: false,
          checkParents: false,
          isTopLevelSelectable: true,
        },
      };

      const newState = treeViewReducer(stateWithDisabledItem, action);

      expect(newState).toBe(stateWithDisabledItem);
    });

    it('should not select top-level item when isTopLevelSelectable is false in multi mode', () => {
      const action: TreeViewAction = {
        type: 'SELECT_ITEM',
        payload: {
          itemId: 'item1',
          selectable: 'multi',
          checkChildren: false,
          checkParents: false,
          isTopLevelSelectable: false,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe('SELECT_ALL', () => {
    it('should select all items', () => {
      const action: TreeViewAction = {
        type: 'SELECT_ALL',
        payload: {
          checkChildren: true,
          checkParents: true,
          isTopLevelSelectable: true,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.items).not.toBe(initialState.items);
      const allChecked = newState.items.every(
        item => item.checkedStatus === IndeterminateCheckboxStatus.checked
      );
      expect(allChecked).toBe(true);
    });
  });

  describe('CLEAR_ALL', () => {
    it('should clear all selections', () => {
      const stateWithSelections: TreeViewState = {
        ...initialState,
        items: mockItems.map(item => ({
          ...item,
          checkedStatus: IndeterminateCheckboxStatus.checked,
        })),
      };

      const action: TreeViewAction = {
        type: 'CLEAR_ALL',
        payload: {
          checkChildren: true,
          checkParents: true,
          isTopLevelSelectable: true,
        },
      };

      const newState = treeViewReducer(stateWithSelections, action);

      expect(newState.items).not.toBe(stateWithSelections.items);
      const allUnchecked = newState.items.every(
        item => item.checkedStatus === IndeterminateCheckboxStatus.unchecked
      );
      expect(allUnchecked).toBe(true);
    });
  });

  describe('TOGGLE_EXPAND', () => {
    it('should add item to expandedSet when not expanded', () => {
      const action: TreeViewAction = {
        type: 'TOGGLE_EXPAND',
        payload: {
          itemId: 'item2',
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.expandedSet.has('item2')).toBe(true);
      expect(newState.expandedSet).not.toBe(initialState.expandedSet);
    });

    it('should remove item from expandedSet when already expanded', () => {
      const stateWithExpanded: TreeViewState = {
        ...initialState,
        expandedSet: new Set(['item2']),
      };

      const action: TreeViewAction = {
        type: 'TOGGLE_EXPAND',
        payload: {
          itemId: 'item2',
        },
      };

      const newState = treeViewReducer(stateWithExpanded, action);

      expect(newState.expandedSet.has('item2')).toBe(false);
    });

    it('should expand multiple items when array is provided', () => {
      const action: TreeViewAction = {
        type: 'TOGGLE_EXPAND',
        payload: {
          itemId: ['item1', 'item2'],
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.expandedSet.has('item1')).toBe(true);
      expect(newState.expandedSet.has('item2')).toBe(true);
    });

    it('should clear expandedSet when empty string is provided', () => {
      const stateWithExpanded: TreeViewState = {
        ...initialState,
        expandedSet: new Set(['item1', 'item2']),
      };

      const action: TreeViewAction = {
        type: 'TOGGLE_EXPAND',
        payload: {
          itemId: '',
        },
      };

      const newState = treeViewReducer(stateWithExpanded, action);

      expect(newState.expandedSet.size).toBe(0);
    });
  });

  describe('EXPAND_ALL', () => {
    it('should expand all provided items', () => {
      const action: TreeViewAction = {
        type: 'EXPAND_ALL',
        payload: {
          expandableIds: ['item1', 'item2'],
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.expandedSet.has('item1')).toBe(true);
      expect(newState.expandedSet.has('item2')).toBe(true);
    });
  });

  describe('COLLAPSE_ALL', () => {
    it('should clear all expanded items', () => {
      const stateWithExpanded: TreeViewState = {
        ...initialState,
        expandedSet: new Set(['item1', 'item2']),
      };

      const action: TreeViewAction = {
        type: 'COLLAPSE_ALL',
      };

      const newState = treeViewReducer(stateWithExpanded, action);

      expect(newState.expandedSet.size).toBe(0);
    });
  });

  describe('SET_ITEMS', () => {
    it('should replace items array', () => {
      const newItems: TreeViewItemInterface[] = [
        {
          itemId: 'newItem',
          checkedStatus: IndeterminateCheckboxStatus.unchecked,
          isDisabled: false,
          hasOwnTreeItems: false,
        },
      ];

      const action: TreeViewAction = {
        type: 'SET_ITEMS',
        payload: {
          items: newItems,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.items).toBe(newItems);
      expect(newState.items.length).toBe(1);
    });

    it('should return same state if items are identical', () => {
      const action: TreeViewAction = {
        type: 'SET_ITEMS',
        payload: {
          items: initialState.items,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe('ADD_ITEM', () => {
    it('should add a new item to the tree', () => {
      const newItem: TreeViewItemInterface = {
        itemId: 'item3',
        checkedStatus: IndeterminateCheckboxStatus.unchecked,
        isDisabled: false,
        hasOwnTreeItems: false,
      };

      const action: TreeViewAction = {
        type: 'ADD_ITEM',
        payload: {
          newItem,
          checkParents: false,
          selectable: 'single',
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.items.length).toBe(mockItems.length + 1);
      expect(newState.items[newState.items.length - 1]).toBe(newItem);
    });

    it('should update parent hasOwnTreeItems when adding child', () => {
      const newItem: TreeViewItemInterface = {
        itemId: 'item1-child',
        parentId: 'item1',
        checkedStatus: IndeterminateCheckboxStatus.unchecked,
        isDisabled: false,
        hasOwnTreeItems: false,
      };

      const action: TreeViewAction = {
        type: 'ADD_ITEM',
        payload: {
          newItem,
          checkParents: false,
          selectable: 'multi',
        },
      };

      const newState = treeViewReducer(initialState, action);

      const parent = newState.items.find(item => item.itemId === 'item1');
      expect(parent?.hasOwnTreeItems).toBe(true);
    });
  });

  describe('UPDATE_ITEMS_DISABLED_STATE', () => {
    it('should update disabled state of items', () => {
      const updatedItems: TreeViewItemInterface[] = mockItems.map(item => ({
        ...item,
        isDisabled: true,
      }));

      const action: TreeViewAction = {
        type: 'UPDATE_ITEMS_DISABLED_STATE',
        payload: {
          updatedItems,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.items).not.toBe(initialState.items);
      const allDisabled = newState.items.every(
        item => item.isDisabled === true
      );
      expect(allDisabled).toBe(true);
    });

    it('should return same state if no changes', () => {
      const action: TreeViewAction = {
        type: 'UPDATE_ITEMS_DISABLED_STATE',
        payload: {
          updatedItems: mockItems,
        },
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe('TRIGGER_ITEMS_UPDATE', () => {
    it('should set itemsNeedUpdate to true', () => {
      const action: TreeViewAction = {
        type: 'TRIGGER_ITEMS_UPDATE',
      };

      const newState = treeViewReducer(initialState, action);

      expect(newState.itemsNeedUpdate).toBe(true);
    });
  });

  describe('COMPLETE_ITEMS_UPDATE', () => {
    it('should set itemsNeedUpdate to false', () => {
      const stateWithUpdate: TreeViewState = {
        ...initialState,
        itemsNeedUpdate: true,
      };

      const action: TreeViewAction = {
        type: 'COMPLETE_ITEMS_UPDATE',
      };

      const newState = treeViewReducer(stateWithUpdate, action);

      expect(newState.itemsNeedUpdate).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should return same state for unknown action type', () => {
      const action = {
        type: 'UNKNOWN_ACTION',
      } as any;

      const newState = treeViewReducer(initialState, action);

      expect(newState).toBe(initialState);
    });

    it('should handle empty items array', () => {
      const emptyState: TreeViewState = {
        items: [],
        expandedSet: new Set(),
        itemsNeedUpdate: null,
      };

      const action: TreeViewAction = {
        type: 'SELECT_ALL',
        payload: {
          checkChildren: true,
          checkParents: true,
          isTopLevelSelectable: true,
        },
      };

      const newState = treeViewReducer(emptyState, action);

      expect(newState.items).toEqual([]);
    });
  });
});
