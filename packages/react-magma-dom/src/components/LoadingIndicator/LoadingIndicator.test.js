import React from 'react';
import { LoadingIndicator } from '.';
import { render, act } from '@testing-library/react';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

describe('Loading Indicator', () => {
  jest.setTimeout(20000);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<LoadingIndicator testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
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

  it('should render the element with different messages for progress bar', () => {
    const { getByText } = render(<LoadingIndicator type="progressbar" />);

    expect(getByText(/Please be patient/)).toBeInTheDocument();
    expect(getByText(/Thank you for your patience/)).toBeInTheDocument();
    expect(getByText(/Thank you for waiting/)).toBeInTheDocument();
  });

  it('should change the message after 5 and 15 seconds', async () => {
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

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(getByText(text1)).toHaveStyleRule('opacity', '0');
    expect(getByText(text1)).toHaveAttribute('aria-hidden', 'true');

    await act(async () => {
      jest.advanceTimersByTime(10000);
    });

    expect(getByText(text1)).toHaveStyleRule('opacity', '0');
    expect(getByText(text1)).toHaveAttribute('aria-hidden', 'true');

    expect(getByText(text3)).toHaveStyleRule('opacity', '1');
    expect(getByText(text3)).toHaveAttribute('aria-hidden', 'false');
  });

  it('should change the message after 10 and 30 seconds for progress bars', async () => {
    const { getByText } = render(<LoadingIndicator type="progressbar" />);

    expect(getByText(/Please be patient/)).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    expect(getByText(/Thank you for your patience/)).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(getByText(/Thank you for waiting/)).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    await act(async () => {
      jest.advanceTimersByTime(11000);
    });

    expect(getByText(/Please be patient/)).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(getByText(/Thank you for your patience/)).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    await act(async () => {
      jest.advanceTimersByTime(21000);
    });

    expect(getByText(/Thank you for your patience/)).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(getByText(/Thank you for waiting/)).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });

  describe('i18n', () => {
    it('should use the messages from the i18n context for progessbar', async () => {
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            loadingIndicator: {
              progressBar: {
                messages: {
                  first: 'first test',
                  second: 'second test',
                  third: 'third test',
                },
              },
              ...defaultI18n.loadingIndicator.spinner,
            },
          }}
        >
          <LoadingIndicator type="progressbar" />
        </I18nContext.Provider>
      );

      expect(getByText(/first test/)).toHaveAttribute('aria-hidden', 'false');
      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/third test/)).toHaveAttribute('aria-hidden', 'true');

      await act(async () => {
        jest.advanceTimersByTime(11000);
      });

      expect(getByText(/first test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'false');

      await act(async () => {
        jest.advanceTimersByTime(21000);
      });

      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/third test/)).toHaveAttribute('aria-hidden', 'false');
    });

    it('should use the messages from the i18n context for spinner', async () => {
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            loadingIndicator: {
              spinner: {
                messages: {
                  first: 'first test',
                  second: 'second test',
                  third: 'third test',
                },
              },
              ...defaultI18n.loadingIndicator.progressBar,
            },
          }}
        >
          <LoadingIndicator />
        </I18nContext.Provider>
      );

      expect(getByText(/first test/)).toHaveAttribute('aria-hidden', 'false');
      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/third test/)).toHaveAttribute('aria-hidden', 'true');

      await act(async () => {
        jest.advanceTimersByTime(11000);
      });

      expect(getByText(/first test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'false');

      await act(async () => {
        jest.advanceTimersByTime(21000);
      });

      expect(getByText(/second test/)).toHaveAttribute('aria-hidden', 'true');
      expect(getByText(/third test/)).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
