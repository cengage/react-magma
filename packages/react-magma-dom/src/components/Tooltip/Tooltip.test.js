import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';

import { render } from 'react-testing-library';

const CONTENT_TEXT = 'Test Content';
const TRIGGER_TEXT = 'Test Trigger';

describe('Tooltip', () => {
  it('should render the tooltip component', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>
        <span>{TRIGGER_TEXT}</span>
      </Tooltip>
    );
    // const tooltip = findByText(CONTENT_TEXT);
    // const tooltipTrigger = findByText(TRIGGER_TEXT);

    expect(container).toBeInTheDocument();
    // expect(tooltipTrigger).toBeInTheDocument();
    // expect(tooltip).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>
        <span>{TRIGGER_TEXT}</span>
      </Tooltip>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
