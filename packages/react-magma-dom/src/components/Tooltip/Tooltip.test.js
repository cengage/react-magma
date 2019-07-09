import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';

import { render, fireEvent } from 'react-testing-library';

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

  it('should show the tooltip on focus and hide it on blur', () => {
    const { getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = getByText('Test Content');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.focus(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');
    fireEvent.blur(trigger);

    expect(tooltip).toHaveStyleRule('display', 'none');
  });

  it('should show the tooltip on mouseenter and hide it on mouseleave', () => {
    const { getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = getByText('Test Content');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.mouseEnter(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');
    fireEvent.mouseLeave(trigger);

    expect(tooltip).toHaveStyleRule('display', 'none');
  });

  it('should hide the tooltip when the escape key is pressed', () => {
    const { getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = getByText('Test Content');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.focus(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(trigger, {
      key: 'ArrowDown',
      code: 40
    });

    expect(tooltip).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(trigger, {
      key: 'Escape',
      keyCode: 27
    });

    expect(tooltip).toHaveStyleRule('display', 'none');
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
