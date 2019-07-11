import React from 'react';
import { render } from 'react-testing-library';
import { HyperLink } from '.';

describe('Hyper Link', () => {
  it('should render a basic anchor element', () => {
    const { getByText } = render(
      <HyperLink to="https://www.google.com">Google</HyperLink>
    );

    expect(getByText(/google/i)).toBeInTheDocument();
    expect(getByText(/google/i)).toHaveAttribute(
      'href',
      'https://www.google.com'
    );
  });

  it('should render an anchor element with default button styles', () => {
    const { getByText } = render(
      <HyperLink styledAs="Button" to="https://www.google.com">
        Google
      </HyperLink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('font-size', '.875rem');
    expect(element).toHaveStyleRule('border-radius', '5px');
    expect(element).toHaveStyleRule('height', '37px');
  });

  it('should render an anchor element with passed in button styles', () => {
    const { getByText } = render(
      <HyperLink
        styledAs="Button"
        size="large"
        shape="round"
        to="https://www.google.com"
      >
        Google
      </HyperLink>
    );

    const element = getByText(/google/i);

    expect(element).toHaveStyleRule('font-size', '1.125rem');
    expect(element).toHaveStyleRule('border-radius', '100%');
    expect(element).toHaveStyleRule('height', '45px');
  });

  it('should send back values when passed children as a function', () => {
    render(
      <HyperLink to="https://www.google.com">
        {({ to }) => expect(to).toEqual('https://www.google.com')}
      </HyperLink>
    );
  });

  it('should compose css when styled as button for function children', () => {
    render(
      <HyperLink styledAs="Button" to="https://www.google.com">
        {({ style, to }) => {
          expect(to).toEqual('https://www.google.com');
          expect(style).not.toBeNull();
        }}
      </HyperLink>
    );
  });
});
