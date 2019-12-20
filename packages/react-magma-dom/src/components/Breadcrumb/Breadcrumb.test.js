import React from 'react';
import { axe } from 'jest-axe';
import { Breadcrumb } from '.';
import { BreadcrumbItem } from './Item';

import { render } from '@testing-library/react';

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
      <Breadcrumb inverse>
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
