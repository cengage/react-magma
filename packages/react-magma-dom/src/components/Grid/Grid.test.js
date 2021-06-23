import React from 'react';
import { axe } from 'jest-axe';
import { Grid } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Grid', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <Grid>{TEXT}</Grid>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Grid testId={testId}>{TEXT}</Grid>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Grid>{TEXT}</Grid>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
    const example = 'example i18n';
    const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
      <Grid>override default i18n value: </Grid>
    </I18nContext.Provider>);

    expect(getByText(example)).toBeInTheDocument();
  })
});
