import React from 'react';

import { act, render, fireEvent, waitFor } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

import { PasswordInput } from '.';

describe('PasswordInput', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<PasswordInput testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('renders a show/hide button on password inputs', () => {
    const { getByText } = render(<PasswordInput />);
    const showText = getByText('Show').parentElement;
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
    expect(getByText('Test button text').parentElement).toHaveAttribute(
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
    const button = getByText('Show').parentElement;
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
    const button = getByText('Show').parentElement;
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
    const button = getByText('Show').parentElement;
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(button).toHaveTextContent('Hide');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Show');
    expect(input).toHaveProperty('type', 'password');
  });
});

it('should trigger the passed in onChange when value of the input is changed', () => {
  const targetValue = 'Change';
  const onChangeSpy = jest.fn();
  const labelText = 'test label';
  const { getByLabelText } = render(
    <PasswordInput labelText={labelText} onChange={onChangeSpy} value="" />
  );

  fireEvent.change(getByLabelText(labelText), {
    target: { value: targetValue },
  });
  act(() => {
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});

it('should render an input with a correctly styled helper message', () => {
  const testMessage = 'Test message';
  const { getByTestId } = render(<PasswordInput helperMessage={testMessage} />);

  const helperMessage = getByTestId('inputMessage');

  expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral);
});

it('should render an input with a correctly styled error message', () => {
  const labelText = 'test label';
  const testHelperMessage = 'Test helper message';
  const testErrorMessage = 'Test error message';
  const { getByTestId, getByLabelText, queryByText } = render(
    <PasswordInput
      errorMessage={testErrorMessage}
      helperMessage={testHelperMessage}
      labelText={labelText}
    />
  );

  const errorMessage = getByTestId('inputMessage');

  expect(errorMessage).toBeInTheDocument();

  expect(getByLabelText(labelText)).toHaveStyleRule(
    'color',
    magma.colors.neutral700
  );

  expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);

  const helperMessage = queryByText(testHelperMessage);

  expect(helperMessage).not.toBeInTheDocument();
});

it('should render the input with visually hidden label text', () => {
  const labelText = 'test label';
  const { getByText } = render(
    <PasswordInput labelText={labelText} isLabelVisuallyHidden />
  );
  expect(getByText(labelText)).toHaveStyleRule('height', '1px');
});

describe('sizes', () => {
  it('should render a default input with correct styles', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );

    const label = container.querySelector('label');
    const input = getByLabelText(labelText);

    expect(label).toHaveStyleRule('font-size', magma.typeScale.size02.fontSize);
    expect(label).toHaveStyleRule(
      'letter-spacing',
      magma.typeScale.size02.letterSpacing
    );
    expect(input).toHaveStyleRule('font-size', magma.typeScale.size03.fontSize);
    expect(input).toHaveStyleRule('height', '100%');
  });

  it('should render a large input with correct styles', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput labelText={labelText} inputSize="large" />
    );

    const label = container.querySelector('label');
    const input = getByLabelText(labelText);

    expect(label).toHaveStyleRule('font-size', magma.typeScale.size03.fontSize);

    expect(input).toHaveStyleRule('font-size', magma.typeScale.size04.fontSize);
    expect(input).toHaveStyleRule('height', '100%');
    expect(input).toHaveStyleRule('padding', `${magma.spaceScale.spacing04}`);
  });

  it('should default to no autocomplete', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );

    const input = getByLabelText(labelText);

    expect(input).toHaveAttribute('autoCorrect', 'off');
    expect(input).toHaveAttribute('autoCapitalize', 'none');
  });

  it('should allow autocomplete to be overwritten', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput
        autoCapitalize="sentences"
        autoCorrect="on"
        labelText={labelText}
      />
    );

    const input = getByLabelText(labelText);

    expect(input).toHaveAttribute('autoCorrect', 'on');
    expect(input).toHaveAttribute('autoCapitalize', 'sentences');
  });
});

describe('i18n', () => {
  it('should use overrides', () => {
    const labelText = 'test label';
    const hidden = {
      announce: 'hidden password announce',
      ariaLabel: 'hidden password ariaLabel',
      buttonText: 'hidden password buttonText',
    };
    const shown = {
      announce: 'shown password announce',
      ariaLabel: 'shown password ariaLabel',
      buttonText: 'shown password buttonText',
    };
    const { getByLabelText, getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          password: {
            hidden,
            shown,
          },
        }}
      >
        <PasswordInput labelText={labelText} inputSize="large" />
      </I18nContext.Provider>
    );

    expect(getByText(hidden.announce)).toBeInTheDocument();
    expect(getByLabelText(shown.ariaLabel)).toBeInTheDocument();
    expect(getByText(shown.buttonText)).toBeInTheDocument();

    fireEvent.click(getByText(shown.buttonText));

    expect(getByText(shown.announce)).toBeInTheDocument();
    expect(getByLabelText(hidden.ariaLabel)).toBeInTheDocument();
    expect(getByText(hidden.buttonText)).toBeInTheDocument();
  });
});

describe('custom button text width measurement', () => {
  it('measures button width after mount and applies it to input style', async () => {
    const labelText = 'test label';
    const MOCKED_WIDTH = 90;

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return MOCKED_WIDTH;
      },
    });

    const { getByLabelText } = render(
      <PasswordInput
        labelText={labelText}
        showPasswordButtonText="Reveal"
        hidePasswordButtonText="Conceal"
      />
    );

    await waitFor(() => {
      const input = getByLabelText(labelText);
      expect(input).toHaveStyle(`width: calc(100% - ${MOCKED_WIDTH + 3}px)`);
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 0;
      },
    });
  });

  it('re-measures button width after toggling password visibility', async () => {
    const labelText = 'test label';
    let mockedWidth = 60;

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return mockedWidth;
      },
    });

    const { getByLabelText, getByText } = render(
      <PasswordInput
        labelText={labelText}
        showPasswordButtonText="Reveal"
        hidePasswordButtonText="Conceal longer"
      />
    );

    await waitFor(() => {
      expect(getByLabelText(labelText)).toHaveStyle(
        `width: calc(100% - ${mockedWidth + 3}px)`
      );
    });

    mockedWidth = 100;
    fireEvent.click(getByText('Reveal').parentElement);

    await waitFor(() => {
      expect(getByLabelText(labelText)).toHaveStyle(
        `width: calc(100% - ${mockedWidth + 3}px)`
      );
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 0;
      },
    });
  });

  it('limits the custom text button to half of the input container width and truncates overflowing text', async () => {
    const CONTAINER_WIDTH = 200;

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return CONTAINER_WIDTH;
      },
    });

    const { getByText } = render(
      <PasswordInput
        labelText="test label"
        showPasswordButtonText="Reveal my long password"
        hidePasswordButtonText="Conceal"
      />
    );

    const button = getByText('Reveal my long password').parentElement;

    await waitFor(() => {
      expect(button).toHaveStyle(
        `max-width: ${Math.floor(CONTAINER_WIDTH / 2)}px`
      );
    });

    expect(button).toHaveStyle('overflow: hidden');
    expect(button).toHaveStyle('text-overflow: ellipsis');
    expect(button).toHaveStyle('white-space: nowrap');

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 0;
      },
    });
  });

  it('keeps the fixed width for the default button text', () => {
    const { getByText } = render(<PasswordInput labelText="test label" />);

    const button = getByText('Show').parentElement;

    expect(button).toHaveStyle('width: 54px');
    expect(button).toHaveStyle('max-width: 54px');
  });
});

it('Does not violate accessibility standards', () => {
  const { container } = render(<PasswordInput labelText="test label" />);
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});
