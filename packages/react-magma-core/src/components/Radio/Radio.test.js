import * as React from 'react';
import { mount } from 'enzyme';
import { RadioCore } from './Radio';

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const RADIO_CORE_PROPS = {
  children: () => React.createElement('div'),
  id: 'testId',
  onBlur,
  onChange,
  onFocus,
  value: 'blue'
};

const radioSetup = (myProps = {}) => {
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

  it('should auto assign an id if none is passed in', () => {
    const component = radioSetup({ id: null });

    expect(component.state('id')).not.toBeNull();
  });

  it('should not update the id on rerender without a change in prop id', () => {
    const component = radioSetup({ id: null });

    const initialId = component.state('id');

    component.update();

    expect(component.state('id')).toEqual(initialId);
  });

  it('should update the id on rerender with a change in prop id', () => {
    const component = radioSetup({ id: null });

    const initialId = component.state('id');

    component.setProps({ id: 'differentId' });

    expect(component.state('id')).not.toEqual(initialId);
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = radioSetup();

      expect(component.state('selectedValue')).toEqual(RADIO_CORE_PROPS.value);
    });

    it('should update the state checked when onChange is called', () => {
      const selectedValue = 'blue';
      const component = radioSetup();

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
      const component = radioSetup();

      component.instance().onBlur();

      expect(RADIO_CORE_PROPS.onBlur).toHaveBeenCalled();
    });

    it('should not fail if no onBlur is passed through the props', () => {
      const component = radioSetup({
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
      const component = radioSetup();

      component.instance().onChange(event);

      expect(RADIO_CORE_PROPS.onChange).toHaveBeenCalledWith(event);
    });

    it('should not fail if no onChange is passed through the props', () => {
      const selectedValue = 'blue';
      const component = radioSetup({
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
      const component = radioSetup();

      component.instance().onFocus();

      expect(RADIO_CORE_PROPS.onFocus).toHaveBeenCalled();
    });

    it('should not fail if no onFocus is passed through the props', () => {
      const component = radioSetup({
        onFocus: undefined
      });

      component.instance().onFocus();

      expect(RADIO_CORE_PROPS.onFocus).not.toHaveBeenCalled();
    });
  });
});
