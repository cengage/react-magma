import * as React from 'react';
import { mount } from 'enzyme';
import { IconCore, IconCoreProps } from './Icon';

const handleClick = jest.fn();

const ICON_CORE_PROPS: IconCoreProps = {
  children: () => React.createElement('div'),
  handleClick
};

const iconSetup = (myProps = {}) => {
  const props = {
    ...ICON_CORE_PROPS,
    ...myProps
  };

  return mount<IconCore>(<IconCore {...props} />);
};

describe('IconCore', () => {
  afterEach(() => {
    handleClick.mockReset();
  });

  describe('handle blur', () => {
    it('should call the handleClick from props during the internal handleClick', () => {
      const component = iconSetup();

      component.instance().handleClick();

      expect(ICON_CORE_PROPS.handleClick).toHaveBeenCalled();
    });

    it('should not fail if no handleClick is passed through the props', () => {
      const component = iconSetup({
        handleClick: undefined
      });

      component.instance().handleClick();

      expect(ICON_CORE_PROPS.handleClick).not.toHaveBeenCalled();
    });
  });
});
