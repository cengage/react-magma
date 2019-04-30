import * as React from 'react';
import { mount } from 'enzyme';
import { CheckboxCore } from './Checkbox';

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const CHECKBOX_CORE_PROPS = {
  children: () => React.createElement('div'),
  id: 'testId',
  onBlur,
  onChange,
  onFocus,
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
    onBlur.mockReset();
    onChange.mockReset();
    onFocus.mockReset();
  });

  it('should auto assign an id if none is passed in', () => {
    const component = checkboxSetup({ id: null });

    expect(component.state('id')).not.toBeNull();
  });

  it('should not update the id on rerender without change in prop id', () => {
    const component = checkboxSetup({ id: null });

    const initialId = component.state('id');

    component.update();

    expect(component.state('id')).toEqual(initialId);
  });

  it('should update the id on rerender with a change in prop id', () => {
    const component = checkboxSetup({ id: null });

    const initialId = component.state('id');

    component.setProps({ id: 'differentId' });

    expect(component.state('id')).not.toEqual(initialId);
  });

  describe('state management', () => {
    it('should create the initial state of the checkbox', () => {
      const component = checkboxSetup({ checked: false });

      expect(component.state('checked')).toEqual(false);
    });

    it('should update the state value when onChange is called', () => {
      const checked = true;
      const component = checkboxSetup();

      component.instance().onChange({
        target: {
          checked
        }
      });

      expect(component.state('checked')).toEqual(true);
    });
  });

  describe('handle blur', () => {
    it('should call the onBlur from props during the internal onBlur', () => {
      const component = checkboxSetup();

      component.instance().onBlur();

      expect(CHECKBOX_CORE_PROPS.onBlur).toHaveBeenCalled();
    });

    it('should not fail if no onBlur is passed through the props', () => {
      const component = checkboxSetup({
        onBlur: undefined
      });

      component.instance().onBlur();

      expect(CHECKBOX_CORE_PROPS.onBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the onChange from props during the internal onChange', () => {
      const checked = true;
      const event = {
        target: {
          checked
        }
      };
      const component = checkboxSetup();

      component.instance().onChange(event);

      expect(CHECKBOX_CORE_PROPS.onChange).toHaveBeenCalledWith(event);
    });

    it('should not fail if no onChange is passed through the props', () => {
      const checked = true;
      const component = checkboxSetup({
        onChange: undefined
      });

      component.instance().onChange({
        target: {
          checked
        }
      });

      expect(component.state('checked')).toEqual(true);
      expect(CHECKBOX_CORE_PROPS.onChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the onFocus from props during the internal onFocus', () => {
      const component = checkboxSetup();

      component.instance().onFocus();

      expect(CHECKBOX_CORE_PROPS.onFocus).toHaveBeenCalled();
    });

    it('should not fail if no onFocus is passed through the props', () => {
      const component = checkboxSetup({
        onFocus: undefined
      });

      component.instance().onFocus();

      expect(CHECKBOX_CORE_PROPS.onFocus).not.toHaveBeenCalled();
    });
  });
});
