import React from 'react';
import { magma } from '../../theme/magma';
import { Toast } from '.';
import { ToastsContainer } from './ToastsContainer';
import { act, render, fireEvent } from '@testing-library/react';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Toast testId={testId}>Toast Content</Toast>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyleRule('bottom', '20px');
  });

  it('should render toast content', () => {
    const toastContent = 'Toast Content';
    const { getByText } = render(<Toast>{toastContent}</Toast>);

    expect(getByText(toastContent)).toBeInTheDocument();
  });

  it('should render a toast with position if multiple toasts', () => {
    const { getByTestId } = render(
      <ToastsContainer>
        <Toast id="toast1" testId="toast1">
          toast
        </Toast>
        <Toast id="toast2" testId="toast2">
          toast
        </Toast>
      </ToastsContainer>
    );
    expect(getByTestId('toast1')).toHaveStyleRule('bottom', '20px');
    expect(getByTestId('toast2')).toHaveStyleRule('bottom', '85px');
  });

  it('should render a toast with bottom offset', () => {
    const { getByTestId } = render(
      <ToastsContainer bottomOffset={50}>
        <Toast id="toast1" testId="toast1">
          toast
        </Toast>
      </ToastsContainer>
    );
    expect(getByTestId('toast1')).toHaveStyleRule(
      'transform',
      'translateY(-50px)'
    );
  });

  it('should call passed in onDismiss when timer runs out', async () => {
    const onDismiss = jest.fn();
    render(<Toast onDismiss={onDismiss}>Toast Content</Toast>);

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should use passed in timeout duration plus the transition time', () => {
    render(<Toast toastDuration={1000}>Toast Content</Toast>);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1500);
  });

  it('should have a dismissible toast', () => {
    const { container } = render(<Toast isDismissible>Toast Content</Toast>);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should call onDismiss if the dismiss button is clicked', async () => {
    const onDismiss = jest.fn();
    const { container } = render(
      <Toast isDismissible onDismiss={onDismiss}>
        Toast Content
      </Toast>
    );

    const button = container.querySelector('button');

    fireEvent.click(button);

    await act(async () => {
      jest.runOnlyPendingTimers();
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
      jest.advanceTimersByTime(6000);
    });

    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should keep the toast up when focusing on an element in the toast and dismiss when element is blurred', async () => {
    const onDismiss = jest.fn();
    const toastContent = 'I am a toast';
    const { container } = render(
      <Toast onDismiss={onDismiss}>{toastContent}</Toast>
    );

    const closeBtn = container.querySelector('button');

    fireEvent.focus(closeBtn);

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.blur(closeBtn);

    await act(async () => {
      jest.advanceTimersByTime(6000);
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

    act(() => {
      jest.advanceTimersByTime(6000);
    });
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    act(() => {
      jest.advanceTimersByTime(6000);
    });

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
      jest.runOnlyPendingTimers();
    });

    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(toast);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should change the variant of the toast when passed in different variant', () => {
    const { getByTestId } = render(
      <Toast testId="test" variant="success">
        Toast Content
      </Toast>
    );

    expect(getByTestId('test').firstChild.firstChild).toHaveStyleRule(
      'background',
      magma.colors.success100
    );
  });
});
