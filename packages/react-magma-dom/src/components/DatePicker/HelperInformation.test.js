import React, { act } from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HelperInformation } from './HelperInformation';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

describe('Calendar Month', () => {
  it('helper information should be visible when open', async () => {
    const { getByText } = render(<HelperInformation isOpen />);

    expect(getByText(/keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('should call the onClose method when the helper information is closed', async () => {
    const onCloseSpy = jest.fn();
    const { getByLabelText, getByText, rerender } = render(
      <>
        <button>Click</button>
        <HelperInformation isOpen={false} onClose={onCloseSpy} />
      </>
    );

    act(() => {
      getByText(/click/i).focus();
    });

    rerender(
      <>
        <button>Click</button>
        <HelperInformation isOpen onClose={onCloseSpy} />
      </>
    );

    await userEvent.click(getByLabelText(/close/i));

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should hold focus inside the helper information', async () => {
    const { getByLabelText } = render(<HelperInformation isOpen />);

    const button = getByLabelText('Close Calendar Widget');

    await userEvent.tab();

    expect(button).toBeInTheDocument();
    expect(button).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();

    expect(button).toHaveFocus();
  });

  it('should have default styles', () => {
    const { getByTestId } = render(<HelperInformation isOpen />);
    const navigationContainer = getByTestId('helper-navigation-container');

    expect(navigationContainer).toHaveStyleRule('align-items', 'center');
    expect(navigationContainer).toHaveStyleRule(
      'padding',
      magma.spaceScale.spacing03
    );
    expect(navigationContainer).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral300}`
    );
    expect(navigationContainer).toHaveStyleRule(
      'background',
      magma.colors.neutral200
    );
  });

  it('should have inverse styles', () => {
    const { getByTestId } = render(<HelperInformation isOpen isInverse />);
    const navigationContainer = getByTestId('helper-navigation-container');

    expect(navigationContainer).toHaveStyleRule('align-items', 'center');
    expect(navigationContainer).toHaveStyleRule(
      'padding',
      magma.spaceScale.spacing03
    );
    expect(navigationContainer).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.primary400}`
    );
    expect(navigationContainer).toHaveStyleRule(
      'background',
      magma.colors.primary600
    );
  });

  describe('should render the helper information with correct ARIA attributes', () => {
    function renderWithI18n() {
      return render(
        <I18nContext.Provider value={defaultI18n}>
          <HelperInformation isOpen />
        </I18nContext.Provider>
      );
    }

    it('should render all KeyboardShortcutButtonWrapper aria-labels', () => {
      const { getByLabelText } = renderWithI18n();
      const ariaLabels = [
        defaultI18n.datePicker.calendarCloseAriaLabel,
        defaultI18n.datePicker.helpModal.enter.ariaLabel,
        defaultI18n.datePicker.helpModal.rightAndLeftArrowKeys.ariaLabel,
        defaultI18n.datePicker.helpModal.upAndDownArrowKeys.ariaLabel,
        defaultI18n.datePicker.helpModal.pageUpAndPageDownKeys.ariaLabel,
        defaultI18n.datePicker.helpModal.homeAndEndKeys.ariaLabel,
        defaultI18n.datePicker.helpModal.escape.ariaLabel,
      ];
      ariaLabels.forEach(label => {
        expect(getByLabelText(label)).toBeInTheDocument();
      });
    });
  });
});
