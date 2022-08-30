import React from 'react';
import { render } from '@testing-library/react';
import { Hyperlink } from '.';
import { magma } from '../../theme/magma';

describe('Hyperlink', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a basic anchor element', () => {
    const { getByText } = render(
      <Hyperlink to="https://www.google.com">Google</Hyperlink>
    );

    expect(getByText(/google/i)).toBeInTheDocument();
    expect(getByText(/google/i)).toHaveAttribute(
      'href',
      'https://www.google.com'
    );
  });

  it('should render a basic anchor element with link styles', () => {
    const { getByText } = render(
      <Hyperlink to="https://www.google.com">Google</Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('color', magma.colors.primary);
  });

  it('should render an inverse anchor element', () => {
    const { getByText } = render(
      <Hyperlink isInverse to="https://www.google.com">
        Google
      </Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('color', magma.colors.tertiary);
  });

  it('should render an anchor element with default button styles', () => {
    const { getByText } = render(
      <Hyperlink styledAs="Button" to="https://www.google.com">
        Google
      </Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule(
      'font-size',
      magma.typeScale.size03.fontSize
    );
    expect(element).toHaveStyleRule('border-radius', magma.borderRadius);
    expect(element).toHaveStyleRule('height', magma.spaceScale.spacing09);
  });

  it('should render an anchor element with passed in button styles', () => {
    const { getByText } = render(
      <Hyperlink
        styledAs="Button"
        size="large"
        shape="round"
        to="https://www.google.com"
      >
        Google
      </Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule(
      'font-size',
      magma.typeScale.size04.fontSize
    );
    expect(element).toHaveStyleRule('border-radius', '100%');
    expect(element).toHaveStyleRule('height', magma.spaceScale.spacing11);
  });

  it('should send back values when passed children as a function', () => {
    render(
      <Hyperlink to="https://www.google.com">
        {({ to }) => expect(to).toEqual('https://www.google.com')}
      </Hyperlink>
    );
  });

  it('should compose css when styled as button for function children', () => {
    render(
      <Hyperlink styledAs="Button" to="https://www.google.com">
        {({ className, to }) => {
          expect(to).toEqual('https://www.google.com');
          expect(className).not.toBeNull();
        }}
      </Hyperlink>
    );
  });
});
