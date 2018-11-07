import * as React from 'react';
import 'jest-dom/extend-expect';
import { Radio, RadioProps } from './Radio';
import { RadioContext, RadioContextInterface } from './RadioGroup';
import { render, cleanup, fireEvent } from 'react-testing-library';

const RADIO_PROPS: RadioProps = {
  labelText: 'Blue',
  value: 'blue'
};

const RADIO_CONTEXT: RadioContextInterface = {
  name: 'colors',
  selectedValue: 'red',
  handleChange: jest.fn()
};

const renderRadio = (myProps = {}, myContext = {}) => {
  const props = {
    ...RADIO_PROPS,
    ...myProps
  };

  const context = {
    ...RADIO_CONTEXT,
    ...myContext
  };

  return render(
    <RadioContext.Provider value={context}>
      <Radio {...props} />
    </RadioContext.Provider>
  );
};

describe('Radio Group', () => {
  afterEach(cleanup);

  it('should render a label for the radio', () => {
    const { getByText } = renderRadio();
    const label = getByText(RADIO_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render radio', () => {
    const { getByLabelText } = renderRadio();
    const radio = getByLabelText(RADIO_PROPS.labelText);

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('name', RADIO_CONTEXT.name);
  });

  it("should be checked if selected value equals it's value", () => {
    const { getByLabelText } = renderRadio(
      {},
      {
        selectedValue: RADIO_PROPS.value
      }
    );
    const radio = getByLabelText(RADIO_PROPS.labelText);

    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('changing a radio button calls the passed in handleChange function', () => {
    const { getByLabelText } = renderRadio();

    fireEvent(
      getByLabelText(RADIO_PROPS.labelText),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(RADIO_CONTEXT.handleChange).toHaveBeenCalledTimes(1);
  });
});
