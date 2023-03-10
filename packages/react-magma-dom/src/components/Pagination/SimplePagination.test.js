import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Pagination } from '.';
import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

const testId = 'test-id';

describe('Simple Pagination', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(<Pagination simple testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render a native select', () => {
    const { getByText } = render(<Pagination count={4} simple />);

    const selected = getByText('2').parentElement.parentElement;

    expect(selected).toHaveStyleRule(
      'background-color',
      magma.colors.neutral100
    );
    expect(selected).toHaveStyleRule('border-radius', '8px');
  });

  it('Should render an inverse select', () => {
    const { getByText } = render(<Pagination count={4} simple isInverse />);

    const selected = getByText('2').parentElement.parentElement;

    expect(selected).toHaveStyleRule(
      'background-color',
      transparentize(0.8, magma.colors.neutral900)
    );
  });

  it('Should render disabled navigation icons, text, and select', () => {
    const { getByText, getByLabelText } = render(
      <Pagination simple count={4} disabled />
    );
    const previousButton = getByLabelText('Previous Page');
    const nextButton = getByLabelText('Next Page');

    const selected = getByText('2').parentElement;

    expect(selected).toHaveStyleRule('cursor', 'not-allowed');

    expect(selected).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );

    expect(previousButton).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
    expect(nextButton).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('Should render inverse disabled navigation icons, text, and select', () => {
    const { getByText, getByLabelText } = render(
      <Pagination simple count={4} isInverse disabled />
    );
    const previousButton = getByLabelText('Previous Page');
    const nextButton = getByLabelText('Next Page');

    const selected = getByText('2').parentElement;

    expect(selected).toHaveStyleRule('cursor', 'not-allowed');

    expect(selected).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );

    expect(previousButton).toHaveStyleRule(
      'color',
      transparentize(0.7, magma.colors.neutral100)
    );
    expect(nextButton).toHaveStyleRule(
      'color',
      transparentize(0.7, magma.colors.neutral100)
    );
  });

  it('Should disable the previous button upon selecting the last page', () => {
    const { getByLabelText } = render(
      <Pagination simple count={4} defaultPage={2} testId={testId} />
    );
    let previousButton = getByLabelText('Previous Page');

    fireEvent.click(previousButton);

    expect(previousButton).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('Should disable the next button upon selecting the last page', () => {
    const { getByLabelText } = render(
      <Pagination simple count={4} defaultPage={3} testId={testId} />
    );
    let nextButton = getByLabelText('Next Page');

    fireEvent.click(nextButton);

    expect(nextButton).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('Should render a large variant of the pagination button', () => {
    const { container } = render(
      <Pagination count={4} simple size={'large'} />
    );
    const previousButton = container.querySelector('button');

    expect(previousButton).toHaveStyleRule(
      'height',
      magma.spaceScale.spacing11
    );
  });

  it('Should change the active page when an option is selected', () => {
    const { getByTestId, getAllByTestId } = render(
      <Pagination simple count={4} testId={testId} />
    );
    fireEvent.change(getByTestId(`${testId}-select`), { target: { value: 2 } });
    let options = getAllByTestId(`${testId}-option`);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  });

  it('Should change the active page when clicking the previous button', () => {
    const { getByLabelText, getAllByTestId } = render(
      <Pagination simple count={4} defaultPage={4} testId={testId} />
    );
    let previousButton = getByLabelText('Previous Page');

    fireEvent.click(previousButton);
    let options = getAllByTestId(`${testId}-option`);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
  });

  it('Should change the active page when clicking the next button', () => {
    const { getByLabelText, getAllByTestId } = render(
      <Pagination simple count={4} defaultPage={2} testId={testId} />
    );
    let nextButton = getByLabelText('Next Page');

    fireEvent.click(nextButton);
    let options = getAllByTestId(`${testId}-option`);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Pagination simple count={4} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
