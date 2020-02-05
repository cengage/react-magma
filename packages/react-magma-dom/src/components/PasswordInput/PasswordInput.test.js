import React from 'react';
import { axe } from 'jest-axe';
import { PasswordInput } from '.';
import { render, fireEvent } from '@testing-library/react';

describe('PasswordInput', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<PasswordInput testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('renders a show/hide button on password inputs', () => {
    const { getByText } = render(<PasswordInput />);
    const showText = getByText('Show');
    expect(showText).toBeInTheDocument();
    expect(showText).toHaveAttribute(
      'aria-label',
      'Show password. Note: this will visually expose your password on the screen'
    );
    expect(getByText('Password is now hidden')).toBeInTheDocument();
  });

  it('renders a show/hide button on password inputs with custom text', () => {
    const { getByText } = render(
      <PasswordInput
        showPasswordButtonAriaLabel="Test button aria label"
        showPasswordButtonText="Test button text"
        hiddenPasswordAnnounceText="Test announce text"
      />
    );

    expect(getByText('Test button text')).toBeInTheDocument();
    expect(getByText('Test button text')).toHaveAttribute(
      'aria-label',
      'Test button aria label'
    );
    expect(getByText('Test announce text')).toBeInTheDocument();
  });

  it('does not render a show/hide button when isPasswordMaskButtonHidden is set to true', () => {
    const { queryByText } = render(
      <PasswordInput isPasswordMaskButtonHidden />
    );

    expect(queryByText('Show')).not.toBeInTheDocument();
  });

  it('unmasks password when show button is clicked', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'text');
    expect(button).toHaveTextContent('Hide');
    expect(button).toHaveAttribute('aria-label', 'Hide password');
    expect(getByText('Password is now visible')).toBeInTheDocument();
  });

  it('unmasks password when show button is clicked with custom text', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput
        labelText={labelText}
        hidePasswordButtonAriaLabel="Test button aria label"
        hidePasswordButtonText="Test button text"
        shownPasswordAnnounceText="Test announce text"
      />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'text');
    expect(button).toHaveTextContent('Test button text');
    expect(button).toHaveAttribute('aria-label', 'Test button aria label');
    expect(getByText('Test announce text')).toBeInTheDocument();
  });

  it('masks password when the hide button is clicked', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(button).toHaveTextContent('Hide');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Show');
    expect(input).toHaveProperty('type', 'password');
  });
});

it('Does not violate accessibility standards', () => {
  const { container } = render(<PasswordInput labelText="test label" />);
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});
