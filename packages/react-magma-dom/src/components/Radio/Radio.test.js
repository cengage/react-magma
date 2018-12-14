import * as React from 'react';
import 'jest-dom/extend-expect';
import { Radio } from './Radio';
import { RadioContext } from './RadioGroup';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { magma } from '../../theme/magma';

const RADIO_PROPS = {
  labelText: 'Blue',
  id: 'blueId',
  value: 'blue'
};

const RADIO_CONTEXT = {
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

  it('should disable the radio button', () => {
    const { container, getByLabelText } = renderRadio({ disabled: true });
    const radio = getByLabelText(RADIO_PROPS.labelText);
    const span = container.querySelector('span');

    expect(radio).toBeDisabled();
    expect(span).toHaveStyleRule('background', magma.colors.neutral06);
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral05);
  });

  it('should render a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = renderRadio({ color, checked: true });
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', color);
  });

  it('should render an inverse radio with the correct styles', () => {
    const { container } = renderRadio({ inverse: true });
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', 'none');
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral08);
  });

  it('should render an inverse, disabled radio with the correct styles', () => {
    const { container } = renderRadio({ disabled: true, inverse: true });
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', 'none');
    expect(span).toHaveStyleRule('border-color', 'rgba(255,255,255,0.25)');
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
