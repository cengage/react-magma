/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { AsyncSelect } from '.';
import { act, render, fireEvent, waitForElement } from '@testing-library/react';
import { Search2Icon } from '../Icon/types/Search2Icon';
import { components as ReactSelectComponents } from 'react-select';
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
  let container;

  await act(async () => {
    ({ container } = render(
      <AsyncSelect
        labelText="test label"
        loadOptions={mockPromise.resolve(42)}
      />
    ));
  });
  await waitForElement(() => container.querySelector('input'));
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});

describe('Async', () => {
  describe('Timers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should load options', async () => {
      let container;
      let getByLabelText;
      let getByText;

      await act(async () => {
        ({ container, getByLabelText, getByText } = render(
          <AsyncSelect
            id="colorsSelect"
            labelText="Colors"
            loadOptions={promiseOptions}
          />
        ));
      });

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

      jest.runOnlyPendingTimers();

      await waitForElement(() => getByText('Red'));

      expect(getByText('Red')).toBeInTheDocument();
    });

    it('should have default options', async () => {
      let container;
      let getByLabelText;
      let getByText;

      await act(async () => {
        ({ container, getByLabelText, getByText } = render(
          <AsyncSelect
            id="colorsSelect"
            labelText="Colors"
            loadOptions={promiseOptions}
            defaultOptions={[{ label: 'Pink', value: 'pink' }]}
          />
        ));
      });

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

      jest.runOnlyPendingTimers();

      await waitForElement(() => getByText('Pink'));

      expect(getByText('Pink')).toBeInTheDocument();
    });

    it('should allow for the passing in of custom components', async () => {
      let getByTestId;
      const DropdownIndicator = props => {
        return (
          ReactSelectComponents.DropdownIndicator && (
            <ReactSelectComponents.DropdownIndicator {...props}>
              <Search2Icon testId="custom-dropdown-indicator" size={10} />
            </ReactSelectComponents.DropdownIndicator>
          )
        );
      };

      await act(async () => {
        ({ getByTestId } = render(
          <AsyncSelect
            id="customSelect"
            labelText="Custom"
            loadOptions={promiseOptions}
            components={{
              DropdownIndicator
            }}
          />
        ));
      });

      expect(getByTestId('custom-dropdown-indicator')).toBeInTheDocument();
    });
  });
});
