/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { CreatableSelect } from '.';
import { render, fireEvent, waitForElement } from '@testing-library/react';

const colourOptions = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Blue',
    value: 'blue'
  }
];

it('Does not violate accessibility standards', async () => {
  const { container } = render(
    <CreatableSelect labelText="test label" options={colourOptions} />
  );
  await waitForElement(() => container.querySelector('input'));
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});

describe('Creatable', () => {
  it('should call onChange with the new option', async () => {
    const handleChange = jest.fn();
    const { container, getByText } = render(
      <CreatableSelect
        id="colorsSelect"
        labelText="Colors"
        options={colourOptions}
        onChange={handleChange}
      />
    );

    const input = container.querySelector('input');
    fireEvent.focus(input);

    fireEvent.change(input, {
      target: {
        value: 'pink'
      }
    });

    await waitForElement(() => getByText('Create "pink"'));

    expect(getByText('Create "pink"')).toBeInTheDocument();
  });
});
