import React from 'react';
import { axe } from 'jest-axe';
import { Accordion } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('Accordion', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <Accordion>{TEXT}</Accordion>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Accordion testId={testId}>{TEXT}</Accordion>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Accordion>{TEXT}</Accordion>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

});
