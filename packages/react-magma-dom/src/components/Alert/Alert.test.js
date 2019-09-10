import React from 'react';
import { axe } from 'jest-axe';
import { Alert, AlertVariant } from '.';
import { render, fireEvent } from 'react-testing-library';
import { Info2Icon } from '../Icon/types/Info2Icon';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { NotificationIcon } from '../Icon/types/NotificationIcon';
import { BlockedIcon } from '../Icon/types/BlockedIcon';

const MOCK_ID = 'abc123';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => MOCK_ID)
  };
});

describe('Alert', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Alert testId={testId}>Test Alert Text</Alert>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render an alert with default variant', () => {
    const { container } = render(<Alert>Test Alert Text</Alert>);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyleRule('background-color', '#575757');

    const alertIcon = container.querySelector('svg');
    const { container: iconContainer } = render(
      <Info2Icon size={20} id={alertIcon.childNodes[0].id} />
    );
    const expectedIcon = iconContainer.querySelector('svg');

    expect(alertIcon).toEqual(expectedIcon);
  });

  describe('Variants', () => {
    it('should render an alert with info variant', () => {
      const { container } = render(
        <Alert variant={AlertVariant.info}>Test Alert Text</Alert>
      );

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#575757'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(
        <Info2Icon size={20} id={alertIcon.childNodes[0].id} />
      );
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with success variant', () => {
      const { container } = render(
        <Alert variant={AlertVariant.success}>Test Alert Text</Alert>
      );

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#3A8200'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(
        <CheckIcon size={20} id={alertIcon.childNodes[0].id} />
      );
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with warning variant', () => {
      const { container } = render(
        <Alert variant={AlertVariant.warning}>Test Alert Text</Alert>
      );

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#FFC72C'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(
        <NotificationIcon size={20} id={alertIcon.childNodes[0].id} />
      );
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });

    it('should render an alert with danger variant', () => {
      const { container } = render(
        <Alert variant={AlertVariant.danger}>Test Alert Text</Alert>
      );

      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        '#E70000'
      );

      const alertIcon = container.querySelector('svg');
      const { container: iconContainer } = render(
        <BlockedIcon size={20} id={alertIcon.childNodes[0].id} />
      );
      const expectedIcon = iconContainer.querySelector('svg');

      expect(alertIcon).toEqual(expectedIcon);
    });
  });

  describe('Dismissable', () => {
    it('should render a dismissable icon button', () => {
      const { getByLabelText } = render(
        <Alert dismissable>Test Alert Text</Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissable icon button with custom close label text', () => {
      const { getByLabelText } = render(
        <Alert dismissable closeLabel="Test">
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Test');

      expect(dismissableIconButton).toBeInTheDocument();
    });

    it('should render a dismissable icon button with the warning variant', () => {
      const { getByLabelText } = render(
        <Alert dismissable variant={AlertVariant.warning}>
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

    it('should call passed in onDismiss when dismissable icon button is clicked', () => {
      const onDismiss = jest.fn();
      const { getByLabelText } = render(
        <Alert dismissable onDismiss={onDismiss}>
          Test Alert Text
        </Alert>
      );
      const dismissableIconButton = getByLabelText('Close this message');

      fireEvent.click(dismissableIconButton);

      setTimeout(() => {
        expect(onDismiss).toHaveBeenCalled();
      }, 500);
    });
  });

  it('should render custom styles', () => {
    const color = '#cccccc';
    const { container } = render(
      <Alert style={{ color }}>Test Alert Text</Alert>
    );

    expect(container.firstChild).toHaveStyle(`color: ${color}`);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Alert>Test Alert Text</Alert>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
