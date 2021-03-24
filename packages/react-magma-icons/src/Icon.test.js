import React from 'react';
import * as IconExports from './index';
import { render } from '@testing-library/react';
import { renderIcon as renderIconUtil } from './SvgIcon';
import { AddToQueueIcon } from './icons/AV/AddToQueueIcon';

const omit = (props, obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !props.includes(key))
  );
};

// eslint-disable-next-line no-unused-vars
const ICONS = omit(['IconProps', 'SvgIconProps', 'categories'], IconExports);

describe('Icon', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const Icon = AddToQueueIcon; //ICONS[Object.keys(ICONS)[0]];
    const { getByTestId } = render(<Icon testId={testId} title="testTitle" />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should return null is no iconType is passed in', () => {
    const icon = renderIconUtil({ id: 'id', title: 'title' });

    expect(icon).toBeNull();
  });

  it('should auto assign an id if none is passed in', () => {
    const Icon = AddToQueueIcon; //ICONS[Object.keys(ICONS)[0]];
    const { container } = render(<Icon title="testTitle" />);

    expect(container.querySelector('svg').id).not.toBeNull();
  });

  it('should persist id between renders', () => {
    const Icon = AddToQueueIcon; //ICONS[Object.keys(ICONS)[0]];
    const { container, rerender } = render(<Icon title="testTitle" />);

    const title = container.querySelector('title');
    const initialId = title.id;

    rerender(<Icon title="newTitle" />);

    expect(title.id).toEqual(initialId);
  });

  it('should update the id on rerender with change to prop id', () => {
    const Icon = AddToQueueIcon; //ICONS[Object.keys(ICONS)[0]];
    const { container, rerender } = render(<Icon title="testTitle" />);

    const title = container.querySelector('title');
    const initialId = title.id;

    rerender(<Icon id="newId" title="testTitle" />);

    expect(title.id).not.toEqual(initialId);
  });

  describe('Snapshot Tests', () => {
    test.each(Object.keys(ICONS))('should render %s icon', icon => {
      const id = icon + 'Available';
      const title = icon + ' Title';
      const Icon = ICONS[icon];

      const { container } = render(<Icon id={id} title={title} />);

      expect(container).toMatchSnapshot();
    });
  });
});
