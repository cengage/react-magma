import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';

import { render } from 'react-testing-library';

const CONTENT_TEXT = 'Test Content';
const TRIGGER_ELEMENT = <button>Test trigger</button>;

describe('Tooltip', () => {
  it('should render the tooltip component, positioned bottom by default', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const tooltip = getByText('Test Content');
    const tooltipTrigger = container.firstChild;

    expect(container).toBeInTheDocument();

    expect(tooltipTrigger).toBeInTheDocument();
    expect(tooltipTrigger).toHaveStyleRule('position', 'relative');

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveStyleRule('position', 'absolute');
    expect(tooltip).toHaveStyleRule('top', '100%');
  });

  it('should render the tooltip component with the correct styles when positioned left', () => {
    const { getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="left"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = getByText('Test Content');

    expect(tooltip).toHaveStyleRule('right', '100%');
  });

  it('should render the tooltip component with the correct styles when positioned right', () => {
    const { getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="right"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = getByText('Test Content');

    expect(tooltip).toHaveStyleRule('left', '100%');
  });

  it('should render the tooltip component with the correct styles when positioned top', () => {
    const { getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="top"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = getByText('Test Content');

    expect(tooltip).toHaveStyleRule('bottom', '100%');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
