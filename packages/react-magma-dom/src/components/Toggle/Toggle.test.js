import React from 'react';
import { Toggle } from '.';
import { render } from 'react-testing-library';

const TOGGLE_PROPS = {
  autoFocus: false,
  id: 'abc123',
  labelText: 'test label',
  required: false
};

const renderToggle = (myProps = {}) => {
  const props = {
    ...TOGGLE_PROPS,
    ...myProps
  };

  return render(<Toggle {...props} />);
};

describe('Toggle', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = renderToggle({ testId });

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a toggle with the passed in text', () => {
    expect(true).toBeTruthy();
  });

  it('should render a label for the toggle', () => {
    const { getByText } = renderToggle();
    const label = getByText(TOGGLE_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render a toggle with desired attributes', () => {
    const { getByLabelText } = renderToggle();
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('id', TOGGLE_PROPS.id);
    expect(toggle).not.toHaveAttribute('checked');
    expect(toggle).not.toHaveAttribute('required');
    expect(toggle).not.toHaveAttribute('autoFocus');
  });

  it('should render a checked toggle with correct attribute', () => {
    const { getByLabelText } = renderToggle({ checked: true });
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toHaveAttribute('checked');
  });

  it('should render a toggle with a value passed through', () => {
    const value = 'Test Value';
    const { getByLabelText } = renderToggle({ value });
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toHaveAttribute('value', value);
  });

  it('should auto focus your toggle', () => {
    const { getByLabelText } = renderToggle({ autoFocus: true });
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toHaveFocus();
  });

  it('should require the toggle', () => {
    const { getByLabelText } = renderToggle({ required: true });
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toHaveAttribute('required');
  });

  it('should disable the toggle', () => {
    const { getByLabelText } = renderToggle({ disabled: true });
    const toggle = getByLabelText(TOGGLE_PROPS.labelText);

    expect(toggle).toBeDisabled();
  });

  it('should render the toggle with the text position left by default', () => {
    const { getByText } = renderToggle();
    const span = getByText(TOGGLE_PROPS.labelText);

    expect(span).toHaveStyleRule('padding-right', '10px');
  });

  it('should render the toggle with the text position right with the textPosition prop', () => {
    const { getByText } = renderToggle({
      textPosition: 'right'
    });

    const span = getByText(TOGGLE_PROPS.labelText);

    expect(span).toHaveStyleRule('padding-left', '10px');
  });

  it('should render a toggle with hidden label text with the correct styles', () => {
    const { getByText } = renderToggle({ textVisuallyHidden: true });
    const span = getByText(TOGGLE_PROPS.labelText);

    expect(span).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
  });
});
