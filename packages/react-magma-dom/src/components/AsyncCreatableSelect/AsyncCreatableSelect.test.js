/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { AsyncCreatableSelect } from '.';
import { render, fireEvent, waitForElement } from 'react-testing-library';
const mockPromise = require('promise');

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

const filterColors = inputValue => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  mockPromise.resolve(filterColors(inputValue));

it('Does not violate accessibility standards', async () => {
  const { container } = render(
    <AsyncCreatableSelect
      labelText="test label"
      loadOptions={mockPromise.resolve(42)}
    />
  );
  await waitForElement(() => container.querySelector('input'));
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});

describe('Async Creatable', () => {
  describe('Timers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should load options', async () => {
      const { container, getByLabelText, getByText } = render(
        <AsyncCreatableSelect
          id="colorsSelect"
          labelText="Colors"
          loadOptions={promiseOptions}
        />
      );

      const input = container.querySelector('input');
      fireEvent.focus(input);

      let listOptions;
      await waitForElement(() => (listOptions = getByLabelText(/colors/i)));
      fireEvent.focus(listOptions);
      let listControl;
      await waitForElement(
        () =>
          (listControl = container.querySelector('#colorsSelect').children[1])
      );
      fireEvent.mouseDown(listControl);

      fireEvent.change(input, {
        target: {
          value: 'r'
        }
      });

      jest.runAllTimers();

      await waitForElement(() => getByText(/red/i));

      expect(getByText(/red/i)).toBeInTheDocument();
    });

    it('should have default options', async () => {
      const { container, getByLabelText, getByText } = render(
        <AsyncCreatableSelect
          id="colorsSelect"
          labelText="Colors"
          loadOptions={promiseOptions}
          defaultOptions={[{ label: 'Pink', value: 'pink' }]}
        />
      );

      const input = container.querySelector('input');
      fireEvent.focus(input);

      let listOptions;
      await waitForElement(() => (listOptions = getByLabelText(/colors/i)));
      fireEvent.focus(listOptions);
      let listControl;
      await waitForElement(
        () =>
          (listControl = container.querySelector('#colorsSelect').children[1])
      );
      fireEvent.mouseDown(listControl);

      jest.runAllTimers();

      await waitForElement(() => getByText(/pink/i));

      expect(getByText(/pink/i)).toBeInTheDocument();
    });

    it('should call onChange with the newly created option', async () => {
      const handleChange = jest.fn();
      const { container, getByText } = render(
        <AsyncCreatableSelect
          id="colorsSelect"
          labelText="Colors"
          loadOptions={promiseOptions}
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

      jest.runAllTimers();

      await waitForElement(() => getByText(/create "pink"/i));

      expect(getByText(/create "pink"/i)).toBeInTheDocument();
    });
  });
});
