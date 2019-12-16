import React from 'react';
import { Toast } from '.';
import { act, render, fireEvent } from '@testing-library/react';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Toast testId={testId}>Toast Content</Toast>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a toast', () => {
    const toastContent = 'Toast Content';
    const { getByText } = render(<Toast>{toastContent}</Toast>);

    expect(getByText(toastContent)).toBeInTheDocument();
  });

  it('should call passed in onDismiss when timer runs out', async () => {
    const onDismiss = jest.fn();
    render(<Toast onDismiss={onDismiss}>Toast Content</Toast>);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should use passed in timeout duration', () => {
    render(<Toast toastDuration={1000}>Toast Content</Toast>);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('should have a dismissible toast', () => {
    const { container } = render(<Toast dismissible>Toast Content</Toast>);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should call onDismiss if the dismiss button is clicked', async () => {
    const onDismiss = jest.fn();
    const { container } = render(
      <Toast dismissible onDismiss={onDismiss}>
        Toast Content
      </Toast>
    );

    const button = container.querySelector('button');

    fireEvent.click(button);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should keep the toast up when hovering over the toast and dismiss when mouse leaves', async () => {
    const onDismiss = jest.fn();
    const toastContent = 'I am a toast';
    const { getByText } = render(
      <Toast onDismiss={onDismiss}>{toastContent}</Toast>
    );

    const toast = getByText(toastContent);

    fireEvent.mouseOver(toast);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should not pause and resume a timer when the disableAutoDismiss flag is set to true', () => {
    const onDismiss = jest.fn();
    const toastContent = 'I am a toast';
    const { getByText } = render(
      <Toast onDismiss={onDismiss} disableAutoDismiss>
        {toastContent}
      </Toast>
    );

    const toast = getByText(toastContent);

    fireEvent.mouseOver(toast);
    jest.runAllTimers();

    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    jest.runAllTimers();

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls passed in onMouseEnter and onMouseLeave', async () => {
    const onDismiss = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const toastContent = 'I am a toast';
    const { getByText } = render(
      <Toast
        onDismiss={onDismiss}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {toastContent}
      </Toast>
    );

    const toast = getByText(toastContent);

    fireEvent.mouseOver(toast);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(toast);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should change the variant of the toast when passed in different variant', () => {
    const { getByText } = render(
      <Toast variant="success">Toast Content</Toast>
    );

    expect(getByText('Toast Content').parentElement).toHaveStyleRule(
      'background-color',
      '#3A8200'
    );
  });
});
