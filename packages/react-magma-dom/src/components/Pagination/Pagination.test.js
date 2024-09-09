import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Pagination, PaginationType } from '.';
import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

describe('Pagination', () => {
  it('Should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Pagination testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render an unselected button with a white background', () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.neutral100);
    expect(button).toHaveStyleRule('color', magma.colors.primary);
  });

  it('Should render an unselected inverse button with no background', () => {
    const { getByText } = render(<Pagination count={4} isInverse />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('color', magma.colors.tertiary500);
  });

  it('Should render a selected button with a primary background', () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('1').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.primary);
    expect(button).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('Should render a selected inverse button with a tertiary background', () => {
    const { getByText } = render(<Pagination count={4} isInverse />);
    const button = getByText('1').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.tertiary500);
    expect(button).toHaveStyleRule('color', magma.colors.primary700);
  });

  it('Should render a disabled pagination icon or text color', () => {
    const { getByLabelText } = render(<Pagination count={4} disabled />);
    const button = getByLabelText('Previous Page');

    expect(button).toHaveStyleRule('background', magma.colors.neutral100);

    expect(button).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('Should render a disabled inverse icon color', () => {
    const { getByLabelText } = render(
      <Pagination count={4} isInverse disabled />
    );
    const button = getByLabelText('Previous Page');

    expect(button).toHaveStyleRule(
      'color',
      transparentize(0.7, magma.colors.neutral100)
    );
  });

  it('Should render a large variant of the pagination button', () => {
    const { container } = render(<Pagination count={4} size={'large'} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyleRule('height', magma.spaceScale.spacing11);
  });

  it('Should change the active page when clicking a pagination button', () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.neutral100);

    fireEvent.click(button);

    expect(button).toHaveStyleRule('background', magma.colors.primary);
  });

  it('Should change the active page when clicking the previous button', () => {
    const { getByLabelText } = render(<Pagination count={4} defaultPage={2} />);
    let previousButton = getByLabelText('Previous Page');

    expect(previousButton).toHaveStyleRule(
      'background',
      magma.colors.neutral100
    );

    fireEvent.click(previousButton);

    expect(previousButton).toHaveStyleRule(
      'background',
      magma.colors.neutral100
    );
  });

  it('Should change the active page when clicking the next button', () => {
    const { getByLabelText } = render(<Pagination count={4} defaultPage={3} />);
    let nextButton = getByLabelText('Next Page');

    expect(nextButton).toHaveStyleRule('background', magma.colors.neutral100);

    fireEvent.click(nextButton);

    expect(nextButton).toHaveStyleRule('background', magma.colors.neutral100);
  });

  it('Should change the active page number', () => {
    const handleChangePage = jest.fn();
    const { getByText } = render(
      <Pagination count={4} onPageChange={handleChangePage} />
    );
    const activeButton = getByText('2').parentElement;

    fireEvent.click(activeButton);

    expect(handleChangePage).toHaveBeenCalled();
  });

  it('Does not violate accessibility standards for classic type', () => {
    const { container } = render(<Pagination count={4} type={PaginationType.classic}/>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
