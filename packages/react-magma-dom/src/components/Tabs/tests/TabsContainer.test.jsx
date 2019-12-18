import React from 'react';
import { render } from '@testing-library/react';
import { TabsContainer } from '../TabsContainer';
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);
const testId = 'test-id';

describe('Tab', () => {
  it('should correctly apply the testId', () => {
    const { getByTestId } = render(
      <TabsContainer testId={testId} theme="dark" />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});

it('should render children', () => {
  const { getByTestId } = render(
    <TabsContainer testId={testId} theme="dark">
      <div data-testid="child" />
    </TabsContainer>
  );
  expect(getByTestId(testId).children.length).toBe(1);
  expect(getByTestId('child')).toBeDefined();
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <TabsContainer testId={testId} theme="dark" />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
