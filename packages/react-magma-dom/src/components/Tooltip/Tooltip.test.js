import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';

import { render, fireEvent } from '@testing-library/react';

const CONTENT_TEXT = 'Test Content';
const TRIGGER_ELEMENT = <button>Test trigger</button>;

describe('Tooltip', () => {
  it('should render the tooltip component, positioned top by default', () => {
    const { container, getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        id="testTooltipId"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = container.querySelector('div[role="tooltip"]');
    const tooltipInner = getByText('Test Content');
    const tooltipTrigger = container.firstChild;

    expect(container).toBeInTheDocument();

    expect(tooltipTrigger).toBeInTheDocument();
    expect(tooltipTrigger).toHaveStyleRule('position', 'relative');

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveStyleRule('position', 'absolute');
    expect(tooltip).toHaveStyleRule('bottom', '100%');
    expect(tooltipInner).toHaveStyleRule('background', '#3F3F3F');
    expect(tooltipInner).toHaveStyleRule('color', '#FFFFFF');
    expect(tooltipInner).toHaveStyleRule('border-bottom-color', '#3F3F3F', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-top-color', '#3F3F3F', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-left-color', 'transparent', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-right-color', 'transparent', {
      target: ':before'
    });

    expect(tooltip).toMatchSnapshot();
  });

  it('should render the tooltip component with the correct styles when positioned left', () => {
    const { container, getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="left"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = container.querySelector('div[role="tooltip"]');
    const tooltipInner = getByText('Test Content');

    expect(tooltip).toHaveStyleRule('right', '100%');
    expect(tooltipInner).toHaveStyleRule('border-bottom-color', 'transparent', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-top-color', 'transparent', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-left-color', '#3F3F3F', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-right-color', '#3F3F3F', {
      target: ':before'
    });
  });

  it('should render the tooltip component with the correct styles when positioned right', () => {
    const { container } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="right"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('left', '100%');
  });

  it('should render the tooltip component with the correct styles when positioned bottom', () => {
    const { container } = render(
      <Tooltip
        content={CONTENT_TEXT}
        position="bottom"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('top', '100%');
  });

  it('should show the tooltip on focus and hide it on blur', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = container.querySelector('div[role="tooltip"]');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.focus(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');
    fireEvent.blur(trigger);

    expect(tooltip).toHaveStyleRule('display', 'none');
  });

  it('should show the tooltip on mouseenter and hide it on mouseleave', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = container.querySelector('div[role="tooltip"]');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.mouseEnter(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');
    fireEvent.mouseLeave(trigger);

    expect(tooltip).toHaveStyleRule('display', 'none');
  });

  it('should hide the tooltip when the escape key is pressed', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} trigger={TRIGGER_ELEMENT} />
    );
    const trigger = getByText('Test trigger');
    const tooltip = container.querySelector('div[role="tooltip"]');
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

  it('should render the tooltip component with the correct styles for the inverse prop', () => {
    const { getByText } = render(
      <Tooltip content={CONTENT_TEXT} inverse trigger={TRIGGER_ELEMENT} />
    );
    const tooltipInner = getByText('Test Content');

    expect(tooltipInner).toHaveStyleRule('background', '#FFFFFF');
    expect(tooltipInner).toHaveStyleRule('color', '#3F3F3F');

    expect(tooltipInner).toHaveStyleRule('border-bottom-color', '#FFFFFF', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-top-color', '#FFFFFF', {
      target: ':before'
    });
  });

  it('should render the tooltip component with the correct styles for the inverse prop, positioned left or right', () => {
    const { getByText } = render(
      <Tooltip
        content={CONTENT_TEXT}
        inverse
        position="left"
        trigger={TRIGGER_ELEMENT}
      />
    );
    const tooltipInner = getByText('Test Content');

    expect(tooltipInner).toHaveStyleRule('border-left-color', '#FFFFFF', {
      target: ':before'
    });
    expect(tooltipInner).toHaveStyleRule('border-right-color', '#FFFFFF', {
      target: ':before'
    });
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
