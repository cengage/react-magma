import React from 'react';
import { mount } from 'enzyme';
import { ToggleCore } from './Toggle';

const handleToggle = jest.fn();

const TOGGLE_CORE_PROPS = {
  children: () => React.createElement('div')
};

const toggleSetup = (myProps = {}) => {
  const props = {
    ...TOGGLE_CORE_PROPS,
    ...myProps
  };

  return mount(<ToggleCore {...props} />);
};

describe('ButtonCore', () => {
  afterEach(() => {
    handleToggle.mockReset();
  });

  describe('handle toggle', () => {
    it('should update the state when toggled', () => {
      const component = toggleSetup();

      component.instance().handleToggle();

      expect(component.state('isOn')).toBeTruthy();
    });
  });
});
