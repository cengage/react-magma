import * as React from 'react';
import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { Icon, IconProps } from './Icon';
import { render, fireEvent, cleanup } from 'react-testing-library';

const BASE_ICON_PROPS: IconProps = {
  id: 'infoId',
  title: 'Info Title',
  type: 'info'
};

const renderIcon = (myProps = {}) => {
  const props = {
    ...BASE_ICON_PROPS,
    ...myProps
  };

  return render(<Icon {...props} />);
};

describe('Icon', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a icon with the passed in props', () => {
    const { container } = renderIcon();
    const title = container.firstChild.firstChild.childNodes[0];

    expect(title).toHaveAttribute('id', BASE_ICON_PROPS.id);
    expect(title).toHaveTextContent(BASE_ICON_PROPS.title);
  });

  it('should render an info icon', () => {
    const { container } = renderIcon({
      type: 'info'
    });
    const svg = container.firstChild.firstChild.childNodes[1];

    expect(svg).toHaveAttribute('d');
    expect(svg).toHaveAttribute('transform');
  });

  it('should render an angle down icon', () => {
    const { container } = renderIcon({
      type: 'angle-down'
    });
    const svg = container.firstChild.firstChild.childNodes[1];

    expect(svg).toHaveAttribute('d');
    expect(svg).toHaveAttribute('transform');
  });

  it('should render a folder open icon', () => {
    const { container } = renderIcon({
      type: 'folder-open'
    });
    const svg = container.firstChild.firstChild.childNodes[1];

    expect(svg).toHaveAttribute('d');
    expect(svg).toHaveAttribute('transform');
  });

  it('should not render a non-mapped icon', () => {
    const { container } = renderIcon({
      type: 'failure'
    });

    expect(container.firstChild).toBeNull();
  });

  it('should render with different color', () => {
    const color = 'red';
    const { container } = renderIcon({ color });
    const svg = container.firstChild.firstChild;

    expect(svg).toHaveAttribute('fill', color);
  });

  it('should render with different size', () => {
    const size = '32';
    const { container } = renderIcon({ size });
    const svg = container.firstChild.firstChild;

    expect(svg).toHaveAttribute('height', size);
    expect(svg).toHaveAttribute('width', size);
  });

  it('should trigger the passed in function when clicked', () => {
    const handleClickSpy = jest.fn();
    const { container } = renderIcon({
      handleClick: handleClickSpy
    });

    fireEvent(
      container.querySelector('span'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });
});
