import React from 'react';
import { axe } from 'jest-axe';
import { Flex } from '.';
import { render } from '@testing-library/react';

describe('Flex', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Flex testId={testId}>Test Flex</Flex>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Flex>test text</Flex>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
