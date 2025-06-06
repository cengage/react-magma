import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Drawer } from '.';

const TEXT = 'Test Text';
const TEST_ID = 'transition';

describe('Drawer', () => {
  it('should render the visually hidden component', () => {
    const { getByTestId } = render(
      <Drawer testId="test-id" isOpen>
        {TEXT}
      </Drawer>
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Drawer testId={testId} isOpen>
        {TEXT}
      </Drawer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the drawer with the top position', () => {
    const drawerContent = 'Drawer content';
    const { getByTestId } = render(
      <Drawer position="top" header="Hello" isOpen testId={TEST_ID}>
        {drawerContent}
      </Drawer>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));
    expect(getByTestId('modal-content')).toHaveStyle('bottom: auto');
  });

  it('should render the drawer with the right position', () => {
    const drawerContent = 'Drawer content';
    const { getByTestId } = render(
      <Drawer position="right" header="Hello" isOpen testId={TEST_ID}>
        {drawerContent}
      </Drawer>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));
    expect(getByTestId('modal-content')).toHaveStyle(
      'left: auto',
      'height: 100%',
      'position: fixed'
    );
  });

  it('should render the drawer with the bottom position', () => {
    const drawerContent = 'Drawer content';
    const { getByTestId } = render(
      <Drawer position="bottom" header="Hello" isOpen testId={TEST_ID}>
        {drawerContent}
      </Drawer>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));
    expect(getByTestId('modal-content')).toHaveStyle(
      'top: auto',
      'position: fixed'
    );
  });

  it('should render the drawer with the left position', () => {
    const drawerContent = 'Drawer content';
    const { getByTestId } = render(
      <Drawer position="left" header="Hello" isOpen testId={TEST_ID}>
        {drawerContent}
      </Drawer>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));
    expect(getByTestId('modal-content')).toHaveStyle(
      'right: auto',
      'height: 100%'
    );
  });

  it('Does not violate accessibility standards', async () => {
    const { baseElement } = render(
      <Drawer isOpen ariaLabel="drawer">
        {TEXT}
      </Drawer>
    );
    const results = await axe(baseElement);

    return expect(results).toHaveNoViolations();
  });

  describe('showBackgroundOverlay prop', () => {
    const drawerContent = 'Drawer content';
    const modalBackDropTestId = 'modal-backdrop';
    const modalContentTestId = 'modal-content';

    it('should show background overlay when showBackgroundOverlay is true', async () => {
      const { getByTestId } = render(
        <Drawer position="bottom" header="Hello" isOpen testId={TEST_ID}>
          {drawerContent}
        </Drawer>
      );

      const modalContent = getByTestId(modalContentTestId);

      expect(modalContent).toBeInTheDocument();
      expect(getByTestId(modalBackDropTestId)).toBeInTheDocument();
      expect(modalContent).toHaveStyle(`border: none`);
    });

    it('should hide background overlay when showBackgroundOverlay is false', async () => {
      const { queryByTestId } = render(
        <Drawer
          position="bottom"
          header="Hello"
          isOpen
          testId={TEST_ID}
          showBackgroundOverlay={false}
          isInverse
        >
          {drawerContent}
        </Drawer>
      );

      const modalContent = queryByTestId(modalContentTestId);

      expect(modalContent).toBeInTheDocument();
      expect(queryByTestId(modalBackDropTestId)).not.toBeInTheDocument();
      expect(modalContent).toHaveStyleRule(
        `border`,
        `1px solid ${magma.colors.primary400}`
      );
    });
  });
});
