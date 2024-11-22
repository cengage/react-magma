import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import userEvent from '@testing-library/user-event';
import { FavoriteIcon } from 'react-magma-icons';
import { transparentize } from 'polished';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { Tag } from '../Tag';
import { Paragraph } from '../Paragraph';

const TEXT = 'Test Text Tree Item';
const testId = 'tree-view';

const getTreeItemsOneLevel = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
    <TreeItem label="Node 2" itemId="item2" testId="item2">
      <TreeItem
        label="Child 2.1"
        itemId="item-child2.1"
        testId="item-child2.1"
      />
      <TreeItem
        label="Child 2.2"
        itemId="item-child2.2"
        testId="item-child2.2"
      />
    </TreeItem>
    <TreeItem label="Node 3" itemId="item3" testId="item3">
      <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
    </TreeItem>
  </TreeView>
);

const getTreeItemsOneLevelSmall = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
  </TreeView>
);

const getTreeItemsMultiLevel = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
    <TreeItem label="Node 2" itemId="item2" testId="item2">
      <TreeItem label="Child 2" itemId="item-child2.1" testId="item-child2.1">
        <TreeItem
          label="Grandchild 2"
          itemId="item-gchild2"
          testId="item-gchild2"
        >
          <TreeItem
            label="Great-grandchild 1"
            itemId="item-ggchild1"
            testId="item-ggchild1"
          />
          <TreeItem
            label="Great-grandchild 2"
            itemId="item-ggchild2"
            testId="item-ggchild2"
          />
          <TreeItem
            label="Great-grandchild 3"
            itemId="item-ggchild3"
            testId="item-ggchild3"
          />
        </TreeItem>
      </TreeItem>
    </TreeItem>
    <TreeItem label="Node 3" itemId="item3" testId="item3">
      <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
    </TreeItem>
  </TreeView>
);

const getTreeItemsWithDisabled = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
    <TreeItem label="Node 2" itemId="item2" testId="item2" isDisabled>
      <TreeItem label="Child 2" itemId="item-child2.1" testId="item-child2.1" />
    </TreeItem>
  </TreeView>
);

const getTreeItemsWithDisabledChildren = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" isDisabled />
      <TreeItem label="Child 2" itemId="item-child2" testId="item-child2" isDisabled />
      <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
      <TreeItem label="Child 4" itemId="item-child4" testId="item-child4" />
    </TreeItem>
  </TreeView>
);


const TreeItemsMultiLevelControlledOutside = props => {
  const apiRef = React.useRef(null);
  const [items, setItems] = React.useState([]);
  
  const onSelectedItemChange = items => {
    setItems(items);
    props.onSelectedItemChange(items)
  }

  return (
    <>
      <button data-testid="select-all" onClick={() => apiRef.current.selectAll()}>Select all</button>
      <button data-testid="clear-all" onClick={() => apiRef.current.clearAll()} />
      {items.map(({ itemId }) => (
        <button key={itemId} data-testid={`${itemId}-tag`} onClick={() => apiRef.current.selectItem({ itemId, checkedStatus: IndeterminateCheckboxStatus.unchecked  })} />
      ))}
      <TreeView
        testId={testId}
        apiRef={apiRef}
        selectable={TreeViewSelectable.multi}
        {...props}
        onSelectedItemChange={onSelectedItemChange}
      >
        <TreeItem label="Node 0" itemId="item0" testId="item0" />
        <TreeItem label="Node 1" itemId="item1" testId="item1">
          <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
        </TreeItem>
        <TreeItem label="Node 2" itemId="item2" testId="item2">
          <TreeItem
            label="Child 2"
            itemId="item-child2.1"
            testId="item-child2.1"
          >
            <TreeItem
              label="Grandchild 2"
              itemId="item-gchild2"
              testId="item-gchild2"
            >
              <TreeItem
                label="Great-grandchild 1"
                itemId="item-ggchild1"
                testId="item-ggchild1"
                isDisabled
              />
              <TreeItem
                label="Great-grandchild 2"
                itemId="item-ggchild2"
                testId="item-ggchild2"
              />
              <TreeItem
                label="Great-grandchild 3"
                itemId="item-ggchild3"
                testId="item-ggchild3"
              />
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem label="Node 3" itemId="item3" testId="item3">
          <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
        </TreeItem>
      </TreeView>
    </>
  );
};

