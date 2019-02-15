import * as React from 'react';
import { mount } from 'enzyme';
import { SelectCore } from './Select';

const onBlur = jest.fn();
const onFocus = jest.fn();
const onChange = jest.fn();
const onOpen = jest.fn();
const onClose = jest.fn();

const SELECT_CORE_PROPS = {
  children: () => React.createElement('div'),
  onBlur,
  onChange,
  onFocus,
  onOpen,
  onClose,
  defaultValue: ''
};

const selectSetup = (myProps = {}) => {
  const props = {
    ...SELECT_CORE_PROPS,
    ...myProps
  };

  return mount(<SelectCore {...props} />);
};

describe('SelectCore', () => {
  afterEach(() => {
    onBlur.mockReset();
    onChange.mockReset();
    onFocus.mockReset();
    onOpen.mockReset();
    onClose.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = selectSetup();

      expect(component.state('value')).toEqual(SELECT_CORE_PROPS.defaultValue);
    });

    it('should update the state value when onChange is called', () => {
      const value = 'new value';
      const component = selectSetup();

      component.instance().onChange(value);

      expect(component.state('value')).toEqual(value);
    });
  });

  describe('handle blur', () => {
    it('should call the onBlur from props during the internal onBlur', () => {
      const component = selectSetup();

      component.instance().onBlur();

      expect(SELECT_CORE_PROPS.onBlur).toHaveBeenCalled();
    });

    it('should not fail if no onBlur is passed through the props', () => {
      const component = selectSetup({
        onBlur: undefined
      });

      component.instance().onBlur();

      expect(SELECT_CORE_PROPS.onBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the onChange from props during the internal onChange', () => {
      const value = 'test handle change';
      const component = selectSetup();

      component.instance().onChange(value);

      expect(SELECT_CORE_PROPS.onChange).toHaveBeenCalledWith(value);
    });

    it('should not fail if no onChange is passed through the props', () => {
      const value = 'test no fail';
      const component = selectSetup({
        onChange: undefined
      });

      component.instance().onChange(value);

      expect(component.state('value')).toEqual(value);
      expect(SELECT_CORE_PROPS.onChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the onFocus from props during the internal onFocus', () => {
      const component = selectSetup();

      component.instance().onFocus();

      expect(SELECT_CORE_PROPS.onFocus).toHaveBeenCalled();
    });

    it('should not fail if no onFocus is passed through the props', () => {
      const component = selectSetup({
        onFocus: undefined
      });

      component.instance().onFocus();

      expect(SELECT_CORE_PROPS.onFocus).not.toHaveBeenCalled();
    });
  });

  describe('handle open', () => {
    it('should call the onOpen from props during the internal onOpen', () => {
      const component = selectSetup();

      component.instance().onOpen();

      expect(SELECT_CORE_PROPS.onOpen).toHaveBeenCalled();
    });

    it('should not fail if no onOpen is passed through the props', () => {
      const component = selectSetup({
        onOpen: undefined
      });

      component.instance().onOpen();

      expect(SELECT_CORE_PROPS.onOpen).not.toHaveBeenCalled();
    });
  });

  describe('handle close', () => {
    it('should call the onClose from props during the internal onClose', () => {
      const component = selectSetup();

      component.instance().onClose();

      expect(SELECT_CORE_PROPS.onClose).toHaveBeenCalled();
    });

    it('should not fail if no onClose is passed through the props', () => {
      const component = selectSetup({
        onClose: undefined
      });

      component.instance().onClose();

      expect(SELECT_CORE_PROPS.onClose).not.toHaveBeenCalled();
    });
  });
});
