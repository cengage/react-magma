import * as React from 'react';
import { mount } from 'enzyme';
import { InputCore } from './Input';

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const INPUT_CORE_PROPS = {
  children: () => React.createElement('div'),
  onBlur,
  onChange,
  onFocus,
  value: ''
};

const inputSetup = (myProps = {}) => {
  const props = {
    ...INPUT_CORE_PROPS,
    ...myProps
  };

  return mount(<InputCore {...props} />);
};

describe('InputCore', () => {
  afterEach(() => {
    onBlur.mockReset();
    onChange.mockReset();
    onFocus.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = inputSetup();

      expect(component.state('value')).toEqual(INPUT_CORE_PROPS.value);
    });

    it('should update the state value when onChange is called', () => {
      const value = 'new value';
      const component = inputSetup();

      component.instance().onChange({
        target: {
          value
        }
      });

      expect(component.state('value')).toEqual(value);
    });

    it('should update passwordShown when togglePasswordShown is called', () => {
      const component = inputSetup();

      component.instance().togglePasswordShown();

      expect(component.state('passwordShown')).toBeTruthy();

      component.instance().togglePasswordShown();

      expect(component.state('passwordShown')).toBeFalsy();
    });
  });

  describe('handle blur', () => {
    it('should call the onBlur from props during the internal onBlur', () => {
      const component = inputSetup();

      component.instance().onBlur();

      expect(INPUT_CORE_PROPS.onBlur).toHaveBeenCalled();
    });

    it('should not fail if no onBlur is passed through the props', () => {
      const component = inputSetup({
        onBlur: undefined
      });

      component.instance().onBlur();

      expect(INPUT_CORE_PROPS.onBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the onChange from props during the internal onChange', () => {
      const value = 'test handle change';
      const event = {
        target: {
          value
        }
      };
      const component = inputSetup();

      component.instance().onChange(event);

      expect(INPUT_CORE_PROPS.onChange).toHaveBeenCalledWith(event);
    });

    it('should not fail if no onChange is passed through the props', () => {
      const value = 'test no fail';
      const component = inputSetup({
        onChange: undefined
      });

      component.instance().onChange({
        target: {
          value
        }
      });

      expect(component.state('value')).toEqual(value);
      expect(INPUT_CORE_PROPS.onChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the onFocus from props during the internal onFocus', () => {
      const component = inputSetup();

      component.instance().onFocus();

      expect(INPUT_CORE_PROPS.onFocus).toHaveBeenCalled();
    });

    it('should not fail if no onFocus is passed through the props', () => {
      const component = inputSetup({
        onFocus: undefined
      });

      component.instance().onFocus();

      expect(INPUT_CORE_PROPS.onFocus).not.toHaveBeenCalled();
    });
  });
});
