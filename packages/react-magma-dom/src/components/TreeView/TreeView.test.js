import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

xdescribe('TreeView', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <TreeView>
        <TreeItem>{TEXT}</TreeItem>
      </TreeView>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TreeView testId={testId}>
        <TreeItem>{TEXT}</TreeItem>
      </TreeView>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TreeView>
        <TreeItem>{TEXT}</TreeItem>
      </TreeView>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('expandInitial', () => {
    it('when set to ExpandInitialOptions.none, no TreeItem is expanded', () => {});

    it('when set to ExpandInitialOptions.all, all TreeItems are expanded', () => {});

    it('when set to ExpandInitialOptions.first, the first TreeItem is expanded', () => {});
  });

  describe('selectable', () => {
    it('when set to TreeViewSelectable.off, TreeItems are not clickable', () => {});

    it('when set to TreeViewSelectable.single, only one TreeItems is clickable', () => {});

    it('when set to TreeViewSelectable.multi, TreeItems have checkboxes', () => {});
  });

  // describe('singleSelectItemId', () => {
  //   it('', () => {

  //   });
  // });

  describe('onSelectedItemChange', () => {
    it('when set to TreeViewSelectable.single, function gets called when an item is clicked', () => {});

    it("when set to TreeViewSelectable.multi, function gets called when an item's checkbox is clicked", () => {});
  });
});
