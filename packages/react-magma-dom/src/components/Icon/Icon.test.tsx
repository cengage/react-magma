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
    const svg = container.firstChild.firstChild.childNodes[1];

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

  describe('Snapshot Tests', () => {
    it('should render an info icon', () => {
      renderForSnapshots('info');
    });

    it('should render an angle-down icon', () => {
      renderForSnapshots('angle-down');
    });

    it('should render an folder-open icon', () => {
      renderForSnapshots('folder-open');
    });
  });
});

function renderForSnapshots(type) {
  const { container } = renderIcon({ type });

  expect(container).toMatchSnapshot();
}
