import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { AlertVariant } from '../AlertBase';
import { Badge } from '../Badge';

import { Alert } from '.';

jest.mock('uuid');

describe('Alert', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Alert testId={testId}>Test Alert Text</Alert>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an alert with default variant', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { container } = render(
      <Alert id="defaultVariant">Test Alert Text</Alert>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render an alert with inverse focus style', () => {
    const { container } = render(<Alert inverse>Test Alert Text</Alert>);

    expect(container.firstChild).toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.info500}`,
      {
        target: ':focus',
      }
    );
  });

  it('should render a close button with a progress ring', () => {
    const { container } = render(
      <Alert hasTimerRing isDismissible isToast>
        Test Alert Text
      </Alert>
    );

    expect(container.querySelector('circle')).toBeInTheDocument();
    expect(container.querySelector('circle')).toHaveAttribute(
      'stroke',
      magma.colors.info500
    );
  });

  it('should render a close button with a progress ring with the warning style', () => {
    const { container } = render(
      <Alert hasTimerRing isDismissible isToast variant="warning">
        Test Alert Text
      </Alert>
    );

    expect(container.querySelector('circle')).toBeInTheDocument();
    expect(container.querySelector('circle')).toHaveAttribute(
      'stroke',
      magma.colors.warning500
    );
  });

  describe('Variants', () => {
    it('should render an alert with info variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.info}>Test Alert Text</Alert>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render an alert with warning variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.warning}>Test Alert Text</Alert>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render an alert with danger variant', () => {
      uuid.mockReturnValue('auto-generated-id');
      const { container } = render(
        <Alert variant={AlertVariant.danger}>Test Alert Text</Alert>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Dismissible', () => {
    it('should render a dismissible icon button', () => {
      const { getByLabelText } = render(
        <Alert isDismissible>Test Alert Text</Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissible icon button with custom close label text', () => {
      const { getByLabelText } = render(
        <Alert isDismissible closeAriaLabel="Test">
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Test');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissible icon button with the warning variant', () => {
      const { getByLabelText } = render(
        <Alert isDismissible variant={AlertVariant.warning}>
          Test Alert Text
        </Alert>
      );

      const button = getByLabelText('Close this message');
      button.setAttribute('id', 'ignoreButton');
      button.firstChild.setAttribute('id', 'ignoreSvg');
      button.firstChild.setAttribute('aria-labelledby', 'ignoreButton');
      button.firstChild.firstChild.setAttribute('id', 'ignoreTitle');

      expect(button).toMatchSnapshot();
    });

    it('should call passed in onDismiss when dismissible icon button is clicked', () => {
      jest.useFakeTimers();
      const onDismiss = jest.fn();
      const { getByLabelText } = render(
        <Alert isDismissible onDismiss={onDismiss}>
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      fireEvent.click(dismissableIconButton);

      act(jest.runAllTimers);

      expect(onDismiss).toHaveBeenCalled();
      act(() => {
        jest.useRealTimers();
      });
    });
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { container } = render(
      <Alert style={{ color }}>Test Alert Text</Alert>
    );

    expect(container.firstChild).toHaveStyle(`color: ${color}`);
  });

  describe('i18n', () => {
    it('should use the nav aria-label', () => {
      const dismissAriaLabel = 'test aria label';
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            alert: {
              dismissAriaLabel,
            },
          }}
        >
          <Alert isDismissible>Test Alert Text</Alert>
        </I18nContext.Provider>
      );

      expect(getByLabelText(dismissAriaLabel)).toBeInTheDocument();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Alert>Test Alert Text</Alert>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render right aligned children passed in by the additionalContent prop', () => {
    const { getByText } = render(
      <Alert additionalContent={<Badge>Test Component</Badge>}>
        Alert with additional right aligned children
      </Alert>
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
