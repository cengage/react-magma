import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';
import userEvent from '@testing-library/user-event';
import {FavoriteIcon} from 'react-magma-icons';

const TEXT = 'Test Text Tree Item';
const testId = 'tree-view';

const getTreeItemsOneLevel = props => (
  <TreeView testId={testId} {...props}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
      <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
    </TreeItem>
    <TreeItem label="Node 2" itemId="item2" testId="item2">
      <TreeItem label="Child 2" itemId="item-child2" testId="item-child2" />
    </TreeItem>
    <TreeItem label="Node 3" itemId="item3" testId="item3">
      <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
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
  });

  describe('selectable', () => {
    it('when set to TreeViewSelectable.single, only one TreeItems is selectable', () => {});

    it('when set to TreeViewSelectable.multi, TreeItems have checkboxes', () => {});
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
        expect(onSelectedItemChange).toHaveBeenCalledWith(['item0']);
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
        expect(onSelectedItemChange).toHaveBeenCalledWith(['item2']);
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
        expect(onSelectedItemChange).toHaveBeenCalledWith(['item0']);
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
          'item-child2',
          'item-gchild2',
          'item-ggchild2',
          'item-ggchild3',
          'item2',
        ]);
      });
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
    });
  });
});
