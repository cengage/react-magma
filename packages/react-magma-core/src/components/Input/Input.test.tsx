import * as React from 'react';
import { mount } from 'enzyme';
import { InputCore, InputCoreProps, InputCoreState } from './Input';

const handleBlur = jest.fn();
const handleChange = jest.fn();
const handleFocus = jest.fn();

const INPUT_CORE_PROPS: InputCoreProps = {
  children: () => React.createElement('div'),
  handleBlur,
  handleChange,
  handleFocus,
  value: ''
};

const inputSetup = (myProps = {}) => {
  const props = {
    ...INPUT_CORE_PROPS,
    ...myProps
  };

  return mount<InputCore>(<InputCore {...props} />);
};

describe('InputCore', () => {
  afterEach(() => {
    handleBlur.mockReset();
    handleChange.mockReset();
    handleFocus.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = inputSetup();

      expect(component.state('value')).toEqual(INPUT_CORE_PROPS.value);
    });

    it('should update the state value when handleChange is called', () => {
      const value = 'new value';
      const component = inputSetup();

      component.instance().handleChange({
        target: {
          value
        }
      });

      expect(component.state('value')).toEqual(value);
    });
  });

  describe('handle blur', () => {
    it('should call the handleBlur from props during the internal handleBlur', () => {
      const component = inputSetup();

      component.instance().handleBlur();

      expect(INPUT_CORE_PROPS.handleBlur).toHaveBeenCalled();
    });

    it('should not fail if no handleBlur is passed through the props', () => {
      const component = inputSetup({
        handleBlur: undefined
      });

      component.instance().handleBlur();

      expect(INPUT_CORE_PROPS.handleBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the handleChange from props during the internal handleChange', () => {
      const value = 'test handle change';
      const component = inputSetup();

      component.instance().handleChange({
        target: {
          value
        }
      });

      expect(INPUT_CORE_PROPS.handleChange).toHaveBeenCalledWith(value);
    });

    it('should not fail if no handleChange is passed through the props', () => {
      const value = 'test no fail';
      const component = inputSetup({
        handleChange: undefined
      });

      component.instance().handleChange({
        target: {
          value
        }
      });

      expect(component.state('value')).toEqual(value);
      expect(INPUT_CORE_PROPS.handleChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the handleFocus from props during the internal handleFocus', () => {
      const component = inputSetup();

      component.instance().handleFocus();

      expect(INPUT_CORE_PROPS.handleFocus).toHaveBeenCalled();
    });

    it('should not fail if no handleFocus is passed through the props', () => {
      const component = inputSetup({
        handleFocus: undefined
      });

      component.instance().handleFocus();

      expect(INPUT_CORE_PROPS.handleFocus).not.toHaveBeenCalled();
    });
  });
});
