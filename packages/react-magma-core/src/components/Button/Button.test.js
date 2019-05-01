import React from 'react';
import { mount } from 'enzyme';
import { ButtonCore } from './Button';

const onClick = jest.fn();

const INPUT_CORE_PROPS = {
  children: () => React.createElement('div'),
  id: 'testId',
  onClick
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
    onClick.mockReset();
  });

  describe('handle blur', () => {
    it('should call the onClick from props during the internal onClick', () => {
      const component = buttonSetup();

      component.instance().onClick();

      expect(INPUT_CORE_PROPS.onClick).toHaveBeenCalled();
    });

    it('should not fail if no onClick is passed through the props', () => {
      const component = buttonSetup({
        onClick: undefined
      });

      component.instance().onClick();

      expect(INPUT_CORE_PROPS.onClick).not.toHaveBeenCalled();
    });
  });
});
