import React from 'react';
import { axe } from 'jest-axe';
import { Alert, AlertVariant } from '.';
import { render, fireEvent } from 'react-testing-library';
import { Info2Icon } from '../Icon/types/Info2Icon';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { NotificationIcon } from '../Icon/types/NotificationIcon';
import { BlockedIcon } from '../Icon/types/BlockedIcon';

const alertText = 'Test Alert Text';

const renderAlert = (myProps = {}) => {
  return render(<Alert {...myProps}>{alertText}</Alert>);
};

describe('Alert', () => {
  it('should render an alert with default variant', () => {
    const { getByText } = renderAlert();
    const alert = getByText(alertText);

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveStyleRule('background-color', '#575757');
  });

  describe('Variants', () => {
    it('should render an alert with info variant', () => {
      const { getByText } = renderAlert({ variant: AlertVariant.info });
      const alert = getByText(alertText);

      expect(alert).toHaveStyleRule('background-color', '#575757');
    });

    it('should render an alert with success variant', () => {
      const { getByText } = renderAlert({ variant: AlertVariant.success });
      const alert = getByText(alertText);

      expect(alert).toHaveStyleRule('background-color', '#3A8200');
    });

    it('should render an alert with warning variant', () => {
      const { getByText } = renderAlert({ variant: AlertVariant.warning });
      const alert = getByText(alertText);

      expect(alert).toHaveStyleRule('background-color', '#FFC72C');
    });

    it('should render an alert with danger variant', () => {
      const { getByText } = renderAlert({ variant: AlertVariant.danger });
      const alert = getByText(alertText);

      expect(alert).toHaveStyleRule('background-color', '#E70000');
    });
  });

  describe('Show Icon', () => {
    it('should render an alert with default icon', () => {
      const { container } = renderAlert({
        showIcon: true
      });
      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<Info2Icon />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with info icon', () => {
      const { container } = renderAlert({
        showIcon: true,
        variant: AlertVariant.info
      });
      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<Info2Icon />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with success icon', () => {
      const { container } = renderAlert({
        showIcon: true,
        variant: AlertVariant.success
      });
      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<CheckIcon />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with warning icon', () => {
      const { container } = renderAlert({
        showIcon: true,
        variant: AlertVariant.warning
      });
      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<NotificationIcon />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with danger icon', () => {
      const { container } = renderAlert({
        showIcon: true,
        variant: AlertVariant.danger
      });
      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<BlockedIcon />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });
  });

  describe('Dismissable', () => {
    it('should render a dismissable icon button', () => {
      const { getByLabelText } = renderAlert({ dismissable: true });
      const dismissableIconButton = getByLabelText('Dismiss icon');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should call passed in onDismiss when dismissable icon button is clicked', () => {
      const onDismissSpy = jest.fn();
      const { getByLabelText } = renderAlert({
        dismissable: true,
        onDismiss: onDismissSpy
      });
      const dismissableIconButton = getByLabelText('Dismiss icon');

      fireEvent.click(dismissableIconButton);

      expect(onDismissSpy).toHaveBeenCalled();
    });
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { getByText } = renderAlert({ style: { color } });
    const alert = getByText(alertText);

    expect(alert).toHaveStyle(`color: ${color}`);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderAlert();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
