import React from 'react';

import { fireEvent, render, within } from '@testing-library/react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Pagination, PaginationType } from '.';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  it('Should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Pagination testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render an unselected button with no background', () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('background', 'none');
    expect(button).toHaveStyleRule('color', magma.colors.primary);
    expect(button).toHaveStyleRule('border-radius', '2rem');
  });

  it('Should render an unselected inverse button with no background', () => {
    const { getByText } = render(<Pagination count={4} isInverse />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('color', magma.colors.neutral0);
  });

  it('Should render a selected button with a primary background', () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('1').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.primary);
    expect(button).toHaveStyleRule('color', magma.colors.neutral0);
    expect(button).toHaveStyleRule('border-radius', '2rem');
  });

  it('Should render a selected inverse button with a tertiary background', () => {
    const { getByText } = render(<Pagination count={4} isInverse />);
    const button = getByText('1').parentElement;

    expect(button).toHaveStyleRule('background', magma.colors.brand.skyBlue);
    expect(button).toHaveStyleRule('color', magma.colors.brand.navy);
  });

  it('Should render a disabled pagination icon or text color', () => {
    const { getByLabelText } = render(<Pagination count={4} disabled />);
    const button = getByLabelText('Previous Page');

    expect(button).toHaveStyleRule('background', 'none');

    expect(button).toHaveStyleRule('color', magma.colors.neutral500);
  });

  it('Should render a disabled inverse icon color', () => {
    const { getByLabelText } = render(
      <Pagination count={4} isInverse disabled />
    );
    const button = getByLabelText('Previous Page');

    expect(button).toHaveStyleRule('color', magma.colors.neutral600);
  });

  it('Should render a large variant of the pagination button', () => {
    const { getByRole } = render(<Pagination count={4} size={'large'} />);
    const button = getByRole('button', { name: 'Go to Page 1' });

    expect(button).toHaveStyleRule('height', magma.spaceScale.spacing11);
    expect(button).toHaveStyleRule(
      'font-size',
      `${magma.typeScale.size03.fontSize}!important`
    );
    expect(button).toHaveStyleRule(
      'line-height',
      magma.typeScale.size03.lineHeight
    );
    expect(button).toHaveStyleRule(
      'letter-spacing',
      magma.typeScale.size03.letterSpacing
    );
  });

  it('Should render the default pagination buttons at 40px', () => {
    const { container } = render(<Pagination count={4} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyleRule('height', magma.spaceScale.spacing09);
    expect(button).toHaveStyleRule('width', magma.spaceScale.spacing09);
  });

  it('Should allow classic pagination controls to wrap', () => {
    const { getByRole } = render(<Pagination count={20} />);
    const list = getByRole('list');

    expect(list).toHaveStyleRule('flex-wrap', 'wrap');
    expect(list).toHaveStyleRule('gap', magma.spaceScale.spacing02);
  });

  it('Should use small text styles for default page numbers', () => {
    const { getByRole } = render(<Pagination count={4} />);
    const button = getByRole('button', { name: 'Go to Page 1' });

    expect(button).toHaveStyleRule(
      'font-size',
      `${magma.typeScale.size02.fontSize}!important`
    );
    expect(button).toHaveStyleRule(
      'letter-spacing',
      magma.typeScale.size02.letterSpacing
    );
    expect(button).toHaveStyleRule(
      'line-height',
      magma.typeScale.size02.lineHeight
    );
  });

  it('Should format page numbers with thousands separators', () => {
    const { getByRole } = render(
      <Pagination count={1000} defaultPage={1000} />
    );
    const button = getByRole('button', { name: 'Go to Page 1,000' });

    expect(button).toHaveTextContent('1,000');
  });

  it('Should render page-jump controls for both ellipses when enabled', () => {
    const onPageChange = jest.fn();
    const { getAllByRole } = render(
      <Pagination
        count={100}
        enablePageJump
        onPageChange={onPageChange}
        page={34}
      />
    );
    const [previousPages, nextPages] = getAllByRole('combobox');

    expect(previousPages).toHaveAccessibleName(
      'Select a page between 2 and 32'
    );
    expect(nextPages).toHaveAccessibleName('Select a page between 36 and 99');
    expect(
      within(previousPages).getByRole('option', { name: '20' })
    ).toBeInTheDocument();
    expect(
      within(nextPages).getByRole('option', { name: '75' })
    ).toBeInTheDocument();

    fireEvent.change(previousPages, { target: { value: '20' } });
    fireEvent.change(nextPages, { target: { value: '75' } });

    expect(onPageChange).toHaveBeenNthCalledWith(1, expect.anything(), 20);
    expect(onPageChange).toHaveBeenNthCalledWith(2, expect.anything(), 75);
  });

  it('Should keep ellipses non-interactive by default', () => {
    const { queryAllByRole } = render(
      <Pagination count={100} defaultPage={34} />
    );

    expect(queryAllByRole('combobox')).toHaveLength(0);
  });

  it('Should change the active page from an uncontrolled page-jump control', () => {
    const { getByLabelText, getByText } = render(
      <Pagination count={11} defaultPage={6} enablePageJump />
    );
    const previousPages = getByLabelText('Select a page between 2 and 4');

    fireEvent.change(previousPages, { target: { value: '3' } });

    expect(getByText('3').parentElement).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('Should move focus to the active page after a page jump', () => {
    const { getByLabelText, getByRole } = render(
      <Pagination count={20} defaultPage={10} enablePageJump />
    );
    const previousPages = getByLabelText('Select a page between 2 and 8');

    fireEvent.change(previousPages, { target: { value: '5' } });

    expect(getByRole('button', { name: 'Go to Page 5' })).toHaveFocus();
  });

  it('Should disable page-jump controls with Pagination', () => {
    const { getAllByRole } = render(
      <Pagination count={100} defaultPage={34} disabled enablePageJump />
    );

    getAllByRole('combobox').forEach(pageJump => {
      expect(pageJump).toBeDisabled();
    });
  });

  it('Should show tooltips for the previous and next buttons', () => {
    const { getByLabelText, getByRole } = render(
      <Pagination count={4} defaultPage={2} />
    );
    const previousButton = getByLabelText('Previous Page');
    const nextButton = getByLabelText('Next Page');

    fireEvent.focus(previousButton);
    expect(getByRole('tooltip')).toHaveTextContent('Previous');
    expect(getByRole('tooltip')).toHaveAttribute(
      'data-tooltip-placement',
      'bottom'
    );

    fireEvent.blur(previousButton);
    fireEvent.focus(nextButton);
    expect(getByRole('tooltip')).toHaveTextContent('Next');
  });

  it('Should not show tooltips for disabled arrow buttons', () => {
    const { getByLabelText, queryByRole } = render(<Pagination count={4} />);
    const previousButton = getByLabelText('Previous Page');

    fireEvent.mouseEnter(previousButton);
    fireEvent.focus(previousButton);

    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('Should change the active page when clicking a pagination button', async () => {
    const { getByText } = render(<Pagination count={4} />);
    const button = getByText('2').parentElement;

    expect(button).toHaveStyleRule('background', 'none');

    await userEvent.click(button);

    expect(button).toHaveStyleRule('background', magma.colors.primary);
  });

  it('Should change the active page when clicking the previous button', async () => {
    const { getByLabelText } = render(<Pagination count={4} defaultPage={2} />);
    const previousButton = getByLabelText('Previous Page');

    expect(previousButton).toHaveStyleRule('background', 'none');
    expect(previousButton).toHaveStyleRule('border-radius', '100%');

    await userEvent.click(previousButton);

    expect(previousButton).toHaveStyleRule('background', 'none');
  });

  it('Should change the active page when clicking the next button', async () => {
    const { getByLabelText } = render(<Pagination count={4} defaultPage={3} />);
    const nextButton = getByLabelText('Next Page');

    expect(nextButton).toHaveStyleRule('background', 'none');
    expect(nextButton).toHaveStyleRule('border-radius', '100%');

    await userEvent.click(nextButton);

    expect(nextButton).toHaveStyleRule('background', 'none');
  });

  it('Should change the active page number', async () => {
    const handleChangePage = jest.fn();
    const { getByText } = render(
      <Pagination count={4} onPageChange={handleChangePage} />
    );
    const activeButton = getByText('2').parentElement;

    await userEvent.click(activeButton);

    expect(handleChangePage).toHaveBeenCalled();
  });

  it('Does not violate accessibility standards for classic type', () => {
    const { container } = render(
      <Pagination
        count={100}
        defaultPage={34}
        enablePageJump
        type={PaginationType.classic}
      />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
