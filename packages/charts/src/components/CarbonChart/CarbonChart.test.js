import React from 'react';
import { axe } from '../../../axe-helper';
import { CarbonChart } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('CarbonChart', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <CarbonChart>{TEXT}</CarbonChart>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <CarbonChart testId={testId}>{TEXT}</CarbonChart>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<CarbonChart>{TEXT}</CarbonChart>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

});
