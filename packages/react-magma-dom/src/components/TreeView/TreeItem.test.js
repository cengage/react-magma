import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { transparentize } from 'polished';

import { magma } from '../../theme/magma';
import { Button } from '../Button';

import { TreeItem, TreeView, TreeViewSelectable } from '.';

const labelText = 'Tree Item Node 0';
const itemId = 'node0';
const testId = `${itemId}-tree-item`;

describe('TreeItem', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <TreeItem label={labelText} testId={testId} itemId={itemId} />
    );

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const { getByTestId } = render(
      <TreeItem label={labelText} testId={testId} itemId={itemId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('label', () => {
    it('the label is visible', () => {
      const { getByText } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );
      expect(getByText(labelText)).toBeInTheDocument();
    });
  });

  describe('custom styles', () => {
    it('labelStyle: styles get applied to the label', () => {
      const labelColor = '#E0004D';

      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          labelStyle={{ color: labelColor }}
        />
      );

      expect(getByTestId(`${testId}-label`)).toHaveStyle(
        `color: ${labelColor}`
      );
    });

    it('style: styles get applied to the item wrapper', () => {
      const backgroundColor = '#B12FAD';

      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          style={{ backgroundColor: backgroundColor }}
        />
      );

      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `backgroundColor: ${backgroundColor}`
      );
    });
  });

  describe('additional content', () => {
    it('should apply default styles', () => {
      const { getByTestId } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );

      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `flexDirection: row`
      );
    });

    it('should apply custom styles when additional content is provided', () => {
      const { getByTestId, getByText } = render(
        <TreeItem
          additionalContent={<>Content</>}
          label={labelText}
          testId={testId}
          itemId={itemId}
        />
      );

      expect(getByText('Content')).toBeInTheDocument();
      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `flexDirection: column`
      );
      expect(getByTestId(`${testId}-additionalcontentwrapper`)).toHaveStyle(
        `marginBottom: 16px`
      );
    });
  });

  describe('isDisabled', () => {
    it('the label is disabled', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem
            label={labelText}
            testId={testId}
            itemId={itemId}
            isDisabled
          />
        </TreeView>
      );

      expect(getByTestId(`${testId}-label`)).toHaveStyleRule(
        'color',
        magma.colors.neutral500
      );
    });

    it('the ability to expand the item is disabled', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem
            label={labelText}
            itemId="parent"
            testId={testId}
            isDisabled
          >
            <TreeItem
              label={`${labelText}-child`}
              testId={`${testId}-child`}
              itemId="child"
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-expand`)).toHaveStyleRule(
        'color',
        magma.colors.neutral500
      );
    });
  });

  describe('icons', () => {
    it('uses the regular icon color', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label={labelText} itemId="parent" testId={testId}>
            <TreeItem label="Child" itemId="child" />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-expand`)).toHaveStyleRule(
        'color',
        magma.colors.brand.navy
      );
    });
  });

  it('uses the selected checkbox color for branch and leaf items', () => {
    const { container } = render(
      <TreeView
        selectable={TreeViewSelectable.multi}
        initialExpandedItems={['parent']}
        preselectedItems={[
          { itemId: 'parent', checkedStatus: 'checked' },
          { itemId: 'child', checkedStatus: 'checked' },
        ]}
      >
        <TreeItem label="Parent" itemId="parent">
          <TreeItem label="Child" itemId="child" />
        </TreeItem>
      </TreeView>
    );

    const parentCheckbox = container.querySelector(
      '[data-testid="parent-checkbox"] + label span'
    );
    const childCheckbox = container.querySelector(
      '[data-testid="child-checkbox"] + label span'
    );

    expect(parentCheckbox).toHaveStyleRule('color', magma.colors.cyan700);
    expect(childCheckbox).toHaveStyleRule('color', magma.colors.cyan700);
  });

  describe('onClick', () => {
    it('gets called when the item is clicked', async () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          onClick={onClick}
        />
      );

      await userEvent.click(getByText(labelText));

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation and focus', () => {
    it('should activate the interactive element on Enter and Space', () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <TreeItem
          label={<Button onClick={handleClick}>Button</Button>}
          testId={testId}
          itemId={itemId}
        />
      );
      const button = getByText('Button');

      expect(button).toBeInTheDocument();

      button.focus();

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should return focus to the tree item on Escape', () => {
      const { getByTestId, getByText } = render(
        <TreeItem
          label={<Button>Button</Button>}
          testId={testId}
          itemId={itemId}
        />
      );
      const treeItem = getByTestId(testId);
      const button = getByText('Button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Escape' });

      expect(treeItem).toHaveFocus();
    });
  });

  describe('hover styles', () => {
    it('should have default hover color', () => {
      const { getByTestId } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );

      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral200),
        {
          target: ':hover',
        }
      );
    });

    it('should use the inverse hover color', () => {
      const { getByTestId } = render(
        <TreeView isInverse>
          <TreeItem label={labelText} testId={testId} itemId={itemId} />
        </TreeView>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900),
        {
          target: ':hover',
        }
      );
    });

    it('should have custom hover color', () => {
      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          hoverColor={magma.colors.indigo500}
        />
      );

      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.indigo500,
        {
          target: ':hover',
        }
      );
    });
  });

  describe('cursor', () => {
    function renderTree(props = {}) {
      return render(
        <TreeView initialExpandedItems={['branch']} {...props}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child" itemId="child" testId="child" />
          </TreeItem>
          <TreeItem label="Leaf" itemId="leaf" testId="leaf" />
        </TreeView>
      );
    }

    function getRow(getByTestId, id) {
      return getByTestId(`${id}-itemwrapper`);
    }

    describe('multi select', () => {
      it('is selected by clicking the label, not the row', () => {
        const { getByText, getByTestId } = renderTree({
          selectable: TreeViewSelectable.multi,
        });

        fireEvent.click(getByTestId('leaf-itemwrapper'));
        expect(getByTestId('leaf')).toHaveAttribute('aria-checked', 'false');

        fireEvent.click(getByText('Leaf'));
        expect(getByTestId('leaf')).toHaveAttribute('aria-checked', 'true');
      });

      it('shows a pointer on the label', () => {
        const { container } = renderTree({
          selectable: TreeViewSelectable.multi,
        });

        container.querySelectorAll('label').forEach(label => {
          expect(window.getComputedStyle(label).cursor).toBe('pointer');
        });
      });

      it('shows a not-allowed cursor on a disabled label', () => {
        const { container } = render(
          <TreeView selectable={TreeViewSelectable.multi}>
            <TreeItem label="Leaf" itemId="leaf" testId="leaf" isDisabled />
          </TreeView>
        );

        expect(
          window.getComputedStyle(container.querySelector('label')).cursor
        ).toBe('not-allowed');
      });

      it('uses the default cursor on the row', () => {
        const { getByTestId } = renderTree({
          selectable: TreeViewSelectable.multi,
        });

        expect(getRow(getByTestId, 'leaf')).toHaveStyleRule(
          'cursor',
          'default'
        );
      });

      it('leaves a label in additional content alone', () => {
        const { getByTestId } = render(
          <TreeView selectable={TreeViewSelectable.multi}>
            <TreeItem
              label="Leaf"
              itemId="leaf"
              testId="leaf"
              isDisabled
              additionalContent={<label htmlFor="other">Other</label>}
            />
          </TreeView>
        );

        const other = getByTestId('leaf-additionalcontentwrapper').firstChild;

        expect(window.getComputedStyle(other).cursor).not.toBe('not-allowed');
      });
    });

    describe('single select', () => {
      it('is selected by clicking the row', () => {
        const { getByTestId } = renderTree({
          selectable: TreeViewSelectable.single,
        });

        fireEvent.click(getByTestId('leaf-itemwrapper'));

        expect(getByTestId('leaf')).toHaveAttribute('aria-selected', 'true');
      });

      it('shows a pointer on the row', () => {
        const { getByTestId } = renderTree({
          selectable: TreeViewSelectable.single,
        });

        expect(getRow(getByTestId, 'leaf')).toHaveStyleRule(
          'cursor',
          'pointer'
        );
        expect(getRow(getByTestId, 'branch')).toHaveStyleRule(
          'cursor',
          'pointer'
        );
      });
    });

    describe('selection off', () => {
      it('expands a branch by clicking the row', () => {
        const { getByTestId, queryByTestId } = render(
          <TreeView selectable={TreeViewSelectable.off}>
            <TreeItem label="Branch" itemId="branch" testId="branch">
              <TreeItem label="Child" itemId="child" testId="child" />
            </TreeItem>
          </TreeView>
        );

        expect(queryByTestId('child')).toBeNull();
        fireEvent.click(getByTestId('branch-itemwrapper'));
        expect(queryByTestId('child')).not.toBeNull();
      });

      it('shows a pointer on a branch row only', () => {
        const { getByTestId } = renderTree({
          selectable: TreeViewSelectable.off,
        });

        expect(getRow(getByTestId, 'branch')).toHaveStyleRule(
          'cursor',
          'pointer'
        );
        expect(getRow(getByTestId, 'leaf')).toHaveStyleRule(
          'cursor',
          'default'
        );
      });
    });

    describe('expand icon', () => {
      it('is the only way to expand a branch in multi select', () => {
        const { getByText, getByTestId, queryByTestId } = render(
          <TreeView selectable={TreeViewSelectable.multi}>
            <TreeItem label="Branch" itemId="branch" testId="branch">
              <TreeItem label="Child" itemId="child" testId="child" />
            </TreeItem>
          </TreeView>
        );

        fireEvent.click(getByText('Branch'));
        expect(queryByTestId('child')).toBeNull();

        fireEvent.click(getByTestId('branch-expand'));
        expect(queryByTestId('child')).not.toBeNull();
      });

      it('shows a pointer even when the row does not', () => {
        const { getByTestId } = renderTree({
          selectable: TreeViewSelectable.multi,
        });

        expect(getRow(getByTestId, 'branch')).toHaveStyleRule(
          'cursor',
          'default'
        );
        expect(getByTestId('branch-expand')).toHaveStyleRule(
          'cursor',
          'pointer'
        );
      });

      it('shows a not-allowed cursor on a disabled item', () => {
        const { getByTestId } = render(
          <TreeView selectable={TreeViewSelectable.multi}>
            <TreeItem label="Branch" itemId="branch" testId="branch" isDisabled>
              <TreeItem label="Child" itemId="child" />
            </TreeItem>
          </TreeView>
        );

        expect(getByTestId('branch-expand')).toHaveStyleRule(
          'cursor',
          'not-allowed'
        );
      });
    });
  });
});
