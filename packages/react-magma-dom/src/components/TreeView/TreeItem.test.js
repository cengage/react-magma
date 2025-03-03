import React from 'react';

import { render, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { TreeItem, TreeView } from '.';

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
        transparentize(0.6, magma.colors.neutral500)
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

      expect(getByTestId(`${testId}-expand`)).toHaveAttribute(
        'aria-hidden',
        'true'
      );
      expect(getByTestId(`${testId}-expand`)).toHaveStyleRule(
        'color',
        transparentize(0.6, magma.colors.neutral500)
      );
    });
  });

  describe('onClick', () => {
    it('gets called when the item is clicked', () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          onClick={onClick}
        />
      );

      userEvent.click(getByText(labelText));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
