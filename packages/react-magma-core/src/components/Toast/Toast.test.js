import React from 'react';
import { mount } from 'enzyme';
import { ToastCore } from './Toast';

jest.useFakeTimers();
const onDismiss = jest.fn();
const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();

const TOAST_CORE_PROPS = {
  children: () => React.createElement('div'),
  onDismiss,
  onMouseEnter,
  onMouseLeave
};

const toastSetup = (myProps = {}) => {
  const props = {
    ...TOAST_CORE_PROPS,
    ...myProps
  };

  return mount(<ToastCore {...props} />);
};

describe('ToastCore', () => {
  afterEach(() => {
    setTimeout.mockReset();
    clearTimeout.mockReset();
    onDismiss.mockReset();
    onMouseEnter.mockReset();
    onMouseLeave.mockReset();
  });

  it('should start timer when component is mounted', () => {
    const component = toastSetup();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  it('should clear timer when component is unmounted', () => {
    const component = toastSetup();

    component.unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should start a timer with passed in duration when mounted', () => {
    const toastDuration = 1000;
    const component = toastSetup({ toastDuration });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      toastDuration
    );
  });

  it('should not start a timer is the disableAutoDismiss prop is true', () => {
    const component = toastSetup({ disableAutoDismiss: true });

    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('should call onDismiss once the timer ends', () => {
    const component = toastSetup();
    jest.runAllTimers();

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout and dismiss manually', () => {
    const component = toastSetup();

    component.instance().clearTimeoutAndDismiss();

    expect(clearTimeout).toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should pause timer when mouse enters', () => {
    const component = toastSetup({ onMouseEnter: null });

    component.instance().handleMouseEnter();

    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should call passed in onMouseEnter function when mouse enters', () => {
    const component = toastSetup();

    component.instance().handleMouseEnter();

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should resume timer when mouse leaves', () => {
    const component = toastSetup({ onMouseLeave: null });

    component.instance().handleMouseLeave();

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2500);
  });

  it('should call passed in onMouseLeave function when mouse leaves', () => {
    const component = toastSetup();

    component.instance().handleMouseLeave();

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalled();
  });
});
