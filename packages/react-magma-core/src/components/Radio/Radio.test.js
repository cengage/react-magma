import * as React from 'react';
import { mount } from 'enzyme';
import { RadioCore } from './Radio';

const handleBlur = jest.fn();
const handleChange = jest.fn();
const handleFocus = jest.fn();

const RADIO_CORE_PROPS = {
  children: () => React.createElement('div'),
  handleBlur,
  handleChange,
  handleFocus,
  selectedValue: 'blue',
  value: 'blue'
};

const inputSetup = (myProps = {}) => {
  const props = {
    ...RADIO_CORE_PROPS,
    ...myProps
  };

  return mount(<RadioCore {...props} />);
};

describe('RadioCore', () => {
  afterEach(() => {
    handleBlur.mockReset();
    handleChange.mockReset();
    handleFocus.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = inputSetup();

      expect(component.state('checked')).toEqual(
        RADIO_CORE_PROPS.selectedValue === RADIO_CORE_PROPS.value
      );
    });

    it('should update the state checked when handleChange is called', () => {
      const checked = true;
      const component = inputSetup();

      component.instance().handleChange({
        persist: jest.fn(),
        target: {
          checked
        }
      });

      expect(component.state('checked')).toEqual(checked);
    });
  });

  describe('handle blur', () => {
    it('should call the handleBlur from props during the internal handleBlur', () => {
      const component = inputSetup();

      component.instance().handleBlur();

      expect(RADIO_CORE_PROPS.handleBlur).toHaveBeenCalled();
    });

    it('should not fail if no handleBlur is passed through the props', () => {
      const component = inputSetup({
        handleBlur: undefined
      });

      component.instance().handleBlur();

      expect(RADIO_CORE_PROPS.handleBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the handleChange from props during the internal handleChange', () => {
      const event = {
        persist: jest.fn(),
        target: {
          checked: true
        }
      };
      const component = inputSetup();

      component.instance().handleChange(event);

      expect(RADIO_CORE_PROPS.handleChange).toHaveBeenCalledWith(event);
    });

    it('should not fail if no handleChange is passed through the props', () => {
      const checked = true;
      const component = inputSetup({
        handleChange: undefined
      });

      component.instance().handleChange({
        persist: jest.fn(),
        target: {
          checked
        }
      });

      expect(component.state('checked')).toEqual(checked);
      expect(RADIO_CORE_PROPS.handleChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the handleFocus from props during the internal handleFocus', () => {
      const component = inputSetup();

      component.instance().handleFocus();

      expect(RADIO_CORE_PROPS.handleFocus).toHaveBeenCalled();
    });

    it('should not fail if no handleFocus is passed through the props', () => {
      const component = inputSetup({
        handleFocus: undefined
      });

      component.instance().handleFocus();

      expect(RADIO_CORE_PROPS.handleFocus).not.toHaveBeenCalled();
    });
  });
});
