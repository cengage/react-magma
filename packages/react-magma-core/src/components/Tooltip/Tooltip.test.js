import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { TooltipCore } from './Tooltip';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('TooltipCore', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <TooltipCore>
        {({ id }) => <span data-testid="sample">{id}</span>}
      </TooltipCore>
    );
    expect(getByTestId(/sample/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <TooltipCore>
        {({ id }) => <span id={id} data-testid="sample" />}
      </TooltipCore>
    );

    expect(getByTestId(/sample/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <TooltipCore>
        {({ id }) => <span id={id} data-testid="sample" />}
      </TooltipCore>
    );

    expect(getByTestId(/sample/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <TooltipCore>
        {({ id }) => <span id={id} data-testid="sample" />}
      </TooltipCore>
    );

    rerender(
      <TooltipCore id="differentId">
        {({ id }) => <span id={id} data-testid="sample" />}
      </TooltipCore>
    );

    const newId = getByTestId(/sample/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  it('should update the isVisible prop with a change in visibility', () => {
    const { getByText, rerender } = render(
      <TooltipCore>
        {({ isVisible }) => (
          <span>{isVisible ? 'Is visible' : 'Not visible'}</span>
        )}
      </TooltipCore>
    );

    expect(getByText(/not visible/i)).toBeInTheDocument();

    rerender(
      <TooltipCore isVisible>
        {({ isVisible }) => (
          <span>{isVisible ? 'Is visible' : 'Not visible'}</span>
        )}
      </TooltipCore>
    );

    expect(getByText(/is visible/i)).toBeInTheDocument();
  });

  it('should show the tooltip', () => {
    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const { container, getByText } = render(
      <TooltipCore
        onFocus={showTooltip}
        onBlur={hideTooltip}
        hideTooltip={hideTooltip}
        showTooltip={showTooltip}
      >
        {({ id, hideTooltip, showTooltip, isVisible }) => (
          <button onBlur={hideTooltip} onFocus={showTooltip} id={id}>
            {isVisible ? 'Is visible' : 'Not visible'}
          </button>
        )}
      </TooltipCore>
    );

    expect(showTooltip).not.toHaveBeenCalled();
    expect(hideTooltip).not.toHaveBeenCalled();
    expect(getByText(/not visible/i)).toBeInTheDocument();

    fireEvent.focus(container.querySelector('button'));

    setTimeout(() => {
      expect(showTooltip).toHaveBeenCalled();
      expect(hideTooltip).not.toHaveBeenCalled();
      expect(getByText(/is visible/i)).toBeInTheDocument();
    }, 500);
  });

  it('should hide the tooltip on blur', () => {
    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const { container, getByText } = render(
      <TooltipCore
        onFocus={showTooltip}
        onBlur={hideTooltip}
        hideTooltip={hideTooltip}
        showTooltip={showTooltip}
      >
        {({ id, hideTooltip, showTooltip, isVisible }) => (
          <button onBlur={hideTooltip} onFocus={showTooltip} id={id}>
            {isVisible ? 'Is visible' : 'Not visible'}
          </button>
        )}
      </TooltipCore>
    );

    expect(showTooltip).not.toHaveBeenCalled();
    expect(hideTooltip).not.toHaveBeenCalled();
    expect(getByText(/not visible/i)).toBeInTheDocument();

    fireEvent.focus(container.querySelector('button'));
    fireEvent.blur(container.querySelector('button'));

    setTimeout(() => {
      expect(hideTooltip).toHaveBeenCalled();
      expect(getByText(/not visible/i)).toBeInTheDocument();
    }, 500);
  });
});