describe('TreeView', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <TreeView testId={testId}>
        <TreeItem>{TEXT}</TreeItem>
      </TreeView>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TreeView testId={testId}>
        <TreeItem>{TEXT}</TreeItem>
      </TreeView>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('initialExpandedItems', () => {
    it('when set to empty, no TreeItem is expanded', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({ initialExpandedItems: [] })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');
    });

    it('when set to array length 3, all 3 TreeItems are expanded', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          initialExpandedItems: ['item1', 'item2', 'item3'],
        })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'true');
    });

    it('when set to array length 1, the one TreeItem is expanded', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({ initialExpandedItems: ['item2'] })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');
    });

    it('when child item is part of the array, that item is expanded including parents', () => {
      const { getByTestId } = render(
        getTreeItemsMultiLevel({
          initialExpandedItems: ['item-child2.1'],
        })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item-child2.1')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  describe('onExpandedChange', () => {
    it('function gets called when a branch item is expanded', () => {
      const onExpandedChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          onExpandedChange,
          selectable: TreeViewSelectable.single,
        })
      );

      userEvent.click(getByTestId('item1-expand'));
      expect(onExpandedChange).toHaveBeenCalled();
    });

    it('function does not get called when a leaf item is clicked', () => {
      const onExpandedChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          onExpandedChange,
          selectable: TreeViewSelectable.single,
        })
      );

      userEvent.click(getByTestId('item0'));
      expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it('function does not get called when the item is disabled and clicked', () => {
      const onExpandedChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsWithDisabled({
          selectable: TreeViewSelectable.single,
          initialExpandedItems: ['item1', 'item2'],
          onExpandedChange,
        })
      );

      userEvent.click(getByTestId('item2-itemwrapper'));
      expect(onExpandedChange).not.toHaveBeenCalled();
    });
  });

  describe('preselectedItems', () => {
    describe('when set to TreeViewSelectable.off,', () => {
      it('and preselectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [],
            selectable: TreeViewSelectable.off,
          })
        );
        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-checked');
      });

      it('and preselectedItems is set, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            selectable: TreeViewSelectable.off,
          })
        );
        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-checked');
      });
    });

    describe('when set to TreeViewSelectable.single,', () => {
      it('and preselectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [],
            selectable: TreeViewSelectable.single,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item1')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item3')).toHaveAttribute('aria-selected', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-checked');
      });

      it('and preselectedItems is set to one item, that TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            selectable: TreeViewSelectable.single,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item1')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-selected', 'true');
        expect(getByTestId('item3')).toHaveAttribute('aria-selected', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-checked');
      });

      it('and preselectedItems is set to multiple items, only the first TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item0',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            selectable: TreeViewSelectable.single,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item1')).toHaveAttribute('aria-selected', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-selected', 'true');
        expect(getByTestId('item3')).toHaveAttribute('aria-selected', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-checked');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-checked');
      });
    });

    describe('when set to TreeViewSelectable.multi,', () => {
      it('and preselectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [],
            selectable: TreeViewSelectable.multi,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');
      });

      it('and preselectedItems is set to one leaf item, that TreeItem alone is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item0',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            selectable: TreeViewSelectable.multi,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');
      });

      it('and preselectedItems is set to one branch item, that TreeItem is selected along with its children', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            selectable: TreeViewSelectable.multi,
          })
        );
        expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');

        userEvent.click(getByTestId('item2-expand'));

        expect(getByTestId('item-child2.1')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item-child2.2')).toHaveAttribute(
          'aria-checked',
          'true'
        );
      });

      it('and preselectedItems is set to multiple items, all those TreeItems are selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item0',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            initialExpandedItems: ['item1', 'item2'],
            selectable: TreeViewSelectable.multi,
          })
        );

        expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item-child1')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item-child2.1')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item-child2.2')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item-child2.2')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item-child2.2')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');
      });

      it('and preselectedItems is set to multiple items at different depths, all those TreeItems are selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            preselectedItems: [
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.indeterminate,
              },
              {
                itemId: 'item-child2.1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item-child3',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            initialExpandedItems: ['item1', 'item2'],
            selectable: TreeViewSelectable.multi,
          })
        );

        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'mixed');
        expect(getByTestId('item-child2.1')).toHaveAttribute(
          'aria-checked',
          'true'
        );
        expect(getByTestId('item-child2.2')).toHaveAttribute(
          'aria-checked',
          'false'
        );
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'true');

        userEvent.click(getByTestId('item3-expand'));
        expect(getByTestId('item-child3')).toHaveAttribute(
          'aria-checked',
          'true'
        );
      });

      it('and preselectedItems is set to multiple items, onSelectedItemChange is called when the component loads', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          <TreeView
            testId={testId}
            preselectedItems={[
              {
                itemId: 'item-child1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ]}
            selectable={TreeViewSelectable.multi}
            onSelectedItemChange={onSelectedItemChange}
          >
            <TreeItem label="Node 1" itemId="item1" testId="item1">
              <TreeItem
                label="Child 1"
                itemId="item-child1"
                testId="item-child1"
              />
              <TreeItem
                label="Child 2"
                itemId="item-child2"
                testId="item-child2"
              />
            </TreeItem>
            <TreeItem label="Node 2" itemId="item2" testId="item2">
              <TreeItem
                label="Child 2.1"
                itemId="item-child2.1"
                testId="item-child2.1"
              />
              <TreeItem
                label="Child 2.2"
                itemId="item-child2.2"
                testId="item-child2.2"
              />
            </TreeItem>
            <TreeItem label="Node 3" itemId="item3" testId="item3">
              <TreeItem
                label="Child 3"
                itemId="item-child3"
                testId="item-child3"
              />
            </TreeItem>
          </TreeView>
        );

        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'mixed');
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'true');

        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2.2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
        userEvent.click(getByTestId('item1-expand'));
        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('selectable', () => {
    it('by default, selectable is set to TreeViewSelectable.single, and TreeItems do not have checkboxes', () => {
      const { queryByTestId } = render(getTreeItemsOneLevel({}));
      expect(queryByTestId('item1-checkbox')).not.toBeInTheDocument();
    });

    it('when set to TreeViewSelectable.off, TreeItems do not have checkboxes', () => {
      const { queryByTestId } = render(
        getTreeItemsOneLevel({
          selectable: TreeViewSelectable.off,
        })
      );
      expect(queryByTestId('item1-checkbox')).not.toBeInTheDocument();
    });

    it('when set to TreeViewSelectable.multi, TreeItems have checkboxes', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          selectable: TreeViewSelectable.multi,
        })
      );
      expect(getByTestId('item1-checkbox')).toBeInTheDocument();
    });
  });

  describe('onSelectedItemChange', () => {
    it('when set to TreeViewSelectable.off, function does not get called', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          onSelectedItemChange,
          selectable: TreeViewSelectable.off,
        })
      );

      userEvent.click(getByTestId('item1'));
      expect(onSelectedItemChange).not.toHaveBeenCalled();
    });

    describe('when set to TreeViewSelectable.single,', () => {
      it('function gets called when an item is clicked', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.single,
          })
        );

        const item1 = getByTestId('item1');
        const item1Label = getByTestId('item1-label');

        userEvent.click(item1Label);
        expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
        expect(onSelectedItemChange).toHaveBeenCalled();
        expect(item1).toHaveAttribute('aria-selected', 'true');

        userEvent.click(item1Label);
        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
        expect(item1).toHaveAttribute('aria-selected', 'true');
      });

      it('function gets called when it has a preselected item', () => {
        const onSelectedItemChange = jest.fn();
        render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.single,
            preselectedItems: [
              {
                itemId: 'item1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
          })
        );

        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('function returns the selected item when it is a leaf', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.single,
          })
        );

        userEvent.click(getByTestId('item0-label'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item0',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('function returns the selected item when it is a branch', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.single,
          })
        );

        userEvent.click(getByTestId('item2-label'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      });

      it('item is visually selected', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.single,
          })
        );

        expect(getByTestId('item1-itemwrapper')).not.toHaveStyleRule(
          'background'
        );
        userEvent.click(getByTestId('item1-label'));

        expect(getByTestId('item1-itemwrapper')).toHaveStyle(
          `background: ${transparentize(0.92, magma.colors.neutral900)}`
        );
      });
    });

    describe('when set to TreeViewSelectable.multi,', () => {
      it("function gets called when an item's checkbox is clicked", () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
          })
        );

        userEvent.click(getByTestId('item1-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalled();
      });

      it('function gets called when it has a preselected item', () => {
        const onSelectedItemChange = jest.fn();
        render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              {
                itemId: 'item1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
          })
        );

        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('function returns the selected item when it is a leaf', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsMultiLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
          })
        );

        userEvent.click(getByTestId('item0-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item0',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('function returns the selected item and all children when it is a branch', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsMultiLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
          })
        );

        userEvent.click(getByTestId('item2-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
        userEvent.click(getByTestId('item2-expand'));
        userEvent.click(getByTestId('item-child2.1-expand'));
        userEvent.click(getByTestId('item-gchild2-expand'));

        userEvent.click(getByTestId('item-ggchild2-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      });

      it('function returns the selected items when different items are checked and unchecked', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsMultiLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
          })
        );

        userEvent.click(getByTestId('item2-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
        userEvent.click(getByTestId('item2-expand'));
        userEvent.click(getByTestId('item-child2.1-expand'));
        userEvent.click(getByTestId('item-gchild2-expand'));

        userEvent.click(getByTestId('item-ggchild2-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item-ggchild3-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item-ggchild1-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([]);

        userEvent.click(getByTestId('item2-checkbox'));
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-ggchild3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        expect(onSelectedItemChange).toHaveBeenCalledTimes(5);
      });

      it('items look visually selected', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            onSelectedItemChange,
            selectable: TreeViewSelectable.multi,
          })
        );

        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
        userEvent.click(getByTestId('item1-checkbox'));
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('sets only child state as checked if checkParents is false and checkChildren is false', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(getTreeItemsMultiLevel({
        onSelectedItemChange,
        selectable: TreeViewSelectable.multi,
        checkParents: false,
        checkChildren: false
      }));

      userEvent.click(getByTestId('item1-expand'));
      const item1Checkbox = getByTestId('item-child1-checkbox');
      userEvent.click(item1Checkbox);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-child1',
          checkedStatus: IndeterminateCheckboxStatus.checked
        }
      ]);
    });

    it('sets child state as checked and parent indeterminate if checkParents is true and checkChildren is false', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(getTreeItemsMultiLevel({
        onSelectedItemChange,
        selectable: TreeViewSelectable.multi,
        checkParents: true,
        checkChildren: false
      }));

      userEvent.click(getByTestId('item2-expand'));
      userEvent.click(getByTestId('item-child2.1-expand'));
      userEvent.click(getByTestId('item-gchild2-expand'));
      const grandChildCheckbox = getByTestId('item-ggchild1-checkbox');
      userEvent.click(grandChildCheckbox);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item2',
          checkedStatus: IndeterminateCheckboxStatus.indeterminate
        },
        {
          itemId: 'item-child2.1',
          checkedStatus: IndeterminateCheckboxStatus.indeterminate
        },
        {
          itemId: 'item-gchild2',
          checkedStatus: IndeterminateCheckboxStatus.indeterminate
        },
        {
          itemId: 'item-ggchild1',
          checkedStatus: IndeterminateCheckboxStatus.checked
        },
      ]);
    });
    
    it('sets to all children of preselected and checked parent state as checked if checkParents is false and checkChildren is true', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(getTreeItemsMultiLevel({
        onSelectedItemChange,
        selectable: TreeViewSelectable.multi,
        checkParents: false,
        checkChildren: true,
        preselectedItems: [
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]
      }));

      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-gchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked
        },
        {
          itemId: 'item-ggchild1',
          checkedStatus: IndeterminateCheckboxStatus.checked
        },
        {
          itemId: 'item-ggchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked
        },
        {
          itemId: 'item-ggchild3',
          checkedStatus: IndeterminateCheckboxStatus.checked
        },
      ]);
    });
  });

  describe('initialExpandedItems and preselectedItems', () => {
    it('when initialExpandedItems and preselectedItems are empty, no TreeItem is expanded or selected', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          selectable: TreeViewSelectable.multi,
          initialExpandedItems: [],
          preselectedItems: [],
        })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');

      expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');
    });

    it('when initialExpandedItems is set and preselectedItems is set, the items are expanded and selected', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          selectable: TreeViewSelectable.multi,
          initialExpandedItems: ['item2', 'item1'],
          preselectedItems: [
            {
              itemId: 'item2',
              checkedStatus: IndeterminateCheckboxStatus.indeterminate,
            },
            {
              itemId: 'item-child2.1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ],
        })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');

      expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'mixed');
      expect(getByTestId('item-child2.1')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'true');

      userEvent.click(getByTestId('item3-expand'));
      expect(getByTestId('item-child3')).toHaveAttribute(
        'aria-checked',
        'true'
      );
    });
  });

  describe('a11y', () => {
    it('sets the ariaLabel', () => {
      const testId = 'ariaLabelId';
      const { getByTestId } = render(
        getTreeItemsOneLevel({ ariaLabel: 'aria-label-example', testId })
      );

      expect(getByTestId(testId)).toHaveAttribute(
        'aria-label',
        'aria-label-example'
      );
    });

    it('sets the ariaLabelledBy', () => {
      const testId = 'ariaLabelledById';
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          ariaLabelledBy: 'aria-labelled-by-example',
          testId,
        })
      );

      expect(getByTestId(testId)).toHaveAttribute(
        'aria-labelledby',
        'aria-labelled-by-example'
      );
    });

    it('sets the tree role', () => {
      const testId = 'treeRoleId';
      const { getByTestId } = render(getTreeItemsOneLevel({ testId }));

      expect(getByTestId(testId)).toHaveAttribute('role', 'tree');
    });

    it('when multiselect, sets the aria-multiselectable to true', () => {
      const testId = 'multiSelectId';
      const { getByTestId } = render(
        getTreeItemsOneLevel({ selectable: TreeViewSelectable.multi, testId })
      );

      expect(getByTestId(testId)).toHaveAttribute(
        'aria-multiselectable',
        'true'
      );
    });

    it('when select is off, sets the aria-multiselectable to false', () => {
      const testId = 'multiSelectId2';
      const { getByTestId } = render(
        getTreeItemsOneLevel({ selectable: TreeViewSelectable.off, testId })
      );

      expect(getByTestId(testId)).toHaveAttribute(
        'aria-multiselectable',
        'false'
      );
    });

    it('when single select, sets the aria-multiselectable to false', () => {
      const testId = 'multiSelectId3';
      const { getByTestId } = render(
        getTreeItemsOneLevel({ selectable: TreeViewSelectable.single, testId })
      );

      expect(getByTestId(testId)).toHaveAttribute(
        'aria-multiselectable',
        'false'
      );
    });
  });

  describe('isInverse', () => {
    it('uses the inverse colors', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevel({
          selectable: TreeViewSelectable.single,
          isInverse: true,
        })
      );

      expect(getByTestId('item0-label')).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
      expect(getByTestId('item1-expand')).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );

      expect(getByTestId('item1-itemwrapper')).not.toHaveStyleRule(
        'background'
      );
      userEvent.click(getByTestId('item1-label'));

      expect(getByTestId('item1-itemwrapper')).toHaveStyle(
        `background: ${transparentize(0.7, magma.colors.neutral900)}`
      );
    });
  });

  describe('icon', () => {
    const labelText = 'Tree Item Node 0';
    const itemId = 'node0';
    const testId = `${itemId}-tree-item`;
    it("icon is visible when the item doesn't have treeItemChildren", () => {
      const { getByTestId } = render(
        <TreeView testId={testId} initialExpandedItems={[itemId]}>
          <TreeItem
            label={labelText}
            testId={testId}
            itemId={itemId}
            icon={<FavoriteIcon />}
          />
        </TreeView>
      );

      expect(getByTestId(`${testId}-icon`)).toBeInTheDocument();
    });

    it('icon is visible when the item does have treeItemChildren', () => {
      const { getByTestId } = render(
        <TreeView testId={testId} initialExpandedItems={[itemId]}>
          <TreeItem
            label={labelText}
            testId={testId}
            itemId={itemId}
            icon={<FavoriteIcon />}
          >
            <TreeItem
              label={`${labelText}-child`}
              testId={`${testId}-child`}
              itemId={`${itemId}-child`}
              icon={<FavoriteIcon />}
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-icon`)).toBeInTheDocument();
    });

    it('if the item does not have an icon but a sibling does, the item has a visible (default) icon', () => {
      const { getByTestId } = render(
        <TreeView testId={testId} initialExpandedItems={[itemId]}>
          <TreeItem label={labelText} testId={testId} itemId={itemId}>
            <TreeItem
              label={`${labelText}-child`}
              testId={`${testId}-child`}
              itemId={`${itemId}-child`}
              icon={<FavoriteIcon />}
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-icon`)).toBeInTheDocument();
      expect(getByTestId(`${testId}-child-icon`)).toBeInTheDocument();
    });
  });

  describe('keyboard navigation and focus', () => {
    describe('for all TreeViewSelectable types', () => {
      it('should navigate up and down the tree when pressing ArrowDown and ArrowUp', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            selectable: TreeViewSelectable.off,
          })
        );

        const item1 = getByTestId('item1');
        const item2 = getByTestId('item2');
        const item3 = getByTestId('item3');

        userEvent.tab();
        expect(item1).toHaveFocus();

        fireEvent.keyDown(item1, { key: 'ArrowDown' });
        expect(item2).toHaveFocus();

        fireEvent.keyDown(item2, { key: 'ArrowDown' });
        expect(item3).toHaveFocus();

        fireEvent.keyDown(item3, { key: 'ArrowUp' });
        expect(item2).toHaveFocus();

        fireEvent.keyDown(item2, { key: 'ArrowUp' });
        expect(item1).toHaveFocus();

        // expand item
        fireEvent.keyDown(item1, { key: 'ArrowRight' });
        const item1child = getByTestId('item-child1');
        expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'true');
        expect(item1).toHaveFocus();

        fireEvent.keyDown(item1, { key: 'ArrowDown' });
        expect(item1child).toHaveFocus();

        fireEvent.keyDown(item1child, { key: 'ArrowUp' });
        expect(item1).toHaveFocus();

        fireEvent.keyDown(item1, { key: 'ArrowLeft' });
        expect(item1).toHaveFocus();
      });

      it('should navigate to the next item and back to the first item when pressing ArrowDown', () => {
        const { getByTestId } = render(
          <TreeView testId={testId}>
            <TreeItem label="Node 0" itemId="item0" testId="item0" />
            <TreeItem label="Node 1" itemId="item1" testId="item1" />
          </TreeView>
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');

        userEvent.tab();
        expect(item0).toHaveFocus();

        fireEvent.keyDown(item0, { key: 'ArrowDown' });
        expect(item1).toHaveFocus();

        fireEvent.keyDown(item1, { key: 'ArrowDown' });
        expect(item0).toHaveFocus();
      });

      it('should navigate to the previous item and back to the last item when pressing ArrowUp', () => {
        const { getByTestId } = render(
          <TreeView testId={testId}>
            <TreeItem label="Node 0" itemId="item0" testId="item0" />
            <TreeItem label="Node 1" itemId="item1" testId="item1" />
          </TreeView>
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');

        userEvent.tab();
        expect(item0).toHaveFocus();

        fireEvent.keyDown(item0, { key: 'ArrowUp' });
        expect(item1).toHaveFocus();

        fireEvent.keyDown(item1, { key: 'ArrowUp' });
        expect(item0).toHaveFocus();
      });

      it('should expand the focused branch item when pressing ArrowRight', () => {
        const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

        const item0Wrapper = getByTestId('item0');
        const item1Wrapper = getByTestId('item1');
        const item1 = getByTestId('item1');

        userEvent.tab();
        fireEvent.keyDown(item0Wrapper, { key: 'ArrowDown' });
        fireEvent.keyDown(item1Wrapper, { key: 'ArrowRight' });

        expect(item1Wrapper).toHaveFocus();
        expect(item1).toHaveAttribute('aria-expanded', 'true');
        expect(getByTestId('item-child1')).toBeInTheDocument();
      });

      it('should navigate to the next item when focus is on an expanded branch item and when pressing ArrowRight', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevelSmall({ initialExpandedItems: ['item1'] })
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');
        const item1child = getByTestId('item-child1');

        userEvent.tab();
        fireEvent.keyDown(item0, { key: 'ArrowDown' });
        fireEvent.keyDown(item1, { key: 'ArrowRight' });

        expect(item1child).toHaveFocus();
      });

      it('should maintain focus when pressing ArrowRight on a leaf item', () => {
        const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

        const item0 = getByTestId('item0');

        userEvent.tab();
        fireEvent.keyDown(item0, { key: 'ArrowRight' });

        expect(item0).toHaveFocus();
      });

      it('should collapse the focused branch item when pressing ArrowLeft', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevelSmall({ initialExpandedItems: ['item1'] })
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');

        userEvent.tab();

        fireEvent.keyDown(item0, { key: 'ArrowDown' });
        fireEvent.keyDown(item1, { key: 'ArrowLeft' });

        expect(item1).toHaveFocus();
        expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      });

      it('should maintain focus when pressing ArrowLeft on a leaf item', () => {
        const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

        const item0 = getByTestId('item0');

        userEvent.tab();
        fireEvent.keyDown(item0, { key: 'ArrowLeft' });

        expect(item0).toHaveFocus();
      });

      it('should focus to the first item when pressing the Home key', () => {
        const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');

        userEvent.tab();
        fireEvent.focus(item1);
        fireEvent.keyDown(item1, { key: 'Home' });

        expect(item0).toHaveFocus();
      });

      it('should focus to the last item when pressing the End key', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevelSmall({ initialExpandedItems: ['item1'] })
        );

        const item0 = getByTestId('item0');
        const item1Child = getByTestId('item-child1');

        userEvent.tab();
        fireEvent.focus(item0);
        fireEvent.keyDown(item0, { key: 'End' });

        expect(item1Child).toHaveFocus();
      });

      it('should focus to the last visible item when pressing the End key', () => {
        const { getByTestId, rerender } = render(
          getTreeItemsOneLevel({ initialExpandedItems: ['item-3'] })
        );

        const item0 = getByTestId('item0');
        const item2 = getByTestId('item2');
        const item3 = getByTestId('item3');

        userEvent.tab();
        fireEvent.keyDown(item0, { key: 'End' });
        expect(item3).toHaveFocus();

        // collapse last item with child
        fireEvent.keyDown(item3, { key: 'ArrowLeft' });

        fireEvent.keyDown(item3, { key: 'ArrowUp' });
        expect(item2).toHaveFocus();
        fireEvent.focus(item0);
        fireEvent.keyDown(item0, { key: 'End' });
        expect(item3).toHaveFocus();
      });
    });

    describe('TreeViewSelectable.off', () => {
      describe('keyboard navigation', () => {
        it('should toggle expand the branch item when pressing the Space key', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({ selectable: TreeViewSelectable.off })
          );

          const item1 = getByTestId('item1-itemwrapper');

          userEvent.tab();
          fireEvent.keyDown(item1, { key: ' ' });

          expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'true');
          expect(getByTestId('item-child1-itemwrapper')).toBeInTheDocument();
        });
      });

      describe('focus state', () => {
        it('sets the focus to the first element on load if there are no branches', () => {
          const { getByTestId } = render(
            <TreeView testId={testId} selectable={TreeViewSelectable.off}>
              <TreeItem label="Node 0" itemId="item0" testId="item0" />
              <TreeItem label="Node 1" itemId="item1" testId="item1" />
            </TreeView>
          );
          const item0 = getByTestId('item0');

          userEvent.tab();
          expect(item0).toHaveFocus();
        });

        it('sets the focus to the first branch on load if there is a branch', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({ selectable: TreeViewSelectable.off })
          );
          const item1 = getByTestId('item1');

          userEvent.tab();
          expect(item1).toHaveFocus();
        });
      });
    });

    describe('TreeViewSelectable.single', () => {
      describe('focus state', () => {
        it('sets the focus to the first element on load when nothing is selected', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({ selectable: TreeViewSelectable.single })
          );
          const item0 = getByTestId('item0');

          userEvent.tab();
          expect(item0).toHaveFocus();
        });

        it('sets the focus to the first selected element on load', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({
              selectable: TreeViewSelectable.single,
              preselectedItems: [
                {
                  itemId: 'item-child1',
                  checkedStatus: IndeterminateCheckboxStatus.checked,
                },
              ],
              initialExpandedItems: ['item1'],
            })
          );
          const item1Child = getByTestId('item-child1');

          userEvent.tab();
          expect(item1Child).toHaveFocus();
        });
      });

      describe('keyboard navigation', () => {
        it('should select the item when pressing the Enter key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({
              selectable: TreeViewSelectable.single,
              onSelectedItemChange,
            })
          );

          const item1 = getByTestId('item1');
          const item1wrapper = getByTestId('item1-itemwrapper');

          userEvent.tab();

          fireEvent.focus(item1);
          fireEvent.keyDown(item1wrapper, { key: 'Enter' });

          expect(item1).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);
          
          fireEvent.keyDown(item1wrapper, { key: 'Enter' });

          expect(item1).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
        });

        it('should select the leaf item when pressing the Space key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({
              selectable: TreeViewSelectable.single,
              onSelectedItemChange,
            })
          );

          const item0 = getByTestId('item0');
          const item0wrapper = getByTestId('item0-itemwrapper');

          userEvent.tab();

          expect(item0).toHaveAttribute('aria-selected', 'false');
          fireEvent.keyDown(item0wrapper, { key: ' ' });

          expect(item0).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item0',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);
          
          fireEvent.keyDown(item0wrapper, { key: ' ' });

          expect(item0).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
        });

        it('should toggle expand the branch item when pressing the Space key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({
              selectable: TreeViewSelectable.single,
              onSelectedItemChange,
            })
          );

          const item1 = getByTestId('item1');
          const item1wrapper = getByTestId('item1-itemwrapper');

          userEvent.tab();

          expect(item1).toHaveAttribute('aria-expanded', 'false');
          expect(item1).toHaveAttribute('aria-selected', 'false');

          fireEvent.focus(item1);
          fireEvent.keyDown(item1wrapper, { key: ' ' });

          expect(item1).toHaveAttribute('aria-expanded', 'true');
          expect(item1).toHaveAttribute('aria-selected', 'false');
          expect(onSelectedItemChange).not.toHaveBeenCalled();

          fireEvent.focus(item1);
          fireEvent.keyDown(item1wrapper, { key: ' ' });

          expect(item1).toHaveAttribute('aria-expanded', 'false');
          expect(item1).toHaveAttribute('aria-selected', 'false');
          expect(onSelectedItemChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('TreeViewSelectable.multi', () => {
      describe('focus state', () => {
        it('sets the focus to the first element on load when nothing is selected', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({ selectable: TreeViewSelectable.multi })
          );
          const item0 = getByTestId('item0');

          userEvent.tab();
          expect(item0).toHaveFocus();
        });

        it('sets the focus to the first selected element on load', () => {
          const { getByTestId } = render(
            getTreeItemsOneLevelSmall({
              selectable: TreeViewSelectable.multi,
              preselectedItems: [
                {
                  itemId: 'item-child1',
                  checkedStatus: IndeterminateCheckboxStatus.checked,
                },
                {
                  itemId: 'item1',
                  checkedStatus: IndeterminateCheckboxStatus.checked,
                },
              ],
            })
          );
          const item1 = getByTestId('item1');

          userEvent.tab();
          expect(item1).toHaveFocus();
        });

      });

      describe('keyboard navigation', () => {
        it('should toggle select a leaf item when pressing the Enter key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevel({
              selectable: TreeViewSelectable.multi,
              onSelectedItemChange,
              initialExpandedItems: ['item3'],
            })
          );

          const item3 = getByTestId('item3');
          const itemChild3 = getByTestId('item-child3');

          userEvent.tab();

          fireEvent.keyDown(getByTestId('item-child3-itemwrapper'), {
            key: 'Enter',
          });

          expect(itemChild3).toHaveAttribute('aria-checked', 'true');
          expect(item3).toHaveAttribute('aria-checked', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(getByTestId('item-child3-itemwrapper'), {
            key: 'Enter',
          });

          expect(itemChild3).toHaveAttribute('aria-checked', 'false');
          expect(item3).toHaveAttribute('aria-checked', 'false');
          expect(onSelectedItemChange).toHaveBeenCalledWith([]);
        });

        it('should toggle select a leaf item when pressing the Space key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevel({
              selectable: TreeViewSelectable.multi,
              onSelectedItemChange,
              initialExpandedItems: ['item3'],
            })
          );

          const item3 = getByTestId('item3');
          const itemChild3 = getByTestId('item-child3');

          userEvent.tab();

          fireEvent.keyDown(getByTestId('item-child3-itemwrapper'), {
            key: ' ',
          });

          expect(itemChild3).toHaveAttribute('aria-checked', 'true');
          expect(item3).toHaveAttribute('aria-checked', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(getByTestId('item-child3-itemwrapper'), {
            key: ' ',
          });

          expect(itemChild3).toHaveAttribute('aria-checked', 'false');
          expect(item3).toHaveAttribute('aria-checked', 'false');
          expect(onSelectedItemChange).toHaveBeenCalledWith([]);
        });

        it('should toggle select a branch item + its children when pressing the Enter key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevel({
              selectable: TreeViewSelectable.multi,
              onSelectedItemChange,
              initialExpandedItems: ['item3'],
            })
          );

          const item3 = getByTestId('item3');
          const itemChild3 = getByTestId('item-child3');

          userEvent.tab();

          fireEvent.keyDown(getByTestId('item3-itemwrapper'), { key: 'Enter' });

          expect(item3).toHaveAttribute('aria-checked', 'true');
          expect(itemChild3).toHaveAttribute('aria-checked', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(getByTestId('item3-itemwrapper'), { key: 'Enter' });

          expect(item3).toHaveAttribute('aria-checked', 'false');
          expect(itemChild3).toHaveAttribute('aria-checked', 'false');
          expect(onSelectedItemChange).toHaveBeenCalledWith([]);
        });

        it('should toggle select a branch item + its children when pressing the Space key', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevel({
              selectable: TreeViewSelectable.multi,
              onSelectedItemChange,
              initialExpandedItems: ['item3'],
            })
          );

          const item3 = getByTestId('item3');
          const itemChild3 = getByTestId('item-child3');

          userEvent.tab();

          fireEvent.keyDown(getByTestId('item3-itemwrapper'), { key: ' ' });

          expect(item3).toHaveAttribute('aria-checked', 'true');
          expect(itemChild3).toHaveAttribute('aria-checked', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(getByTestId('item3-itemwrapper'), { key: ' ' });

          expect(item3).toHaveAttribute('aria-checked', 'false');
          expect(itemChild3).toHaveAttribute('aria-checked', 'false');
          expect(onSelectedItemChange).toHaveBeenCalledWith([]);
        });

        it('should toggle select a branch item + its children when pressing the Space key and item is collapsed', () => {
          const onSelectedItemChange = jest.fn();
          const { getByTestId } = render(
            getTreeItemsOneLevel({
              selectable: TreeViewSelectable.multi,
              onSelectedItemChange,
            })
          );

          const item3 = getByTestId('item3');

          userEvent.tab();

          fireEvent.keyDown(getByTestId('item3-itemwrapper'), { key: ' ' });

          expect(item3).toHaveAttribute('aria-checked', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-child3',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);
          fireEvent.keyDown(getByTestId('item3-itemwrapper'), {
            key: 'ArrowRight',
          });
          expect(getByTestId('item-child3')).toHaveAttribute(
            'aria-checked',
            'true'
          );
        });
      });

      it('parent should have indeterminate checkbox state and toggle children selection when some disabled children are partially selected', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            preselectedItems: [{
              itemId: 'item-child1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            }],
            onSelectedItemChange
          })
        );

        const item1 = getByTestId('item1');
        
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child4', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);
        
        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(3);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);
      });
      
      it('parent should have unchecked checkbox state when all disabled children and all enabled children are not selected. parent should have indeterminate checkbox state when all disabled children are not selected and some enabled children are selected. parent should have indeterminate checkbox state when all disabled children are not selected and all enabled children are selected. and toggle children selection', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            onSelectedItemChange
          })
        );

        const item1 = getByTestId('item1');
        
        expect(item1).toHaveAttribute('aria-checked', 'false');

        expect(onSelectedItemChange).not.toHaveBeenCalled();

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
          { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child4', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);
        
        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'false');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2)
        expect(onSelectedItemChange).toHaveBeenCalledWith([]);
      });

      it('parent should have checked checkbox state when all disabled children are selected and all enabled children are selected. parent should have indeterminate checkbox state when all disabled children are selected and enabled children are partially selected. parent should have indeterminate checkbox state when all disabled children are selected and all enabled children are not selected. and toggle children selection', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked },
              { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.checked },
              { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked },
              { itemId: 'item-child4', checkedStatus: IndeterminateCheckboxStatus.checked },
            ],
            onSelectedItemChange
          })
        );

        const item1 = getByTestId('item1');
        
        expect(item1).toHaveAttribute('aria-checked', 'true');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1)
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child4', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2)
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);
        
        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'true');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(3)
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked },
          { itemId: 'item-child4', checkedStatus: IndeterminateCheckboxStatus.checked }
        ]);
      });
      
      it('an item can be selected and disabled through preselectedItems', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: false },
              { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: false },
              { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.checked, isDisabled: true },
            ],
            initialExpandedItems: ['item1'],
            onSelectedItemChange
          })
        );

        expect(getByTestId('item-child1-checkbox')).not.toHaveAttribute('disabled');
        expect(getByTestId('item-child2-checkbox')).not.toHaveAttribute('disabled');
        expect(getByTestId('item-child3-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child3-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child4-checkbox')).not.toHaveAttribute('disabled');
      });
      
      it('should disable all items if "isDisabled" prop set to true on TreeView', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            isDisabled: true,
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              { itemId: 'item-child1', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: false },
              { itemId: 'item-child2', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: false },
              { itemId: 'item-child3', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: true },
            ],
            initialExpandedItems: ['item1'],
            onSelectedItemChange
          })
        );

        expect(getByTestId('item1-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item1-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child1-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child1-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child2-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child2-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child3-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child3-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child4-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child4-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
      });
    });
  });

  describe('when controlled outside', () => {
    it('should be able to select all enabled items outside of TreeView', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside onSelectedItemChange={onSelectedItemChange} />
      );

      expect(onSelectedItemChange).not.toHaveBeenCalled();

      userEvent.click(getByTestId('select-all'));

      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: "item0",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item1",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item-child1",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item2",
          checkedStatus: IndeterminateCheckboxStatus.indeterminate,
        },
        {
          itemId: "item-child2.1",
          checkedStatus: IndeterminateCheckboxStatus.indeterminate,
        },
        {
          itemId: "item-gchild2",
          checkedStatus: IndeterminateCheckboxStatus.indeterminate,
        },
        {
          itemId: "item-ggchild2",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item-ggchild3",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item3",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: "item-child3",
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('should not select root parent if it initially unselected and disabled during select all', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.unchecked, isDisabled: true }
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(0);

      userEvent.click(getByTestId('select-all'));
      
      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: "item0", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item2", checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: "item-child2.1", checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: "item-gchild2", checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: "item-ggchild2", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item-ggchild3", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item3", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item-child3", checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);
    });
    
    it('should be able to clear all enabled items outside of TreeView', () => {
      const disabledItemId = 'item-ggchild1';

      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            { itemId: disabledItemId, checkedStatus: IndeterminateCheckboxStatus.checked },
            { itemId: 'item-ggchild2', checkedStatus: IndeterminateCheckboxStatus.checked }
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-child2.1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-gchild2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: "item-ggchild1", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item-ggchild2", checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);
      
      userEvent.click(getByTestId('clear-all'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-child2.1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-gchild2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-ggchild1', checkedStatus: IndeterminateCheckboxStatus.checked }

      ]);
    });

    it('should not unselect root parent if it initially selected and disabled during clear all', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            { itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.checked },
            { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.checked, isDisabled: true },
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: "item0", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item1", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item-child1", checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);

      userEvent.click(getByTestId('clear-all'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: "item1", checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: "item-child1", checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);
    });
    
    it('should be able to unselect enabled item outside of TreeView', () => {
      const disabledItemId = 'item-ggchild1';
  
      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            { itemId: disabledItemId, checkedStatus: IndeterminateCheckboxStatus.checked },
            { itemId: 'item-ggchild2', checkedStatus: IndeterminateCheckboxStatus.checked }
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-child2.1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-gchild2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-ggchild1', checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: 'item-ggchild2', checkedStatus: IndeterminateCheckboxStatus.checked }
      ]);

      userEvent.click(getByTestId(`${disabledItemId}-tag`));
      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      
      userEvent.click(getByTestId('item-ggchild2-tag'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-child2.1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-gchild2', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
        { itemId: 'item-ggchild1', checkedStatus: IndeterminateCheckboxStatus.checked }
      ]);
    });
  });

  describe('toggle expanded items', () => {
    it('when selectable is TreeViewSelectable.off should expand/collapse nested items', () => {
      const { getByTestId, queryByTestId } = render(
        getTreeItemsMultiLevel({ selectable: TreeViewSelectable.off })
      );

      userEvent.tab();

      const item2 = getByTestId('item2');

      expect(item2).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(getByTestId('item2-expand'));

      expect(item2).toHaveAttribute('aria-expanded', 'true');

      const item2Child1 = getByTestId('item-child2.1');
      expect(item2Child1).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(getByTestId('item-child2.1-expand'));
      expect(item2Child1).toHaveAttribute('aria-expanded', 'true');

      userEvent.click(getByTestId('item-child2.1-expand'));
      expect(item2Child1).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(getByTestId('item2-expand'));
      expect(item2).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('tree validity', () => {
    it('when a TreeView is passed as a child, the tree item is expandable', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <TreeItem
              label="Child 1"
              itemId="item-child1"
              testId="item-child1"
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId('item1-expand')).toBeInTheDocument();
    });

    it('when multiple TreeViews are passed as a child, the tree item is expandable', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <TreeItem
              label="Child 1"
              itemId="item-child1"
              testId="item-child1"
            />
            <TreeItem
              label="Child 2"
              itemId="item-child2"
              testId="item-child2"
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId('item1-expand')).toBeInTheDocument();
    });

    it('when multiple TreeViews with nested children are passed as a child, the tree items are expandable', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <TreeItem
              label="Child 1"
              itemId="item-child1"
              testId="item-child1"
            />
            <TreeItem label="Child 2" itemId="item-child2" testId="item-child2">
              <TreeItem
                label="Child 2.1"
                itemId="item-child2.1"
                testId="item-child2.1"
              >
                <TreeItem
                  label="Child 2.1.1"
                  itemId="item-child2.1.1"
                  testId="item-child2.1.1"
                />
              </TreeItem>
            </TreeItem>
            <TreeItem label="Child 3" itemId="item-child3" testId="item-child3">
              <TreeItem
                label="Child 3.1"
                itemId="item-child3.1"
                testId="item-child3.1"
              />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId('item1-expand')).toBeInTheDocument();
      userEvent.click(getByTestId('item1-expand'));
      expect(getByTestId('item-child2-expand')).toBeInTheDocument();
      userEvent.click(getByTestId('item-child2-expand'));
      expect(getByTestId('item-child2.1-expand')).toBeInTheDocument();
      expect(getByTestId('item-child3-expand')).toBeInTheDocument();
    });

    it('when multiple TreeViews are passed as a child and at least one is valid, the tree item is expandable', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <TreeItem label="Child 1" itemId="item-child1" testId="item-child1">
              <></>
            </TreeItem>
            <TreeItem label="Child 2" itemId="item-child2" testId="item-child2">
              <TreeItem
                label="Child 2.1"
                itemId="item-child2.1"
                testId="item-child2.1"
              />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId('item1-expand')).toBeInTheDocument();
      userEvent.click(getByTestId('item1-expand'));
      expect(getByTestId('item-child2-expand')).toBeInTheDocument();
    });

    it('when multiple TreeViews are passed as a child and at least one is valid and the other is undefined, the tree item is expandable', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <TreeItem label="Child 1" itemId="item-child1" testId="item-child1">
              {undefined}
            </TreeItem>
            {undefined}
            <TreeItem label="Child 2" itemId="item-child2" testId="item-child2">
              <TreeItem
                label="Child 2.1"
                itemId="item-child2.1"
                testId="item-child2.1"
              />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId('item1-expand')).toBeInTheDocument();
      userEvent.click(getByTestId('item1-expand'));
      expect(getByTestId('item-child2-expand')).toBeInTheDocument();
    });

    it('when a fragment is passed as a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <></>
          </TreeItem>
          <TreeItem label="Node 2" itemId="item2" testId="item2"></TreeItem>
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
      expect(queryByTestId('item2-expand')).not.toBeInTheDocument();
    });

    it('when any other component is passed as a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            <Tag>This is a tag</Tag>
          </TreeItem>
          <TreeItem label="Node 2" itemId="item2" testId="item2">
            <Paragraph>This is a paragraph</Paragraph>
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
      expect(queryByTestId('item2-expand')).not.toBeInTheDocument();
    });

    it('when text is passed as a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            This is sample text
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
    });

    it('when undefined is passed as a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            {undefined}
          </TreeItem>
          <TreeItem label="Node 2" itemId="item2" testId="item2"></TreeItem>
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
      expect(queryByTestId('item2-expand')).not.toBeInTheDocument();
    });

    it('when null is passed as a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1">
            {null}
          </TreeItem>
          <TreeItem label="Node 2" itemId="item2" testId="item2"></TreeItem>
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
      expect(queryByTestId('item2-expand')).not.toBeInTheDocument();
    });

    it('when a TreeView does not have a child, the tree item is not expandable', () => {
      const { queryByTestId } = render(
        <TreeView>
          <TreeItem label="Node 1" itemId="item1" testId="item1" />
        </TreeView>
      );

      expect(queryByTestId('item1-expand')).not.toBeInTheDocument();
    });
  });
});
