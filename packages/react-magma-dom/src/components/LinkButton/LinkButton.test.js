import React from 'react';
import { axe } from 'jest-axe';
import { LinkButton } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Link Button', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <LinkButton testId={testId}>test</LinkButton>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const buttonText = 'test';
    const { getByText } = render(<LinkButton>{buttonText}</LinkButton>);
    const button = getByText(buttonText);

    expect(button).not.toBeNull();
    expect(button).toHaveStyleRule('color', magma.colors.primary);
    expect(button).toHaveStyleRule('opacity', '1');
    expect(button).toHaveStyleRule('cursor', 'pointer');
  });

  it('should render an inverse link button with the correct styles', () => {
    const buttonText = 'test';
    const { getByText } = render(<LinkButton inverse>{buttonText}</LinkButton>);
    const button = getByText(buttonText);

    expect(button).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should disable a link button when passed disabled prop', () => {
    const buttonText = 'test';
    const { getByText } = render(
      <LinkButton disabled>{buttonText}</LinkButton>
    );
    const button = getByText(buttonText);

    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule('opacity', '.8');
    expect(button).toHaveStyleRule('cursor', 'not-allowed');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<LinkButton>link</LinkButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
