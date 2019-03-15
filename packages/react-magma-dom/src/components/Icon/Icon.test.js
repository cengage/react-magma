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

  describe('Snapshot Tests', () => {
    test.each(Object.keys(ICONS))('should render %s icon', icon => {
      const { container } = renderIcon(icon);

      expect(container).toMatchSnapshot();
    });
  });
});
