import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('TreeView', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <TreeView><TreeItem>{TEXT}</TreeItem></TreeView>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <TreeView testId={testId}><TreeItem>{TEXT}</TreeItem></TreeView>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<TreeView><TreeItem>{TEXT}</TreeItem></TreeView>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

});
