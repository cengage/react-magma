import React from 'react';
import { axe } from 'jest-axe';
import { Drawer } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

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

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Drawer isOpen>{TEXT}</Drawer>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
