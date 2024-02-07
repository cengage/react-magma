import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';
const testId = 'test-id';

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
    it('when set to empty, no TreeItem is expanded', () => {});

    it('when set to array length 3, all 3 TreeItems are expanded', () => {});

    it('when set to array length 1, the one TreeItem is expanded', () => {});
  });

  describe('selectable', () => {
    it('when set to TreeViewSelectable.off, TreeItems are not clickable', () => {});

    it('when set to TreeViewSelectable.single, only one TreeItems is clickable', () => {});

    it('when set to TreeViewSelectable.multi, TreeItems have checkboxes', () => {});
  });

  describe('isInverse', () => {
    it('uses the inverse colors', () => {

    });
  });

  describe('onSelectedItemChange', () => {
    it('when set to TreeViewSelectable.off, function does not get called', () => {});

    it('when set to TreeViewSelectable.single, function gets called when an item is clicked', () => {});

    it("when set to TreeViewSelectable.multi, function gets called when an item's checkbox is clicked", () => {});
  });

  describe('oExpandedChange', () => {
    it('function gets called when an item is expanded', () => {});
  });
});
