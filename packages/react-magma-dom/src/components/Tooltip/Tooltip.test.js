/* eslint-disable no-console */
import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Tooltip } from '.';

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

  it('should render the tooltip component, positioned top by default', async () => {
    const { container, getByTestId } = render(
      <Tooltip id="tooltipID" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();

    expect(tooltipTrigger).toBeInTheDocument();

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');
    const arrow = getByTestId('tooltip-arrow');

    expect(tooltip).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();

    expect(tooltip).toHaveAttribute('data-tooltip-placement', 'top');

    expect(tooltip).toMatchSnapshot();
  });

  it('should render the tooltip component with the correct styles when positioned left', async () => {
    const { container } = render(
      <Tooltip position="left" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveAttribute('data-tooltip-placement', 'left');
  });

  it('should render the tooltip component with the correct styles when positioned right', async () => {
    const { container } = render(
      <Tooltip position="right" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveAttribute('data-tooltip-placement', 'right');
  });

  it('should render the tooltip component with the correct styles when positioned bottom', async () => {
    const { container } = render(
      <Tooltip position="bottom" content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveAttribute('data-tooltip-placement', 'bottom');
  });

  it('should show the tooltip on focus and hide it on blur', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    expect(
      container.querySelector('div[role="tooltip"]')
    ).not.toBeInTheDocument();
    fireEvent.focus(tooltipTrigger);

    expect(container.querySelector('div[role="tooltip"]')).toBeInTheDocument();
    fireEvent.blur(tooltipTrigger);
  });

  it('should allow for a persistent tooltip that does not hide on blur', () => {
    const { container } = render(
      <Tooltip open content={CONTENT_TEXT}>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    expect(container.querySelector('div[role="tooltip"]')).toBeInTheDocument();

    fireEvent.mouseEnter(tooltipTrigger);

    expect(container.querySelector('div[role="tooltip"]')).toBeInTheDocument();

    fireEvent.mouseLeave(tooltipTrigger);

    expect(container.querySelector('div[role="tooltip"]')).toBeInTheDocument();
  });

  it('should show the tooltip on mouseenter and hide it on mouseleave', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    expect(
      container.querySelector('div[role="tooltip"]')
    ).not.toBeInTheDocument();

    fireEvent.mouseEnter(tooltipTrigger);

    expect(container.querySelector('div[role="tooltip"]')).toBeInTheDocument();

    fireEvent.mouseLeave(tooltipTrigger);

    expect(
      container.querySelector('div[role="tooltip"]')
    ).not.toBeInTheDocument();
  });

  it('should hide the tooltip when the escape key is pressed', () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT}>{TRIGGER_ELEMENT}</Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    fireEvent.focus(tooltipTrigger);

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toBeInTheDocument();

    fireEvent.keyDown(tooltipTrigger, {
      key: 'ArrowDown',
      code: 40,
    });

    expect(tooltip).toBeInTheDocument();

    fireEvent.keyDown(tooltipTrigger, {
      key: 'Escape',
      keyCode: 27,
    });

    expect(tooltip).not.toBeInTheDocument();
  });

  it('should render the tooltip component with the correct styles for the inverse prop, position top', async () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT} isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('background', magma.colors.neutral100);
    expect(tooltip).toHaveStyleRule('color', magma.colors.neutral700);
  });

  it('should render the tooltip component with the correct styles for the inverse prop, positioned bottom', async () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT} position="bottom" isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('background', magma.colors.neutral100);
    expect(tooltip).toHaveStyleRule('color', magma.colors.neutral700);
  });

  it('should render the tooltip component with the correct styles for the inverse prop, positioned left', async () => {
    const { container, getByText } = render(
      <Tooltip content={CONTENT_TEXT} position="left" isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('background', magma.colors.neutral100);
    expect(tooltip).toHaveStyleRule('color', magma.colors.neutral700);
  });

  it('should render the tooltip component with the correct styles for the inverse prop, positioned right', async () => {
    const { container } = render(
      <Tooltip content={CONTENT_TEXT} position="right" isInverse>
        {TRIGGER_ELEMENT}
      </Tooltip>
    );
    const tooltipTrigger = container.querySelector('button');

    await act(async () => {
      tooltipTrigger.focus();
    });

    const tooltip = container.querySelector('div[role="tooltip"]');

    expect(tooltip).toHaveStyleRule('background', magma.colors.neutral100);
    expect(tooltip).toHaveStyleRule('color', magma.colors.neutral700);
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
