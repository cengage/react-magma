import React from 'react';
import { Icon } from './Icon';
import { ICONS } from './types/icons';
import { render, cleanup } from 'react-testing-library';

const baseIconType = Object.keys(ICONS)[0];

const BASE_ICON_PROPS = {
  id: `${baseIconType}Id`,
  title: `${baseIconType} Title`,
  type: baseIconType
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
    const title = container.firstChild.childNodes[0];
    const svg = container.firstChild.childNodes[1];

    expect(title).toHaveAttribute('id', BASE_ICON_PROPS.id);
    expect(title).toHaveTextContent(BASE_ICON_PROPS.title);
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
    const svg = container.firstChild;

    expect(svg).toHaveAttribute('fill', color);
  });

  it('should render with different size', () => {
    const size = '32';
    const { container } = renderIcon({ size });
    const svg = container.firstChild;

    expect(svg).toHaveAttribute('height', size);
    expect(svg).toHaveAttribute('width', size);
  });

  describe('Snapshot Tests', () => {
    test.each(Object.keys(ICONS))('should render %s icon', type => {
      const { container } = renderIcon({
        id: `${type}Id`,
        title: `${type} icon`,
        type
      });

      expect(container).toMatchSnapshot();
    });
  });
});
