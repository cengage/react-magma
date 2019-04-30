import React from 'react';
import { ICONS } from '.';
import { render } from 'react-testing-library';
import { renderIcon as renderIconUtil } from './utils';

const renderIcon = icon => {
  const id = icon + 'Available';
  const title = icon + ' Title';
  const Icon = ICONS[icon];

  return render(<Icon id={id} title={title} />);
};

describe('Icon', () => {
  it('should return null is no iconType is passed in', () => {
    const icon = renderIconUtil({ id: 'id', title: 'title' });

    expect(icon).toBeNull();
  });

  it('should auto assign an id if none is passed in', () => {
    const Icon = ICONS[Object.keys(ICONS)[0]];
    const { container } = render(<Icon title="testTitle" />);

    expect(container.querySelector('svg').id).not.toBeNull();
  });

  it('should not update the id on rerender', () => {
    const Icon = ICONS[Object.keys(ICONS)[0]];
    const { container, rerender } = render(<Icon title="testTitle" />);

    const svg = container.querySelector('svg');
    const initialId = svg.id;

    rerender(<Icon title="newTitle" />);

    expect(svg.id).toEqual(initialId);
  });

  describe('Snapshot Tests', () => {
    test.each(Object.keys(ICONS))('should render %s icon', icon => {
      const { container } = renderIcon(icon);

      expect(container).toMatchSnapshot();
    });
  });
});
