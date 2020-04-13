import React from 'react';
import { axe } from 'jest-axe';
import { Banner } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

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

    expect(closeBtn).toHaveStyleRule('color', magma.colors.neutral01);

    expect(closeBtn).toHaveStyleRule(
      'outline',
      `2px dotted ${magma.colors.neutral01}`,
      {
        target: ':focus'
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

    const dismissableIconButton = getByLabelText('Test');
    expect(dismissableIconButton).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Banner>Test</Banner>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
