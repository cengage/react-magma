import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { IndeterminateCheckbox } from '.';

describe('Indeterminate Checkbox', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<IndeterminateCheckbox testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should find element by testId if indeterminate', () => {
    const testId = 'test-id2';
    const { getByTestId } = render(
      <IndeterminateCheckbox status="indeterminate" testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label that is an element', () => {
    const { getByLabelText } = render(
      <IndeterminateCheckbox
        status="indeterminate"
        labelText={<span>Hello</span>}
      />
    );

    expect(getByLabelText('Hello')).toBeInTheDocument();
  });

  it('should render the indeterminate checkbox with aria-hidden', () => {
    const { container } = render(<IndeterminateCheckbox />);

    const span = container.querySelector('span');

    expect(span).toHaveAttribute('aria-hidden', 'true');
  });

  it('should give the checkbox an indeterminate value', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <IndeterminateCheckbox labelText={label} status="indeterminate" />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
  });

  it('should update indeterminate on rerender', () => {
    const { queryByTestId, rerender } = render(<IndeterminateCheckbox />);

    expect(queryByTestId('indeterminateIcon')).not.toBeInTheDocument();

    rerender(<IndeterminateCheckbox status="indeterminate" />);

    expect(queryByTestId('indeterminateIcon')).toBeInTheDocument();
  });

  it('should render a checkbox with an indeterminate value with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText, container } = render(
      <IndeterminateCheckbox labelText={label} status="indeterminate" />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
    expect(container.querySelector('span')).toHaveStyleRule(
      'color',
      magma.colors.primary
    );
  });

  it('should render an inverse checkbox with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText, container } = render(
      <IndeterminateCheckbox isInverse labelText={label} />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
    expect(container.querySelector('span')).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
  });

  it('should render an inverse checkbox with an indeterminate value with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText, container } = render(
      <IndeterminateCheckbox
        isInverse
        labelText={label}
        status="indeterminate"
      />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
    expect(container.querySelector('span')).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
  });

  it('should give the indeterminate icon the passed in color', () => {
    const color = magma.colors.danger;
    const { container } = render(
      <IndeterminateCheckbox status="indeterminate" color={color} />
    );

    expect(container.querySelector('span')).toHaveStyleRule('color', color);
  });

  it('should not change checkbox value if checkbox is clicked while indeterminate is true', () => {
    const testId = 'abc123';
    const { getByTestId } = render(
      <IndeterminateCheckbox testId={testId} status="indeterminate" />
    );

    fireEvent.click(getByTestId(testId));

    expect(getByTestId(testId).checked).toBeFalsy();
    expect(getByTestId('indeterminateIcon')).toBeInTheDocument();
  });

  it('should render a disabled checkbox with the correct styles', () => {
    const label = 'test label';
    const { container } = render(
      <IndeterminateCheckbox
        labelText={label}
        disabled
        status="indeterminate"
      />
    );

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', magma.colors.neutral300);
    expect(span).toHaveStyleRule('cursor', 'not-allowed');
  });

  it('should render a disabled inverse checkbox with an indeterminate value with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText, container } = render(
      <IndeterminateCheckbox
        disabled
        isInverse
        labelText={label}
        status="indeterminate"
      />
    );

    expect(getByLabelText(label)).toHaveProperty('indeterminate');
    expect(container.querySelector('span')).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render an inverse disabled checkbox with the correct styles', () => {
    const label = 'test label';
    const { container } = render(
      <IndeterminateCheckbox labelText={label} disabled isInverse />
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render a checkbox with hidden label text with the correct styles', () => {
    const label = 'test label';
    const { getByLabelText } = render(
      <IndeterminateCheckbox labelText={label} isTextVisuallyHidden />
    );

    expect(getByLabelText(label)).toHaveStyleRule(
      'clip',
      'rect(1px, 1px, 1px, 1px)'
    );
  });

  it('should work with checked status', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <IndeterminateCheckbox testId={testId} status="checked" />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should trigger the passed in onChange when value of the checkbox is changed', () => {
    const onChangeSpy = jest.fn();
    const testId = 'abc123';
    const { getByTestId } = render(
      <IndeterminateCheckbox
        testId={testId}
        onChange={onChangeSpy}
        status="checked"
      />
    );

    fireEvent.click(getByTestId(testId));

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <IndeterminateCheckbox labelText="label" status="indeterminate" />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
