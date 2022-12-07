import { axe } from '../../../axe-helper';
import { Breadcrumb, BreadcrumbItem } from '.';

import { render } from '@testing-library/react';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';

const LINK_TEXT = 'Test link';
const SPAN_TEXT = 'Test span';

describe('Breadcrumb', () => {
  it('should find elements by testId', () => {
    const testId = 'test-id';
    const testId2 = 'test-id2';
    const { getByTestId } = render(
      <Breadcrumb testId={testId}>
        <BreadcrumbItem testId={testId2}>Item Text</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId2)).toBeInTheDocument();
  });

  it('should render the breadcrumb component', () => {
    const { container, getByLabelText } = render(
      <Breadcrumb>
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(container).toBeInTheDocument();
    expect(getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('should render the breadcrumb component with inverse styles', () => {
    const { getByText } = render(
      <Breadcrumb isInverse>
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(getByText(SPAN_TEXT)).toHaveStyleRule('color', '#FFFFFF');
  });

  it('should render the breadcrumb component with custom aria-label', () => {
    const { queryByLabelText, getByLabelText } = render(
      <Breadcrumb aria-label="Test label">
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(queryByLabelText('Breadcrumb')).not.toBeInTheDocument();
    expect(getByLabelText('Test label')).toBeInTheDocument();
  });

  describe('i18n', () => {
    it('should use the nav aria-label', () => {
      const navAriaLabel = 'test aria label';
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            breadcrumb: {
              navAriaLabel,
            },
          }}
        >
          <Breadcrumb>
            <BreadcrumbItem>Item Text</BreadcrumbItem>
          </Breadcrumb>
        </I18nContext.Provider>
      );

      expect(getByLabelText(navAriaLabel)).toBeInTheDocument();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
