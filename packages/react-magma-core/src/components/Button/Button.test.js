import React from 'react';
import { mount } from 'enzyme';
import { ButtonCore } from './Button';

const handleClick = jest.fn();

const INPUT_CORE_PROPS = {
  children: () => React.createElement('div'),
  handleClick
};

const buttonSetup = (myProps = {}) => {
  const props = {
    ...INPUT_CORE_PROPS,
    ...myProps
  };

  return mount(<ButtonCore {...props} />);
};

describe('ButtonCore', () => {
  afterEach(() => {
    handleClick.mockReset();
  });

  describe('handle blur', () => {
    it('should call the handleClick from props during the internal handleClick', () => {
      const component = buttonSetup();

      component.instance().handleClick();

      expect(INPUT_CORE_PROPS.handleClick).toHaveBeenCalled();
    });

    it('should not fail if no handleClick is passed through the props', () => {
      const component = buttonSetup({
        handleClick: undefined
      });

      component.instance().handleClick();

      expect(INPUT_CORE_PROPS.handleClick).not.toHaveBeenCalled();
    });
  });
});
