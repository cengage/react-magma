import React from 'react';
import { axe } from 'jest-axe';
import { Transition } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('Transition', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(<Transition>{TEXT}</Transition>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  // it('should find element by testId', () => {
  //   const testId = 'test-id';
  //   const { getByTestId } = render(
  //     <Transition testId={testId}>{TEXT}</Transition>
  //   );

  //   expect(getByTestId(testId)).toBeInTheDocument();
  // });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Transition>{TEXT}</Transition>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
