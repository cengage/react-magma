import React from 'react';
import { Checkbox } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Checkbox', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Checkbox testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the checkbox', () => {
    const label = 'test label';
    const { getByText } = render(<Checkbox labelText={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it('should render a checkbox with desired attributes', () => {
    const label = 'test label';
    const id = 'abc123';
    const { getByLabelText } = render(<Checkbox id={id} labelText={label} />);

    const checkbox = getByLabelText(label);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', id);
    expect(checkbox).not.toHaveAttribute('required');
    expect(checkbox).not.toHaveAttribute('autoFocus');
  });

  it('should render a checkbox that is checked on render with defaultChecked', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <Checkbox labelText={label} defaultChecked />
    );

    expect(getByLabelText(label)).toHaveAttribute('checked');
  });

  it('should handle checked changes with defaultChecked', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <Checkbox labelText={label} defaultChecked />
    );

    const checkbox = getByLabelText(label);

    expect(checkbox).toHaveProperty('checked', true);

    fireEvent.click(checkbox);

    expect(checkbox).toHaveProperty('checked', false);
  });

  it('should allow for a controlled checked value', () => {
    const checked = true;
    const label = 'test label';
    const { rerender, getByLabelText } = render(
      <Checkbox labelText={label} checked={checked} />
    );

    const checkbox = getByLabelText(label);

    expect(checkbox).toHaveProperty('checked', checked);

    rerender(<Checkbox labelText={label} checked={!checked} />);

    expect(checkbox).toHaveProperty('checked', !checked);
  });

  it('should render an checkbox with a value passed through', () => {
    const value = 'Test Value';
    const testId = 'abc123';
    const { getByTestId } = render(<Checkbox testId={testId} value={value} />);

    expect(getByTestId(testId)).toHaveAttribute('value', value);
  });

  it('should auto focus your checkbox', () => {
    const testId = 'abc123';
    // eslint-disable-next-line jsx-a11y/no-autofocus
    const { getByTestId } = render(<Checkbox autoFocus testId={testId} />);
    expect(getByTestId(testId)).toHaveFocus();
  });

  it('should require the checkbox', () => {
    const testId = 'abc123';
    const { getByTestId } = render(<Checkbox testId={testId} required />);
    expect(getByTestId(testId)).toHaveAttribute('required');
  });

  it('should disable the checkbox', () => {
    const testId = 'abc123';
    const { container, getByTestId } = render(
      <Checkbox testId={testId} disabled />
    );

    const span = container.querySelector('span');

    expect(getByTestId(testId)).toBeDisabled();
    expect(span).toHaveStyleRule('background', magma.colors.neutral06);
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral05);
  });

  it('should render a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = render(<Checkbox color={color} />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', color);
  });

  it('should render an inverse checkbox with the correct styles', () => {
    const { container } = render(<Checkbox inverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', 'none');
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral08);
  });

  it('should render inverse with a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = render(<Checkbox color={color} inverse />);
    const span = container.querySelector('span');
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(span).toHaveStyleRule('background', 'none');
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral08);
  });

  it('should render an inverse, disabled checkbox with the correct styles', () => {
    const { container } = render(<Checkbox disabled inverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', 'none');
    expect(span).toHaveStyleRule('border-color', 'rgba(255,255,255,0.25)');
  });

  it('should render an inverse, checked checkbox with the correct styles', () => {
    const { container } = render(<Checkbox checked inverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('background', magma.colors.neutral08);
    expect(span).toHaveStyleRule('border-color', magma.colors.neutral08);
  });

  it('should render a checkbox with hidden label text with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <Checkbox labelText={label} textVisuallyHidden />
    );

    expect(getByLabelText(label)).toHaveStyleRule(
      'clip',
      'rect(1px,1px,1px,1px)'
    );
  });

  it('should give the checkbox an indeterminate value', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <Checkbox labelText={label} indeterminate />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
  });

  it('should update indeterminate on rerender', () => {
    const testId = 'abc123';
    const { getByTestId, rerender } = render(<Checkbox testId={testId} />);
    const checkbox = getByTestId(testId);

    expect(checkbox).toHaveProperty('indeterminate', false);

    rerender(<Checkbox testId={testId} indeterminate={true} />);

    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('should give the checkbox an indeterminate value', () => {
    const testId = 'abc123';
    const { getByTestId } = render(<Checkbox indeterminate testId={testId} />);
    expect(getByTestId(testId)).toHaveProperty('indeterminate');
  });

  it('should update indeterminate on rerender', () => {
    const testId = 'abc123';
    const { getByTestId, rerender } = render(<Checkbox testId={testId} />);
    const checkbox = getByTestId(testId);

    expect(checkbox).toHaveProperty('indeterminate', false);

    rerender(<Checkbox testId={testId} indeterminate />);

    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  describe('events', () => {
    it('should trigger the passed in onBlur when focus is removed', () => {
      const onBlurSpy = jest.fn();
      const testId = 'abc123';
      const { getByTestId } = render(
        <Checkbox testId={testId} onBlur={onBlurSpy} />
      );

      fireEvent(
        getByTestId(testId),
        new MouseEvent('blur', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in onChange when value of the checkbox is changed', () => {
      const onChangeSpy = jest.fn();
      const testId = 'abc123';
      const { getByTestId } = render(
        <Checkbox testId={testId} onChange={onChangeSpy} checked />
      );

      fireEvent.click(getByTestId(testId));

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in onFocus when focused', () => {
      const onFocusSpy = jest.fn();
      const testId = 'abc123';
      const { getByTestId } = render(
        <Checkbox testId={testId} onFocus={onFocusSpy} />
      );

      fireEvent(
        getByTestId(testId),
        new MouseEvent('focus', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
