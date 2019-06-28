import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';

import { render } from 'react-testing-library';

const TEXT = 'Test Text';

describe('Tooltip', () => {
  it('should render the tooltip component', () => {
    const { container } = render(<Tooltip>{TEXT}</Tooltip>);

    expect(container).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Tooltip>{TEXT}</Tooltip>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
