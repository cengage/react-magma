import * as React from 'react';
import 'jest-dom/extend-expect';
import {
  RadioGroup,
  RadioGroupProps,
  RadioContext,
  RadioContextInterface
} from './RadioGroup';
import { render, cleanup, fireEvent } from 'react-testing-library';

const RADIO_GROUP_PROPS: RadioGroupProps = {
  name: 'colors',
  labelText: 'Colors',
  children: React.createElement('div')
};

const RADIO_CONTEXT: RadioContextInterface = {
  name: RADIO_GROUP_PROPS.name,
  selectedValue: 'value',
  handleChange: jest.fn()
};

const renderRadioGroup = (myProps = {}) => {
  const props = {
    ...RADIO_GROUP_PROPS,
    ...myProps
  };

  return render(<RadioGroup {...props} />);
};

describe('Radio Group', () => {
  afterEach(cleanup);

  it('should render a label for the radiogroup', () => {
    const { getByText } = renderRadioGroup();
    const label = getByText(RADIO_GROUP_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render children under radiogroup', () => {
    const { container } = renderRadioGroup();
    const radiogroup = container.querySelector('div[role="radiogroup"]');

    expect(radiogroup.firstChild).not.toBeNull();
  });
});

describe('Radio Conext', () => {
  afterEach(cleanup);

  it('RadioProvider passes context to consumer', () => {
    const tree = (
      <RadioContext.Provider value={RADIO_CONTEXT}>
        <RadioContext.Consumer>
          {value => (
            <div>
              <span>Name: {value.name}</span>
              <span>Selected Value: {value.selectedValue}</span>
              <button onClick={value.handleChange}>Click</button>
            </div>
          )}
        </RadioContext.Consumer>
      </RadioContext.Provider>
    );
    const { getByText } = render(tree);
    expect(getByText(/^Name:/).textContent).toBe(`Name: ${RADIO_CONTEXT.name}`);
    expect(getByText(/^Selected Value:/).textContent).toBe(
      `Selected Value: ${RADIO_CONTEXT.selectedValue}`
    );

    fireEvent(
      getByText('Click'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(RADIO_CONTEXT.handleChange).toHaveBeenCalledTimes(1);
  });
});
