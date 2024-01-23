import React from 'react';
import { axe } from '../../../axe-helper';
import { TreeView, TreeItem } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';
const testId = 'test-id';

xdescribe('TreeItem', () => {
  it('should render the component', () => {
    const { container, getByText } = render(
      <TreeItem label={TEXT} testId={testId} />
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const { getByTestId } = render(<TreeItem label={TEXT} testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<TreeItem label={TEXT} testId={testId} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('isDisabled', () => {
    it('the label is disabled', () => {});

    it('the ability to expand the item is disabled', () => {});

    it('the checkbox is disabled', () => {});

    it('the item is not clickable', () => {});
  });

  describe('labelStyle', () => {
    it('custom styles get applied to the label', () => {});
  });

  describe('onClick', () => {
    it('onClick function gets called when the item is clicked', () => {});
  });

  describe('label', () => {
    it('the label is visible', () => {});
  });

  describe('icon', () => {
    it('icon is visible', () => {});

    it('if the item doe not have an icon but a sibling does, the default icon is visible', () => {});
  });

  // describe('', () => {
  //   it('', () => {});
  // });
});
