import * as React from 'react';
import { mount } from 'enzyme';
import { SelectCore, SelectCoreProps } from './Select';

const handleBlur = jest.fn();
const handleFocus = jest.fn();
const handleChange = jest.fn();
const handleOpen = jest.fn();
const handleClose = jest.fn();

const SELECT_CORE_PROPS: SelectCoreProps = {
  children: () => React.createElement('div'),
  handleBlur,
  handleChange,
  handleFocus,
  handleOpen,
  handleClose,
  defaultValue: ''
};

const selectSetup = (myProps = {}) => {
  const props = {
    ...SELECT_CORE_PROPS,
    ...myProps
  };

  return mount<SelectCore>(<SelectCore {...props} />);
};

describe('SelectCore', () => {
  afterEach(() => {
    handleBlur.mockReset();
    handleChange.mockReset();
    handleFocus.mockReset();
    handleOpen.mockReset();
    handleClose.mockReset();
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const component = selectSetup();

      expect(component.state('value')).toEqual(SELECT_CORE_PROPS.defaultValue);
    });

    it('should update the state value when handleChange is called', () => {
      const value = 'new value';
      const component = selectSetup();

      component.instance().handleChange(value);

      expect(component.state('value')).toEqual(value);
    });
  });

  describe('handle blur', () => {
    it('should call the handleBlur from props during the internal handleBlur', () => {
      const component = selectSetup();

      component.instance().handleBlur();

      expect(SELECT_CORE_PROPS.handleBlur).toHaveBeenCalled();
    });

    it('should not fail if no handleBlur is passed through the props', () => {
      const component = selectSetup({
        handleBlur: undefined
      });

      component.instance().handleBlur();

      expect(SELECT_CORE_PROPS.handleBlur).not.toHaveBeenCalled();
    });
  });

  describe('handle change', () => {
    it('should call the handleChange from props during the internal handleChange', () => {
      const value = 'test handle change';
      const component = selectSetup();

      component.instance().handleChange(value);

      expect(SELECT_CORE_PROPS.handleChange).toHaveBeenCalledWith(value);
    });

    it('should not fail if no handleChange is passed through the props', () => {
      const value = 'test no fail';
      const component = selectSetup({
        handleChange: undefined
      });

      component.instance().handleChange(value);

      expect(component.state('value')).toEqual(value);
      expect(SELECT_CORE_PROPS.handleChange).not.toHaveBeenCalled();
    });
  });

  describe('handle focus', () => {
    it('should call the handleFocus from props during the internal handleFocus', () => {
      const component = selectSetup();

      component.instance().handleFocus();

      expect(SELECT_CORE_PROPS.handleFocus).toHaveBeenCalled();
    });

    it('should not fail if no handleFocus is passed through the props', () => {
      const component = selectSetup({
        handleFocus: undefined
      });

      component.instance().handleFocus();

      expect(SELECT_CORE_PROPS.handleFocus).not.toHaveBeenCalled();
    });
  });

  describe('handle open', () => {
    it('should call the handleOpen from props during the internal handleOpen', () => {
      const component = selectSetup();

      component.instance().handleOpen();

      expect(SELECT_CORE_PROPS.handleOpen).toHaveBeenCalled();
    });

    it('should not fail if no handleOpen is passed through the props', () => {
      const component = selectSetup({
        handleOpen: undefined
      });

      component.instance().handleOpen();

      expect(SELECT_CORE_PROPS.handleOpen).not.toHaveBeenCalled();
    });
  });

  describe('handle close', () => {
    it('should call the handleClose from props during the internal handleClose', () => {
      const component = selectSetup();

      component.instance().handleClose();

      expect(SELECT_CORE_PROPS.handleClose).toHaveBeenCalled();
    });

    it('should not fail if no handleClose is passed through the props', () => {
      const component = selectSetup({
        handleClose: undefined
      });

      component.instance().handleClose();

      expect(SELECT_CORE_PROPS.handleClose).not.toHaveBeenCalled();
    });
  });
});
