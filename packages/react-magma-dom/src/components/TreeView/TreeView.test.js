import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import userEvent from '@testing-library/user-event';
import { FavoriteIcon } from 'react-magma-icons';
import { transparentize } from 'polished';

const TEXT = 'Test Text Tree Item';
const testId = 'tree-view';

const getTreeItemsOneLevel = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
    <TreeItem label="Node 2" itemId="item2" testId="item2">
      <TreeItem label="Child 2.1" itemId="item-child2" testId="item-child2" />
      <TreeItem label="Child 2.2" itemId="item-child2.2" testId="item-child2.2" />
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
      <TreeItem label="Child 2" itemId="item-child2" testId="item-child2">
        <TreeItem
          label="Grandchild 2"
          itemId="item-gchild2"
          testId="item-gchild2"
        >
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
      <TreeItem label="Child 2" itemId="item-child2" testId="item-child2" />
    </TreeItem>
  </TreeView>
);

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

    it('when child item is part of the array, that item is expanded', () => {
      const { getByTestId } = render(
        getTreeItemsMultiLevel({
          initialExpandedItems: ['item2', 'item-child2'],
        })
      );

      expect(getByTestId('item1')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item2')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('item3')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('item-child2')).toHaveAttribute(
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

  describe('initialSelectedItems', () => {
    describe('when set to TreeViewSelectable.off,', () => {
      it('and initialSelectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [],
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

      it('and initialSelectedItems is set, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [
              { itemId: 'item2', checkedStatus: 'checked' },
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
      it('and initialSelectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [],
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

      it('and initialSelectedItems is set to one item, that TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [
              { itemId: 'item2', checkedStatus: 'checked' },
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

      it('and initialSelectedItems is set to multiple items, only the first TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [
              { itemId: 'item2', checkedStatus: 'checked' },
              { itemId: 'item0', checkedStatus: 'checked' },
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
      it('and initialSelectedItems is set to empty, no TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [],
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

      it('and initialSelectedItems is set to one item, that TreeItem is selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [
              { itemId: 'item2', checkedStatus: 'checked' },
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
      });

      it('and initialSelectedItems is set to multiple items, all those TreeItems are selected', () => {
        const { getByTestId } = render(
          getTreeItemsOneLevel({
            initialSelectedItems: [
              { itemId: 'item0', checkedStatus: 'checked' },
              { itemId: 'item1', checkedStatus: 'checked' },
              { itemId: 'item2', checkedStatus: 'checked' },
            ],
            initialExpandedItems: ['item1', 'item2'],
            selectable: TreeViewSelectable.multi,
          })
        );

        // TODO
        // expect(getByTestId('item0')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item1')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item-child1')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item2')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item-child2')).toHaveAttribute('aria-checked', 'true');
        expect(getByTestId('item3')).toHaveAttribute('aria-checked', 'false');

        expect(getByTestId('item0')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item1')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item2')).not.toHaveAttribute('aria-selected');
        expect(getByTestId('item3')).not.toHaveAttribute('aria-selected');
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

        userEvent.click(getByTestId('item1-label'));
        expect(onSelectedItemChange).toHaveBeenCalled();
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
          { itemId: 'item0', checkedStatus: 'checked' },
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
          { itemId: 'item2', checkedStatus: 'checked' },
        ]);
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
          { itemId: 'item0', checkedStatus: 'checked' },
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
          { itemId: 'item-child2', checkedStatus: 'checked' },
          { itemId: 'item-gchild2', checkedStatus: 'checked' },
          { itemId: 'item-ggchild2', checkedStatus: 'checked' },
          { itemId: 'item-ggchild3', checkedStatus: 'checked' },
          { itemId: 'item2', checkedStatus: 'checked' },
        ]);
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

  describe.skip('keyboard navigation', () => {
    it('should navigate to the next item and back to the first item when pressing the down arrow', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');
      const item1 = getByTestId('item1');

      fireEvent.focus(item0);
      fireEvent.keyDown(item0, { key: 'ArrowDown' });

      expect(item1).toHaveFocus();

      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      expect(item0).toHaveFocus();
    });

    it('should navigate to the previous item and back to the last item when pressing the up arrow', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');
      const item1 = getByTestId('item1');

      fireEvent.focus(item1);
      fireEvent.keyDown(item1, { key: 'ArrowUp' });

      expect(item0).toHaveFocus();

      fireEvent.keyDown(item0, { key: 'ArrowUp' });
      expect(item1).toHaveFocus();
    });

    it('should expand the focused branch item when pressing the right arrow', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item1 = getByTestId('item1');

      fireEvent.focus(item1);
      fireEvent.keyDown(item1, { key: 'ArrowRight' });

      expect(item1).toHaveFocus();
      expect(item1).toHaveAttribute('aria-expanded', 'true');
    });

    it('should navigate to the next item when focus is on an expanded branch item and when pressing the right arrow', () => {
      const { getByTestId } = render(
        getTreeItemsOneLevelSmall({ initialExpandedItems: ['item1'] })
      );

      const item1 = getByTestId('item1');
      const item1child = getByTestId('item-child1');

      fireEvent.focus(item1);
      fireEvent.keyDown(item1, { key: 'ArrowRight' });

      expect(item1).toHaveAttribute('aria-expanded', 'true');
      expect(item1child).toHaveFocus();
    });

    it('should maintain focus when pressing the right arrow on a leaf item', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');

      fireEvent.focus(item0);
      fireEvent.keyDown(item0, { key: 'ArrowRight' });

      expect(item0).toHaveFocus();
    });

    it('should collapse the focused branch item when pressing the left arrow', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item1 = getByTestId('item1');

      fireEvent.focus(item1);
      fireEvent.keyDown(item1, { key: 'ArrowLeft' });

      expect(item1).toHaveFocus();
      expect(item1).toHaveAttribute('aria-expanded', 'false');
    });

    it('should maintain focus when pressing the left arrow on a leaf item', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');

      fireEvent.focus(item0);
      fireEvent.keyDown(item0, { key: 'ArrowLeft' });

      expect(item0).toHaveFocus();
    });

    it('should focus to the first item when pressing the home key', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');
      const item1 = getByTestId('item1');

      fireEvent.focus(item1);
      fireEvent.keyDown(item1, { key: 'Home' });

      expect(item0).toHaveFocus();
    });

    it('should focus to the last item when pressing the end key', () => {
      const { getByTestId } = render(getTreeItemsOneLevelSmall({}));

      const item0 = getByTestId('item0');
      const item1 = getByTestId('item-child1');

      fireEvent.focus(item0);
      fireEvent.keyDown(item0, { key: 'End' });

      expect(item1).toHaveFocus();
    });
  });

  describe.skip('TreeViewSelectable.single', () => {
    describe('focus state', () => {
      it('sets the focus to the first element on load when nothing is selected', () => {
        // expect().toHaveFocus();
      });

      it('sets the focus to the first selected element on load', () => {
        // expect().toHaveFocus();
      });
    });

    describe('keyboard navigation', () => {
      it('should select the item when pressing the Enter key', () => {});

      it('should select the leaf item when pressing the Space key', () => {});

      it('should toggle expand the branch item when pressing the Space key', () => {});
    });
  });

  describe.skip('TreeViewSelectable.multi', () => {
    describe('focus state', () => {
      it('sets the focus to the first element on load when nothing is selected', () => {});

      it('sets the focus to the first selected element on load', () => {});
    });

    describe('keyboard navigation', () => {
      it('should toggle select a leaf item when pressing the Enter key', () => {});
      it('should toggle select a leaf item when pressing the Space key', () => {});
      it('should toggle select a branch item + its children when pressing the Enter key', () => {});
      it('should toggle select a branch item + its children when pressing the Space key', () => {});
    });
  });

  describe.skip('TreeViewSelectable.off', () => {
    describe('keyboard navigation', () => {
      it('should toggle expand the branch item when pressing the Space key', () => {});
    });
    describe('focus state', () => {
      it('sets the focus to the first element on load', () => {});
    });
  });
});
