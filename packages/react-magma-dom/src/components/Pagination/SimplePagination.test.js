import React from 'react';
import { ButtonSize } from '../Button';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Pagination, PaginationType } from '.';
import { act, render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

const testId = 'test-id';

describe('Simple Pagination', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(
      <Pagination type={PaginationType.simple} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render a native select', () => {
    const { getByText } = render(
      <Pagination count={4} type={PaginationType.simple} />
    );

    const selected = getByText('2').parentElement.parentElement;

    expect(selected).toHaveStyleRule(
      'background-color',
      magma.colors.neutral100
    );
    expect(selected).toHaveStyleRule('border-radius', '8px');
  });

  it('Should render an inverse select', () => {
    const { getByText } = render(
      <Pagination count={4} type={PaginationType.simple} isInverse />
    );

    const selected = getByText('2').parentElement.parentElement;

    expect(selected).toHaveStyleRule(
      'background-color',
      transparentize(0.8, magma.colors.neutral900)
    );
  });

  it('Should hide the previous button when the prop hidePreviousButton is used', () => {
    const { queryByText } = render(
      <Pagination type={PaginationType.simple} count={4} hidePreviousButton />
    );
    let previousButton = queryByText('Previous Page');

    expect(previousButton).not.toBeInTheDocument();
  });

  it('Should hide the next button when the prop hideNextButton is used', () => {
    const { queryByText } = render(
      <Pagination type={PaginationType.simple} count={4} hideNextButton />
    );
    let nextButton = queryByText('Next Page');

    expect(nextButton).not.toBeInTheDocument();
  });

  describe('Disabled', () => {
    it('Should render disabled navigation icons, text, and select', () => {
      const { getByText, getByLabelText } = render(
        <Pagination type={PaginationType.simple} count={4} disabled />
      );
      const previousButton = getByLabelText('Previous Page');
      const nextButton = getByLabelText('Next Page');

      const selected = getByText('2').parentElement;

      expect(selected).toHaveStyleRule('cursor', 'not-allowed');

      expect(selected).toHaveStyleRule(
        'color',
        transparentize(0.4, magma.colors.neutral500)
      );
      expect(selected).toHaveAttribute('disabled');

      expect(previousButton).toHaveStyleRule(
        'color',
        transparentize(0.4, magma.colors.neutral500)
      );
      expect(nextButton).toHaveStyleRule(
        'color',
        transparentize(0.4, magma.colors.neutral500)
      );
      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');
    });

    it('Should render inverse disabled navigation icons, text, and select', () => {
      const { getByText, getByLabelText } = render(
        <Pagination type={PaginationType.simple} count={4} isInverse disabled />
      );
      const previousButton = getByLabelText('Previous Page');
      const nextButton = getByLabelText('Next Page');

      const selected = getByText('2').parentElement;

      expect(selected).toHaveStyleRule('cursor', 'not-allowed');

      expect(selected).toHaveStyleRule(
        'color',
        transparentize(0.6, magma.colors.neutral100)
      );
      expect(selected).toHaveAttribute('disabled');

      expect(previousButton).toHaveStyleRule(
        'color',
        transparentize(0.7, magma.colors.neutral100)
      );
      expect(nextButton).toHaveStyleRule(
        'color',
        transparentize(0.7, magma.colors.neutral100)
      );
      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');
    });

    it('Should disable the previous button on the first page', () => {
      const { getByLabelText } = render(
        <Pagination type={PaginationType.simple} count={4} defaultPage={1} />
      );
      const previousButton = getByLabelText('Previous Page');

      expect(previousButton).toBeDisabled();
    });

    it('Should disable the next button on the last page', () => {
      const { getByLabelText } = render(
        <Pagination type={PaginationType.simple} count={4} defaultPage={4} />
      );
      const nextButton = getByLabelText('Next Page');

      expect(nextButton).toBeDisabled();
    });
  });

  describe('Active', () => {
    it('Should change the active page when an option is selected', () => {
      const { getByTestId } = render(
        <Pagination type={PaginationType.simple} count={3} testId={testId} />
      );
      fireEvent.change(getByTestId(`${testId}-select`), {
        target: { value: '2' },
      });
      let option1 = getByTestId(`${testId}-option-0`);
      let option2 = getByTestId(`${testId}-option-1`);
      let option3 = getByTestId(`${testId}-option-2`);
      expect(option1.selected).toBe(false);
      expect(option2.selected).toBe(true);
      expect(option3.selected).toBe(false);
    });

    it('Should change the active page when clicking the previous button', () => {
      const { getByLabelText, getByTestId } = render(
        <Pagination
          type={PaginationType.simple}
          count={3}
          defaultPage={3}
          testId={testId}
        />
      );
      let previousButton = getByLabelText('Previous Page');

      fireEvent.click(previousButton);
      let option1 = getByTestId(`${testId}-option-0`);
      let option2 = getByTestId(`${testId}-option-1`);
      let option3 = getByTestId(`${testId}-option-2`);
      expect(option1.selected).toBe(false);
      expect(option2.selected).toBe(true);
      expect(option3.selected).toBe(false);
    });

    it('Should change the active page when clicking the next button', () => {
      const { getByLabelText, getByTestId } = render(
        <Pagination
          type={PaginationType.simple}
          count={3}
          defaultPage={2}
          testId={testId}
        />
      );
      let nextButton = getByLabelText('Next Page');

      fireEvent.click(nextButton);
      let option1 = getByTestId(`${testId}-option-0`);
      let option2 = getByTestId(`${testId}-option-1`);
      let option3 = getByTestId(`${testId}-option-2`);
      expect(option1.selected).toBe(false);
      expect(option2.selected).toBe(false);
      expect(option3.selected).toBe(true);
    });
  });

  describe('Different labels', () => {
    it('Should show the label "of 1 page" when count is 1', () => {
      const { getByTestId } = render(
        <Pagination type={PaginationType.simple} count={1} testId={testId} />
      );

      const labelText = getByTestId(`${testId}-label`);

      expect(labelText).toHaveTextContent('1');
    });

    it('Should show the label "of 2 pages" when count is 2', () => {
      const { getByTestId } = render(
        <Pagination type={PaginationType.simple} count={2} testId={testId} />
      );

      const labelText = getByTestId(`${testId}-label`);

      expect(labelText).toHaveTextContent('2');
    });
  });

  describe('Unused props', () => {
    it('Should remain unaffected by the numberOfAdjacentPages prop', () => {
      const { getByTestId } = render(
        <Pagination
          type={PaginationType.simple}
          count={4}
          testId={testId}
          numberOfAdjacentPages={200}
        />
      );

      let selecOptions = getByTestId(`${testId}-select`);

      expect(selecOptions).toHaveLength(4);
    });

    it('Should remain unaffected by the numberOfEdgePages prop', () => {
      const { getByTestId } = render(
        <Pagination
          type={PaginationType.simple}
          count={4}
          testId={testId}
          numberofEdgePages={200}
        />
      );

      let selectOptions = getByTestId(`${testId}-select`);

      expect(selectOptions).toHaveLength(4);
    });

    it('Should remain unaffected by the size prop', () => {
      const { getByLabelText } = render(
        <Pagination
          type={PaginationType.simple}
          count={4}
          testId={testId}
          size={ButtonSize.large}
        />
      );

      const previousButton = getByLabelText('Previous Page');

      expect(previousButton).toHaveStyleRule(
        'height',
        magma.spaceScale.spacing09
      );
    });
    it('Should remain unaffected by the showFirstButton prop', () => {
      const { getByLabelText } = render(
        <Pagination
          type={PaginationType.simple}
          count={4}
          testId={testId}
          showFirstButton
        />
      );

      const previousButton = getByLabelText('Previous Page');

      expect(previousButton).toBeInTheDocument();
    });

    it('Should remain unaffected by the showLastButton prop', () => {
      const { getByLabelText } = render(
        <Pagination
          type={PaginationType.simple}
          count={4}
          testId={testId}
          showLastButton
        />
      );

      const nextButton = getByLabelText('Next Page');

      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('Should default to 1 if defaultPage is not set', () => {
      const { getByText } = render(
        <Pagination count={1} type={PaginationType.simple} />
      );

      const selected = getByText('1').parentElement.parentElement;

      expect(selected).toBeInTheDocument();
    });

    it('Should default to 1 if defaultPage is set to 0', () => {
      const { getByText } = render(
        <Pagination count={1} defaultPage={0} type={PaginationType.simple} />
      );

      const selected = getByText('1').parentElement.parentElement;

      expect(selected).toBeInTheDocument();
    });
  });

  it('Should call the onPageChange function when the previous button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        type={PaginationType.simple}
        count={4}
        defaultPage={2}
        testId={testId}
        onPageChange={onClickMock}
      />
    );

    const previousButton = getByLabelText('Previous Page');

    fireEvent.click(previousButton);
    expect(onClickMock).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('Should call the onPageChange function when the next button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        type={PaginationType.simple}
        count={4}
        defaultPage={2}
        testId={testId}
        onPageChange={onClickMock}
      />
    );

    const nextButton = getByLabelText('Next Page');

    fireEvent.click(nextButton);
    expect(onClickMock).toHaveBeenCalledWith(expect.any(Object), 3);
  });

  it('Should call the onPageChange function when a select option is clicked', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <Pagination
        type={PaginationType.simple}
        count={3}
        testId={testId}
        onPageChange={onClickMock}
      />
    );
    fireEvent.change(getByTestId(`${testId}-select`), {
      target: { value: '2' },
    });
    expect(onClickMock).toHaveBeenCalledWith(expect.any(Object), '2');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Pagination type={PaginationType.simple} count={4} />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
