import * as React from 'react';
import { Radio } from '.';
import { RadioContext } from '../RadioGroup';
import { render, fireEvent } from 'react-testing-library';
import { magma } from '../../theme/magma';

const RADIO_PROPS = {
  labelText: 'Blue',
  id: 'blueId',
  value: 'blue',
  name: 'colors',
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn()
};
const RADIO_CONTEXT = {
  name: 'colors',
  selectedValue: 'red',
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn()
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
  it('should auto assign an id if none is passed in', () => {
    const { getByLabelText } = renderRadio({ id: null });

    expect(getByLabelText(RADIO_PROPS.labelText).id).not.toBeNull();
  });

  it('should persist id between renders', () => {
    const { rerender, getByLabelText } = renderRadio({ id: null });

    const radio = getByLabelText(RADIO_PROPS.labelText);
    const initialId = radio.id;
    const initialValue = radio.value;

    rerender(
      <RadioContext.Provider value={RADIO_CONTEXT}>
        <Radio {...RADIO_PROPS} id={null} value="pink" />
      </RadioContext.Provider>
    );

    expect(radio.value).not.toEqual(initialValue);
    expect(radio.id).toEqual(initialId);
  });

  it('should update the id on rerender with change to prop id', () => {
    const { rerender, getByLabelText } = renderRadio({ id: null });

    const radio = getByLabelText(RADIO_PROPS.labelText);
    const initialId = radio.id;

    rerender(
      <RadioContext.Provider value={RADIO_CONTEXT}>
        <Radio {...RADIO_PROPS} id="differentId" />
      </RadioContext.Provider>
    );

    expect(radio.id).not.toEqual(initialId);
  });

  it('should render a label for the radio', () => {
    const { getByText } = renderRadio();
    const label = getByText(RADIO_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render radio button', () => {
    const { getByLabelText } = renderRadio();
    const radio = getByLabelText(RADIO_PROPS.labelText);

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('name', RADIO_PROPS.name);
  });

  it('should require the radio button', () => {
    const { getByLabelText } = renderRadio({ required: true });
    const radio = getByLabelText(RADIO_PROPS.labelText);

    expect(radio).toHaveAttribute('required');
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

  it('should render a radio with hidden label text with the correct styles', () => {
    const { getByLabelText } = renderRadio({ textVisuallyHidden: true });
    const span = getByLabelText(RADIO_PROPS.labelText);

    expect(span).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
  });

  it("should be checked if selected value equals it's value", () => {
    const { getByLabelText } = renderRadio(
      {},
      { selectedValue: RADIO_PROPS.value }
    );
    const radio = getByLabelText(RADIO_PROPS.labelText);

    expect(radio).toHaveAttribute('checked');
  });

  it('blurring a radio button calls the passed in onBlur function', () => {
    const { getByLabelText } = renderRadio();

    fireEvent(
      getByLabelText(RADIO_PROPS.labelText),
      new MouseEvent('blur', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(RADIO_CONTEXT.onBlur).toHaveBeenCalledTimes(1);
  });

  it('changing a radio button calls the passed in onChange function', () => {
    const { getByLabelText } = renderRadio();

    fireEvent(
      getByLabelText(RADIO_PROPS.labelText),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(RADIO_CONTEXT.onChange).toHaveBeenCalledTimes(1);
  });

  it('focusing a radio button calls the passed in onFocus function', () => {
    const { getByLabelText } = renderRadio();

    fireEvent(
      getByLabelText(RADIO_PROPS.labelText),
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(RADIO_CONTEXT.onFocus).toHaveBeenCalledTimes(1);
  });
});
