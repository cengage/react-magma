import React from 'react';
import { axe } from '../../../axe-helper';
import { CharacterCounter } from '.';
import { render } from '@testing-library/react';

const testId = 'test-id';

describe('CharacterCounter', () => {
  it('should find element by testId', () => {
    const { getByTestId } = render(
      <CharacterCounter maxLength={231} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<CharacterCounter maxLength={22} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
