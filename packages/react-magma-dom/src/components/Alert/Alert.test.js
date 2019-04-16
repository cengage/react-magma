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
    const { container } = renderAlert();

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyleRule('background-color', '#575757');

    const alertIcon = container.querySelector('svg');
    const { container: iconContainer } = render(<Info2Icon size={20} />);
    const expectedIcon = iconContainer.querySelector('svg');

    expect(alertIcon).toEqual(expectedIcon);
  });

  describe('Variants', () => {
    it('should render an alert with info variant', () => {
      const { container } = renderAlert({ variant: AlertVariant.info });

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#575757'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<Info2Icon size={20} />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with success variant', () => {
      const { container } = renderAlert({ variant: AlertVariant.success });

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#3A8200'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<CheckIcon size={20} />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with warning variant', () => {
      const { container } = renderAlert({ variant: AlertVariant.warning });

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#FFC72C'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(
        <NotificationIcon size={20} />
      );
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with danger variant', () => {
      const { container } = renderAlert({ variant: AlertVariant.danger });

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#E70000'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(<BlockedIcon size={20} />);
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });
  });

  describe('Dismissable', () => {
    it('should render a dismissable icon button', () => {
      const { getByLabelText } = renderAlert({ dismissable: true });
      const dismissableIconButton = getByLabelText('Close this message');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should call passed in onDismiss when dismissable icon button is clicked', () => {
      const onDismissSpy = jest.fn();
      const { getByLabelText } = renderAlert({
        dismissable: true,
        onDismiss: onDismissSpy
      });
      const dismissableIconButton = getByLabelText('Close this message');

      fireEvent.click(dismissableIconButton);

      expect(onDismissSpy).toHaveBeenCalled();
    });
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { container } = renderAlert({ style: { color } });

    expect(container.firstChild).toHaveStyle(`color: ${color}`);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderAlert();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
