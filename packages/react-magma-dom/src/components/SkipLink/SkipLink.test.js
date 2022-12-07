import { axe } from '../../../axe-helper';
import { SkipLink } from '.';
import { SkipLinkContent } from '../SkipLinkContent';

import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

describe('SkipLink', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<SkipLink testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the skip link component', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link.innerHTML).toEqual('Skip Navigation');
    expect(link).toHaveStyleRule('background', '#3942B0');
    expect(link).toHaveStyleRule('color', '#FFFFFF');
    expect(link).toMatchSnapshot();
  });

  it('should render the skip link component with custom text', () => {
    const TEXT = 'Test text';
    const { container } = render(<SkipLink buttonText={TEXT} />);
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link.innerHTML).toEqual(TEXT);
  });

  it('should put focus on the h1 in the main content area when the skip link is clicked', () => {
    const { container } = render(
      <>
        <SkipLink />
        <SkipLinkContent>
          <h1>Test</h1>
        </SkipLinkContent>
      </>
    );
    const link = container.querySelector('a');
    const heading = container.querySelector('h1');

    expect(heading).not.toHaveFocus();
    fireEvent.click(link);
    expect(heading).toHaveFocus();
  });

  it('should put focus on the main content area when the skip link is clicked if they content area does not have an h1', () => {
    const { container } = render(
      <>
        <SkipLink />
        <SkipLinkContent />
      </>
    );
    const link = container.querySelector('a');
    const contentDiv = container.querySelector('#reactMagmaMainContent');

    expect(contentDiv).not.toHaveFocus();
    fireEvent.click(link);
    expect(contentDiv).toHaveFocus();
  });

  it('should not move focus if there is no content area', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');

    link.focus();
    fireEvent.click(link);
    expect(link).toHaveFocus();
  });

  it('should render the skip link button the correct colors for an inverse button', () => {
    const { container } = render(<SkipLink isInverse />);
    const link = container.querySelector('a');

    expect(link).toHaveStyleRule('background', magma.colors.tertiary500);
    expect(link).toHaveStyleRule('color', magma.colors.primary700);
  });

  it('should render the skip link specified position top and left attributes', () => {
    const { container } = render(
      <SkipLink positionLeft={86} positionTop={99} />
    );
    const link = container.querySelector('a');

    expect(link).toHaveStyleRule('left', '86px', {
      target: ':focus',
    });
    expect(link).toHaveStyleRule('top', '99px', {
      target: ':focus',
    });
  });

  describe('i18n', () => {
    it('uses the context override for button text', () => {
      const buttonText = 'test button text';
      const { getByText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            skipLink: {
              buttonText,
            },
          }}
        >
          <SkipLink />
        </I18nContext.Provider>
      );

      expect(getByText(buttonText)).toBeInTheDocument();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <>
        <SkipLink />
        <SkipLinkContent />
      </>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
