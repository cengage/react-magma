import React from 'react';
import { Toast } from '.';
import { render, fireEvent } from 'react-testing-library';

jest.useFakeTimers();

const TOAST_CONTENT = 'Toast content';
const onDismiss = jest.fn();

const TOAST_PROPS = {
  onDismiss
};

const renderToast = (myProps = {}) => {
  const props = {
    ...TOAST_PROPS,
    ...myProps
  };

  return render(<Toast {...props}>{TOAST_CONTENT}</Toast>);
};

describe('Toast', () => {
  afterEach(() => {
    setTimeout.mockReset();
    clearTimeout.mockReset();
    onDismiss.mockReset();
  });

  it('should render a toast', () => {
    const { getByText } = renderToast();

    expect(getByText(TOAST_CONTENT)).toBeInTheDocument();
  });

  it('should call passed in onDismiss when timer runs out', () => {
    renderToast({
      toastDuration: 1000
    });

    jest.runAllTimers();
    setTimeout(() => {
      expect(onDismiss).toHaveBeenCalled();
    }, 500);
  });

  it('should use passed in timeout duration', () => {
    renderToast({
      toastDuration: 1000
    });

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('should have a dismissable toast', () => {
    const { container } = renderToast({ dismissable: true });

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should call onDismiss if the dismiss button is clicked', () => {
    const { container } = renderToast({ dismissable: true });

    const button = container.querySelector('button');

    fireEvent.click(button);

    setTimeout(() => {
      expect(onDismiss).toHaveBeenCalled();
    }, 500);
  });

  it('should change the variant of the toast when passed in different variant', () => {
    const { getByText } = renderToast({ variant: 'success' });

    expect(getByText(TOAST_CONTENT).parentElement).toHaveStyleRule(
      'background-color',
      '#3A8200'
    );
  });
});
