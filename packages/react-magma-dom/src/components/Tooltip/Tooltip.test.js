/* eslint-disable no-console */
import React from 'react';
import { axe } from 'jest-axe';
import { Tooltip } from '.';
import { act, render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

const CONTENT_TEXT = 'Test Content';
const TRIGGER_ELEMENT = <button>Test trigger</button>;

describe('Tooltip', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Tooltip content="content" testId={testId}>
        <button />
      </Tooltip>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it.only('should render the tooltip component, positioned top by default', () => {
    const { container, getByText } = render(
      <Tooltip id="tooltipID" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');
    
    expect(container).toBeInTheDocument();
    
    expect(tooltipTrigger).toBeInTheDocument();
 
    tooltipTrigger.focus()

    const tooltip = container.querySelector('div[role="tooltip"]');
    const arrow = container.querySelector('span');

    expect(tooltip).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();
    
    
    expect(tooltip).toHaveProperty('data-popper-placement', 'top')

    expect(tooltip).toMatchSnapshot();

    tooltipTrigger.blur()
  });

  it('should render the tooltip component with the correct styles when positioned left', () => {
    const { container } = render(
      <Tooltip position="left" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltip = container.querySelector('div[role="tooltip"]');
    const arrow = container.querySelector('span');

    expect(tooltip).toHaveStyleRule('right', '100%');
    expect(tooltip).toHaveStyleRule(
      'padding-right',
      magma.spaceScale.spacing04
    );
    expect(arrow).toHaveStyleRule(
      'border-left',
      `${magma.tooltip.arrowSize} solid ${magma.colors.neutral}`
    );
  });

  it('should render the tooltip component with the correct styles when positioned right', () => {
    const { container } = render(
      <Tooltip position="right" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltip = container.querySelector('div[role="tooltip"]');
    const arrow = container.querySelector('span');

    expect(tooltip).toHaveStyleRule('left', '100%');
    expect(tooltip).toHaveStyleRule('padding-left', magma.spaceScale.spacing04);
    expect(arrow).toHaveStyleRule(
      'border-right',
      `${magma.tooltip.arrowSize} solid ${magma.colors.neutral}`
    );
  });

  it('should render the tooltip component with the correct styles when positioned bottom', () => {
    const { container } = render(
      <Tooltip position="bottom" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltip = container.querySelector('div[role="tooltip"]');
    const arrow = container.querySelector('span');

    expect(tooltip).toHaveStyleRule('top', '100%');
    expect(tooltip).toHaveStyleRule('padding-top', magma.spaceScale.spacing04);
    expect(arrow).toHaveStyleRule(
      'border-bottom',
      `${magma.tooltip.arrowSize} solid ${magma.colors.neutral}`
    );
  });

  it('should show the tooltip on focus and hide it on blur', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
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
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
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
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
    );
    const trigger = getByText('Test trigger');
    const tooltip = container.querySelector('div[role="tooltip"]');
    expect(tooltip).toHaveStyleRule('display', 'none');

    fireEvent.focus(trigger);

    expect(tooltip).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(trigger, {
      key: 'ArrowDown',
      code: 40,
    });

    expect(tooltip).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(trigger, {
      key: 'Escape',
      keyCode: 27,
    });

    expect(tooltip).toHaveStyleRule('display', 'none');
  });

  it('should render the tooltip component with the correct styles for the inverse prop', () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipInner = getByText('Test Content');
    const arrow = container.querySelector('span');

    expect(tooltipInner).toHaveStyleRule('background', magma.colors.neutral08);
    expect(tooltipInner).toHaveStyleRule('color', magma.colors.neutral);
    expect(arrow).toHaveStyleRule(
      'border-top',
      `${magma.tooltip.arrowSize} solid ${magma.colors.neutral08}`
    );
  });

  it('should render the tooltip component with the correct styles for the inverse prop, positioned left or right', () => {
    const { getByText } = render(
      <Tooltip content={CONTENT_TEXT} position="left" isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipInner = getByText('Test Content');
  });

  it('should throw an error if the tooltip children is more than one element', () => {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        /Tooltip children can only be one element/.test(args[0]) ||
        /The above error occurred/.test(args[0])
      ) {
        return;
      }
      originalError.call(console, ...args);
    };

    const renderComponent = () =>
      render(
        <Tooltip content="Tooltip content">
          <div>1 child</div>
          <div>2 child</div>
        </Tooltip>
      );

    expect(renderComponent).toThrowError(
      'Tooltip children can only be one element.'
    );

    console.error = originalError;
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
