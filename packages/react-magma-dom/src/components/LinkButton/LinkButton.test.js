import React from 'react';
import { axe } from 'jest-axe';
import { LinkButton } from '.';
import { render, cleanup } from 'react-testing-library';
import { magma } from '../../theme/magma';

const TEXT = 'Test Text';

const BASE_BUTTON_PROPS = {
  onClick: jest.fn()
};

const renderLinkButton = (myProps = {}) => {
  const props = {
    ...BASE_BUTTON_PROPS,
    ...myProps
  };

  return render(<LinkButton {...props}>{TEXT}</LinkButton>);
};

describe('Link Button', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = renderLinkButton({ testId });

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const { getByText } = renderLinkButton();
    const button = getByText(TEXT);

    expect(button).not.toBeNull();
    expect(button).toHaveStyleRule('color', magma.colors.primary);
    expect(button).toHaveStyleRule('opacity', '1');
    expect(button).toHaveStyleRule('cursor', 'pointer');
  });

  it('should render an inverse link button with the correct styles', () => {
    const { getByText } = renderLinkButton({ inverse: true });
    const button = getByText(TEXT);

    expect(button).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should disable a link button when passed disabled prop', () => {
    const { getByText } = renderLinkButton({ disabled: true });
    const button = getByText(TEXT);

    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule('opacity', '.8');
    expect(button).toHaveStyleRule('cursor', 'not-allowed');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderLinkButton();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
