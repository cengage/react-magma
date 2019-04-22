import React from 'react';
import { mount } from 'enzyme';
import { AlertCore } from './Alert';

const onDismiss = jest.fn();

const ALERT_CORE_PROPS = {
  children: () => React.createElement('div'),
  onDismiss,
  transitionDuration: 500
};

const alertSetup = (myProps = {}) => {
  const props = {
    ...ALERT_CORE_PROPS,
    ...myProps
  };

  return mount(<AlertCore {...props} />);
};

describe('AlertCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    onDismiss.mockReset();
  });

  it('should handle the dismiss', () => {
    const component = alertSetup();

    component.instance().handleDismiss();

    expect(component.state().isExiting).toBeTruthy();
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      ALERT_CORE_PROPS.transitionDuration - 300
    );

    jest.runAllTimers();

    expect(component.state().isExiting).toBeFalsy();
    expect(onDismiss).toHaveBeenCalled();
  });
});
