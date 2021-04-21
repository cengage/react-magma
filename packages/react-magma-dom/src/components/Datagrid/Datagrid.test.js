import React from 'react';
import { axe } from 'jest-axe';
import { Datagrid } from '.';
import { render } from '@testing-library/react';

const columns = ['Col 1', 'Col 2', 'Col 3', 'Col 4'];

const rows = [
  [
    'Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
];

describe('Datagrid', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Datagrid columns={columns} rows={rows} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Datagrid columns={columns} rows={rows} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
