import React from 'react';
import { Table } from '.';
import { render } from '@testing-library/react';

describe('Table', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Table testId={testId}>Test Table</Table>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
