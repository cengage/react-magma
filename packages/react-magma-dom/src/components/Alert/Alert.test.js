import React from 'react';

import {
  act,
  render,
  fireEvent,
  getAllByAltText,
  getAllByLabelText,
} from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import {
  AlertVariant,
  buildAlertBackground,
  buildAlertBorder,
  buildAlertColor,
  buildLinkColor,
  buildLinkHoverColor,
} from '../AlertBase';
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
      `2px solid ${magma.colors.focus}`,
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
      magma.colors.neutral0
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
      magma.colors.brand.navy
    );
  });

  it.each([
    [AlertVariant.success, magma.colors.neutral0],
    [AlertVariant.danger, magma.colors.neutral0],
  ])(
    'should render a close button progress ring with the %s rebrand color',
    (variant, color) => {
      const { container } = render(
        <Alert hasTimerRing isDismissible isToast variant={variant}>
          Test Alert Text
        </Alert>
      );

      expect(container.querySelector('circle')).toHaveAttribute(
        'stroke',
        color
      );
    }
  );

  it.each([
    [AlertVariant.info, magma.colors.blue1000],
    [AlertVariant.success, magma.colors.green1000],
    [AlertVariant.warning, magma.colors.brand.navy],
    [AlertVariant.danger, magma.colors.red1000],
  ])(
    'should render an inverse %s progress ring with the rebrand color',
    (variant, color) => {
      const { container } = render(
        <Alert hasTimerRing isDismissible isInverse isToast variant={variant}>
          Test Alert Text
        </Alert>
      );

      expect(container.querySelector('circle')).toHaveAttribute(
        'stroke',
        color
      );
    }
  );

  it.each([
    [AlertVariant.info, magma.colors.blue600, magma.colors.neutral0],
    [AlertVariant.success, magma.colors.green600, magma.colors.neutral0],
    [AlertVariant.warning, magma.colors.yellow400, magma.colors.brand.navy],
    [AlertVariant.danger, magma.colors.red600, magma.colors.neutral0],
  ])(
    'should use the regular %s rebrand colors',
    (variant, background, content) => {
      const props = { isInverse: false, theme: magma, variant };

      expect(buildAlertBackground(props)).toBe(background);
      expect(buildAlertBorder(props)).toBe('none');
      expect(buildAlertColor(props)).toBe(content);
      expect(buildLinkColor(props)).toBe(content);
      expect(buildLinkHoverColor(props)).toBe(content);
    }
  );

  it.each([
    [AlertVariant.info, magma.colors.blue500, magma.colors.blue1000],
    [AlertVariant.success, magma.colors.green500, magma.colors.green1000],
    [AlertVariant.warning, magma.colors.yellow400, magma.colors.brand.navy],
    [AlertVariant.danger, magma.colors.red500, magma.colors.red1000],
  ])(
    'should use the inverse %s rebrand colors',
    (variant, background, content) => {
      const props = { isInverse: true, theme: magma, variant };

      expect(buildAlertBackground(props)).toBe(background);
      expect(buildAlertBorder(props)).toBe('none');
      expect(buildAlertColor(props)).toBe(content);
      expect(buildLinkColor(props)).toBe(content);
      expect(buildLinkHoverColor(props)).toBe(content);
    }
  );

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

  describe('Icon accessibility', () => {
    it('should render icon with role="img" and default aria-label', () => {
      const { getAllByLabelText } = render(<Alert>Default Info Alert</Alert>);
      const icon = getAllByLabelText('info icon')[0];
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('should render icon with role="img" and aria-label="info icon"', () => {
      const { getAllByLabelText } = render(
        <Alert variant={AlertVariant.info}>Info Alert</Alert>
      );
      const icon = getAllByLabelText('info icon')[0];
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('should render icon with role="img" and aria-label="success icon"', () => {
      const { getAllByLabelText } = render(
        <Alert variant={AlertVariant.success}>Success Alert</Alert>
      );
      const icon = getAllByLabelText('success icon')[0];
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('should render icon with role="img" and aria-label="warning icon"', () => {
      const { getAllByLabelText } = render(
        <Alert variant={AlertVariant.warning}>Warning Alert</Alert>
      );
      const icon = getAllByLabelText('warning icon')[0];
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('should render icon with role="img" and aria-label="danger icon"', () => {
      const { getAllByLabelText } = render(
        <Alert variant={AlertVariant.danger}>Danger Alert</Alert>
      );
      const icon = getAllByLabelText('danger icon')[0];
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });
  });
});
