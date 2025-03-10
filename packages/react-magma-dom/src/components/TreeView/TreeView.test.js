import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { transparentize } from 'polished';
import { act } from 'react-dom/test-utils';
import { FavoriteIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { Paragraph } from '../Paragraph';
import { Tag } from '../Tag';
import { AccordionTreeWithShowAllAndExpandAll } from './TreeView.stories';

import { TreeView, TreeItem, TreeViewSelectable } from '.';

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
      <TreeItem
        label="Child 1"
        itemId="item-child1"
        testId="item-child1"
        isDisabled
      />
      <TreeItem
        label="Child 2"
        itemId="item-child2"
        testId="item-child2"
        isDisabled
      />
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
    props.onSelectedItemChange(items);
  };

  return (
    <>
      <button
        data-testid="select-all"
        onClick={() => apiRef.current.selectAll()}
      >
        Select all
      </button>
      <button
        data-testid="clear-all"
        onClick={() => apiRef.current.clearAll()}
      />
      {items.map(({ itemId }) => (
        <button
          key={itemId}
          data-testid={`${itemId}-tag`}
          onClick={() =>
            apiRef.current.selectItem({
              itemId,
              checkedStatus: IndeterminateCheckboxStatus.unchecked,
            })
          }
        />
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

const renderTreeItemsRecursively = (treeItems, depth) => {
  return treeItems.map(item => {
    return (
      <TreeItem
        key={item.id}
        itemId={item.id}
        testId={item.id}
        label={item.title}
      >
        {item.children?.length ? (
          renderTreeItemsRecursively(item.children, depth + 1)
        ) : (
          <></>
        )}
      </TreeItem>
    );
  });
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

    it('should work correctly with expandedAll() and collapseAll() functions', async () => {
      const onExpandedChange = jest.fn();
      const apiRef = React.createRef();
      const { getByText } = render(
        <>
          <button onClick={() => apiRef.current.expandAll()}>Expand All</button>
          <button onClick={() => apiRef.current.collapseAll()}>
            Collapse All
          </button>
          {getTreeItemsWithDisabled({
            selectable: TreeViewSelectable.single,
            onExpandedChange,
            apiRef,
          })}
        </>
      );

      const item = getByText('Node 1');

      expect(item).toBeInTheDocument();
      expect(item).toBeVisible();

      expect(getByText('Expand All')).toBeInTheDocument();

      userEvent.click(getByText('Expand All'));

      expect(onExpandedChange).toHaveBeenCalledTimes(1);
      expect(onExpandedChange).toHaveBeenCalledWith({}, ['item1', 'item2']);

      const childItem = getByText('Child 1');

      expect(childItem).toBeInTheDocument();
      expect(childItem).toBeVisible();

      expect(getByText('Collapse All')).toBeInTheDocument();

      userEvent.click(getByText('Collapse All'));

      expect(onExpandedChange).toHaveBeenCalledTimes(2);
      expect(onExpandedChange).toHaveBeenCalledWith({}, []);

      await waitFor(async () => {
        expect(childItem).not.toBeInTheDocument();
        expect(childItem).not.toBeVisible();
      });
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
        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
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
      const { getByTestId } = render(
        getTreeItemsMultiLevel({
          onSelectedItemChange,
          selectable: TreeViewSelectable.multi,
          checkParents: false,
          checkChildren: false,
        })
      );

      userEvent.click(getByTestId('item1-expand'));
      const item1Checkbox = getByTestId('item-child1-checkbox');
      userEvent.click(item1Checkbox);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('sets child state as checked and parent indeterminate if checkParents is true and checkChildren is false', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsMultiLevel({
          onSelectedItemChange,
          selectable: TreeViewSelectable.multi,
          checkParents: true,
          checkChildren: false,
        })
      );

      userEvent.click(getByTestId('item2-expand'));
      userEvent.click(getByTestId('item-child2.1-expand'));
      userEvent.click(getByTestId('item-gchild2-expand'));
      const grandChildCheckbox = getByTestId('item-ggchild1-checkbox');
      userEvent.click(grandChildCheckbox);
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
    });

    it('sets to all children of preselected and checked parent state as checked if checkParents is false and checkChildren is true', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(
        getTreeItemsMultiLevel({
          onSelectedItemChange,
          selectable: TreeViewSelectable.multi,
          checkParents: false,
          checkChildren: true,
          preselectedItems: [
            {
              itemId: 'item-gchild2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ],
        })
      );

      expect(onSelectedItemChange).toHaveBeenCalledWith([
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

      it('should trigger onExpandedChange when expanding/collapsing items with keyboard', () => {
        const onExpandedChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevelSmall({
            onExpandedChange,
            selectable: TreeViewSelectable.single,
          })
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');

        userEvent.tab();
        expect(item0).toHaveFocus();

        // Navigate to item1
        fireEvent.keyDown(item0, { key: 'ArrowDown' });
        expect(item1).toHaveFocus();

        // Expand item1 using ArrowRight
        fireEvent.keyDown(item1, { key: 'ArrowRight' });
        expect(item1).toHaveAttribute('aria-expanded', 'true');
        expect(onExpandedChange).toHaveBeenCalledTimes(1);

        // Collapse item1 using ArrowLeft
        fireEvent.keyDown(item1, { key: 'ArrowLeft' });
        expect(item1).toHaveAttribute('aria-expanded', 'false');
        expect(onExpandedChange).toHaveBeenCalledTimes(2);
      });

      it('should trigger onExpandedChange when using Space and Enter key to toggle expand/collapse', () => {
        const onExpandedChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsOneLevelSmall({
            onExpandedChange,
            selectable: TreeViewSelectable.off,
          })
        );

        const item0 = getByTestId('item0');
        const item1 = getByTestId('item1');
        const item1wrapper = getByTestId('item1-itemwrapper');

        userEvent.tab();
        fireEvent.keyDown(item0, { key: 'ArrowDown' });
        expect(item1).toHaveFocus();

        // Toggle expand with Space key
        fireEvent.keyDown(item1wrapper, { key: ' ' });
        expect(item1).toHaveAttribute('aria-expanded', 'true');
        expect(onExpandedChange).toHaveBeenCalledTimes(1);

        // Toggle collapse with Space key
        fireEvent.keyDown(item1wrapper, { key: ' ' });
        expect(item1).toHaveAttribute('aria-expanded', 'false');
        expect(onExpandedChange).toHaveBeenCalledTimes(2);

        // Toggle expand with Enter key
        fireEvent.keyDown(item1wrapper, { key: 'Enter' });
        expect(item1).toHaveAttribute('aria-expanded', 'true');
        expect(onExpandedChange).toHaveBeenCalledTimes(3);

        // Toggle collapse with Enter key
        fireEvent.keyDown(item1wrapper, { key: 'Enter' });
        expect(item1).toHaveAttribute('aria-expanded', 'false');
        expect(onExpandedChange).toHaveBeenCalledTimes(4);
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
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(item1wrapper, { key: 'Enter' });

          expect(item1).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
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
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
          expect(onSelectedItemChange).toHaveBeenCalledWith([
            {
              itemId: 'item0',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]);

          fireEvent.keyDown(item0wrapper, { key: ' ' });

          expect(item0).toHaveAttribute('aria-selected', 'true');
          expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
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
            preselectedItems: [
              {
                itemId: 'item-child1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            onSelectedItemChange,
          })
        );

        const item1 = getByTestId('item1');

        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
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
            itemId: 'item-child3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child4',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(3);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('parent should have unchecked checkbox state when all disabled children and all enabled children are not selected. parent should have indeterminate checkbox state when all disabled children are not selected and some enabled children are selected. parent should have indeterminate checkbox state when all disabled children are not selected and all enabled children are selected. and toggle children selection', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            onSelectedItemChange,
          })
        );

        const item1 = getByTestId('item1');

        expect(item1).toHaveAttribute('aria-checked', 'false');

        expect(onSelectedItemChange).not.toHaveBeenCalled();

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-child3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child4',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'false');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
        expect(onSelectedItemChange).toHaveBeenCalledWith([]);
      });

      it('parent should have checked checkbox state when all disabled children are selected and all enabled children are selected. parent should have indeterminate checkbox state when all disabled children are selected and enabled children are partially selected. parent should have indeterminate checkbox state when all disabled children are selected and all enabled children are not selected. and toggle children selection', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              {
                itemId: 'item-child1',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item-child2',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item-child3',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
              {
                itemId: 'item-child4',
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ],
            onSelectedItemChange,
          })
        );

        const item1 = getByTestId('item1');

        expect(item1).toHaveAttribute('aria-checked', 'true');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child4',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'mixed');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
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
            itemId: 'item-child2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);

        userEvent.click(getByTestId('item1-checkbox'));
        expect(item1).toHaveAttribute('aria-checked', 'true');

        expect(onSelectedItemChange).toHaveBeenCalledTimes(3);
        expect(onSelectedItemChange).toHaveBeenCalledWith([
          {
            itemId: 'item1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child3',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item-child4',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]);
      });

      it('an item can be selected and disabled through preselectedItems', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              {
                itemId: 'item-child1',
                checkedStatus: IndeterminateCheckboxStatus.unchecked,
                isDisabled: false,
              },
              {
                itemId: 'item-child2',
                checkedStatus: IndeterminateCheckboxStatus.unchecked,
                isDisabled: false,
              },
              {
                itemId: 'item-child3',
                checkedStatus: IndeterminateCheckboxStatus.checked,
                isDisabled: true,
              },
            ],
            initialExpandedItems: ['item1'],
            onSelectedItemChange,
          })
        );

        expect(getByTestId('item-child1-checkbox')).not.toHaveAttribute(
          'disabled'
        );
        expect(getByTestId('item-child2-checkbox')).not.toHaveAttribute(
          'disabled'
        );
        expect(getByTestId('item-child3-checkbox')).toHaveAttribute('disabled');
        expect(getByTestId('item-child3-label')).toHaveStyleRule(
          'color',
          transparentize(0.6, magma.colors.neutral500)
        );
        expect(getByTestId('item-child4-checkbox')).not.toHaveAttribute(
          'disabled'
        );
      });

      it('should disable all items if "isDisabled" prop set to true on TreeView', () => {
        const onSelectedItemChange = jest.fn();
        const { getByTestId, debug } = render(
          getTreeItemsWithDisabledChildren({
            isDisabled: true,
            selectable: TreeViewSelectable.multi,
            preselectedItems: [
              {
                itemId: 'item-child1',
                checkedStatus: IndeterminateCheckboxStatus.unchecked,
                isDisabled: false,
              },
              {
                itemId: 'item-child2',
                checkedStatus: IndeterminateCheckboxStatus.unchecked,
                isDisabled: false,
              },
              {
                itemId: 'item-child3',
                checkedStatus: IndeterminateCheckboxStatus.unchecked,
                isDisabled: true,
              },
            ],
            initialExpandedItems: ['item1'],
            onSelectedItemChange,
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
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
        />
      );

      expect(onSelectedItemChange).not.toHaveBeenCalled();

      userEvent.click(getByTestId('select-all'));

      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item0',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
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
          itemId: 'item-ggchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-ggchild3',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item3',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-child3',
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
            {
              itemId: 'item1',
              checkedStatus: IndeterminateCheckboxStatus.unchecked,
              isDisabled: true,
            },
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(0);

      userEvent.click(getByTestId('select-all'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.checked },
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
          itemId: 'item-ggchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-ggchild3',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        { itemId: 'item3', checkedStatus: IndeterminateCheckboxStatus.checked },
        {
          itemId: 'item-child3',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('should be able to clear all enabled items outside of TreeView', () => {
      const disabledItemId = 'item-ggchild1';

      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: disabledItemId,
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-ggchild2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
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
          itemId: 'item-ggchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);

      userEvent.click(getByTestId('clear-all'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
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
    });

    it('should not unselect root parent if it initially selected and disabled during clear all', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, debug } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: 'item0',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
              isDisabled: true,
            },
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.checked },
        { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.checked },
        {
          itemId: 'item-child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);

      userEvent.click(getByTestId('clear-all'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        { itemId: 'item1', checkedStatus: IndeterminateCheckboxStatus.checked },
        {
          itemId: 'item-child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('should be able to unselect enabled item outside of TreeView', () => {
      const disabledItemId = 'item-ggchild1';

      const onSelectedItemChange = jest.fn();
      const { getByTestId } = render(
        <TreeItemsMultiLevelControlledOutside
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: disabledItemId,
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'item-ggchild2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        />
      );

      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
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
          itemId: 'item-ggchild2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);

      userEvent.click(getByTestId(`${disabledItemId}-tag`));
      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);

      userEvent.click(getByTestId('item-ggchild2-tag'));

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
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
          <TreeItem label="Node 2" itemId="item2" testId="item2" />
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
          <TreeItem label="Node 2" itemId="item2" testId="item2" />
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
          <TreeItem label="Node 2" itemId="item2" testId="item2" />
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

  describe('recursive children', () => {
    const recursiveTreeItems = [
      {
        id: 'discipline-arts-design',
        title: 'Arts and Design',
        children: [
          {
            id: 'ad-1',
            title: 'Animation',
            children: [],
          },
          {
            id: 'ad-2',
            title: 'Photography',
            children: [
              {
                id: 'ad-2-child1',
                title: 'Wedding',
                children: [],
              },
              {
                id: 'ad-2-child2',
                title: 'Nature',
                children: [
                  {
                    id: 'ad-2-child2-child1',
                    title: 'Pet',
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'ad-3',
            title: 'Web Design',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-geography',
        title: 'Geography',
        children: [],
      },
      {
        id: 'discipline-nutr',
        title: 'Nutrition',
        children: [
          {
            id: 'nutr-1',
            title: 'Community Nutrition',
            children: [],
          },
          {
            id: 'nutr-2',
            title: 'Sports Nutrition',
            children: [
              {
                id: 'nutr-2-child1',
                title: 'Protein',
                children: [],
              },
              {
                id: 'nutr-2-child2',
                title: 'Supplements',
                children: [
                  {
                    id: 'nutr-2-child2-child1',
                    title: 'Creatine',
                    children: [
                      {
                        id: 'nutr-2-child2-child1-child1',
                        title: 'Is it safe?',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    it('can render recursively created children', () => {
      const { getByTestId } = render(
        <TreeView>{renderTreeItemsRecursively(recursiveTreeItems, 0)}</TreeView>
      );

      expect(getByTestId('discipline-arts-design')).toBeInTheDocument();
      expect(getByTestId('discipline-geography')).toBeInTheDocument();
      expect(getByTestId('discipline-nutr')).toBeInTheDocument();

      userEvent.click(getByTestId('discipline-arts-design-expand'));
      expect(getByTestId('ad-1')).toBeInTheDocument();
      expect(getByTestId('ad-2')).toBeInTheDocument();
      expect(getByTestId('ad-3')).toBeInTheDocument();
      userEvent.click(getByTestId('ad-2-expand'));
      expect(getByTestId('ad-2-child1')).toBeInTheDocument();
      expect(getByTestId('ad-2-child2')).toBeInTheDocument();
      userEvent.click(getByTestId('ad-2-child2-expand'));
      expect(getByTestId('ad-2-child2-child1')).toBeInTheDocument();

      userEvent.click(getByTestId('discipline-nutr-expand'));
      expect(getByTestId('nutr-1')).toBeInTheDocument();
      expect(getByTestId('nutr-2')).toBeInTheDocument();
      userEvent.click(getByTestId('nutr-2-expand'));
      expect(getByTestId('nutr-2-child1')).toBeInTheDocument();
      expect(getByTestId('nutr-2-child2')).toBeInTheDocument();
      userEvent.click(getByTestId('nutr-2-child2-expand'));
      expect(getByTestId('nutr-2-child2-child1')).toBeInTheDocument();
      userEvent.click(getByTestId('nutr-2-child2-child1-expand'));
      expect(getByTestId('nutr-2-child2-child1-child1')).toBeInTheDocument();
    });

    it('can render recursively created children with preselected items', () => {
      const { getByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          preselectedItems={[
            {
              itemId: 'ad-1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
            {
              itemId: 'discipline-geography',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        >
          {renderTreeItemsRecursively(recursiveTreeItems, 0)}
        </TreeView>
      );

      expect(getByTestId('discipline-arts-design')).toBeInTheDocument();
      expect(getByTestId('discipline-geography')).toBeInTheDocument();
      expect(getByTestId('discipline-nutr')).toBeInTheDocument();
      expect(getByTestId('discipline-geography')).toHaveAttribute(
        'aria-checked',
        'true'
      );

      userEvent.click(getByTestId('discipline-arts-design-expand'));
      expect(getByTestId('ad-1')).toBeInTheDocument();
      expect(getByTestId('ad-2')).toBeInTheDocument();
      expect(getByTestId('ad-3')).toBeInTheDocument();
      userEvent.click(getByTestId('ad-2-expand'));
      expect(getByTestId('ad-2-child1')).toBeInTheDocument();
      expect(getByTestId('ad-2-child2')).toBeInTheDocument();
      userEvent.click(getByTestId('ad-2-child2-expand'));
      expect(getByTestId('ad-2-child2-child1')).toBeInTheDocument();
      expect(getByTestId('discipline-arts-design')).toHaveAttribute(
        'aria-checked',
        'mixed'
      );
      expect(getByTestId('ad-1')).toHaveAttribute('aria-checked', 'true');
    });

    it('can select and deselect recursively created children', () => {
      const { getByTestId } = render(
        <TreeView selectable={TreeViewSelectable.multi} preselectedItems={[]}>
          {renderTreeItemsRecursively(recursiveTreeItems, 0)}
        </TreeView>
      );

      expect(getByTestId('discipline-arts-design')).toBeInTheDocument();
      expect(getByTestId('discipline-geography')).toBeInTheDocument();
      expect(getByTestId('discipline-nutr')).toBeInTheDocument();

      userEvent.click(getByTestId('discipline-nutr-expand'));
      expect(getByTestId('nutr-1')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('nutr-2')).toHaveAttribute('aria-checked', 'false');

      userEvent.click(getByTestId('nutr-2-expand'));
      expect(getByTestId('nutr-2-child1')).toBeInTheDocument();
      expect(getByTestId('nutr-2-child2')).toBeInTheDocument();

      userEvent.click(getByTestId('nutr-2-child2-expand'));
      userEvent.click(getByTestId('nutr-2-child2-checkbox'));
      expect(getByTestId('nutr-2-child2')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('nutr-2-child2-child1')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      userEvent.click(getByTestId('nutr-2-child2-child1-expand'));
      expect(getByTestId('nutr-2-child2-child1-child1')).toHaveAttribute(
        'aria-checked',
        'true'
      );

      expect(getByTestId('nutr-2')).toHaveAttribute('aria-checked', 'mixed');
      expect(getByTestId('discipline-nutr')).toHaveAttribute(
        'aria-checked',
        'mixed'
      );
      userEvent.click(getByTestId('nutr-2-child1-checkbox'));
      expect(getByTestId('nutr-2')).toHaveAttribute('aria-checked', 'true');
      userEvent.click(getByTestId('nutr-2-child2-child1-child1-checkbox'));
      expect(getByTestId('nutr-2-child1')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('nutr-2-child2')).toHaveAttribute(
        'aria-checked',
        'false'
      );
    });
  });

  describe('tree with hidden items', () => {
    const propsFlatTree = {
      title: 'Chapter/Subchapter',
      trees: [
        {
          id: 'tree-id',
          groupName: 'book-table-of-contents',
          items: [
            {
              id: 'item-id-1',
              title: 'item-title-1',
              children: [],
            },
            {
              id: 'item-id-2',
              title: 'item-title-2',
              children: [],
            },
            {
              id: 'item-id-3',
              title: 'item-title-3',
              children: [
                {
                  id: 'item-id-3.1',
                  title: 'item-title-3.1',
                  children: [],
                },
              ],
            },
            {
              id: 'item-id-4',
              title: 'item-title-4',
              children: [
                {
                  id: 'item-id-4.1',
                  title: 'item-title-4.1',
                  children: [],
                },
              ],
            },
            {
              id: 'item-id-5',
              title: 'item-title-5',
              children: [
                {
                  id: 'item-id-5.1',
                  title: 'item-title-5.1',
                  children: [],
                },
                {
                  id: 'item-id-5.2',
                  title: 'item-title-5.2',
                  children: [],
                },
              ],
            },
            {
              id: 'item-id-6',
              title: 'item-title-6',
              children: [],
            },
          ],
          preselectedItems: [
            {
              itemId: 'item-id-2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ],
        },
      ],
      keyForRerenderOfTagsTree: true,
    };

    const propsTreeWithParent = {
      title: 'Chapter/Subchapter',
      trees: [
        {
          id: 'tree-id',
          groupName: 'book-table-of-contents',
          items: [
            {
              id: 'item-id-1',
              title: 'item-title-1',
              children: [],
            },
            {
              id: 'item-id-2',
              title: 'item-title-2',
              children: [],
            },
            {
              id: 'item-id-3',
              title: 'item-title-3',
              children: [],
            },
            {
              id: 'item-id-4',
              title: 'item-title-4',
              children: [],
            },
            {
              id: 'item-id-5',
              title: 'item-title-5',
              children: [
                {
                  id: 'item-id-6',
                  title: 'item-title-6',
                  children: [],
                },
              ],
            },
            {
              id: 'item-id-7',
              title: 'item-title-7',
              children: [
                {
                  id: 'item-id-8',
                  title: 'item-title-8',
                  children: [],
                },
                {
                  id: 'item-id-9',
                  title: 'item-title-9',
                  children: [
                    {
                      id: 'item-id-10',
                      title: 'item-title-10',
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
          preselectedItems: [
            {
              itemId: 'item-id-2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ],
        },
      ],
      keyForRerenderOfTagsTree: true,
    };

    it('renders tree with some items, and clicking show all displays the rest of the tree', () => {
      const onSelectedItemChange = jest.fn();
      const { asFragment, getByLabelText, getByTestId } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      userEvent.click(getByTestId('showAllBtn'));
      expect(getByLabelText('item-title-6')).toBeInTheDocument();
      userEvent.click(getByLabelText('item-title-6'));
      expect(getByTestId('item-id-6')).toHaveAttribute('aria-checked', 'true');
      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
    });

    it('renders tree with some items preselected, clicking show all displays the rest of the tree and preselected items remain selected', () => {
      const onSelectedItemChange = jest.fn();
      const { asFragment, getByLabelText, getByTestId } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: 'item-id-2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'true');
      userEvent.click(getByTestId('showAllBtn'));
      expect(getByLabelText('item-title-6')).toBeInTheDocument();
      userEvent.click(getByLabelText('item-title-6'));
      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'true');
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-id-2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-id-6',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('renders tree with some items preselected, deselecting preselected items, clicking show all displays the rest of the tree and preselected items remain deselected', () => {
      const onSelectedItemChange = jest.fn();
      const { asFragment, getByLabelText, getByTestId } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: 'item-id-2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'true');
      userEvent.click(getByLabelText('item-title-2'));
      userEvent.click(getByTestId('showAllBtn'));
      expect(getByLabelText('item-title-6')).toBeInTheDocument();
      userEvent.click(getByLabelText('item-title-6'));
      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'false');
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-id-6',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('clicking show all displays the rest of the tree, preselected items remain selected, and clicking show less maintains selected items', () => {
      const onSelectedItemChange = jest.fn();
      const { asFragment, getByLabelText, getByTestId } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[
            {
              itemId: 'item-id-2',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'true');
      userEvent.click(getByTestId('showAllBtn'));
      expect(getByLabelText('item-title-6')).toBeInTheDocument();
      userEvent.click(getByLabelText('item-title-6'));
      expect(getByTestId('item-id-2')).toHaveAttribute('aria-checked', 'true');
      userEvent.click(getByTestId('showAllBtn'));
      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'item-id-2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
        {
          itemId: 'item-id-6',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('can uncheck all items by clicking on the parent (including hidden one)', () => {
      const onSelectedItemChange = jest.fn();
      const { asFragment, getByLabelText, getByTestId } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsTreeWithParent}
          onSelectedItemChange={onSelectedItemChange}
          preselectedItems={[]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      userEvent.click(getByTestId('showAllBtn'));
      expect(getByLabelText('item-title-7')).toBeInTheDocument();

      userEvent.click(getByLabelText('item-title-7'));
      userEvent.click(getByTestId('item-id-7-expand'));
      expect(getByTestId('item-id-8')).toHaveAttribute('aria-checked', 'true');
      expect(getByTestId('item-id-9')).toHaveAttribute('aria-checked', 'true');

      userEvent.click(getByLabelText('item-title-7'));
      expect(getByTestId('item-id-8')).toHaveAttribute('aria-checked', 'false');
      expect(getByTestId('item-id-9')).toHaveAttribute('aria-checked', 'false');

      userEvent.click(getByTestId('item-id-9-expand'));
      userEvent.click(getByLabelText('item-title-10'));
      expect(getByTestId('item-id-10')).toHaveAttribute('aria-checked', 'true');
      expect(getByTestId('item-id-9')).toHaveAttribute('aria-checked', 'true');
      expect(getByTestId('item-id-7')).toHaveAttribute('aria-checked', 'mixed');

      userEvent.click(getByTestId('showAllBtn')); // show less
      expect(onSelectedItemChange).toHaveBeenCalledTimes(3);
    });

    it('expand all and collapse all should work as expected', async () => {
      const { asFragment, getByLabelText, getByText } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          preselectedItems={[]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      userEvent.click(getByText('Expand All'));

      let expandedItem = null;

      await waitFor(() => {
        expect(getByLabelText('item-title-6')).toBeInTheDocument();

        expandedItem = getByLabelText('item-title-4.1');

        expect(expandedItem).not.toBeNull();
        expect(expandedItem).toBeInTheDocument();
      });

      userEvent.click(getByText('Collapse All'));

      await waitFor(() => {
        expect(expandedItem).not.toBeNull();
        expect(expandedItem).not.toBeInTheDocument();
      });
    });

    it('expand all should work correctly with disabled items', async () => {
      const { asFragment, getByLabelText, getByText } = render(
        <AccordionTreeWithShowAllAndExpandAll
          {...propsFlatTree}
          preselectedItems={[]}
        />
      );

      expect(asFragment()).toMatchSnapshot();

      expect(getByLabelText('item-title-1')).toBeInTheDocument();
      expect(getByLabelText('item-title-2')).toBeInTheDocument();
      expect(getByLabelText('item-title-3')).toBeInTheDocument();
      expect(getByLabelText('item-title-4')).toBeInTheDocument();
      expect(getByLabelText('item-title-5')).toBeInTheDocument();

      expect(getByLabelText('item-title-3')).toBeDisabled();

      userEvent.click(getByText('Expand All'));

      await waitFor(() => {
        expect(getByLabelText('item-title-6')).toBeInTheDocument();
        expect(getByLabelText('item-title-3.1')).toBeInTheDocument();
        expect(getByLabelText('item-title-5.1')).toBeInTheDocument();
        expect(getByLabelText('item-title-3.1')).toBeVisible();
        expect(getByLabelText('item-title-5.1')).toBeVisible();
        expect(getByLabelText('item-title-3.1')).toBeDisabled();
        expect(getByLabelText('item-title-5.1')).toBeDisabled();
      });
    });
  });

  describe('TreeView isTopLevelSelectable', () => {
    it('should not select top-level items when isTopLevelSelectable is false and selectable is TreeViewSelectable.multi', () => {
      const apiRef = React.createRef();
      const { getByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          apiRef={apiRef}
          initialExpandedItems={['parent1', 'parent2']} // ensure children are in the DOM
        >
          <TreeItem label="Parent 1" itemId="parent1">
            <TreeItem label="Child 1" itemId="child1" />
          </TreeItem>
          <TreeItem label="Parent 2" itemId="parent2">
            <TreeItem label="Child 2" itemId="child2" />
          </TreeItem>
        </TreeView>
      );

      act(() => {
        apiRef.current.selectAll();
      });

      expect(() => getByTestId('parent1-checkbox')).toThrow();
      expect(() => getByTestId('parent2-checkbox')).toThrow();
      expect(getByTestId('child1-checkbox')).toBeChecked();
      expect(getByTestId('child2-checkbox')).toBeChecked();
    });

    it('should not render checkboxes for top-level parent items when isTopLevelSelectable is false', () => {
      const { queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
        >
          <TreeItem label="Parent 1" itemId="parent1">
            <TreeItem label="Child 1" itemId="child1" />
          </TreeItem>
          <TreeItem label="Parent 2" itemId="parent2">
            <TreeItem label="Child 2" itemId="child2" />
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('parent1-checkbox')).toBeNull();
      expect(queryByTestId('parent2-checkbox')).toBeNull();

      // expand parents to verify children are rendered
      userEvent.click(queryByTestId('parent1-expand'));
      userEvent.click(queryByTestId('parent2-expand'));

      // child checkboxes should exist
      expect(queryByTestId('child1-checkbox')).toBeInTheDocument();
      expect(queryByTestId('child2-checkbox')).toBeInTheDocument();
    });

    it('should not render checkboxes for top-level items when one is a parent and one is a leaf', () => {
      const { queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
        >
          <TreeItem label="Parent 1" itemId="parent1">
            <TreeItem label="Child 1" itemId="child1" />
          </TreeItem>
          <TreeItem label="Leaf 1" itemId="leaf1" />
        </TreeView>
      );

      expect(queryByTestId('parent1-checkbox')).toBeNull();

      // expand only the parent to see its children
      userEvent.click(queryByTestId('parent1-expand'));

      expect(queryByTestId('leaf1-checkbox')).toBeNull();
      expect(queryByTestId('child1-checkbox')).toBeInTheDocument();
    });

    it('should not render checkboxes for top-level items when both are leaves', () => {
      const { queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
        >
          <TreeItem label="Leaf 1" itemId="leaf1" />
          <TreeItem label="Leaf 2" itemId="leaf2" />
        </TreeView>
      );

      expect(queryByTestId('leaf1-checkbox')).toBeNull();
      expect(queryByTestId('leaf2-checkbox')).toBeNull();
    });

    it('should not update top-level parent state when children are selected (parent remains non-selectable)', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          onSelectedItemChange={onSelectedItemChange}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('parent1-checkbox')).toBeNull();
      userEvent.click(getByTestId('child1-checkbox'));
      expect(getByTestId('child1')).toHaveAttribute('aria-checked', 'true');
      expect(getByTestId('parent1')).not.toHaveAttribute('aria-checked');
    });

    it('should not set parent to indeterminate even if some children are selected', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          onSelectedItemChange={onSelectedItemChange}
          initialExpandedItems={['parent1']}
          checkParents
          checkChildren
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
            <TreeItem label="Child 2" itemId="child2" testId="child2" />
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('parent1-checkbox')).toBeNull();

      userEvent.click(getByTestId('child1-checkbox'));
      expect(getByTestId('child1')).toHaveAttribute('aria-checked', 'true');
      expect(getByTestId('child2')).toHaveAttribute('aria-checked', 'false');

      expect(getByTestId('parent1')).not.toHaveAttribute('aria-checked');
    });

    it('should expand/collapse on top-level parent using Space or Enter but never select it when isTopLevelSelectable is false', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          onSelectedItemChange={onSelectedItemChange}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      userEvent.tab();
      expect(getByTestId('parent1')).toHaveFocus();

      fireEvent.keyDown(getByTestId('parent1-itemwrapper'), { key: ' ' });
      expect(getByTestId('parent1')).toHaveAttribute('aria-expanded', 'true');
      expect(onSelectedItemChange).not.toHaveBeenCalled();
      expect(queryByTestId('parent1-checkbox')).toBeNull();
      expect(getByTestId('parent1')).not.toHaveAttribute('aria-checked');

      fireEvent.keyDown(getByTestId('parent1-itemwrapper'), { key: ' ' });
      expect(getByTestId('parent1')).toHaveAttribute('aria-expanded', 'false');
      expect(onSelectedItemChange).not.toHaveBeenCalled();
      expect(getByTestId('parent1')).not.toHaveAttribute('aria-checked');
    });

    it('preselected top-level parent should not be selected when isTopLevelSelectable is false', () => {
      const { getByTestId, queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          preselectedItems={['parent1']}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      expect(queryByTestId('parent1-checkbox')).toBeNull();
      expect(getByTestId('child1-checkbox')).toBeInTheDocument();
    });

    it('selectAll should not select top-level parent when isTopLevelSelectable is false', () => {
      const apiRef = React.createRef();
      const onSelectedItemChange = jest.fn();

      render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          apiRef={apiRef}
          initialExpandedItems={['parent1']}
          onSelectedItemChange={onSelectedItemChange}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      act(() => {
        apiRef.current.selectAll();
      });

      expect(onSelectedItemChange).toHaveBeenCalledWith([
        {
          itemId: 'child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);
    });

    it('should allow selection of a top-level item in single-select mode when isTopLevelSelectable is false', () => {
      const { getByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.single}
          isTopLevelSelectable={false}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      // In single-select mode, clicking the label should select the item.
      userEvent.click(getByTestId('parent1-label'));
      expect(getByTestId('parent1')).toHaveAttribute('aria-selected', 'true');
    });

    it('should allow selection of a top-level item in single-select mode even when isTopLevelSelectable is true', () => {
      const { getByTestId } = render(
        <TreeView selectable={TreeViewSelectable.single} isTopLevelSelectable>
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      // With isTopLevelSelectable true the top-level item should be selectable.
      userEvent.click(getByTestId('parent1-label'));
      expect(getByTestId('parent1')).toHaveAttribute('aria-selected', 'true');
    });

    it('should allow selectAll to select top-level items when isTopLevelSelectable is true', () => {
      const apiRef = React.createRef();
      const { getByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable
          apiRef={apiRef}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      act(() => {
        apiRef.current.selectAll();
      });
      expect(getByTestId('parent1-checkbox')).toBeChecked();
      expect(getByTestId('child1-checkbox')).toBeChecked();
    });

    it('should ignore isTopLevelSelectable when selectable is off', () => {
      const { queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.off}
          isTopLevelSelectable={false}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );
      // When selection is off no checkboxes should be rendered.
      expect(queryByTestId('parent1-checkbox')).toBeNull();
      expect(queryByTestId('child1-checkbox')).toBeNull();
    });

    it('should not update a top-level parent state when its child is selected, if isTopLevelSelectable is false (even with checkChildren=true)', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          checkChildren
          onSelectedItemChange={onSelectedItemChange}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );

      // No checkbox for parent should be rendered.
      expect(queryByTestId('parent1-checkbox')).toBeNull();

      // When clicking the child checkbox the child becomes selected...
      userEvent.click(getByTestId('child1-checkbox'));
      expect(getByTestId('child1')).toHaveAttribute('aria-checked', 'true');
      // ...while the parent remains unaffected.
      expect(getByTestId('parent1')).not.toHaveAttribute('aria-checked');
    });

    it('should update dynamically to render top-level checkboxes when isTopLevelSelectable changes from false to true', () => {
      const { queryByTestId, rerender } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );
      // Initially, no top-level checkbox is rendered.
      expect(queryByTestId('parent1-checkbox')).toBeNull();

      // Rerender with isTopLevelSelectable true.
      rerender(
        <TreeView selectable={TreeViewSelectable.multi} isTopLevelSelectable>
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );
      expect(queryByTestId('parent1-checkbox')).toBeInTheDocument();
    });

    it('should ignore a preselected top-level item when isTopLevelSelectable is false', () => {
      const { queryByTestId } = render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          preselectedItems={['parent1']}
          initialExpandedItems={['parent1']}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
          </TreeItem>
        </TreeView>
      );
      // Even though "parent1" is in preselectedItems, its checkbox isn’t rendered.
      expect(queryByTestId('parent1-checkbox')).toBeNull();
      // The child is rendered and remains unselected unless explicitly chosen.
      expect(queryByTestId('child1-checkbox')).toBeInTheDocument();
    });

    it('when false, selecting a child should still update intermediate parent states', () => {
      const onSelectedItemChange = jest.fn();
      const { getByTestId, queryByTestId } = render(
        getTreeItemsMultiLevel({
          selectable: TreeViewSelectable.multi,
          isTopLevelSelectable: false,
          onSelectedItemChange,
          checkParents: true,
        })
      );

      // Expand nodes to reveal nested structure
      userEvent.click(getByTestId('item2-expand'));
      userEvent.click(getByTestId('item-child2.1-expand'));
      userEvent.click(getByTestId('item-gchild2-expand'));

      // Select a deeply nested item
      userEvent.click(getByTestId('item-ggchild2-checkbox'));

      // Non-top-level parents should show indeterminate state
      expect(getByTestId('item-gchild2')).toHaveAttribute(
        'aria-checked',
        'mixed'
      );
      expect(getByTestId('item-child2.1')).toHaveAttribute(
        'aria-checked',
        'mixed'
      );

      // Top-level parent should remain unchecked
      expect(queryByTestId('item2-checkbox')).toBeNull();

      // Verify the selection payload
      expect(onSelectedItemChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          {
            itemId: 'item-child2.1',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-gchild2',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'item-ggchild2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ])
      );

      // Top level should not be in the selection payload
      const selections = onSelectedItemChange.mock.calls[0][0];
      const hasTopLevelSelected = selections.some(
        item => item.itemId === 'item2'
      );
      expect(hasTopLevelSelected).toBe(false);
    });

    it('when false, selecting non-top-level parent should still update all its children', () => {
      const { getByTestId, queryByTestId } = render(
        getTreeItemsMultiLevel({
          selectable: TreeViewSelectable.multi,
          isTopLevelSelectable: false,
          checkChildren: true,
        })
      );

      // Expand nodes to reveal nested structure
      userEvent.click(getByTestId('item2-expand'));
      userEvent.click(getByTestId('item-child2.1-expand'));

      // Select a mid-level parent
      userEvent.click(getByTestId('item-child2.1-checkbox'));

      // Parent should be checked
      expect(getByTestId('item-child2.1')).toHaveAttribute(
        'aria-checked',
        'true'
      );

      // Expand to see children
      userEvent.click(getByTestId('item-gchild2-expand'));

      // All children should be checked
      expect(getByTestId('item-gchild2')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('item-ggchild1')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('item-ggchild2')).toHaveAttribute(
        'aria-checked',
        'true'
      );
      expect(getByTestId('item-ggchild3')).toHaveAttribute(
        'aria-checked',
        'true'
      );

      // Top-level parent should remain unchecked
      expect(queryByTestId('item2-checkbox')).toBeNull();
    });

    it('should not have indeterminate state in internal selections when isTopLevelSelectable is false with preselected items', () => {
      const apiRef = React.createRef();
      const onSelectedItemChange = jest.fn();

      render(
        <TreeView
          selectable={TreeViewSelectable.multi}
          isTopLevelSelectable={false}
          checkParents
          checkChildren
          apiRef={apiRef}
          onSelectedItemChange={onSelectedItemChange}
          initialExpandedItems={['parent1']}
          preselectedItems={[
            // This preselected top-level item should be ignored
            {
              itemId: 'parent1',
              checkedStatus: IndeterminateCheckboxStatus.indeterminate,
            },
            // This child should be selected
            {
              itemId: 'child1',
              checkedStatus: IndeterminateCheckboxStatus.checked,
            },
          ]}
        >
          <TreeItem label="Parent 1" itemId="parent1" testId="parent1">
            <TreeItem label="Child 1" itemId="child1" testId="child1" />
            <TreeItem label="Child 2" itemId="child2" testId="child2" />
          </TreeItem>
        </TreeView>
      );

      // Verify the UI state
      expect(document.querySelector('[aria-checked="mixed"]')).toBeNull();

      // The crucial part: verify the internal selection state via callback
      expect(onSelectedItemChange).toHaveBeenCalledTimes(1);
      const selection = onSelectedItemChange.mock.calls[0][0];

      // Selection should ONLY contain the child, not the parent
      expect(selection).toEqual([
        {
          itemId: 'child1',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ]);

      // Verify that parent1 was completely removed from selection
      const hasParent = selection.some(item => item.itemId === 'parent1');
      expect(hasParent).toBe(false);

      // Further verify by selecting all items
      act(() => {
        apiRef.current.selectAll();
      });

      expect(onSelectedItemChange).toHaveBeenCalledTimes(2);
      const selectAllSelection = onSelectedItemChange.mock.calls[1][0];

      // After selectAll, should still not contain parent1
      const hasParentAfterSelectAll = selectAllSelection.some(
        item => item.itemId === 'parent1'
      );
      expect(hasParentAfterSelectAll).toBe(false);
    });
  });

  describe('Dynamically updating tree', () => {
    it('should update when children are dynamically rendered inside an empty parent', () => {
      const DynamicChildrenTest = () => {
        const [hasChildren, setHasChildren] = React.useState(false);

        return (
          <>
            <button
              data-testid="add-child-btn"
              onClick={() => setHasChildren(true)}
            >
              Add Child
            </button>
            <TreeView testId="dynamic-tree">
              <TreeItem
                label="Empty Parent"
                itemId="empty-parent"
                testId="empty-parent"
              >
                {hasChildren && (
                  <TreeItem
                    label="Dynamically Added Child"
                    itemId="dynamic-child"
                    testId="dynamic-child"
                  />
                )}
              </TreeItem>
            </TreeView>
          </>
        );
      };

      const { getByTestId, queryByTestId } = render(<DynamicChildrenTest />);

      // Initially, the parent should not have an expand button
      expect(queryByTestId('empty-parent-expand')).not.toBeInTheDocument();

      // Add a child dynamically
      userEvent.click(getByTestId('add-child-btn'));

      // After adding a child, the parent should now have an expand button
      expect(queryByTestId('empty-parent-expand')).toBeInTheDocument();

      // Test expand functionality
      userEvent.click(getByTestId('empty-parent-expand'));
      expect(getByTestId('empty-parent')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByTestId('dynamic-child')).toBeInTheDocument();

      // Test collapse functionality
      userEvent.click(getByTestId('empty-parent-expand'));
      expect(getByTestId('empty-parent')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('Supports dynamically adding children, DynamicArrayTreeTest', () => {
      const DynamicArrayTreeTest = () => {
        const initialTree = [
          {
            id: 1,
            name: 'Parent item empty',
            children: [],
          },
          {
            id: 2,
            name: 'Parent item with children',
            children: [
              {
                id: 21,
                name: 'Child item',
                children: [],
              },
            ],
          },
        ];

        const [tree, updateTree] = React.useState(initialTree);

        const renderItems = items => {
          return items.map(item => {
            return (
              <TreeItem
                key={item.id}
                label={item.name}
                itemId={item.id.toString()}
                testId={`item-${item.id}`}
              >
                {renderItems(item.children)}
              </TreeItem>
            );
          });
        };

        const handleAddChild = () => {
          const newTree = tree.map((item, index) => {
            if (index === 0) {
              return {
                ...item,
                children: [
                  ...item.children,
                  { id: 11, name: 'New child', children: [] },
                ],
              };
            }
            return item;
          });

          updateTree(newTree);
        };

        return (
          <>
            <button data-testid="add-child-btn" onClick={handleAddChild}>
              Add Child
            </button>
            <TreeView testId="dynamic-array-tree">{renderItems(tree)}</TreeView>
          </>
        );
      };

      const { getByTestId, queryByTestId } = render(<DynamicArrayTreeTest />);

      // Initially, the first parent should not have an expand button
      expect(queryByTestId('item-1-expand')).not.toBeInTheDocument();

      // Second parent should have an expand button since it has children
      expect(queryByTestId('item-2-expand')).toBeInTheDocument();

      // Add a child dynamically to the first parent
      userEvent.click(getByTestId('add-child-btn'));

      // After adding a child, the first parent should now have an expand button
      expect(queryByTestId('item-1-expand')).toBeInTheDocument();

      // Test expand functionality
      userEvent.click(getByTestId('item-1-expand'));
      expect(getByTestId('item-1')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item-11')).toBeInTheDocument();

      // Test collapse functionality
      userEvent.click(getByTestId('item-1-expand'));
      expect(getByTestId('item-1')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('TreeView Retains Expanded State', () => {
    it('should maintain expanded state of children when parent is collapsed and re-expanded', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem
            label="Retain Node 1"
            itemId="item1-retain"
            testId="item1-retain"
          >
            <TreeItem
              label="Retain Child 1"
              itemId="item-child1-retain"
              testId="item-child1-retain"
            />
            <TreeItem
              label="Retain Child 2"
              itemId="item-child2-retain"
              testId="item-child2-retain"
            >
              <TreeItem
                label="Retain Grandchild 2"
                itemId="item-gchild2-retain"
                testId="item-gchild2-retain"
              >
                <TreeItem
                  label="Retain Great-grandchild 1"
                  itemId="item-ggchild1-retain"
                  testId="item-ggchild1-retain"
                />
                <TreeItem
                  label="Retain Great-grandchild 2"
                  itemId="item-ggchild2-retain"
                  testId="item-ggchild2-retain"
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      userEvent.click(getByTestId('item1-retain-expand'));
      expect(getByTestId('item1-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );

      userEvent.click(getByTestId('item-child2-retain-expand'));
      expect(getByTestId('item-child2-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByTestId('item-gchild2-retain')).toBeInTheDocument();

      userEvent.click(getByTestId('item-gchild2-retain-expand'));
      expect(getByTestId('item-gchild2-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByTestId('item-ggchild1-retain')).toBeInTheDocument();

      userEvent.click(getByTestId('item1-retain-expand'));
      expect(getByTestId('item1-retain')).toHaveAttribute(
        'aria-expanded',
        'false'
      );

      expect(getByTestId('item-child2-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );

      userEvent.click(getByTestId('item1-retain-expand'));
      expect(getByTestId('item1-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );

      expect(getByTestId('item-child2-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByTestId('item-gchild2-retain')).toBeVisible();

      expect(getByTestId('item-gchild2-retain')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByTestId('item-ggchild1-retain')).toBeVisible();
    });
  });
});
