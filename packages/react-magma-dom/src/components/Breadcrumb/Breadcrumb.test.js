import React from 'react';
import { axe } from 'jest-axe';
import { Breadcrumb, BreadcrumbItem } from '.';
import { render } from '@testing-library/react';

const LINK_TEXT = 'Test link';
const SPAN_TEXT = 'Test span';

describe('Breadcrumb', () => {
  it('should render the breadcrumb component', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem to="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(container).toBeInTheDocument();
  });

  it('should render the breadcrumb component with inverse styles', () => {
    const { container, getByText } = render(
      <Breadcrumb inverse>
        <BreadcrumbItem inverseto="#">{LINK_TEXT}</BreadcrumbItem>
        <BreadcrumbItem inverse>{SPAN_TEXT}</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(container).toBeInTheDocument();
    expect(getByText(SPAN_TEXT)).toHaveStyleRule('color', '#FFFFFF');
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
