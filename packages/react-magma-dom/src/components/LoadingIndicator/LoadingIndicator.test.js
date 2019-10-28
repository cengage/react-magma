import React from 'react';
import { LoadingIndicator } from '.';
import { render } from '@testing-library/react';

describe('Loading Indicator', () => {
  jest.setTimeout(20000);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the element', () => {
    const { container } = render(<LoadingIndicator />);

    expect(container).toBeInTheDocument();
  });

  it('should render the element with custom messages', () => {
    const text1 = 'test 1';
    const text2 = 'test 2';
    const text3 = 'test 3';

    const { getByText } = render(
      <LoadingIndicator message1={text1} message2={text2} message3={text3} />
    );

    expect(getByText(text1)).toBeInTheDocument();
    expect(getByText(text1)).toHaveStyleRule('opacity', '1');

    expect(getByText(text2)).toBeInTheDocument();
    expect(getByText(text2)).toHaveStyleRule('opacity', '0');

    expect(getByText(text3)).toBeInTheDocument();
    expect(getByText(text3)).toHaveStyleRule('opacity', '0');
  });

  it('should change the message after 5 and 15 seconds', () => {
    const text1 = 'test 1';
    const text2 = 'test 2';
    const text3 = 'test 3';

    const { getByText } = render(
      <LoadingIndicator message1={text1} message2={text2} message3={text3} />
    );

    expect(getByText(text1)).toHaveStyleRule('opacity', '1');
    expect(getByText(text1)).toHaveAttribute('aria-hidden', 'false');

    expect(getByText(text2)).toHaveStyleRule('opacity', '0');
    expect(getByText(text2)).toHaveAttribute('aria-hidden', 'true');

    expect(getByText(text3)).toHaveStyleRule('opacity', '0');
    expect(getByText(text3)).toHaveAttribute('aria-hidden', 'true');

    jest.runAllTimers();
    setTimeout(() => {
      expect(getByText(text1)).toHaveStyleRule('opacity', '0');
      expect(getByText(text1)).toHaveAttribute('aria-hidden', 'true');
    }, 6000);

    jest.runAllTimers();
    setTimeout(() => {
      expect(getByText(text1)).toHaveStyleRule('opacity', '0');
      expect(getByText(text1)).toHaveAttribute('aria-hidden', 'true');

      expect(getByText(text3)).toHaveStyleRule('opacity', '1');
      expect(getByText(text3)).toHaveAttribute('aria-hidden', 'false');
    }, 16000);
  });
});
