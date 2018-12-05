import * as React from 'react';
import { mount } from 'enzyme';
import { CheckboxCore } from './Checkbox';

const handleBlur = jest.fn();
const handleChange = jest.fn();
const handleFocus = jest.fn();

const CHECKBOX_CORE_PROPS = {
  children: () => React.createElement('div'),
  handleBlur,
  handleChange,
  handleFocus,
  value: ''
};

const checkboxSetup = (myProps = {}) => {
  const props = {
    ...CHECKBOX_CORE_PROPS,
    ...myProps
  };

  return mount(<CheckboxCore {...props} />);
};

describe('CheckboxCore', () => {
  afterEach(() => {
    handleBlur.mockReset();
    handleChange.mockReset();
    handleFocus.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the checkbox', () => {
      const component = checkboxSetup();

      expect(component.state('value')).toEqual(CHECKBOX_CORE_PROPS.value);
    });

    it('should update the state value when handleChange is called', () => {
      const checked = true;
      const component = checkboxSetup();

      component.instance().handleChange({
        target: {
          checked
        }
      });

      expect(component.state('value')).toEqual(checked);
    });
  });

  describe('handle blur', () => {
    it('should call the handleBlur from props during the internal handleBlur', () => {
      const component = checkboxSetup();

      component.instance().handleBlur();

      expect(CHECKBOX_CORE_PROPS.handleBlur).toHaveBeenCalled();
    });

    it('should not fail if no handleBlur is passed through the props', () => {
      const component = checkboxSetup({
        handleBlur: undefined
      });

      component.instance().handleBlur();

      expect(CHECKBOX_CORE_PROPS.handleBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the handleChange from props during the internal handleChange', () => {
      const checked = true;
      const component = checkboxSetup();

      component.instance().handleChange({
        target: {
          checked
        }
      });

      expect(CHECKBOX_CORE_PROPS.handleChange).toHaveBeenCalledWith(checked);
    });

    it('should not fail if no handleChange is passed through the props', () => {
      const checked = true;
      const component = checkboxSetup({
        handleChange: undefined
      });

      component.instance().handleChange({
        target: {
          checked
        }
      });

      expect(component.state('value')).toEqual(checked);
      expect(CHECKBOX_CORE_PROPS.handleChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the handleFocus from props during the internal handleFocus', () => {
      const component = checkboxSetup();

      component.instance().handleFocus();

      expect(CHECKBOX_CORE_PROPS.handleFocus).toHaveBeenCalled();
    });

    it('should not fail if no handleFocus is passed through the props', () => {
      const component = checkboxSetup({
        handleFocus: undefined
      });

      component.instance().handleFocus();

      expect(CHECKBOX_CORE_PROPS.handleFocus).not.toHaveBeenCalled();
    });
  });
});
