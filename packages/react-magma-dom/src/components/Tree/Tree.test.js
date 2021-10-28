import React from 'react';
import { axe } from 'jest-axe';
import { Tree } from '.';
import { render } from '@testing-library/react';
import { I18nContext, defaultI18n } from '../../i18n';

const TEXT = 'Test Text';

describe('Tree', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <Tree>{TEXT}</Tree>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Tree testId={testId}>{TEXT}</Tree>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Tree>{TEXT}</Tree>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
    const example = 'example i18n';
    const { getByText } = render(<I18nContext.Provider value={{ ...defaultI18n, example}}>
      <Tree>override default i18n value: </Tree>
    </I18nContext.Provider>);

    expect(getByText(example)).toBeInTheDocument();
  })
});
