import * as React from 'react';
import { mount } from 'enzyme';
import { RadioCore, RadioCoreProps } from './Radio';

const handleChange = jest.fn();

const RADIO_CORE_PROPS: RadioCoreProps = {
  children: () => React.createElement('div'),
  handleChange,
  selectedValue: 'blue',
  value: 'blue'
};

const inputSetup = (myProps = {}) => {
  const props = {
    ...RADIO_CORE_PROPS,
    ...myProps
  };

  return mount<RadioCore>(<RadioCore {...props} />);
};

describe('RadioCore', () => {
  afterEach(() => {
    handleChange.mockReset();
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
});
