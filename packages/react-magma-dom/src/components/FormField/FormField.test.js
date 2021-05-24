import React from 'react';
import { axe } from 'jest-axe';
import { FormField } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('FormField', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(<FormField>{TEXT}</FormField>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <FormField testId={testId}>{TEXT}</FormField>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<FormField>{TEXT}</FormField>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
