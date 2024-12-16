import React from 'react';
import { Checkbox } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { axe } from '../../../axe-helper';
import { transparentize } from 'polished';

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

  it('should render the checkbox with aria-hidden', () => {
    const { container } = render(<Checkbox />);

    const span = container.querySelector('span');

    expect(span).toHaveAttribute('aria-hidden', 'true');
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

  it('should not change the checked value if checkbox is in controlled state', () => {
    const checked = true;
    const testId = 'abc123';
    const { getByTestId } = render(
      <Checkbox testId={testId} checked={checked} />
    );

    const checkbox = getByTestId(testId);

    expect(checkbox).toHaveProperty('checked', checked);

    fireEvent.click(checkbox);

    expect(checkbox).toHaveProperty('checked', checked);
  });

  it('should change the checked value if checkbox is in controlled state and the checked prop is updated', () => {
    const checked = true;
    const testId = 'abc123';
    const { rerender, getByTestId } = render(
      <Checkbox testId={testId} checked={checked} />
    );

    const checkbox = getByTestId(testId);

    expect(checkbox).toHaveProperty('checked', checked);

    rerender(<Checkbox testId={testId} checked={!checked} />);

    expect(checkbox).toHaveProperty('checked', !checked);
  });

  it('should use the defaultChecked prop for initial render and then handle internally if not controlled', () => {
    const defaultChecked = true;
    const testId = 'abc123';
    const { getByTestId } = render(
      <Checkbox testId={testId} defaultChecked={defaultChecked} />
    );

    const checkbox = getByTestId(testId);

    expect(checkbox).toHaveProperty('checked', defaultChecked);

    fireEvent.click(checkbox);

    expect(checkbox).toHaveProperty('checked', !defaultChecked);
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
    expect(span).toHaveStyleRule('color', magma.colors.neutral300);
  });

  it('should render a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = render(<Checkbox checked color={color} />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', color);
  });

  it('should render an inverse checkbox with the correct styles', () => {
    const { container } = render(<Checkbox isInverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('should render inverse with a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = render(<Checkbox color={color} isInverse />);
    const span = container.querySelector('span');
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(span).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('should render an inverse, disabled checkbox with the correct styles', () => {
    const { container } = render(<Checkbox disabled isInverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render an inverse, checked checkbox with the correct styles', () => {
    const { container } = render(<Checkbox checked isInverse />);
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('should render a checkbox with hidden label text with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <Checkbox labelText={label} isTextVisuallyHidden />
    );

    expect(getByLabelText(label)).toHaveStyleRule(
      'clip',
      'rect(1px, 1px, 1px, 1px)'
    );
  });

  it('should render a checkbox with an error message', () => {
    const errorMessage = 'test error';
    const labelText = 'test label';
    const { getByText, getByLabelText, container } = render(
      <Checkbox errorMessage={errorMessage} id="testId" labelText={labelText} />
    );

    const span = container.querySelector('span');
    expect(span).toHaveStyleRule('border-color', magma.colors.danger);
    expect(getByLabelText(labelText)).toHaveAttribute(
      'aria-describedby',
      'testId__desc'
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
    expect(getByText(errorMessage).parentElement).toHaveAttribute(
      'id',
      'testId__desc'
    );
  });

  it('should render an inverse checkbox with error styling', () => {
    const errorMessage = 'test error';
    const labelText = 'test label';
    const { container } = render(
      <Checkbox errorMessage={errorMessage} isInverse labelText={labelText} />
    );

    const span = container.querySelector('span');
    expect(span).toHaveStyleRule('border-color', magma.colors.danger300);
    expect(span).toHaveStyleRule('color', magma.colors.neutral100);
  });

  describe('events', () => {
    it('should trigger the passed in onBlur when focus is removed', () => {
      const onBlurSpy = jest.fn();
      const testId = 'abc123';
      const { getByTestId } = render(
        <Checkbox testId={testId} onBlur={onBlurSpy} />
      );

      const checkbox = getByTestId(testId);
      checkbox.focus();
      checkbox.blur();

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

      const checkbox = getByTestId(testId);
      checkbox.focus();

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Checkbox labelText="label" />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
