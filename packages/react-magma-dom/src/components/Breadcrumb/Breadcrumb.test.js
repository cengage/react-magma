import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

import { Breadcrumb, BreadcrumbItem } from '.';

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

  it.each([
    [false, magma.colors.neutral700, magma.colors.brand.navy],
    [true, magma.colors.neutral500, magma.colors.neutral0],
  ])(
    'should render the breadcrumb colors when inverse is %s',
    (isInverse, separatorColor, currentColor) => {
      const { getByText } = render(
        <Breadcrumb isInverse={isInverse}>
          <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
          <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
        </Breadcrumb>
      );

      const separator = getByText('/');

      expect(separator).toHaveAttribute('aria-hidden', 'true');
      expect(separator).toHaveStyleRule('color', separatorColor);
      expect(separator).toHaveStyleRule(
        'margin',
        `0 ${magma.spaceScale.spacing03}`
      );
      expect(getByText(SPAN_TEXT)).toHaveStyleRule('color', currentColor);
    }
  );

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

  it('should render the breadcrumb component with aria-hidden', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    const span = container.querySelector('span');

    expect(span).toHaveAttribute('aria-hidden', 'true');
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
