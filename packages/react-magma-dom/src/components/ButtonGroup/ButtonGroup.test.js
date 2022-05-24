import React from 'react';
import { axe } from '../../../axe-helper';
import { ButtonGroup } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('ButtonGroup', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(<ButtonGroup>{TEXT}</ButtonGroup>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <ButtonGroup testId={testId}>{TEXT}</ButtonGroup>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<ButtonGroup>{TEXT}</ButtonGroup>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
