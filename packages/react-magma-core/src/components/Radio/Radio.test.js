import * as React from 'react';
import { mount } from 'enzyme';
import { RadioCore } from './Radio';

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const RADIO_CORE_PROPS = {
  children: () => React.createElement('div'),
  onBlur,
  onChange,
  onFocus,
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
    onBlur.mockReset();
    onChange.mockReset();
    onFocus.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = inputSetup();

      expect(component.state('selectedValue')).toEqual(RADIO_CORE_PROPS.value);
    });

    it('should update the state checked when onChange is called', () => {
      const selectedValue = 'blue';
      const component = inputSetup();

      component.instance().onChange({
        persist: jest.fn(),
        target: {
          value: selectedValue
        }
      });

      expect(component.state('selectedValue')).toEqual(selectedValue);
    });
  });

  describe('handle blur', () => {
    it('should call the onBlur from props during the internal onBlur', () => {
      const component = inputSetup();

      component.instance().onBlur();

      expect(RADIO_CORE_PROPS.onBlur).toHaveBeenCalled();
    });

    it('should not fail if no onBlur is passed through the props', () => {
      const component = inputSetup({
        onBlur: undefined
      });

      component.instance().onBlur();

      expect(RADIO_CORE_PROPS.onBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the onChange from props during the internal onChange', () => {
      const event = {
        persist: jest.fn(),
        target: {
          selectedValue: 'blue'
        }
      };
      const component = inputSetup();

      component.instance().onChange(event);

      expect(RADIO_CORE_PROPS.onChange).toHaveBeenCalledWith(event);
    });

    it('should not fail if no onChange is passed through the props', () => {
      const selectedValue = 'blue';
      const component = inputSetup({
        onChange: undefined
      });

      component.instance().onChange({
        persist: jest.fn(),
        target: {
          value: selectedValue
        }
      });

      expect(component.state('selectedValue')).toEqual(selectedValue);
      expect(RADIO_CORE_PROPS.onChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the onFocus from props during the internal onFocus', () => {
      const component = inputSetup();

      component.instance().onFocus();

      expect(RADIO_CORE_PROPS.onFocus).toHaveBeenCalled();
    });

    it('should not fail if no onFocus is passed through the props', () => {
      const component = inputSetup({
        onFocus: undefined
      });

      component.instance().onFocus();

      expect(RADIO_CORE_PROPS.onFocus).not.toHaveBeenCalled();
    });
  });
});
