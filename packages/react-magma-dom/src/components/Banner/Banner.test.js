import React from 'react';
import { axe } from '../../../axe-helper';
import { Banner } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { Button } from '../Button';

describe('Banner', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Banner testId={testId}>Test</Banner>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render with correct warning variant styles', () => {
    const testId = 'test-id';
    const { getByTestId, getByLabelText } = render(
      <Banner isDismissible testId={testId} variant="warning">
        Test
      </Banner>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'background',
      magma.colors.pop04
    );

    const closeBtn = getByLabelText('Close this message');

    expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral);

    expect(closeBtn).toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.neutral}`,
      {
        target: ':focus',
      }
    );
  });

  it('should render a close button when isDismissible is true', () => {
    const { getByLabelText } = render(<Banner isDismissible>Text</Banner>);

    expect(getByLabelText('Close this message')).toBeInTheDocument();
  });

  it('should render a close button with custom aria label', () => {
    const { getByLabelText } = render(
      <Banner isDismissible closeAriaLabel="Test">
        Text
      </Banner>
    );

    const dismissibleIconButton = getByLabelText('Test');
    expect(dismissibleIconButton).toBeInTheDocument();
  });

  it('should render an action button with an action that fires when clicked', () => {
    const actionBtnClick = jest.fn();

    const { getByText } = render(
      <Banner actionButtonText="btn text" actionButtonOnClick={actionBtnClick}>
        Test
      </Banner>
    );

    const btn = getByText('btn text').parentElement;

    expect(btn).toHaveStyleRule('color', magma.colors.primary);

    fireEvent.click(btn);
    expect(actionBtnClick).toHaveBeenCalled();
  });

  it('should render an action button with danger styles', () => {
    const { getByText } = render(
      <Banner
        actionButtonText="btn text"
        actionButtonOnClick={() => {}}
        variant="danger"
      >
        Test
      </Banner>
    );
    expect(getByText('btn text').parentElement).toHaveStyleRule(
      'color',
      magma.colors.danger
    );
  });

  it('should render an action button with success styles', () => {
    const { getByText } = render(
      <Banner
        actionButtonText="btn text"
        actionButtonOnClick={() => {}}
        variant="success"
      >
        Test
      </Banner>
    );

    expect(getByText('btn text').parentElement).toHaveStyleRule(
      'color',
      magma.colors.success
    );
  });

  it('should render an action button with warning styles', () => {
    const { getByText } = render(
      <Banner
        actionButtonText="btn text"
        actionButtonOnClick={() => {}}
        variant="warning"
      >
        Test
      </Banner>
    );

    expect(getByText('btn text').parentElement).toHaveStyleRule(
      'color',
      magma.colors.neutral
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Banner>Test</Banner>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
