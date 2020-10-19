import React from 'react';
import { render } from '@testing-library/react';
import { Hyperlink } from '.';

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

    expect(element).toHaveStyleRule('color', '#006298');
  });

  it('should render an inverse anchor element', () => {
    const { getByText } = render(
      <Hyperlink isInverse to="https://www.google.com">
        Google
      </Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('color', '#FFFFFF');
  });

  it('should render an anchor element with default button styles', () => {
    const { getByText } = render(
      <Hyperlink styledAs="Button" to="https://www.google.com">
        Google
      </Hyperlink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('font-size', '14px');
    expect(element).toHaveStyleRule('border-radius', '5px');
    expect(element).toHaveStyleRule('height', '37px');
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

    expect(element).toHaveStyleRule('font-size', '18px');
    expect(element).toHaveStyleRule('border-radius', '100%');
    expect(element).toHaveStyleRule('height', '45px');
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
        {({ stylesClass, to }) => {
          expect(to).toEqual('https://www.google.com');
          expect(stylesClass).not.toBeNull();
        }}
      </Hyperlink>
    );
  });
});
