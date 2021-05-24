import React from 'react';
import { axe } from 'jest-axe';
import { FormFieldContainer } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('FormFieldContainer', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <FormFieldContainer>{TEXT}</FormFieldContainer>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <FormFieldContainer testId={testId}>{TEXT}</FormFieldContainer>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <FormFieldContainer>{TEXT}</FormFieldContainer>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
